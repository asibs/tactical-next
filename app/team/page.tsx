import Image, { StaticImageData } from "next/image";

import React from "react";

import { Col, Container, Row } from "react-bootstrap";

import Header from "@/components/Header";

import josh from "@/assets/team_portraits/josh.webp";
import andrew from "@/assets/team_portraits/andrew.webp";
import james from "@/assets/team_portraits/james.webp";
import jon from "@/assets/team_portraits/jon.webp";

function TeamMember({
  children,
  imgSrc,
  imgAlt,
  align,
}: {
  children: React.ReactNode;
  imgSrc: StaticImageData;
  imgAlt: string;
  align: "left" | "right";
}) {
  const image = (
    <Image
      src={imgSrc}
      alt={imgAlt}
      sizes="100%"
      style={{
        position: "relative",
        height: "100%",
        width: "100%",
        objectFit: "contain",
        borderRadius: "50%",
      }}
      placeholder="blur"
    />
  );

  if (align == "left") {
    return (
      <Row className="pb-5 align-items-start align-items-md-center">
        <Col xs={4} md={3} lg={2}>
          {image}
        </Col>
        <Col className="text-start">{children}</Col>
      </Row>
    );
  } else {
    return (
      <Row className="pb-5 align-items-start align-items-md-center">
        <Col className="text-end">{children}</Col>
        <Col xs={4} md={3} lg={2}>
          {image}
        </Col>
      </Row>
    );
  }
}

export default function TeamPage() {
  return (
    <>
      <Header backgroundImage="NONE">
        <Container className="py-4 py-md-6">
          <h1>Team</h1>
        </Container>
      </Header>

      <main>
        <section className="section-light">
          <Container>
            <TeamMember
              imgSrc={josh}
              imgAlt="Photo of Josh Russel"
              align="left"
            >
              <h3>
                <a
                  href="https://twitter.com/JoshFwd"
                  target="_blank"
                  rel="noreferrer"
                >
                  Josh Russell
                </a>
              </h3>
              <p>TODO</p>
            </TeamMember>

            <TeamMember
              imgSrc={andrew}
              imgAlt="Photo of Andrew Sibley"
              align="right"
            >
              <h3>Andrew Sibley</h3>
              <p>
                A software engineer with experience building tech for political
                & social campaigning.
                <br />
                Andrew has voted for all the major progressive parties in
                England at one point or another.
              </p>
            </TeamMember>

            <TeamMember
              imgSrc={james}
              imgAlt="Photo of James Southern"
              align="left"
            >
              <h3>
                <a
                  href="https://twitter.com/Super_James"
                  target="_blank"
                  rel="noreferrer"
                >
                  James Southern
                </a>
              </h3>
              <p>
                Recently head of strategy at the{" "}
                <a
                  href="https://makevotesmatter.org.uk/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Make Votes Matter
                </a>{" "}
                campaign for electoral reform.
                <br />A keen sea kayaker, James has a background in software
                development from fin-tech to museum exhibits.
              </p>
            </TeamMember>

            <TeamMember imgSrc={jon} imgAlt="Photo of Jon Morter" align="right">
              <h3>
                <a
                  href="https://twitter.com/jonmorter"
                  target="_blank"
                  rel="noreferrer"
                >
                  Jon Morter
                </a>
              </h3>
              <p>
                Dubbed a &quot;social media hellraiser&quot; by the New York
                Times, beat the X Factor to No.1... twice, and worked with The
                Rolling Stones.
                <br />
                Jon is a huge advocate of tactical voting due to living in one
                of the safest Tory seats in the country.
              </p>
            </TeamMember>
          </Container>
        </section>
      </main>
    </>
  );
}
