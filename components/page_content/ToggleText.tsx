"use client";
// ToggleText needs to be a client component - it's interactive

import { ToggleTextStoryblok } from "@/storyblok/types/storyblok-types";
import { storyblokEditable } from "@storyblok/react/rsc";
import { render } from "storyblok-rich-text-react-renderer";
import { useState } from "react";
import { Col, Collapse, Container, Row } from "react-bootstrap";
import { FaCircleChevronRight } from "react-icons/fa6";

import { rubik } from "@/utils/Fonts";

const ToggleText = ({ blok }: { blok: ToggleTextStoryblok }) => {
  const [visible, setVisible] = useState(blok.text_shown_initially);

  return (
    <div {...storyblokEditable(blok)} className="my-4">
      <Container>
        <Row>
          <Col xs="auto" className="g-0">
            <FaCircleChevronRight
              onClick={() => setVisible(!visible)}
              aria-controls={`collapse-${blok._uid}`}
              aria-expanded={visible}
              className="fs-2"
              style={{
                transition: "transform 0.3s ease 0s",
                transform: `rotate(${visible ? 90 : 0}deg)`,
                cursor: "pointer",
              }}
            />
          </Col>
          <Col>
            <Row
              onClick={() => setVisible(!visible)}
              aria-controls={`collapse-${blok._uid}`}
              aria-expanded={visible}
              style={{ cursor: "pointer" }}
            >
              <h2 className={rubik.className}>{blok.title}</h2>
            </Row>
            <Row>
              <Collapse in={visible}>
                <div id={`collapse-${blok._uid}`}>{render(blok.text)}</div>
              </Collapse>
            </Row>
          </Col>
        </Row>
      </Container>

      {/*
      <div
        onClick={() => setVisible(!visible)}
        aria-controls={`collapse-${blok._uid}`}
        aria-expanded={visible}
        className="align-middle"
        style={{ cursor: "pointer" }}
      >
        <h2 className={`${rubik.className}`} style={{ fontWeight: "bold" }}>
          <FaCircleChevronRight
            style={{
              transition: "transform 0.3s ease 0s",
              transform: `rotate(${visible ? 90 : 0}deg)`,
            }}
            className="pb-1"
          />{" "}
          {blok.title}
        </h2>
      </div>

      <Collapse in={visible}>
        <div id={`collapse-${blok._uid}`} className="ms-5">{render(blok.text)}</div>
      </Collapse>
      */}
    </div>
  );
};

{
  /*
const ToggleText = ({ blok }: { blok: ToggleTextStoryblok }) => {
  const [visible, setVisible] = useState(blok.text_shown_initially);

  return (
    <div {...storyblokEditable(blok)}>
      <h1
        className={`${rubik.className} text-100`}
        style={{ fontWeight: "bold" }}
        onClick={() => setVisible(!visible)}
      >
        {blok.title}
      </h1>
      <Collapse in={visible}>
        {render(blok.text)}
      </Collapse>
    </div>
  );
};
*/
}

export default ToggleText;
