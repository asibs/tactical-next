"use client";

import { Col, Container, Row, Form, Button, FormCheck } from "react-bootstrap";
import { useFormState, useFormStatus } from "react-dom";

import rubik from "@/utils/Fonts";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import FormCheckLabel from "react-bootstrap/esm/FormCheckLabel";
import { useState } from "react";
import { redirect } from "next/navigation";
// import lookupPostcode from "./lookupPostcodeServerAction";

const PostcodeLookup = () => {
  // const { pending } = useFormStatus()
  // https://github.com/vercel/next.js/issues/55919
  // const [state, formAction] = useFormState<State, FormData>(lookupPostcode, initialFormState)

  const [postcode, setPostcode] = useState("");
  const [emailOptIn, setEmailOptIn] = useState(false);
  const [email, setEmail] = useState("");

  const lookupPostcode = async () => {
    // TODO: check postcode looks valid, check email looks valid, etc
    const response = await fetch("/api/postcodes", {
      method: "POST",
      body: `{"postcode": "${postcode}"}`
    })

    const responseJson = await response.json();
    console.log(responseJson);

    if (responseJson["errorMessage"]) {
      console.log(responseJson["errorMessage"]);
    } else if (responseJson["constituencies"] && responseJson["constituencies"].length == 1) {
      redirect(`/constituencies/${responseJson["constituencies"][0]["slug"]}`);
    } else {
      console.log(responseJson["constituencies"]);
    }
  }

  return (
    <Container
      className="rounded-3 bg-pink-strong p-3 mb-4 shadow text-100"
      style={{ fontSize: "18px" }}
    >
      <Form action={lookupPostcode}>
        <h3 className={`${rubik.className} fw-bolder`}>VOTE THE TORIES OUT</h3>
        <p className="fw-bold text-900">
          Vote tactically at the General Election
        </p>

        <Form.Control
          id="postcode"
          name="postcode"
          size="lg"
          type="text"
          placeholder="Your Postcode"
          onChange={(e) => setPostcode(e.target.value)}
        />

        {/* TODO: Show constituency/address drop-down if more than one possibility */}

        <FormCheck id="email-opt-in">
          <div onChange={() => setEmailOptIn(!emailOptIn)}>
            <FormCheckInput checked={emailOptIn} />
            <FormCheckLabel className="ps-2">
              <strong>Join with your email</strong> to stick together
            </FormCheckLabel>
          </div>
        </FormCheck>

        {emailOptIn && (
          <>
            <Form.Control
              id="email"
              name="email"
              size="lg"
              type="text"
              placeholder="Your Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <p style={{ fontSize: "0.75em" }}>
              We store your email address, postcode, and constituency, so we can
              send you exactly the information you need, and the actions to
              take.
            </p>
          </>
        )}

        <Button variant="primary" type="submit" aria-disabled={false}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default PostcodeLookup;