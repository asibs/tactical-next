"use client";

import { useRouter } from "next/navigation";

import { Col, Container, Row, Form, Button, FormCheck } from "react-bootstrap";
import { useFormState, useFormStatus } from "react-dom";

import rubik from "@/utils/Fonts";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import FormCheckLabel from "react-bootstrap/esm/FormCheckLabel";
import { useState } from "react";
// import lookupPostcode from "./lookupPostcodeServerAction";

const PostcodeLookup = () => {
  const router = useRouter()

  // const { pending } = useFormStatus()
  // https://github.com/vercel/next.js/issues/55919
  // const [state, formAction] = useFormState<State, FormData>(lookupPostcode, initialFormState)

  const [errorMessage, setErrorMessage] = useState()
  const [postcode, setPostcode] = useState("");
  const [emailOptIn, setEmailOptIn] = useState(false);
  const [constituencies, setConstituencies] = useState<Constituency[]>([]);
  const [constituency, setConstituency] = useState("");
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  const lookupPostcode = async () => {
    // TODO: check postcode looks valid, check email looks valid, etc
    // TODO: Subscribe email via ActionNetwork API once we know their constituency

    // User has selected their constituency from drop-down
    if (constituency) {
      router.push(`/constituencies/${constituency}`);
    }

    // 
    const response = await fetch("/api/postcodes", {
      method: "POST",
      body: JSON.stringify({
        "postcode": postcode,
        "address": address,
      })
    })

    const responseJson = await response.json();
    console.log(responseJson);

    if (responseJson["errorMessage"]) {
      console.log(responseJson["errorMessage"]);
    } else if (responseJson["constituencies"] && responseJson["constituencies"].length == 1) {
      router.push(`/constituencies/${responseJson["constituencies"][0]["slug"]}`);
    } else {
      console.log(responseJson["constituencies"]);
      setConstituencies(responseJson["constituencies"])
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
          name="postcode"
          size="lg"
          type="text"
          placeholder="Your Postcode"
          pattern="^\s*[A-Za-z]{1,2}\d[A-Za-z\d]?\s*\d[A-Za-z]{2}\s*$"
          onChange={(e) => setPostcode(e.target.value)}
        />

        {constituencies.length > 0 && (
          <>
            <p style={{ fontSize: "0.75em" }}>
              Sorry, we can't work out exactly which constituency you're in - please select your constituency.
            </p>
            <Form.Select
              name="constituency"
              size="lg"
              onChange={(e) => setConstituency(e.target.value)}
            >
              <option selected disabled value="" style={{ display: "none" }}>Select Constituency</option>
              {constituencies.map((c) =>
                <option value={c.slug}>{c.name}</option>
              )}
            </Form.Select>
          </>
        )}

        <FormCheck name="emailOptIn">
          <div>
            <FormCheckInput checked={emailOptIn} onChange={() => setEmailOptIn(!emailOptIn)} />
            <FormCheckLabel className="ps-2" onClick={() => setEmailOptIn(!emailOptIn)}>
              <strong>Join with your email</strong> to stick together
            </FormCheckLabel>
          </div>
        </FormCheck>

        <Form.Control
          name="email"
          size="lg"
          type="email"
          placeholder="Your Email"
          onChange={(e) => setEmail(e.target.value)}
          hidden={!emailOptIn}
        />
        <p style={{ fontSize: "0.75em" }} hidden={!emailOptIn}>
          We store your email address, postcode, and constituency, so we can
          send you exactly the information you need, and the actions to
          take.
        </p>

        <Button variant="primary" type="submit" aria-disabled={false}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default PostcodeLookup;