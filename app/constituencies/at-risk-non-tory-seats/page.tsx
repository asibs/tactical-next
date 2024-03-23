import { Col, Container, Row } from "react-bootstrap";
import Header from "@/components/Header";
import {
  getConstituenciesData,
  nonTorySeatsUnsafe,
  sortByMajority,
} from "@/utils/constituencyData";
import { NonToryConstituencyTable } from "../constituencyTables";

export default async function ConstituencySummaryPage() {
  // Get all constituencies EXCEPT those where we're explicitly making no recommendation (NI & Speaker)
  const constituenciesData: ConstituencyData[] = (
    await getConstituenciesData()
  ).filter((c: ConstituencyData) => c.recommendation.partySlug !== "None");

  const constituencies = sortByMajority(nonTorySeatsUnsafe(constituenciesData));

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
                <h3>At Risk Non-Tory Seats</h3>
                <p className="mb-2">
                  There are {constituencies.length} non-Tory Constituencies*
                  where we need to vote tactically to make sure the Tories
                  don&apos;t win!
                </p>
                <p className="fst-italic">
                  * Based on converting 2019 voting patterns to new constituency
                  boundaries
                </p>
              </Col>
            </Row>

            <NonToryConstituencyTable
              constituencies={constituencies}
              color={"RECOMMENDATION"}
            />
          </Container>
        </section>
      </main>
    </>
  );
}
