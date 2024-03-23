"use client";

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

import { submitANForm } from "@/utils/AnApiSubmission";
import { rubik } from "@/utils/Fonts";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import FormCheckLabel from "react-bootstrap/esm/FormCheckLabel";
import { useRef, useState } from "react";
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
  email: string;
  emailOptIn: boolean;
};

const initialFormState: FormData = {
  email: "",
  emailOptIn: false,
};

const SignupForm = () => {
  // TODO: Look into using useFormState in future:
  // https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#server-side-validation-and-error-handling
  // Was hitting into this issue: https://github.com/vercel/next.js/issues/55919

  // Variables used to track state of the email opt-in components
  const [formState, setFormState] = useState<FormData>(initialFormState);
  const [emailError, setEmailError] = useState<EmailErrorCode | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  // Variables used to track state of the ConstituencyLookup components
  const validPostcode = useRef("");
  const [constituency, setConstituency] = useState<Constituency | null>(null);
  const [constituencyApiLoading, setConstituencyApiLoading] = useState(false);

  const submitForm = async () => {
    if (!formState.emailOptIn) {
      // TODO: Set error message - need to opt-in to subscribe
    } else if (
      !formRef.current ||
      formRef.current.email.validity.typeMismatch
    ) {
      // TODO: Set error message - invalid email
    } else if (!constituency) {
      // TODO: Set error message - input email / select constituency
    } else {
      const anResponse = await submitANForm(
        formState.email,
        validPostcode.current,
        constituency,
        process.env.NEXT_PUBLIC_AN_POSTCODE_FORM || "",
        ["stop the tories", "movement forward", "election reminders", "join"],
        "", // TODO: set source codes from current url params
      );

      if (anResponse.ok) {
        window.localStorage.setItem("fwd-subscribed", Date.now().toString());
        // TODO: Show success message
      } else {
        setEmailError("SERVER_ERROR"); // ActionNetwork doesn't give error codes on failure
      }
    }
  };

  return (
    <Container
      className="rounded-3 bg-pink-strong p-3 shadow text-100"
      style={{ fontSize: "18px" }}
    >
      <h3>Stick together and vote for change.</h3>
      <p>
        We&apos;ll email you what you need, when you need it - newsletters,
        updates, and important alerts you need just at the right times.
      </p>
      <Form ref={formRef} action={submitForm} noValidate>
        {/* Email text field */}
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

        {/* Renders the ostcode box, makes API calls, and if necessary shows an address/constituency picker */}
        <ConstituencyLookup
          validPostcode={validPostcode}
          constituency={constituency}
          setConstituency={setConstituency}
          loading={constituencyApiLoading}
          setLoading={setConstituencyApiLoading}
        />

        {/* Email opt-in and T&Cs */}
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
                className="d-inline"
              >
                <strong>Join with your email</strong> to stick together
              </FormCheckLabel>
            </div>
          </FormCheck>

          <p style={{ fontSize: "0.75em" }}>
            We store your email address, postcode, and constituency, so we can
            send you exactly the information you need, and the actions to take.
          </p>
        </div>

        <Row className="d-flex justify-content-between my-3">
          <Col xs={4} className="d-grid">
            <Button
              variant="light"
              size="lg"
              type="submit"
              disabled={constituencyApiLoading}
              aria-disabled={constituencyApiLoading}
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

export default SignupForm;
