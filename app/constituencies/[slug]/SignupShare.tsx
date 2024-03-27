"use client";

import {
  Form,
  Button,
  ButtonGroup,
  Spinner,
  InputGroup,
} from "react-bootstrap";

import {
  FaShare,
  FaPuzzlePiece,
  FaCopy,
  FaHandHoldingHeart,
} from "react-icons/fa6";
import { submitANForm } from "@/utils/AnApiSubmission";
import { rubik } from "@/utils/Fonts";
import { useRef, useState, useEffect } from "react";
import ConstituencyLookup from "@/components/forms/constituencyLookup";

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

// Variables used to track state of the ConstituencyLookup components

export default function SignupShare({
  constituencyData,
}: {
  constituencyData: ConstituencyData;
}) {
  const [subscribed, setSubscribed] = useState<string | null | false>(false);
  const [formState, setFormState] = useState<FormData>(initialFormState);
  const [emailError, setEmailError] = useState<EmailErrorCode | null>(null);
  const validPostcode = useRef("");
  const [constituency, setConstituency] = useState<Constituency | null>(null);
  const [constituencyApiLoading, setConstituencyApiLoading] = useState(false);

  // Variables used to track state of the email opt-in components
  const formRef = useRef<HTMLFormElement | null>(null);

  // Track whether the user is already subscribed via localStorage
  useEffect(() => {
    //string = subscription Date.now()
    //null = not subscribed on client
    //false = on server
    setSubscribed(window.localStorage.getItem("fwd-subscribed"));
  }, []);

  const submitForm = async () => {
    if (
      constituency &&
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
        setSubscribed("Subscribed");
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

  if (!subscribed) {
    return (
      <Form
        className="form-search"
        ref={formRef}
        action={submitForm}
        noValidate
      >
        <h2>Join UP</h2>
        <p className="fs-4">
Proving how many of us are voting tactically gives us power after the election.

        </p>
        {/* Renders the postcode box, makes API calls, and if necessary shows an address/constituency picker */}
        <ConstituencyLookup
          validPostcode={validPostcode}
          constituency={constituency}
          setConstituency={setConstituency}
          loading={constituencyApiLoading}
          setLoading={setConstituencyApiLoading}
          filterConstituencySlug={constituencyData.constituencyIdentifiers.slug}
        />

        <div className="my-3">
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
                {emailError ? emailErrorMessage(emailError) : ""}
              </Form.Control.Feedback>
            </InputGroup>
            <p className="small">
              You&apos;re opting in to receive emails. We store your email
              address, postcode, and constituency, so we can send you exactly
              the information you need.
            </p>
          </>
        </div>

        <div className="d-flex justify-content-between mt-3">
          <Button
            variant="light"
            size="lg"
            type="submit"
            disabled={!constituency}
            aria-disabled={!constituency}
            style={{ width: "66%" }}
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
            <span className={`${rubik.className} fw-bold`}>Join</span>
          </Button>
          <a
            href="https://themovementforward.com/privacy/"
            target="_blank"
            rel="noreferrer"
            className="btn btn-link btn-sm"
            role="button"
          >
            <span className={`${rubik.className} fw-bold`}>Privacy Policy</span>
          </a>
        </div>
      </Form>
    );
  } else {
    return (
      <div className="form-search">
        <h3>Grow this movement</h3>
        <p>You&apos;re in! Now let&apos;s build our numbers</p>
        <ButtonGroup size="lg" vertical className="w-100 mb-0">
          {/* TODO share link */}
          <Button href="#" variant="light">
            <FaShare /> Share with friends &amp; family
          </Button>
          <Button
            variant="light"
            onClick={() =>
              window.navigator.clipboard.writeText(window.location.href)
            }
          >
            <FaCopy />
            Copy link to this page
          </Button>
          <Button
            href="https://themovementforward.com/volunteer/"
            variant="light"
          >
            <FaPuzzlePiece /> Volunteer
          </Button>

          <Button href="/donate" variant="light">
            <FaHandHoldingHeart /> Support our crowdfunder
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}
