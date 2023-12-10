import React from "react";

import festivalCrowsBackground from "../assets/header-crowd-background-bw.jpg";
import { Container, Row, Col } from "react-bootstrap";

interface Props {
  backgroundImage: string;
  children: React.ReactNode;
}

const imageUrl = (backgroundImage: string) => {
  /* The values of backgroundImage should match the possible values of
   * the `page_title_background` field in the generated Storyblok types
   * (/storyblok/types/storyblok-types.d.ts).
   */
  switch (backgroundImage) {
    case "FESTIVAL_CROWD":
      return festivalCrowsBackground.src;
    default:
      return "";
  }
};

export default function Header({ backgroundImage, children }: Props) {
  const image = imageUrl(backgroundImage);
  const headerStyle = image
    ? {
        background: `var(--bs-black) url(${image}) center / cover no-repeat`,
      }
    : {};

  return (
    <header className="bg-black" style={headerStyle}>
      <Container fluid className="py-4 py-md-5">
        <Row>
          <Col
            xs={12}
            md={8}
            className="offset-0 offset-md-2 d-md-flex align-items-md-center"
          >
            <div>{children}</div>
          </Col>
        </Row>
      </Container>
    </header>
  );
}
