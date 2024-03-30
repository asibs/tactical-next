import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Header from "@/components/Header";
import ActionNetworkSubscriptionForm from "@/components/ActionNetworkSubscriptionForm";
import SignupForm from "@/components/forms/SignupForm";

export function generateStaticParams() {
  return [{ version: "0" }, { version: "1" }];
}

export default function Donate({ params }: { params: { version: string } }) {
  return (
    <>
      <Header backgroundImage="NONE">
        <Container className="py-4 py-md-6">
          <h1>Join the movement</h1>
        </Container>
      </Header>

      <main>
        <section className="section-light">
          <Container>
            <Row>
              <Col
                xs={12}
                md={{ span: 8, offset: 2 }}
                xxl={{ span: 6, offset: 3 }}
              >
                <SignupForm />
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </>
  );
}
