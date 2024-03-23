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
import ConstituencyLookup from "./constituencyLookup";

const emailErrorMessage = (code: EmailErrorCode) => {
  switch (code) {
    case "EMAIL_INVALID":
      return "Please add a valid email address.";
    case "SERVER_ERROR":
      return "Something went wrong signing you up. Please try again?";
    default:
      return "";
  }
};

type FormData = {
  emailOptIn: boolean;
  email: string;
};

const initialFormState: FormData = {
  emailOptIn: false,
  email: "",
};

const ConstituencyFormWithSignup = () => {
  const router = useRouter();

  // TODO: Look into using useFormState in future:
  // https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#server-side-validation-and-error-handling
  // Was hitting into this issue: https://github.com/vercel/next.js/issues/55919

  // Variables used to track state of the ConstituencyLookup components
  const validPostcode = useRef("");
  const [constituency, setConstituency] = useState<Constituency | null>(null);
  const [constituencyApiLoading, setConstituencyApiLoading] = useState(false);

  // Variables used to track state of the email opt-in components
  const [formState, setFormState] = useState<FormData>(initialFormState);
  const [emailError, setEmailError] = useState<EmailErrorCode | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  // Track whether the user is already subscribed via localStorage
  const [subscribed, setSubscribed] = useState<string | null | false>(false);
  useEffect(() => {
    //string = subscription Date.now()
    //null = not subscribed on client
    //false = on server
    setSubscribed(window.localStorage.getItem("fwd-subscribed"));
  }, []);

  const submitForm = async () => {
    if (constituency && !formState.emailOptIn) {
      router.push(`/constituencies/${constituency.slug}`);
      return;
    } else if (
      constituency &&
      formState.emailOptIn &&
      formState.email &&
      formRef.current &&
      !formRef.current.email.validity.typeMismatch
    ) {
      //TODO set source codes from current url params.
      const anResponse = await submitANForm(
        formState.email,
        validPostcode.current,
        constituency,
        process.env.NEXT_PUBLIC_AN_POSTCODE_FORM || "",
        ["stop the tories", "movement forward", "election reminders", "join"],
        "", // source codes,
      );

      if (anResponse.ok) {
        window.localStorage.setItem("fwd-subscribed", Date.now().toString());
        router.push(`/constituencies/${constituency.slug}`);
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

    // // no postcode or invalid postcode or constituency/address not selected
    // if (
    //   !validPostcode.current ||
    //   !apiResponse ||
    //   !apiResponse.constituencies ||
    //   apiResponse.constituencies.length == 0
    // ) {
    //   // User hasn't input anything or invalid postcode
    //   setPostError("POSTCODE_INVALID");
    //   return;
    // }

    // //not selected constituency or address
    // if (
    //   apiResponse.constituencies.length > 1 &&
    //   formState.constituencyIndex === false
    // ) {
    //   setPostError("UNCLEAR_CONSTITUENCY");
    // }
  };

  return (
    <Container
      className="rounded-3 bg-pink-strong p-3 shadow text-100"
      style={{ fontSize: "18px" }}
    >
      <Form ref={formRef} action={submitForm} noValidate>
        <h3 className="fw-bolder">Vote the Tories out</h3>
        <p className="fw-bold text-900">
          Vote tactically at the General Election
        </p>

        {/* Renders the postcode box, makes API calls, and if necessary shows an address/constituency picker */}
        <ConstituencyLookup
          validPostcode={validPostcode}
          constituency={constituency}
          setConstituency={setConstituency}
          loading={constituencyApiLoading}
          setLoading={setConstituencyApiLoading}
        />

        {subscribed ? (
          <div className="my-3"></div>
        ) : (
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
                <InputGroup hasValidation>
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
                    className="my-2 invalid-text-greyed"
                  />
                  <Form.Control.Feedback
                    className="fw-bold fst-italic px-2 pt-0 mt-0 mb-2 text-white"
                    type="invalid"
                  >
                    {emailError ? emailErrorMessage(emailError) : ""}
                  </Form.Control.Feedback>
                </InputGroup>
                <p style={{ fontSize: "0.75em" }}>
                  We store your email address, postcode, and constituency, so we
                  can send you exactly the information you need, and the actions
                  to take.
                </p>
              </>
            )}
          </div>
        )}

        <Row className="d-flex justify-content-between my-3">
          <Col xs={4} className="d-grid">
            <Button
              variant="light"
              size="lg"
              type="submit"
              disabled={!constituency}
              aria-disabled={!constituency}
            >
              {constituencyApiLoading && (
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
    </Container>
  );
};

export default ConstituencyFormWithSignup;
