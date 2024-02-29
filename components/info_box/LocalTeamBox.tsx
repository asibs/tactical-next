"use client";

import InfoBox from "./InfoBox";
import { rubik } from "@/utils/Fonts";
import { Button, Form, FormControl } from "react-bootstrap";

import { FaUsers } from "react-icons/fa6";
import { useState, useEffect } from "react";

const LocalTeamBox = () => {
  const [subscribed, setSubscribed] = useState<string | null>(null);

  useEffect(() => {
    setSubscribed(window?.localStorage.getItem("Subscribed"));
  }, []);

  const submitAnForm = async (evt: Event) => {
    console.log(evt);
    evt.preventDefault();
  };

  if (subscribed) {
    return (
      <InfoBox>
        <>
          <h3 className={`${rubik.className} fs-5`}>Your Constituency Team</h3>
          <p>
            People in your local Movement Forward community are coming together
            to use their voting power.
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
    );
  } else {
    return (
      <InfoBox>
        <>
          <h3 className={`${rubik.className} fs-5`}>Your Constituency Team</h3>
          <p>
            GIVE US YOUR EMAIL ADDRESS SO WE CAN TRY TO TAKE OVER THE WORLD!!!!
          </p>
          <Form onSubmit={(evt) => submitAnForm(evt)}>
            <FormControl type="email"></FormControl>
            <Button variant="light" size="lg" type="submit">
              <FaUsers className="me-2" />
              <span className={`${rubik.className} fw-bold`}>
                Join and get involved
              </span>
            </Button>
          </Form>
        </>
      </InfoBox>
    );
  }
};

export default LocalTeamBox;
