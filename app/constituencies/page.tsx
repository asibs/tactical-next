import { Col, Container, Row } from "react-bootstrap";
import Link from "next/link";
import Header from "@/components/Header";
import { partyColorFromSlug, partyNameFromSlug } from "@/utils/Party";
import { getConstituencyData, majority } from "@/utils/constituencyData";

export default async function ConstituencySummaryPage() {
  const constituenciesData: ConstituencyData[] = await getConstituencyData();
  const torySeats = constituenciesData
    .filter(
      (c: ConstituencyData) => c.impliedPreviousResult.winningParty === "Con",
    )
    .sort(
      (a, b) =>
        majority(a.impliedPreviousResult) - majority(b.impliedPreviousResult),
    );

  const nonTorySeats = constituenciesData
    .filter(
      (c: ConstituencyData) => c.impliedPreviousResult.winningParty !== "Con",
    )
    .sort(
      (a, b) =>
        majority(a.impliedPreviousResult) - majority(b.impliedPreviousResult),
    );

  return (
    <>
      <Header backgroundImage="FESTIVAL_CROWD">
        <Container className="py-4 py-md-6">
          <h1>Constituencies</h1>
          <h2>Together, we&apos;ll make sure there are no Safe Tory seats</h2>
        </Container>
      </Header>

      <main>
        <section className="section-light">
          <Container>
            <Row className="pb-4">
              <Col>
                <h3>Current Tory Seats</h3>
                <p className="fst-italic">
                  Based on converting 2019 voting patterns to new constituency
                  boundaries
                </p>
              </Col>
            </Row>

            <Row>
              <Col
                xs={12}
                lg={{ offset: 1, span: 10 }}
                xl={{ offset: 2, span: 8 }}
              >
                <Container className="text-center">
                  <Row xs={2}>
                    <Col>
                      <h5>We could turn this...</h5>
                    </Col>
                    <Col>
                      <h5>Into this...</h5>
                    </Col>
                  </Row>

                  {torySeats.map((c) => (
                    <Row
                      xs={2}
                      className="pb-1"
                      key={c.constituencyIdentifiers.slug}
                    >
                      <Col>
                        <Link
                          href={`/constituencies/${c.constituencyIdentifiers.slug}`}
                        >
                          <span
                            className="badge rounded-pill w-100 h-100 text-wrap align-middle"
                            style={{
                              backgroundColor: partyColorFromSlug("Con"),
                            }}
                          >
                            {c.constituencyIdentifiers.name}
                          </span>
                        </Link>
                      </Col>
                      <Col>
                        <Link
                          href={`/constituencies/${c.constituencyIdentifiers.slug}`}
                        >
                          <span
                            className="badge rounded-pill w-100 h-100 text-wrap align-middle"
                            style={{
                              backgroundColor: partyColorFromSlug(
                                c.recommendation.partySlug,
                              ),
                            }}
                          >
                            {c.recommendation.partySlug
                              ? partyNameFromSlug(c.recommendation.partySlug)
                              : "TBC"}
                          </span>
                        </Link>
                      </Col>
                    </Row>
                  ))}
                </Container>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="section-light">
          <Container>
            <Row className="pb-4">
              <Col>
                <h3>Non-Tory Seats</h3>
                <p className="fst-italic">
                  Based on converting 2019 voting patterns to new constituency
                  boundaries
                </p>
              </Col>
            </Row>

            <Row>
              <h5>Let&apos;s keep them out of Tory hands</h5>
            </Row>

            <Row xs={2} md={3} lg={4} xl={5} xxl={6} className="g-1">
              {nonTorySeats.map((c) => (
                <Col key={c.constituencyIdentifiers.slug}>
                  <Link
                    href={`/constituencies/${c.constituencyIdentifiers.slug}`}
                  >
                    <span
                      className="badge rounded-pill w-100 h-100 text-wrap align-middle"
                      style={{
                        backgroundColor: partyColorFromSlug(
                          c.impliedPreviousResult.biggestProgressiveParty,
                        ),
                      }}
                    >
                      {c.constituencyIdentifiers.name}
                    </span>
                  </Link>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      </main>
    </>
  );
}
