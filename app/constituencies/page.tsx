import { Col, Container, Row } from "react-bootstrap";
import Link from "next/link";
import Header from "@/components/Header";
import { partyColorFromSlug, partyNameFromSlug } from "@/utils/Party";
import {
  getConstituenciesData,
  nonTorySeatsSafe,
  nonTorySeatsUnsafe,
  torySeatsNoRecommendation,
  torySeatsProgressiveAhead,
  torySeatsProgressiveBehind,
} from "@/utils/constituencyData";

export default async function ConstituencySummaryPage() {
  // Get all constituencies EXCEPT those where we're explicitly making no recommendation (NI & Speaker)
  const constituenciesData: ConstituencyData[] = (
    await getConstituenciesData()
  ).filter((c: ConstituencyData) => c.recommendation.partySlug !== "None");

  const torySeatsProgressiveAheadCount = torySeatsProgressiveAhead(constituenciesData).length;
  const torySeatsProgressiveBehindCount = torySeatsProgressiveBehind(constituenciesData).length;
  const torySeatsNoRecommendationCount = torySeatsNoRecommendation(constituenciesData).length;
  const nonTorySeatsUnsafeCount = nonTorySeatsUnsafe(constituenciesData).length;
  const nonTorySeatsTorySafeCount = nonTorySeatsSafe(constituenciesData).length;

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
            <Row className="pb-3">
              <Col>
                <h3><Link href="/constituencies/target-tory-seats">Target Tory Seats</Link></h3>
                <p className="mb-2">
                  There are {torySeatsProgressiveAheadCount} Tory
                  Constituencies* that we have a great chance of taking back!
                  <br />
                  <Link href="/constituencies/target-tory-seats">See them all here.</Link>
                </p>
              </Col>
            </Row>

            <Row className="pb-3">
              <Col>
                <h3><Link href="/constituencies/tough-tory-seats">Tough Tory Seats</Link></h3>
                <p className="mb-2">
                  There are {torySeatsProgressiveBehindCount} Tory
                  Constituencies* that we need to work even harder to take back!
                  <br />
                  <Link href="/constituencies/tough-tory-seats">See them all here.</Link>
                </p>
              </Col>
            </Row>

            <Row className="pb-3">
              <Col>
                <h3><Link href="/constituencies/tory-seats-still-calculating">Tory Seats we&apos;re still working on</Link></h3>
                <p className="mb-2">
                  There are {torySeatsNoRecommendationCount} Tory
                  Constituencies* where we&apos;re still working out the
                  tactical vote...
                  <br />
                  <Link href="/constituencies/tory-seats-still-calculating">See them all here.</Link>
                </p>
              </Col>
            </Row>

            <Row className="pb-3">
              <Col>
                <h3><Link href="/constituencies/at-risk-non-tory-seats">At Risk Non-Tory Seats</Link></h3>
                <p className="mb-2">
                  There are {nonTorySeatsUnsafeCount} non-Tory
                  Constituencies* where we need to vote tactically to make sure
                  the Tories don&apos;t win!
                  <br />
                  <Link href="/constituencies/at-risk-non-tory-seats">See them all here.</Link>
                </p>
              </Col>
            </Row>


            <Row className="pb-3">
              <Col>
                <h3><Link href="/constituencies/safe-non-tory-seats">Safe Non-Tory Seats</Link></h3>
                <p className="mb-2">
                  There are {nonTorySeatsTorySafeCount} non-Tory
                  Constituencies* where you can safely vote with your heart.
                  <br />
                  <Link href="/constituencies/safe-non-tory-seats">See them all here.</Link>
                </p>
              </Col>
            </Row>

            <Row className="py-5">
              <Col>
                <p className="fst-italic">
                  * Based on converting 2019 voting patterns to new constituency
                  boundaries
                </p>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </>
  );
}
