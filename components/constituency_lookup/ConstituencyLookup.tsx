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
import { rubik } from "@/utils/Fonts";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import FormCheckLabel from "react-bootstrap/esm/FormCheckLabel";
import { useMemo, useRef, useState } from "react";

const errorCodeToErrorMessage = (code: ErrorCode) => {
  switch (code) {
    case "POSTCODE_INVALID":
      return "Oops, that postcode doesn't look right to us. Please try again or contact us.";
    case "POSTCODE_NOT_FOUND":
      return "Oops, we can't find that postcode. Please try again or contact us.";
    default:
      return "";
  }
};

const lookupCache: {
  [key: string]: Promise<ConstituencyLookupResponse | null>;
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
};

const reqControl: ReqControl = {
  time: 0,
  timerID: null,
  rateLimit: 3000,
};

// throttled apiFetch
const throttledApi = async (
  postcode: string,
  addressSlug?: string,
): Promise<ConstituencyLookupResponse | null> => {
  //TODO handle address lookups in the cache if/when we use DemoClub API
  if (lookupCache.hasOwnProperty(postcode)) {
    const cached = await lookupCache[postcode];
    if (cached) {
      return cached;
    }
  }

  // Cancel existing delayed request
  if (reqControl.timerID) {
    clearTimeout(reqControl.timerID);
  }

  if (reqControl.time + reqControl.rateLimit < Date.now()) {
    //Last request was more than rate limit ago.
    reqControl.time = Date.now();
    lookupCache[postcode] = fetchApi(postcode, addressSlug);
  } else {
    //Need to delay the request.
    lookupCache[postcode] = new Promise((resolve) => {
      reqControl.timerID = setTimeout(
        () => {
          reqControl.timerID = null;
          reqControl.time = Date.now();
          resolve(fetchApi(postcode, addressSlug));
        },
        reqControl.rateLimit - (Date.now() - reqControl.time),
      );
    });
  }

  return lookupCache[postcode];
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

  const [formState, setFormState] = useState<FormData>(initialFormState);
  const [apiResponse, setApiResponse] = useState<
    ConstituencyLookupResponse | false | null
  >(null);
  const [error, setError] = useState<ErrorCode | null>(null);

  const [lastValidPostcode, setLastValidPostcode] = useState<string>("");

  const currentPostcode = useRef("");

  const lastSelectedConstituency = useMemo(() => {
    if (
      apiResponse &&
      apiResponse.constituencies?.length > 0 &&
      apiResponse.postcode == currentPostcode.current &&
      formState.constituencyIndex !== false
    ) {
      return apiResponse.constituencies[formState.constituencyIndex];
    } else {
      return null;
    }
  },
    [apiResponse, formState.constituencyIndex]
  );
  console.log(`lastSelectedConstituency [${JSON.stringify(lastSelectedConstituency)}]`);

  const lookupPostcode = async (
    postcode: string,
    addressSlug?: string,
  ): Promise<ConstituencyLookupResponse | null> => {
    setApiResponse(false);

    console.log("MAKING POSTCODE API CALL");
    console.log(`currentPostcode [${currentPostcode.current}]`);
    console.log(`postcode [${postcode}]`);
    console.log(`lastValidPostcode [${lastValidPostcode}]`);

    const responseJson = await throttledApi(postcode, addressSlug);

    // The response postcode doesn't match the last one entered.
    if (responseJson?.postcode !== currentPostcode.current) {
      console.log("CURRENT POSTCODE DOESN'T MATCH RESPONSE");
      console.log(`responseJson?.postcode [${responseJson?.postcode}]`);
      console.log(`currentPostcode [${currentPostcode.current}]`);
      console.log(`postcode [${postcode}]`);
      console.log(`lastValidPostcode [${lastValidPostcode}]`);
      return null;
    }

    console.log("CURRENT POSTCODE DOES MATCH RESPONSE - UPDATING");
    console.log(`responseJson?.postcode [${responseJson?.postcode}]`);
    console.log(`currentPostcode [${currentPostcode.current}]`);
    console.log(`postcode [${postcode}]`);
    console.log(`lastValidPostcode [${lastValidPostcode}]`);

    if (responseJson === null) {
      //TODO set a server error
    } else {
      setApiResponse(responseJson);

      if (responseJson.constituencies.length == 1) {
        setFormState({ ...formState, constituencyIndex: 0 });
      } else {
        setFormState({ ...formState, constituencyIndex: false });
      }
      setError(responseJson.errorCode || null);
    }

    return responseJson;
  };

  const postcodeChanged = async (userPostcode: string) => {
    // Update the stored / displayed postcode

    const normalizedPostcode = normalizePostcode(userPostcode);

    if (!validatePostcode.test(normalizedPostcode)) {
      return;
    } else {
      setLastValidPostcode(normalizedPostcode);
    }
    currentPostcode.current = normalizedPostcode;

    // If the postcode looks valid, and it's not the same as the last postcode we looked
    // up in the API, pre-load the results so we can imediately show the constituency /
    // address drop-down if necessary.
    await lookupPostcode(normalizedPostcode);
  };

  const submitForm = async () => {
    console.log("Submitting form");
    if (lastSelectedConstituency) {
      router.push(`/constituencies/${lastSelectedConstituency.slug}`);
      return;
    }

    // VALIDATION
    // no postcode or invalid postcode
    if (
      !lastValidPostcode ||
      !validatePostcode.test(lastValidPostcode) ||
      !apiResponse ||
      !apiResponse.constituencies ||
      apiResponse.constituencies.length == 0
    ) {
      // User hasn't input anything or invalid postcode
      setError("POSTCODE_INVALID");
      return;
    }

    //not selected constituency or address
    if (apiResponse.constituencies.length > 1 && !formState.constituencyIndex) {
      //TODO: Set error for unclear constituency
    }

    // TODO: Validate email if emailOptIn is set
    // TODO: Do we want/need a separate error field for email so we can show if BOTH postcode and email are invalid in one pass?
  };

  return (
    <Container
      className="rounded-3 bg-pink-strong p-3 shadow text-100"
      style={{ fontSize: "18px" }}
    >
      <Form action={submitForm} noValidate>
        <h3 className={`${rubik.className} fw-bolder`}>Vote the Tories out</h3>
        <p className="fw-bold text-900">
          Vote tactically at the General Election
        </p>
        <InputGroup className="my-3">
          <Form.Control
            name="postcode"
            size="lg"
            type="text"
            placeholder="Your Postcode"
            pattern={postcodeInputPattern}
            onChange={(e) => postcodeChanged(e.target.value)}
            className="invalid-text-greyed"
          />
          {lastSelectedConstituency && (
            <InputGroup.Text>
              {!lastSelectedConstituency?.name
                ? ""
                : lastSelectedConstituency.name.length < 31
                  ? lastSelectedConstituency.name
                  : lastSelectedConstituency.name.substring(0, 27) + "..."}
            </InputGroup.Text>
          )}
        </InputGroup>

        {error && (
          <p className="fw-bold fst-italic">{errorCodeToErrorMessage(error)}</p>
        )}

        {apiResponse && apiResponse.constituencies.length > 1 && (
          <div className="my-3">
            <p className="mb-1" style={{ fontSize: "0.75em" }}>
              We can&apos;t work out exactly which constituency you&apos;re in -
              please select one of the {apiResponse.constituencies.length}{" "}
              options:
            </p>
            <Form.Select
              name="constituency"
              size="lg"
              defaultValue=""
              onChange={(e) => setFormState({
                ...formState,
                constituencyIndex: parseInt(e.target.value),
              })}
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

        <div className="my-3">
          <FormCheck name="emailOptIn">
            <div>
              <FormCheckInput
                checked={formState.emailOptIn}
                onChange={() =>
                  setFormState({
                    ...formState,
                    emailOptIn: !formState.emailOptIn,
                  })
                }
                className="me-2"
              />
              <FormCheckLabel
                onClick={() =>
                  setFormState({
                    ...formState,
                    emailOptIn: !formState.emailOptIn,
                  })
                }
              >
                <strong>Join with your email</strong> to stick together
              </FormCheckLabel>
            </div>
          </FormCheck>

          {formState.emailOptIn && (
            <>
              <Form.Control
                name="email"
                size="lg"
                type="email"
                placeholder="Your Email"
                value={formState.email}
                onChange={(e) =>
                  setFormState({ ...formState, email: e.target.value })
                }
                className="my-2 invalid-text-greyed"
              />
              <p style={{ fontSize: "0.75em" }}>
                We store your email address, postcode, and constituency, so we
                can send you exactly the information you need, and the actions
                to take.
              </p>
            </>
          )}
        </div>

        <Row className="d-flex justify-content-between my-3">
          <Col xs={4} className="d-grid">
            <Button
              variant="light"
              size="lg"
              type="submit"
              disabled={!lastSelectedConstituency}
              aria-disabled={!lastSelectedConstituency}
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
              <span className={`${rubik.className} fw-bold`}>Go</span>
            </Button>
          </Col>
          <Col className="align-self-center text-end">
            <a
              href="https://themovementforward.com/privacy/"
              target="_blank"
              rel="noreferrer"
              className="btn btn-link btn-sm"
              role="button"
            >
              <span className={`${rubik.className} fw-bold`}>
                Privacy Policy
              </span>
            </a>
          </Col>
        </Row>
      </Form>
    </Container >
  );
};

export default PostcodeLookup;
