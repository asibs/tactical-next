"use client";
// ToggleText needs to be a client component - it's interactive

import { ToggleTextStoryblok } from "@/storyblok/types/storyblok-types";
import { storyblokEditable } from "@storyblok/react/rsc";
import { render } from "storyblok-rich-text-react-renderer";
import { useState } from "react";
import { Col, Collapse, Container, Row } from "react-bootstrap";
import { FaCircleChevronRight } from "react-icons/fa6";

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
              <h2>{blok.title}</h2>
            </Row>
            <Row>
              <Collapse in={visible}>
                <div id={`collapse-${blok._uid}`}>{render(blok.text)}</div>
              </Collapse>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ToggleText;
