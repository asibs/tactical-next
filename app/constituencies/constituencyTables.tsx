import { Col, Container, Row } from "react-bootstrap";
import Link from "next/link";
import { partyColorFromSlug, partyNameFromSlug } from "@/utils/Party";

const ToryConstituencyTable = ({
  constituencies,
}: {
  constituencies: ConstituencyData[];
}) => {
  return (
    <Row className="pb-5">
      <Col xs={12} lg={{ offset: 1, span: 10 }} xl={{ offset: 2, span: 8 }}>
        <Container className="text-center">
          <Row xs={2}>
            <Col>
              <h5>We could turn this...</h5>
            </Col>
            <Col>
              <h5>Into this...</h5>
            </Col>
          </Row>

          {constituencies.map((c) => (
            <Row xs={2} className="pb-1" key={c.constituencyIdentifiers.slug}>
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
  );
};

const NonToryConstituencyTable = ({
  constituencies,
  color,
}: {
  constituencies: ConstituencyData[];
  color: "RECOMMENDATION" | "IMPLIED";
}) => {
  return (
    <>
      <Row xs={2} md={3} lg={4} xl={5} xxl={6} className="pb-5 g-1">
        {constituencies.map((c) => (
          <Col key={c.constituencyIdentifiers.slug}>
            <Link href={`/constituencies/${c.constituencyIdentifiers.slug}`}>
              <span
                className="badge rounded-pill w-100 h-100 text-wrap align-middle"
                style={{
                  backgroundColor: partyColorFromSlug(
                    color === "RECOMMENDATION"
                      ? c.recommendation.partySlug
                      : c.impliedPreviousResult.winningParty,
                  ),
                }}
              >
                {c.constituencyIdentifiers.name}
              </span>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export { NonToryConstituencyTable, ToryConstituencyTable };
