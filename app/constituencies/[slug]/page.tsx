import { Col, Container, Row } from "react-bootstrap";
import Link from "next/link";
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
import PostcodeLookup from "@/components/constituency_lookup/ConstituencyLookup";

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

  let tacticalVoteHeader = "";
  let tacticalVoteAdvice = "";
  let tacticalVoteClass = "";

  if (constituencyData.otherVoteData.conservativeWinUnlikely) {
    tacticalVoteHeader = "Tories unlikely to win here";
    tacticalVoteAdvice = "Vote with your heart";
    tacticalVoteClass = "party-your-heart";
  } else {
    tacticalVoteHeader = "The Tactical Vote is";

    if (constituencyData.recommendation.partySlug) {
      tacticalVoteAdvice = partyNameFromSlug(
        constituencyData.recommendation.partySlug,
      );
      tacticalVoteClass = partyCssClassFromSlug(
        constituencyData.recommendation.partySlug,
      );
    } else {
      tacticalVoteClass = "party-too-soon";
      tacticalVoteAdvice = "Too Soon to call";
    }
  }

  if (constituencyData.recommendation.partySlug === "None") {
    return (
      <>
        <Header backgroundImage="FESTIVAL_CROWD">
          <Container className="py-4 py-md-6">
            <h1>{constituencyData.constituencyIdentifiers.name}</h1>
            <p>We&apos;re not planning to give tactical advice in this seat.</p>
          </Container>
        </Header>
        <main>
          <section id="section-advice" className="section-light">
            <Container>
              <Row>
                <Col>
                  <h2 className="pb-3">
                    No advice because: {constituencyData.recommendation.reason}
                  </h2>
                </Col>
              </Row>
              <Row xs={1} lg={3}>
                <Col md={7}>
                  <PlanToVoteBox />
                </Col>
              </Row>
            </Container>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <Header backgroundImage="FESTIVAL_CROWD">
        <Container className="py-4 py-md-6">
          <h1>{constituencyData.constituencyIdentifiers.name}</h1>
          <p>
            Bookmark this page and check back before the election for updated
            info. Not your constituency?{" "}
            <a href="/" style={{ color: "white" }}>
              Search here.
            </a>
          </p>
        </Container>
      </Header>

      <main>
        <section id="section-advice" className="section-darker">
          <Container>
            <Row>
              <Col>
                <h2>{tacticalVoteHeader}</h2>
                <h3 className={`party ${tacticalVoteClass}`}>
                  {tacticalVoteAdvice}
                </h3>
                <p>
                  <a href="#section-info">Why?</a>
                </p>
              </Col>
            </Row>
          </Container>
        </section>
        <section id="section-join" className="section-dark">
          <Container>
            <Row>
              <Col xs={8} md={12} className="pb-3">
                <h2>be counted, stick together!</h2>
              </Col>
            </Row>
            <Row xs={1} lg={3}>
              <Col md={7} className="pb-3">
                <PostcodeLookup />
              </Col>
              <Col md={7} className="pb-3">
                <p style={{ fontSize: "26px" }}>
                  <strong>Reasons to be counted</strong>
                </p>
                <p style={{ fontSize: "22px" }}>
                  1. Show how many of us are voting tactically and not just for
                  the party we&apos;re lending our vote to, and that we want our
                  votes to count next time.
                </p>
                <p style={{ fontSize: "22px" }}>
                  2. Our large numbers show that the country is rejecting the
                  narrative the right wing media and think tanks spin.
                </p>
                <p style={{ fontSize: "22px" }}>
                  3. Together we can be a huge independent influence on the next
                  government, for Proportional Representation, and other
                  crucial, common sense, policies.
                </p>
              </Col>
              <Col md={7} className="pb-3">
                <PlanToVoteBox />
              </Col>
            </Row>
          </Container>
        </section>
        <section id="section-info" className="section-light">
          <Container>
            <Row>
              <Col className="pb-3">
                {constituencyData.otherVoteData.conservativeWinUnlikely ? (
                  <>
                    <h2>Why Tories Won&apos;t Win Here</h2>
                    <h3>({constituencyData.constituencyIdentifiers.name})</h3>
                  </>
                ) : constituencyData.recommendation.partySlug ? (
                  <>
                    <h2>
                      Why vote{" "}
                      <span
                        className={`party ${partyCssClassFromSlug(
                          constituencyData.recommendation.partySlug,
                        )}`}
                      >
                        {partyNameFromSlug(
                          constituencyData.recommendation.partySlug,
                        )}
                      </span>{" "}
                      here?
                    </h2>
                    <h3>({constituencyData.constituencyIdentifiers.name})</h3>
                  </>
                ) : (
                  <>
                    <h2>Why it&apos;s too soon to call here</h2>
                    <h3>({constituencyData.constituencyIdentifiers.name})</h3>
                  </>
                )}
              </Col>
            </Row>

            <Row xs={1} lg={3}>
              <Col md={7} className="pb-3">
                <TacticalReasoningBox constituencyData={constituencyData} />
                <Link href="/methodology" className="small">
                  <span style={{ color: "rgb(33, 37, 41)" }}>
                    Read more about our process
                  </span>
                </Link>
              </Col>
              <Col md={7} className="pb-3">
                <ImpliedChart constituencyData={constituencyData} />
              </Col>
              <Col md={7}>
                <MRPChart constituencyData={constituencyData} />
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </>
  );
}
