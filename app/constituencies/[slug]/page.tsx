import { Col, Container, Row, ButtonGroup, Button } from "react-bootstrap";
import Link from "next/link";
import Header from "@/components/Header";
import ImpliedChart from "@/components/info_box/ImpliedChart";
import MRPChart from "@/components/info_box/MRPChart";
import PlanToVoteBox from "@/components/info_box/PlanToVoteBox";
import TacticalReasoningBox from "@/components/info_box/TacticalReasoningBox";
import {
  progressiveSlugs,
  partyCssClassFromSlug,
  partyNameFromSlug,
  shortPartyNameFromSlug,
} from "@/utils/Party";
import {
  getConstituenciesData,
  getConstituencySlugs,
} from "@/utils/constituencyData";
import { notFound } from "next/navigation";
import {
  FaUser,
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
        <section id="section-advice" className="section-darker">
          <Container>
            <Row>
              <Col xs={12} md={6} lg={4}>
                {!constituencyData.otherVoteData.conservativeWinUnlikely && (
                  <h3>Your situation</h3>
                )}
                <h2>
                  Tories{" "}
                  {constituencyData.otherVoteData.conservativeWinUnlikely ? (
                    <>
                      <span style={{ textDecoration: "underline" }}>
                        unlikely
                      </span>{" "}
                      to win here
                    </>
                  ) : (
                    <>
                      <span style={{ textDecoration: "underline" }}>can</span>{" "}
                      win here
                    </>
                  )}
                </h2>
                <p>
                  <FaUser
                    className={partyCssClassFromSlug(
                      constituencyData.impliedPreviousResult.winningParty,
                    )}
                  />{" "}
                  Current MP is{" "}
                  <strong>
                    {partyNameFromSlug(
                      constituencyData.impliedPreviousResult.winningParty,
                    )}
                  </strong>
                </p>

                <p>
                  <a href="#section-info">Info</a>
                </p>
              </Col>
              <Col xs={12} md={6} lg={4} className="pb-4">
                <TacticalAdvice constituencyData={constituencyData} />
              </Col>

              <Col xs={12} lg={4}>
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
              <Col md={7} className="pb-3"></Col>
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

function TacticalAdvice({
  constituencyData,
}: {
  constituencyData: ConstituencyData;
}) {
  const getTopProgressives = (
    results: PartyVoteResult[],
  ): [PartySlug, PartySlug] => {
    const progResults = results
      .filter((result) => progressiveSlugs.includes(result.partySlug))
      .sort((a, b) => b.votePercent - a.votePercent);

    return [progResults[0].partySlug, progResults[1].partySlug];
  };

  const toryWinUnlikely =
    constituencyData.otherVoteData.conservativeWinUnlikely;
  //TODO add in a column for safe opposition seat definition
  const clearAdvice = !!constituencyData.recommendation.partySlug;
  const recommendation = constituencyData.recommendation.partySlug;
  const [topProgressive, secondProgressive] = getTopProgressives(
    constituencyData.pollingResults.partyVoteResults,
  );

  if (toryWinUnlikely) {
    if (clearAdvice) {
      return (
        <>
          <h3 className="party party-heart">Vote with your heart</h3>
          <h3>Join up and together we can pressure them</h3>
        </>
      );
    } else {
      return (
        <>
          <h3 className="party party-none">
            Vote{" "}
            <span className={partyCssClassFromSlug(topProgressive)}>
              {shortPartyNameFromSlug(topProgressive)}
            </span>{" "}
            or{" "}
            <span className={partyCssClassFromSlug(secondProgressive)}>
              {shortPartyNameFromSlug(secondProgressive)}
            </span>{" "}
          </h3>

          <h3>BUT THAT&apos;S NOT ENOUGH, JOIN UP</h3>
        </>
      );
    }
  } else {
    //Tories CAN win
    if (clearAdvice) {
      return (
        <>
          <h3>Your tactical vote</h3>
          <h3 className={`party ${partyCssClassFromSlug(recommendation)}`}>
            {partyNameFromSlug(recommendation)}
          </h3>
          <h3>But that&apos;s not enough, join up</h3>
        </>
      );
    } else {
      return (
        <>
          {" "}
          <h3>Your tactical vote</h3>
          <h3 className="party party-none">Too soon to call</h3>
          <h3>Join up to be notified</h3>
        </>
      );
    }
  }
}
