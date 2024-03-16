import Image from "next/image";

import { Col, Container, Row } from "react-bootstrap";

import Header from "@/components/Header";

import josh from "@/assets/team_portraits/josh.webp";
import andrew from "@/assets/team_portraits/andrew.webp";

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
            <Row className="pb-5 align-items-start align-items-md-center">
              <Col xs={4} md={3} lg={2}>
                <Image
                  src={josh}
                  alt="Photo of Josh Russell"
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
              </Col>
              <Col>
                <h3>Josh Russell</h3>
                <p>
                  Our Lord & saviour.
                </p>
              </Col>
            </Row>

            <Row className="pb-5 align-items-start align-items-md-center">
              <Col className="text-end">
                <h3>Andrew Sibley</h3>
                <p>
                  Software developer with experience building tech for political & social campaigning.
                  <br />
                  Has voted for all the major progressive parties in England at one point or another.
                </p>
              </Col>
              <Col xs={4} md={3} lg={2}>
                <Image
                  src={andrew}
                  alt="Photo of Andrew Sibley"
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
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </>
  );
}
