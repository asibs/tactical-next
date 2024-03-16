import { Col, Container, Row } from "react-bootstrap";
import Header from "@/components/Header";
import ActionBox from "@/components/info_box/ActionBox";
import ImpliedChart from "@/components/info_box/ImpliedChart";
import MRPChart from "@/components/info_box/MRPChart";
import PlanToVoteBox from "@/components/info_box/PlanToVoteBox";
import TacticalReasoningBox from "@/components/info_box/TacticalReasoningBox";
import { partyCssClassFromSlug, partyNameFromSlug } from "@/utils/Party";
import {
  getConstituenciesData,
  getConstituencySlugs,
} from "@/utils/constituencyData";
import { notFound } from "next/navigation";

export const dynamicParams = false; // Don't allow params not in generateStaticParams

// TODO: This page currently needs to be Server-side rendered, presumably because of
// the action box client-side component which fetches the count of users in the
// constituency and changes the content based on localStorage. Investigate whether
// Incremental Static Regeneration would be possible with this page...?

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const constituencySlugs = await getConstituencySlugs();
  return constituencySlugs.map((slug) => ({ slug: slug }));
}

// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default async function ConstituencyPage({
  params,
}: {
  params: { slug: string };
}) {
  const constituenciesData: ConstituencyData[] = await getConstituenciesData();
  const constituencyData = constituenciesData.filter(
    (c: ConstituencyData) => c.constituencyIdentifiers.slug === params.slug,
  )[0];

  if (!constituencyData) {
    // This should never happen because dynamic params is false, and the method of
    // getting constituency data above should be consistent with generateStaticParams,
    // but this is a belt-and-braces approach
    notFound();
  }

  constituencyData.impliedPreviousResult.partyVoteResults.sort(
    // sort implied results on votePercent instead
    // of raw so nonVoters stay last.
    (a, b) => b.votePercent - a.votePercent,
  );

  constituencyData.pollingResults.partyVoteResults.sort(
    (a, b) => b.votePercent - a.votePercent,
  );

  return (
    <>
      <Header backgroundImage="FESTIVAL_CROWD">
        <Container className="py-4 py-md-6">
          <h1>{constituencyData.constituencyIdentifiers.name}</h1>
          <p>
            Bookmark this page and check back before the election for updated
            info.
          </p>
        </Container>
      </Header>

      <main>
        <section id="section-advice" className="section-light">
          <Container>
            <Row>
              <Col>
                <h2 className="pb-3">The tactical vote is</h2>
              </Col>
            </Row>
            <Row>
              <Col>
                <h3
                  className={`party ${partyCssClassFromSlug(
                    constituencyData.recommendation.partySlug,
                  )}`}
                >
                  {partyNameFromSlug(constituencyData.recommendation.partySlug)}
                </h3>
              </Col>
            </Row>

            <Row xs={1} lg={3}>
              <Col md={7}>
                <TacticalReasoningBox constituencyData={constituencyData} />
              </Col>
              <Col md={7}>
                <ActionBox constituencyData={constituencyData} />
              </Col>
              <Col md={7}>
                <PlanToVoteBox />
              </Col>
            </Row>
            <Row xs={1} lg={3}>
              <Col md={7}>
                <ImpliedChart constituencyData={constituencyData} />
              </Col>
              <Col md={7}>
                <MRPChart constituencyData={constituencyData} />
              </Col>
              <Col md={7}></Col>
            </Row>
          </Container>
        </section>
      </main>
    </>
  );
}
