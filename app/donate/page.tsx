"use client";

import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Col, Container, Row } from "react-bootstrap";
import Header from "@/components/Header";
import { rubik } from "@/utils/Fonts";

export default function Donate() {
  const url = "https://www.crowdfunder.co.uk/p/stopthetories"

  const router = useRouter()

  useEffect(() => {
    setTimeout(() => router.push(url), 2000);
  }, [router])

  return (
    <>
      <Header backgroundImage="FESTIVAL_CROWD">
        <Container className="py-4 py-md-6">
          <h1 className={rubik.className}>
            Donate
          </h1>
        </Container>
      </Header>

      <main>
        <section className="section-light">
          <Container>
            <Row>
              <Col>
                <h4 className="pb-5">Redirecting you to our crowdfunder page</h4>
                <p>
                  <a href={url} target="_blank" rel="noreferrer">
                    Please click here if you&apos;re not redirected automatically after 3 seconds
                  </a>
                </p>
                <p><a href={url} target="_blank" rel="noreferrer">{url}</a></p>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </>
  );
}
