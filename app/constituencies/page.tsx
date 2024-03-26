import { Col, Container, Row } from "react-bootstrap";
import Link from "next/link";
import Header from "@/components/Header";
import { partyColorFromSlug, partyNameFromSlug } from "@/utils/Party";
import {
  getConstituenciesData,
  majority,
  sortOnMajority,
} from "@/utils/constituencyData";

export default async function ConstituencySummaryPage() {
  // Get all constituencies EXCEPT those where we're explicitly making no recommendation (NI & Speaker)
  const constituenciesData: ConstituencyData[] = (
    await getConstituenciesData()
  ).filter((c: ConstituencyData) => c.recommendation.partySlug !== "None");

  const torySeats = constituenciesData.filter(
    (c) => c.impliedPreviousResult.winningParty === "Con",
  );
  const torySeatsProgressiveAhead = sortOnMajority(
    torySeats.filter(
      (c) =>
        c.recommendation.partySlug && c.pollingResults.winningParty !== "Con",
    ),
  );
  const torySeatsProgressiveBehind = sortOnMajority(
    torySeats.filter(
      (c) =>
        c.recommendation.partySlug && c.pollingResults.winningParty === "Con",
    ),
  );
  const torySeatsNoRecommendation = sortOnMajority(
    torySeats.filter((c) => !c.recommendation.partySlug),
  );

  const nonTorySeats = constituenciesData.filter(
    (c) => c.impliedPreviousResult.winningParty !== "Con",
  );
  const nonTorySeatsToryCanWin = sortOnMajority(
    nonTorySeats.filter((c) => !c.otherVoteData.conservativeWinUnlikely),
  );
  const nonTorySeatsToryCantWin = sortOnMajority(
    nonTorySeats.filter((c) => c.otherVoteData.conservativeWinUnlikely),
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
            {/* 2019 TORY SEATS WITH SLIM MAJORITIES */}
            <Row className="pb-4">
              <Col>
                <h3>Target Tory Seats</h3>
                <p className="mb-2">
                  There are {torySeatsProgressiveAhead.length} Tory
                  Constituencies* that we have a great chance of taking back!
                </p>
                <p className="fst-italic">
                  * Based on converting 2019 voting patterns to new constituency
                  boundaries
                </p>
              </Col>
            </Row>
            <Row className="pb-5">
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

                  {torySeatsProgressiveAhead.map((c) => (
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

            {/* 2019 TORY SEATS WITH BIG MAJORITIES */}
            <Row className="pb-4">
              <Col>
                <h3>Tough Tory Seats</h3>
                <p className="mb-2">
                  There are {torySeatsProgressiveBehind.length} Tory
                  Constituencies* that we need to work even harder to take back!
                </p>
                <p className="fst-italic">
                  * Based on converting 2019 voting patterns to new constituency
                  boundaries
                </p>
              </Col>
            </Row>
            <Row className="pb-5">
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

                  {torySeatsProgressiveBehind.map((c) => (
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

            {/* 2019 TORY SEATS WITH NO RECOMMENDATION YET */}
            <Row className="pb-4">
              <Col>
                <h3>Check Back Later</h3>
                <p className="mb-2">
                  There are {torySeatsNoRecommendation.length} Tory
                  Constituencies* where we&apos;re still working out the
                  tactical vote...
                </p>
                <p className="fst-italic">
                  * Based on converting 2019 voting patterns to new constituency
                  boundaries
                </p>
              </Col>
            </Row>
            <Row className="pb-5">
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

                  {torySeatsNoRecommendation.map((c) => (
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
            {/* NON-TORY SEATS, CAN BE WON BY A TORY */}
            <Row className="pb-3">
              <Col>
                <h3>At Risk Non-Tory Seats</h3>
                <p className="mb-2">
                  There are {nonTorySeatsToryCanWin.length} non-Tory
                  Constituencies* where we need to vote tactically to make sure
                  the Tories don&apos;t win!
                </p>
                <p className="fst-italic">
                  * Based on converting 2019 voting patterns to new constituency
                  boundaries
                </p>
              </Col>
            </Row>
            <Row xs={2} md={3} lg={4} xl={5} xxl={6} className="pb-5 g-1">
              {nonTorySeatsToryCanWin.map((c) => (
                <Col key={c.constituencyIdentifiers.slug}>
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
                      {c.constituencyIdentifiers.name}
                    </span>
                  </Link>
                </Col>
              ))}
            </Row>

            {/* NON-TORY SEATS, CAN'T BE WON BY A TORY */}
            <Row className="pb-3">
              <Col>
                <h3>Safe Non-Tory Seats</h3>
                <p className="mb-2">
                  There are {nonTorySeatsToryCantWin.length} non-Tory
                  Constituencies* where you can safely vote with your heart
                </p>
                <p className="fst-italic">
                  * Based on converting 2019 voting patterns to new constituency
                  boundaries
                </p>
              </Col>
            </Row>
            <Row xs={2} md={3} lg={4} xl={5} xxl={6} className="pb-5 g-1">
              {nonTorySeatsToryCantWin.map((c) => (
                <Col key={c.constituencyIdentifiers.slug}>
                  <Link
                    href={`/constituencies/${c.constituencyIdentifiers.slug}`}
                  >
                    <span
                      className="badge rounded-pill w-100 h-100 text-wrap align-middle"
                      style={{
                        backgroundColor: partyColorFromSlug(
                          c.impliedPreviousResult.winningParty,
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
