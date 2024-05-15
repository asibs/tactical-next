import { Col, Container, Row } from "react-bootstrap";
import Header from "@/components/Header";
import {
  getConstituenciesData,
  sortByMajority,
  torySeatsNoRecommendation,
} from "@/utils/constituencyData";
import { ToryConstituencyTable } from "../constituencyTables";

export default async function ConstituencySummaryPage() {
  // Get all constituencies EXCEPT those where we're explicitly making no recommendation (NI & Speaker)
  const constituenciesData: ConstituencyData[] = (
    await getConstituenciesData()
  ).filter((c: ConstituencyData) => c.recommendation.partySlug !== "None");

  const constituencies = sortByMajority(
    torySeatsNoRecommendation(constituenciesData),
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
                <h3>Tory Seats we&apos;re still working on</h3>
                <p className="mb-2">
                  There are {constituencies.length} Tory Constituencies* where
                  we&apos;re still working out the tactical vote...
                </p>
                <p className="fst-italic">
                  * Based on converting 2019 voting patterns to new constituency
                  boundaries
                </p>
              </Col>
            </Row>

            <ToryConstituencyTable constituencies={constituencies} />
          </Container>
        </section>
      </main>
    </>
  );
}
