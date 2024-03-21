"use client";

import { useRouter } from "next/navigation";

import {
  Container,
  Form,
  Button,
  FormCheck,
  Row,
  Col,
  Spinner,
  InputGroup,
} from "react-bootstrap";

import {
  normalizePostcode,
  postcodeInputPattern,
  validatePostcode,
} from "@/utils/Postcodes";
import { submitANForm } from "@/utils/AnApiSubmission";
import { rubik } from "@/utils/Fonts";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import FormCheckLabel from "react-bootstrap/esm/FormCheckLabel";
import { useMemo, useRef, useState, useEffect } from "react";

const postcodeErrorToErrorMessage = (code: PostCodeErrorCode) => {
  switch (code) {
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

const emailErrorToErrorMessage = (code: EmailErrorCode) => {
  switch (code) {
    case "EMAIL_INVALID":
      return "Please add a valid email address.";
    case "SERVER_ERROR":
      return "Something went wrong signing you up. Please try again?";
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
  emailOptIn: boolean;
  constituencyIndex: number | false;
  addressIndex: number | false;
  email: string;
};

const initialFormState: FormData = {
  emailOptIn: false,
  constituencyIndex: false,
  addressIndex: false,
  email: "",
};

const PostcodeLookup = () => {
  const router = useRouter();

  // TODO: Look into using useFormState in future:
  // https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#server-side-validation-and-error-handling
  // Was hitting into this issue: https://github.com/vercel/next.js/issues/55919

  const [subscribed, setSubscribed] = useState<string | null | false>(false);
  const [formState, setFormState] = useState<FormData>(initialFormState);
  const [formPostcode, setFormPostcode] = useState<string>("");
  const [apiResponse, setApiResponse] = useState<
    ConstituencyLookupResponse | false | null
  >(null);
  const [postError, setPostError] = useState<PostCodeErrorCode | null>(null);
  const [emailError, setEmailError] = useState<EmailErrorCode | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const validPostcode = useRef("");

  useEffect(() => {
    //string = subscription Date.now()
    //null = not subscribed on client
    //false = on server
    setSubscribed(window.localStorage.getItem("fwd-subscribed"));
  }, []);

  const lastSelectedConstituency = useMemo(() => {
    if (
      apiResponse &&
      apiResponse.constituencies?.length > 0 &&
      apiResponse.postcode == validPostcode.current &&
      formState.constituencyIndex !== false
    ) {
      return apiResponse.constituencies[formState.constituencyIndex];
    } else {
      return null;
    }
  }, [apiResponse, formState.constituencyIndex]);

  const lookupConstituency = async (
    postcode: string,
    addressSlug?: string,
  ): Promise<ConstituencyLookupResponse | null> => {
    setApiResponse(false);
    setPostError(null);

    console.log("Lookup Constituency", postcode, addressSlug);
    const responseJson = await throttledApi(postcode, addressSlug);

    if (postcode != validPostcode.current) {
      //This request no longer mathes the most recent.
      return null;
    }

    if (responseJson == null) {
      console.log("SERVER ERROR");
      // a server error for the most recent lookup!
      setPostError("SERVER_ERROR");
      setApiResponse(null); // clear the spinner
      return null;
    }

    // The response postcode doesn't match the last one entered.
    if (responseJson.postcode !== postcode) {
      //The server has responded with a different postcode
      //to the one we sent it!
      console.log("THIS SHOULD NEVER HAPPEN!");
      setPostError("SERVER_ERROR");

      setApiResponse(false); // clear the spinner
      return null;
    }

    setApiResponse(responseJson);
    setPostError(responseJson.errorCode || null);

    if (responseJson.constituencies.length == 1) {
      setFormState({ ...formState, constituencyIndex: 0 });
    } else {
      setFormState({ ...formState, constituencyIndex: false });
    }

    return responseJson;
  };

  const postcodeChanged = async (userPostcode: string) => {
    setFormPostcode(userPostcode);
    setPostError(null);
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

  const submitForm = async () => {
    if (lastSelectedConstituency && !formState.emailOptIn) {
      router.push(`/constituencies/${lastSelectedConstituency.slug}`);
      return;
    } else if (
      lastSelectedConstituency &&
      formState.emailOptIn &&
      formState.email &&
      formRef.current &&
      !formRef.current.email.validity.typeMismatch
    ) {
      //TODO set source codes from current url params.
      const anResponse = await submitANForm(
        formState.email,
        validPostcode.current,
        lastSelectedConstituency,
        process.env.NEXT_PUBLIC_AN_POSTCODE_FORM || "",
        ["stop the tories", "movement forward", "election reminders", "join"],
        "", // source codes,
      );

      if (anResponse.ok) {
        window.localStorage.setItem("fwd-subscribed", Date.now().toString());
        router.push(`/constituencies/${lastSelectedConstituency.slug}`);
      } else {
        setEmailError("SERVER_ERROR"); //AN doesn't give error codes on failure
      }
    }

    // VALIDATION
    // Invalid email
    if (
      formState.emailOptIn &&
      (!formState.email ||
        (formRef.current && formRef.current.email.validity.typeMismatch))
    ) {
      setEmailError("EMAIL_INVALID");
    }

    // no postcode or invalid postcode
    if (
      !validPostcode.current ||
      !apiResponse ||
      !apiResponse.constituencies ||
      apiResponse.constituencies.length == 0
    ) {
      // User hasn't input anything or invalid postcode
      setPostError("POSTCODE_INVALID");
      return;
    }

    //not selected constituency or address
    if (
      apiResponse.constituencies.length > 1 &&
      formState.constituencyIndex === false
    ) {
      setPostError("UNCLEAR_CONSTITUENCY");
    }
  };

  return (
    <Form className="form-search" ref={formRef} action={submitForm} noValidate>
      <h3 className="fw-bolder">How to vote your Tory out</h3>
      <InputGroup className="my-3" hasValidation>
        <Form.Control
          value={formPostcode}
          name="postcode"
          size="lg"
          type="text"
          placeholder="Your Postcode"
          pattern={postcodeInputPattern}
          isInvalid={!!postError}
          onChange={(e) => postcodeChanged(e.target.value)}
          className="invalid-text-greyed"
          onBlur={(e) => {
            if (!validatePostcode.test(normalizePostcode(e.target.value)))
              setPostError("POSTCODE_INVALID");
          }}
        />
        <Form.Control.Feedback
          className="fw-bold fst-italic px-2 pt-1 text-white"
          type="invalid"
        >
          {postError ? postcodeErrorToErrorMessage(postError) : ""}
        </Form.Control.Feedback>
      </InputGroup>

      {lastSelectedConstituency && (
        <InputGroup className="my-3">
          <Form.Control
            name="constituency-display"
            size="lg"
            type="text"
            value={lastSelectedConstituency.name}
            readOnly
          />
          <Button
            variant="secondary"
            onClick={() => {
              setApiResponse(null);
              setFormPostcode("");
            }}
          >
            CLEAR
          </Button>
        </InputGroup>
      )}

      {apiResponse && apiResponse.constituencies.length > 1 && (
        <>
          {apiResponse.addresses ? (
            <div className="my-3">
              <p className="small">Select your exact address</p>
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
                <optgroup label="address">
                  {apiResponse.addresses.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name.toLowerCase()}
                    </option>
                  ))}
                </optgroup>
              </Form.Select>
            </div>
          ) : (
            !lastSelectedConstituency && (
              <div className="my-3">
                <p className="small">Select your constituency</p>
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
                  <option
                    selected
                    disabled
                    value=""
                    style={{ display: "none" }}
                  >
                    Select Constituency
                  </option>
                  <optgroup label="constituency">
                    {apiResponse.constituencies.map((c, idx) => (
                      <option key={c.slug} value={idx}>
                        {c.name}
                      </option>
                    ))}
                  </optgroup>
                </Form.Select>
              </div>
            )
          )}
        </>
      )}
      {subscribed ? (
        <div className="my-3"></div>
      ) : (
        <div className="my-3">
          <FormCheck name="emailOptIn" className="custom-checkbox">
            <FormCheckInput
              checked={formState.emailOptIn}
              onChange={() =>
                setFormState({
                  ...formState,
                  emailOptIn: !formState.emailOptIn,
                })
              }
            />
            <FormCheckLabel
              onClick={() =>
                setFormState({
                  ...formState,
                  emailOptIn: !formState.emailOptIn,
                })
              }
            >
              <strong>Join up,</strong> be counted, stick together
            </FormCheckLabel>
          </FormCheck>

          {formState.emailOptIn && (
            <>
              <InputGroup hasValidation className="my-3">
                <Form.Control
                  name="email"
                  size="lg"
                  type="email"
                  placeholder="Your Email"
                  value={formState.email}
                  isInvalid={!!emailError}
                  onChange={(e) => {
                    setFormState({ ...formState, email: e.target.value });
                    if (!e.target.validity.typeMismatch) {
                      setEmailError(null);
                    }
                  }}
                  className="invalid-text-greyed"
                />
                <Form.Control.Feedback
                  className="fw-bold fst-italic px-2 pt-1  text-white"
                  type="invalid"
                >
                  {emailError ? emailErrorToErrorMessage(emailError) : ""}
                </Form.Control.Feedback>
              </InputGroup>
              <p className="small">
                You&apos;re opting in to receive emails. We store your email
                address, postcode, and constituency, so we can send you exactly
                the information you need.
              </p>
            </>
          )}
        </div>
      )}

      <div className="d-flex justify-content-between mt-3">
        <Button
          variant="light"
          size="lg"
          type="submit"
          disabled={!lastSelectedConstituency}
          aria-disabled={!lastSelectedConstituency}
          style={{ width: "66%" }}
        >
          {apiResponse === false && (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                area-hidden="true"
              />
              <span className="visually-hidden">Loading...</span>{" "}
            </>
          )}
          <span className={`${rubik.className} fw-bold`}>
            {formState.emailOptIn ? "Go + Join" : "Go"}
          </span>
        </Button>
        <Button
          href="https://themovementforward.com/privacy/"
          as="a"
          variant="link"
          target="_blank"
          rel="noreferrer"
          className="btn btn-sm align-self-center"
          role="button"
        >
          <span className={`${rubik.className} fw-bold`}>Privacy Policy</span>
        </Button>
      </div>
    </Form>
  );
};

export default PostcodeLookup;
