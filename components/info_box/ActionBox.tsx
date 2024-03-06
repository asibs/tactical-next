"use client";

import InfoBox from "./InfoBox";
import { rubik } from "@/utils/Fonts";

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

import LocalTeamBox from "./LocalTeamBox";
import { FaUsers } from "react-icons/fa6";
import { submitANForm } from "@/utils/AnApiSubmission";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import FormCheckLabel from "react-bootstrap/esm/FormCheckLabel";
import { useRef, useState, useEffect } from "react";

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

const checkErrorToErrorMessage = (code: "MISSING_CONSENT" | null) => {
  switch (code) {
    case "MISSING_CONSENT":
      return "Please tick the signup box.";
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

const ActionBox = ({
  constituencyData,
}: {
  constituencyData: ConstituencyData;
}) => {
  const [subscribed, setSubscribed] = useState<string | null | false>(false);
  const [formState, setFormState] = useState<FormData>(initialFormState);
  const [emailError, setEmailError] = useState<EmailErrorCode | null>(null);
  const [checkError, setCheckError] = useState<"MISSING_CONSENT" | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    setSubscribed(window.localStorage.getItem("fwd-subscribed"));
  }, []);

  const submitForm = async () => {
    if (
      formState.emailOptIn &&
      formState.email &&
      formRef.current &&
      !formRef.current.email.validity.typeMismatch
    ) {
      //TODO set source codes from current url params.
      const anResponse = await submitANForm(
        formState.email,
        "",
        constituencyData.constituencyIdentifiers,
        process.env.NEXT_PUBLIC_AN_CONSTITUENCY_FORM || "",
        [
          "be counted",
          "stop the tories",
          "movement forward",
          "election reminders",
          "join",
        ],
        "", // source codes,
      );

      if (anResponse.ok) {
        window.localStorage.setItem("fwd-subscribed", Date.now().toString());
      } else {
        setEmailError("SERVER_ERROR"); //AN doesn't give error codes on failure
      }
    }

    // VALIDATION
    // Invalid email
    if (
      !formState.email ||
      (formRef.current && formRef.current.email.validity.typeMismatch)
    ) {
      setEmailError("EMAIL_INVALID");
    }
    if (!formState.emailOptIn) {
      setCheckError("MISSING_CONSENT");
    }
  };

  return (
    <InfoBox>
      <>
        <h3 className="fs-5">Be counted!</h3>
        <p>
          There are <span className="fw-bold">201</span> tactical voters signed
          up so far!
        </p>
        <p>
          We need <span className="fw-bold">3000</span> tactical pledges to stop
          the tories here!
        </p>

        <Form ref={formRef} action={submitForm} noValidate>
          <div className="my-1">
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
                  className="fw-bold fst-italic px-2 pt-0 mt-0 mb-2"
                  type="invalid"
                >
                  {emailError ? emailErrorToErrorMessage(emailError) : ""}
                </Form.Control.Feedback>
              </InputGroup>

              <FormCheck name="emailOptIn">
                <div>
                  <FormCheckInput
                    checked={formState.emailOptIn}
                    isInvalid={checkError !== null}
                    onChange={() => {
                      setFormState({
                        ...formState,
                        emailOptIn: !formState.emailOptIn,
                      });
                      setCheckError(null);
                    }}
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
                  <Form.Control.Feedback
                    className="fw-bold fst-italic px-2 pt-0 mt-0 mb-2"
                    type="invalid"
                  >
                    {checkError ? checkErrorToErrorMessage(checkError) : ""}
                  </Form.Control.Feedback>
                </div>
              </FormCheck>

              <p className="mt-1" style={{ fontSize: "0.75em" }}>
                We store your email and constituency, so we can send you exactly
                the information you need, and the actions to take.
              </p>
            </>
          </div>

          <Row className="d-flex justify-content-between my-3">
            <Col xs={4} className="d-grid">
              <Button variant="light" size="lg" type="submit">
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
      </>
    </InfoBox>
  );

  return (
    <>
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

      {true ? (
        <InfoBox>
          <>
            <h3 className="fs-5">Be counted!</h3>
            <p>
              There are <span className="fw-bold">201</span> tactical voters
              signed up so far!
            </p>
            <p>
              We think it' think it'll take{" "}
              <span className="fw-bold">3000</span> people pledging to vote
              tactically to stop the tories here.
            </p>
            <p>
              <Button variant="light" size="lg">
                <FaUsers className="me-2" />
                <span className={`${rubik.className} fw-bold`}>
                  Join and get involved
                </span>
              </Button>
            </p>
          </>
        </InfoBox>
      ) : (
        <LocalTeamBox />
      )}
    </>
  );
};

export default ActionBox;
