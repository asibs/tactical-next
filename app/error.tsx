"use client" // Error components must be Client Components

import Link from "next/link";

import { useEffect } from "react"

import { Button, Col, Container, Row } from "react-bootstrap";

import Header from "@/components/Header";
import { FaArrowRotateRight } from "react-icons/fa6";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <>
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
    </>
  )
}