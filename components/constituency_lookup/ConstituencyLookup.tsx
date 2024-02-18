"use client";

import { useRouter } from "next/navigation";

import { Container, Form, Button, FormCheck } from "react-bootstrap";

import { rubik } from "@/utils/Fonts";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import FormCheckLabel from "react-bootstrap/esm/FormCheckLabel";
import { useState } from "react";
import { isValid } from "postcode";

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

type FormData = {
  postcode: string;
  emailOptIn: boolean;
  constituencySlug: string;
  addressSlug: string;
  email: string;
};

const initialFormState: FormData = {
  postcode: "",
  emailOptIn: false,
  constituencySlug: "",
  addressSlug: "",
  email: "",
};

const PostcodeLookup = () => {
  const router = useRouter();

  // TODO: Look into using useFormState in future:
  // https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#server-side-validation-and-error-handling
  // Was hitting into this issue: https://github.com/vercel/next.js/issues/55919

  const [formState, setFormState] = useState<FormData>(initialFormState);
  const [apiResponse, setApiResponse] =
    useState<ConstituencyLookupResponse | null>(null);
  const [apiInProgress, setApiInProgress] = useState<boolean>(false);
  const [error, setError] = useState<ErrorCode | null>(null);

  const callApi = async (userPostcode: string, addressSlug?: string) => {
    // Avoid calling the API multiple time concurrently from fast user input...
    if (apiInProgress) {
      console.log("Skipping concurrent API call");
      return;
    }

    setApiInProgress(true);

    try {
      const requestBody: ConstituencyLookupRequest = {
        postcode: userPostcode,
        addressSlug: addressSlug,
      };
      console.log("Making API call to constituency lookup route");
      const response = await fetch("/api/constituency_lookup", {
        method: "POST",
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const responseJson: ConstituencyLookupResponse = await response.json();
        setApiResponse(responseJson);
        setError(responseJson.errorCode || null);
      } else {
        setError("SERVER_ERROR");
      }
    } catch {
      setError("SERVER_ERROR");
    }

    setApiInProgress(false);
  };

  const postcodeChanged = async (userPostcode: string) => {
    // Update the stored / displayed postcode
    setFormState({ ...formState, postcode: userPostcode });

    const trimmedPostcode = userPostcode.trim();

    // If the postcode looks valid, and it's not the same as the last postcode we looked
    // up in the API, pre-load the results so we can imediately show the constituency /
    // address drop-down if necessary.
    if (
      isValid(trimmedPostcode) &&
      (!apiResponse || apiResponse.postcode != trimmedPostcode)
    ) {
      // Postcode has changed, so leave out the addressSlug in the API call - even if
      // one is/was selected, it's a different postcode now, so irrelevant!
      await callApi(trimmedPostcode);
    }
  };

  const submitForm = async () => {
    const trimmedPostcode = formState.postcode.trim();

    // VALIDATION
    if (!trimmedPostcode) {
      // User hasn't input anything
      setApiResponse(null);
      setError("POSTCODE_INVALID");
      return;
    } else if (!isValid(trimmedPostcode)) {
      // Invalid postcode
      setApiResponse(null);
      setError("POSTCODE_INVALID");
      return;
    }
    // TODO: Validate email if emailOptIn is set
    // TODO: Do we want/need a separate error field for email so we can show if BOTH postcode and email are invalid in one pass?

    // CALL API IF NECESSARY
    if (!apiResponse || apiResponse.postcode != trimmedPostcode) {
      // The postcode SHOULD have already been looked up by the postcodeChanged handler,
      // but it's possible that a slow pre-load API call blocked a subsequent postcode
      // change by the user (because we prevent concurrent API calls). If the form
      // postcode and last API postcode don't match, call the API.
      console.log("SUBMIT HANDLER: postcode changed, calling API");
      await callApi(formState.postcode);
    } else if (
      formState.addressSlug &&
      (!apiResponse || apiResponse.addressSlug != formState.addressSlug)
    ) {
      // Postcode has not changed, but the selected address has, so we need to call the
      // API to find the constituency for this address
      await callApi(formState.postcode, formState.addressSlug);
      console.log("SUBMIT HANDLER: addressSlug changed, calling API");
    }

    // SHOW ERRORS
    if (!apiResponse) {
      // TODO: Show error to user based on failed API call!
      return;
    }

    if (apiResponse.errorCode) {
      // Error - do nothing (component will automatically show the error)
      return;
    }

    if (apiResponse.constituencies.length == 1) {
      // Only one constituency returned by API - redirect
      // TODO: Subscribe email via ActionNetwork API now their constituency is known
      console.log(
        "SUBMIT HANDLER: Only one constituency from API, redirecting",
      );
      router.push(`/constituencies/${apiResponse.constituencies[0].slug}`);
    } else if (formState.constituencySlug) {
      // User has explicitly selected their constituency from the drop-down - redirect
      // TODO: Subscribe email via ActionNetwork API now their constituency is known
      console.log("SUBMIT HANDLER: User selected constituency, redirecting");
      router.push(`/constituencies/${formState.constituencySlug}`);
    }

    // If API returned multiple possible constituencies, the component will
    // automatically show a select for the constituencies or addresses
  };

  return (
    <Container
      className="rounded-3 bg-pink-strong p-3 mb-4 shadow text-100"
      style={{ fontSize: "18px" }}
    >
      <Form action={submitForm} noValidate>
        <h3 className={`${rubik.className} fw-bolder`}>VOTE THE TORIES OUT</h3>
        <p className="fw-bold text-900">
          Vote tactically at the General Election
        </p>

        <Form.Control
          name="postcode"
          size="lg"
          type="text"
          placeholder="Your Postcode"
          pattern="^\s*[A-Za-z]{1,2}\d[A-Za-z\d]?\s*\d[A-Za-z]{2}\s*$"
          onChange={(e) => postcodeChanged(e.target.value)}
        />

        {error && (
          <p className="fw-bold fst-italic">{errorCodeToErrorMessage(error)}</p>
        )}

        {apiResponse && apiResponse.constituencies.length > 1 && (
          <>
            <p style={{ fontSize: "0.75em" }}>
              We can&apos;t work out exactly which constituency you&apos;re in -
              please select one of the {apiResponse.constituencies.length}{" "}
              options.
            </p>
            <Form.Select
              name="constituency"
              size="lg"
              defaultValue=""
              onChange={(e) =>
                setFormState({ ...formState, constituencySlug: e.target.value })
              }
            >
              <option selected disabled value="" style={{ display: "none" }}>
                Select Constituency
              </option>
              {apiResponse.constituencies.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </Form.Select>
          </>
        )}

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
            />
            <FormCheckLabel
              className="ps-2"
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
            />
            <p style={{ fontSize: "0.75em" }}>
              We store your email address, postcode, and constituency, so we can
              send you exactly the information you need, and the actions to
              take.
            </p>
          </>
        )}

        <Button
          variant="primary"
          type="submit"
          disabled={apiInProgress}
          aria-disabled={apiInProgress}
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default PostcodeLookup;
