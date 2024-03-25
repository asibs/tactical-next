"use client";
// ToggleText needs to be a client component - it's interactive

import { useState } from "react";
import { Col, Collapse, Container, Row } from "react-bootstrap";
import { FaCircleChevronRight } from "react-icons/fa6";

const ToggleText = ({
  id,
  title,
  content,
  textShownInitially = false,
  chevronSize = "fs-2",
}: {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
  textShownInitially?: boolean;
  chevronSize?: string;
}) => {
  const [visible, setVisible] = useState(textShownInitially);

  return (
    <Container className="my-4">
      <Row>
        <Col xs="auto" className="g-0">
          <FaCircleChevronRight
            onClick={() => setVisible(!visible)}
            aria-controls={`collapse-${id}`}
            aria-expanded={visible}
            className={chevronSize}
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
            aria-controls={`collapse-${id}`}
            aria-expanded={visible}
            style={{ cursor: "pointer" }}
          >
            {title}
          </Row>
          <Row>
            <Collapse in={visible}>
              <div id={`collapse-${id}`}>{content}</div>
            </Collapse>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ToggleText;
