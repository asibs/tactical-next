import { Col, Container, Row, ButtonGroup, Button } from "react-bootstrap";
import Link from "next/link";
import Header from "@/components/Header";
import ImpliedChart from "@/components/info_box/ImpliedChart";
import MRPChart from "@/components/info_box/MRPChart";
import PlanToVoteBox from "@/components/info_box/PlanToVoteBox";
import TacticalReasoningBox from "@/components/info_box/TacticalReasoningBox";
import { partyCssClassFromSlug, partyNameFromSlug } from "@/utils/Party";
import {
  getConstituenciesData,
  getConstituencySlugs,
  progressiveContenders,
} from "@/utils/constituencyData";
import { notFound } from "next/navigation";
import {
  FaShare,
  FaPuzzlePiece,
  FaCopy,
  FaHandHoldingHeart,
} from "react-icons/fa6";

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

function TacticalAdviceSection({
  constituencyData,
}: {
  constituencyData: ConstituencyData;
}) {
  let tacticalVoteHeader;
  let tacticalVoteAdvice;

  if (constituencyData.otherVoteData.conservativeWinUnlikely) {
    /* Conservatives can't win */
    const parties = progressiveContenders(constituencyData);

    tacticalVoteHeader = (
      <>
        <h2>
          <span className="party-your-heart">Vote with your heart</span>, Tories
          unlikely to win here
        </h2>
      </>
    );

    if (parties.length === 1) {
      tacticalVoteAdvice = (
        <h3 className="party">
          Likely{" "}
          <span className={`party ${partyCssClassFromSlug(parties[0])}`}>
            {partyNameFromSlug(parties[0])}
          </span>{" "}
          Win
        </h3>
      );
    } else {
      tacticalVoteAdvice = (
        <h3 className="party">
          {parties
            .map<React.ReactNode>((p) => (
              <span key={p} className={partyCssClassFromSlug(p)}>
                {partyNameFromSlug(p)}
              </span>
            ))
            .reduce((prev, curr) => [prev, " VS ", curr])}
        </h3>
      );
    }
  } else {
    /* Conservatives could win */
    tacticalVoteHeader = <h2>The Tactical Vote is</h2>;

    if (constituencyData.recommendation.partySlug) {
      tacticalVoteAdvice = (
        <h3
          className={`party ${partyCssClassFromSlug(
            constituencyData.recommendation.partySlug,
          )}`}
        >
          {partyNameFromSlug(constituencyData.recommendation.partySlug)}
        </h3>
      );
    } else {
      tacticalVoteAdvice = (
        <h3 className="party party-too-soon">Too soon to call</h3>
      );
    }
  }

  return (
    <section id="section-advice" className="section-darker">
      <Container>
        <Row>
          <Col>
            {tacticalVoteHeader}
            {tacticalVoteAdvice}
            <p>
              <a href="#section-info">Why?</a>
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
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
        <TacticalAdviceSection constituencyData={constituencyData} />

        <section id="section-join" className="section-dark">
          <Container>
            <Row>
              <Col xs={8} md={12} className="pb-3">
                <h2>be counted, stick together!</h2>
              </Col>
            </Row>
            <Row xs={1} lg={3}>
              <Col md={7} className="pb-3">
                <div className="form-search">
                  <h3>Grow this movement</h3>
                  <p>You&apos;re in! Now let&apos;s build our numbers</p>
                  <ButtonGroup size="lg" vertical className="w-100 mb-0">
                    {/* TODO share link and clipboard copy */}
                    <Button href="#" variant="light">
                      <FaShare /> Share with friends &amp; family
                    </Button>
                    <Button href="#" variant="light">
                      <FaCopy />
                      Copy link to this page
                    </Button>
                    <Button
                      href="https://themovementforward.com/volunteer/"
                      variant="light"
                    >
                      <FaPuzzlePiece /> Volunteer
                    </Button>

                    <Button href="/donate" variant="light">
                      <FaHandHoldingHeart /> Support our crowdfunder
                    </Button>
                  </ButtonGroup>
                </div>
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
