"use client";

import { Form, InputGroup } from "react-bootstrap";

import {
  normalizePostcode,
  postcodeInputPattern,
  validatePostcode,
} from "@/utils/Postcodes";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";

const postcodeErrorMessage = (errorCode: PostCodeErrorCode) => {
  switch (errorCode) {
    case "POSTCODE_INVALID":
      return "Oops, that postcode doesn't look right to us. Please try again or contact us."; // TODO make contact us a link?

    case "POSTCODE_NOT_FOUND":
      return "Oops, we can't find that postcode. Please try again or contact us.";
    case "UNCLEAR_CONSTITUENCY":
      return "Please select your address or your constituency from the list.";
    case "SERVER_ERROR":
      return "Something went wrong looking up your constituency.";
    //TODO add in a link for them to find their constituency in a list
    default:
      return "";
  }
};

const lookupCache: {
  [key: string]: Promise<ConstituencyLookupResponse | null> | null;
} = {};

const fetchApi = async (
  postcode: string,
  addressSlug?: string,
): Promise<ConstituencyLookupResponse | null> => {
  try {
    console.log("Making API call to constituency lookup route");
    const response = await fetch(
      "/api/constituency_lookup/" +
        postcode +
        (addressSlug ? "/" + addressSlug : ""),
    );

    if (response.ok) {
      return response.json();
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

type ReqControl = {
  time: number;
  timerID: ReturnType<typeof setTimeout> | null;
  rateLimit: number;
  lastLookup: string | null;
};

const reqControl: ReqControl = {
  time: 0,
  timerID: null,
  lastLookup: null,
  rateLimit: 3000,
};

// throttled apiFetch
const throttledApi = async (
  postcode: string,
  addressSlug?: string,
): Promise<ConstituencyLookupResponse | null> => {
  addressSlug = addressSlug || "";
  const cacheKey = postcode + addressSlug;

  if (lookupCache.hasOwnProperty(postcode)) {
    const cached = await lookupCache[cacheKey];
    if (cached) {
      return cached;
    }
  }

  // Cancel existing delayed request
  if (reqControl.timerID && reqControl.lastLookup) {
    clearTimeout(reqControl.timerID);
    console.log("Cancelled a lookup", reqControl.lastLookup);
    lookupCache[reqControl.lastLookup] = null;
  }

  reqControl.lastLookup = cacheKey;

  if (reqControl.time + reqControl.rateLimit < Date.now()) {
    //Last request was more than rate limit ago.
    reqControl.time = Date.now();
    lookupCache[cacheKey] = fetchApi(postcode, addressSlug);
  } else {
    //Need to delay the request.
    lookupCache[cacheKey] = new Promise((resolve) => {
      let cancelled: boolean = true;
      reqControl.timerID = setTimeout(
        () => {
          cancelled = false;
          reqControl.timerID = null;
          reqControl.time = Date.now();
          resolve(fetchApi(postcode, addressSlug));
        },
        reqControl.rateLimit - (Date.now() - reqControl.time),
      );
      // If a request is cancelled we still need to resovle the promise.
      setTimeout(
        () => {
          if (cancelled == true) {
            resolve(null);
          }
        },
        reqControl.rateLimit + 100 - (Date.now() - reqControl.time),
      );
    });
  }

  return lookupCache[cacheKey];
};

type FormData = {
  constituencyIndex: number | false;
};

const initialFormState: FormData = {
  constituencyIndex: false,
};

interface IProps {
  validPostcode: MutableRefObject<string>;
  constituency: Constituency | null;
  setConstituency: Dispatch<SetStateAction<Constituency | null>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const ConstituencyLookup = ({
  validPostcode,
  constituency,
  setConstituency,
  loading,
  setLoading,
}: IProps) => {
  const [formState, setFormState] = useState<FormData>(initialFormState);
  const [apiResponse, setApiResponse] = useState<
    ConstituencyLookupResponse | false | null
  >(null);
  const [postcodeError, setPostcodeError] = useState<PostCodeErrorCode | null>(
    null,
  );

  useEffect(() => {
    if (
      apiResponse &&
      apiResponse.constituencies?.length > 0 &&
      apiResponse.postcode == validPostcode.current &&
      formState.constituencyIndex !== false
    ) {
      setConstituency(apiResponse.constituencies[formState.constituencyIndex]);
    } else {
      setConstituency(null);
    }
  }, [
    apiResponse,
    formState.constituencyIndex,
    validPostcode,
    setConstituency,
  ]);

  const lookupConstituency = async (
    postcode: string,
    addressSlug?: string,
  ): Promise<ConstituencyLookupResponse | null> => {
    setLoading(true);
    setPostcodeError(null);

    console.log("Lookup Constituency", postcode, addressSlug);
    const responseJson = await throttledApi(postcode, addressSlug);

    if (postcode != validPostcode.current) {
      //This request no longer mathes the most recent.
      return null;
    }

    if (responseJson == null) {
      console.log("SERVER ERROR");
      // A server error for the most recent lookup!
      setPostcodeError("SERVER_ERROR");
      setApiResponse(null);
      setLoading(false);
      return null;
    }

    // The response postcode doesn't match the last one entered.
    if (responseJson.postcode !== postcode) {
      // The server has responded with a different postcode to the one we sent it!
      console.log("THIS SHOULD NEVER HAPPEN!");
      setPostcodeError("SERVER_ERROR");
      setApiResponse(null);
      setLoading(false);
      return null;
    }

    setApiResponse(responseJson);
    setPostcodeError(responseJson.errorCode || null);

    if (responseJson.constituencies.length == 1) {
      setFormState({ ...formState, constituencyIndex: 0 });
    } else {
      setFormState({ ...formState, constituencyIndex: false });
    }

    setLoading(false);
    return responseJson;
  };

  const postcodeChanged = async (userPostcode: string) => {
    const normalizedPostcode = normalizePostcode(userPostcode);

    if (
      validPostcode.current == normalizedPostcode &&
      apiResponse &&
      apiResponse.postcode == normalizedPostcode
    ) {
      //We're already displaying the response for this postcode!
      return;
    }

    // If the entered postcode is valid look store it and look it up.
    if (validatePostcode.test(normalizedPostcode)) {
      validPostcode.current = normalizedPostcode;
      await lookupConstituency(normalizedPostcode);
      return;
    } else {
      //Otherwise reset the display of selected postcode
      setApiResponse(null);
    }
  };

  return (
    <>
      <InputGroup className="my-3" hasValidation>
        <Form.Control
          name="postcode"
          size="lg"
          type="text"
          placeholder="Your Postcode"
          pattern={postcodeInputPattern}
          isInvalid={!!postcodeError}
          onChange={(e) => postcodeChanged(e.target.value)}
          className="invalid-text-greyed"
        />
        {constituency && (
          <InputGroup.Text>
            {!constituency.name
              ? ""
              : constituency.name.length < 31
              ? constituency.name
              : constituency.name.substring(0, 27) + "..."}
          </InputGroup.Text>
        )}
        <Form.Control.Feedback
          className="fw-bold fst-italic px-2 pt-0 mt-1 mb-2 text-white"
          type="invalid"
        >
          {postcodeError ? postcodeErrorMessage(postcodeError) : ""}
        </Form.Control.Feedback>
      </InputGroup>

      {apiResponse && apiResponse.constituencies.length > 1 && (
        <>
          {apiResponse.addresses ? (
            <div className="my-3">
              <p className="mb-1" style={{ fontSize: "0.75em" }}>
                We can&apos;t work out exactly which constituency you&apos;re in
                - please select your address:
              </p>
              <Form.Select
                name="address"
                size="lg"
                defaultValue=""
                onChange={(e) =>
                  lookupConstituency(validPostcode.current, e.target.value)
                }
              >
                <option selected disabled value="" style={{ display: "none" }}>
                  Select Address
                </option>
                {apiResponse.addresses.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </Form.Select>
            </div>
          ) : (
            <div className="my-3">
              <p className="mb-1" style={{ fontSize: "0.75em" }}>
                We can&apos;t work out exactly which constituency you&apos;re in
                - please select one of the {apiResponse.constituencies.length}{" "}
                options:
              </p>
              <Form.Select
                name="constituency"
                size="lg"
                defaultValue=""
                onChange={(e) => {
                  if (e.target.value.length > 2) {
                    lookupConstituency(validPostcode.current, e.target.value);
                  } else {
                    setFormState({
                      ...formState,
                      constituencyIndex: parseInt(e.target.value),
                    });
                  }
                }}
              >
                <option selected disabled value="" style={{ display: "none" }}>
                  Select Constituency
                </option>
                {apiResponse.constituencies.map((c, idx) => (
                  <option key={c.slug} value={idx}>
                    {c.name}
                  </option>
                ))}
              </Form.Select>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ConstituencyLookup;
