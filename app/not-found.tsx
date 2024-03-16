import Link from "next/link";

import { Col, Container, Row } from "react-bootstrap";

import Header from "@/components/Header";

// Custom 404 page
export default function NotFound() {
  return (
    <>
      <Header backgroundImage="NONE">
        <Container className="py-4 py-md-6">
          <h2>Oops, we couldn&apos;t find that page</h2>
        </Container>
      </Header>

      <main>
        <section className="section-light">
          <Container>
            <Row>
              <Col>
                <h4 className="pb-5">
                  <Link href="/">Go to the Stop The Tories homepage</Link>
                </h4>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </>
  );
}
