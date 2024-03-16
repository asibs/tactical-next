"use client"; // Error components must be Client Components

import Link from "next/link";

import { useEffect } from "react";

import { Button, Col, Container, Row } from "react-bootstrap";

import Header from "@/components/Header";
import { FaArrowRotateRight } from "react-icons/fa6";
import Navigation from "@/components/navigation/Navigation";
import { rubik } from "@/utils/Fonts";

// Global fallback error boundary. See:
// https://nextjs.org/docs/app/building-your-application/routing/error-handling#handling-errors-in-root-layouts
//
// No layout is rendered in this view, so we need to render everything from scratch.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html lang="en" className={rubik.variable}>
      <body>
        <Navigation />

        <Header backgroundImage="NONE">
          <Container className="py-4 py-md-6">
            <h2>Oops, something went wrong</h2>
          </Container>
        </Header>

        <main>
          <section className="section-light">
            <Container className="pb-5">
              <Row>
                <Col>
                  <Button
                    variant="dark"
                    className="fw-bolder"
                    onClick={
                      // Attempt to recover by trying to re-render the segment
                      () => reset()
                    }
                  >
                    <FaArrowRotateRight /> Try Again
                  </Button>

                  <h4>
                    <Link href="/">Go to the Stop The Tories homepage</Link>
                  </h4>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
      </body>
    </html>
  );
}
