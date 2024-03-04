import { Col, Container, Row } from "react-bootstrap";
import Header from "@/components/Header";
import LocalTeamBox from "@/components/info_box/LocalTeamBox";
import ImpliedChart from "@/components/info_box/ImpliedChart";
import ImpliedStack from "@/components/info_box/ImpliedStack";
import MRPChart from "@/components/info_box/MRPChart";
import MRPStack from "@/components/info_box/MRPStack";
import PlanToVoteBox from "@/components/info_box/PlanToVoteBox";
import TacticalReasoningBox from "@/components/info_box/TacticalReasoningBox";
import { partyCssClassFromSlug, partyNameFromSlug } from "@/utils/Party";
import { getConstituencyData } from "@/utils/constituencyData";

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const constituenciesData: ConstituencyData[] = await getConstituencyData();

  return constituenciesData.map((c: ConstituencyData) => ({
    slug: c.constituencyIdentifiers.slug,
  }));
}

// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default async function ConstituencyPage({
  params,
}: {
  params: { slug: string };
}) {
  const constituenciesData: ConstituencyData[] = await getConstituencyData();
  const constituencyData = constituenciesData.filter(
    (c: ConstituencyData) => c.constituencyIdentifiers.slug === params.slug,
  )[0];

  constituencyData.impliedPreviousResult.partyVoteResults.sort(
    // sort implied results on votePercent instead
    // of raw so nonVoters stay last.
    (a, b) => b.votePercent - a.votePercent,
  );

  constituencyData.pollingResults.partyVoteResults.sort(
    (a, b) => b.votePercent - a.votePercent,
  );

  let tacticalTitle = "";
  let progressive1st: PartySlug | null = null;
  let progressive2nd: PartySlug | null = null;
  const conCantWin = constituencyData.otherVoteData.conservativeWinUnlikely;
  const recommendation = constituencyData.recommendation.partySlug;

  if (recommendation) {
    if (conCantWin) {
      // Clear recommendation, Con can't win
      tacticalTitle = "This seat is safe ";
    } else {
      // Clear recommendation, Con can win
      tacticalTitle = "The tactical vote is";
    }
  } else {
    if (conCantWin) {
      // No recommendation, Con can't win
      tacticalTitle = "This seat is";
      progressive1st =
        constituencyData.pollingResults.partyVoteResults[0].partySlug;
      progressive2nd =
        constituencyData.pollingResults.partyVoteResults[1].partySlug;
    } else {
      // No recommendation, Con can win
      tacticalTitle = "Too soon to tell";
    }
  }

  return (
    <>
      {constituencyData && (
        <>
          <Header backgroundImage="FESTIVAL_CROWD">
            <Container className="py-4 py-md-6">
              <h1>{constituencyData.constituencyIdentifiers.name}</h1>
              <p>
                Bookmark this page and check back before the election for
                updated info.
              </p>
            </Container>
          </Header>

          <main>
            <section id="section-advice" className="section-light">
              <Container>
                <Row>
                  <Col>
                    <h2 className="pb-3">{tacticalTitle}</h2>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {recommendation ? (
                      <h3
                        className={`party ${partyCssClassFromSlug(
                          constituencyData.recommendation.partySlug,
                        )}`}
                      >
                        {partyNameFromSlug(
                          constituencyData.recommendation.partySlug,
                        )}
                      </h3>
                    ) : conCantWin && progressive1st && progressive2nd ? (
                      <>
                        <h3 className="contest">
                          <span
                            className={partyCssClassFromSlug(progressive1st)}
                          >
                            {partyNameFromSlug(progressive1st)}
                          </span>
                          &nbsp;vs&nbsp;
                          <span
                            className={`${partyCssClassFromSlug(
                              progressive2nd,
                            )}`}
                          >
                            {partyNameFromSlug(progressive2nd)}
                          </span>
                        </h3>
                      </>
                    ) : (
                      <h3 className="party"></h3>
                    )}
                  </Col>
                </Row>

                <Row xs={1} lg={3}>
                  <Col md={7}>
                    <TacticalReasoningBox constituencyData={constituencyData} />
                  </Col>
                  <Col md={7}>
                    <LocalTeamBox />
                  </Col>
                  <Col md={7}>
                    <PlanToVoteBox />
                  </Col>
                </Row>
                <Row xs={1} lg={4}>
                  <Col md={7}>
                    <ImpliedChart constituencyData={constituencyData} />
                  </Col>
                  <Col md={7} lg={2.5}>
                    <ImpliedStack constituencyData={constituencyData} />
                  </Col>
                  <Col md={7}>
                    <MRPChart constituencyData={constituencyData} />
                  </Col>
                  <Col md={7} lg={2.5}>
                    <MRPStack constituencyData={constituencyData} />
                  </Col>
                </Row>
              </Container>
            </section>
          </main>
        </>
      )}

      {!constituencyData && (
        <>
          <h1>{params.slug}</h1>
          <p>No data found for this constituency!</p>
        </>
      )}
    </>
  );
}
