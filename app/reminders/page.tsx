import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Header from "@/components/Header";
import ActionNetworkSubscriptionForm from "@/components/ActionNetworkSubscriptionForm";

export default function Donate() {
  return (
    <>
      <Header backgroundImage="NONE">
        <Container className="py-4 py-md-6">
          <h1>Get @MVTFWD reminders</h1>
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
                <h3>We&apos;ll email you what you need, when you need it.</h3>
                <p>
                  Get our newsletter, updates, and the important alerts you need
                  just at the right times.
                </p>

                <ActionNetworkSubscriptionForm />

                <p className="fs-6">
                  <a
                    href="https://themovementforward.com/privacy/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Privacy Policy
                  </a>
                </p>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </>
  );
}
