"use client"; // Error components must be Client Components

import Link from "next/link";

import { useEffect } from "react";

import { Button, Col, Container, Row } from "react-bootstrap";

import { FaArrowRotateRight } from "react-icons/fa6";
import { rubik } from "@/utils/Fonts";

// Global fallback error boundary. See:
// https://nextjs.org/docs/app/building-your-application/routing/error-handling#handling-errors-in-root-layouts
//
// No layout is rendered in this view, so we need to render everything from scratch.
//
// If we've hit this global fallback, rather than the root error.tsx, it probably means
// something is wrong with one of our common components used in the root layout (navbar,
// footer, etc), so probably safest NOT to render any of these...!
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
        <header className="bg-black text-white">
          <Container className="py-4 py-md-6">
            <h2>Oops, something went wrong</h2>
          </Container>
        </header>

        <main>
          <section className="section-light">
            <Container className="pb-5">
              <Row className="pb-5">
                <Col>
                  <Button
                    variant="dark"
                    className="fw-bolder"
                    onClick={
                      // Attempt to recover by trying to re-render the segment
                      () => reset()
                    }
                  >
                    <FaArrowRotateRight className="me-2" />
                    Try Again
                  </Button>
                </Col>
              </Row>

              <Row>
                <Col>
                  <h4>
                    <Link href="/">Back to Stop The Tories homepage</Link>
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
