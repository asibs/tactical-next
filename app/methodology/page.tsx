import { Col, Container, Row } from "react-bootstrap";

import Header from "@/components/Header";
import Link from "next/link";
import Image from "next/image";

import flowChart from "@/assets/methodology-flow-chart.png";
import ToggleText from "@/components/ToggleText";

export default function MethodologyPage() {
  return (
    <>
      <Header backgroundImage="NONE">
        <Container className="py-4 py-md-6">
          <h1>Methodology</h1>
        </Container>
      </Header>

      <main>
        <section className="section-light">
          <Container>
            <Row className="mb-4">
              <Col>
                <h2>Our Objectives</h2>
                <ol className="fs-4 fw-bold">
                  <li>Get the Tories out!</li>
                  <li>
                    Help <em>voters</em> influence the next government
                    <br />
                    <span className="fs-5 fw-normal fst-italic">
                      Not just think tanks &amp; press barons
                    </span>
                  </li>
                  <li>Support a diversity of voices in parliament</li>
                  <li>
                    Highlight that tactical voting wouldn&apos;t be needed if we
                    had a fair voting system
                  </li>
                </ol>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col>
                <h2>Our Methodology</h2>
                <p className="fw-bold mt-3">
                  1 - We collate data from various sources to calculate our
                  recommendations:
                </p>
                <ul>
                  <li>
                    Parliamentary boundaries have changed since 2019, so we
                    cannot use the actual 2019 constituency results. Instead we
                    use the <em>implied</em> 2019 results for new boundaries
                    based on{" "}
                    <a
                      href="https://interactive.news.sky.com/2024/doc/estimates-2019-general-election-result-new-constituencies-explainer.pdf"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Sky, BBC etc research
                    </a>
                    .
                  </li>
                  <li>
                    We take a simple average of MRPs run in the last 6 months.
                    You can see the exact polls we are currently using on our{" "}
                    <Link href="/data">data page</Link>.
                  </li>
                  <li>
                    We look at any lists parties publish about the seats they
                    are targetting (or seats they <em>are not</em> targetting).
                    You can see the exact data sources we are using for this on
                    our <Link href="/data">data page</Link>
                  </li>
                </ul>

                <p className="fw-bold mt-3">
                  2 - Using this data, we automatically judge each every seat:
                </p>
                <ul>
                  <li>
                    <p className="fst-italic mb-2">
                      Could the Tories realistically win this seat?
                    </p>
                    <p className="mb-2">
                      If the Tory party was significantly behind the top
                      opposition party in the 2019 implied results, <b>and</b>{" "}
                      the Tory party are significantly behind the top opposition
                      in the average of recent MRPs, <b>and</b> the Tory party
                      has a low vote share in the average of recent MRPs, then
                      we assume this seat cannot be realistically won by the
                      Tory party.
                    </p>
                    <p className="mb-2">
                      If <em>any</em> of the above <em>are not</em> true, we
                      assume the Tory party <em>could</em> potentially win the
                      seat.
                    </p>
                  </li>
                  <li>
                    <p className="fst-italic mb-2">
                      Is there a clear lead opposition party in this seat?
                    </p>
                    <p className="mb-2">
                      We look for the progressive party with the biggest implied
                      vote share in 2019, the progressive party with the biggest
                      vote share in the average of recent MRPs, and whether this
                      is a target (or non-target) seat for any of the
                      progressive parties.
                    </p>
                    <p className="mb-2">
                      If <em>all</em> of the above agree, then there is a clear
                      lead opposition party in the seat. If <em>any</em> of the
                      above do not agree, then we err on the side of
                      uncertainty.
                    </p>
                  </li>
                </ul>

                <p className="fw-bold mt-3">
                  3 - Having automatically judged every seat, we then publish
                  advice using the following flow chart:
                </p>
                <Image
                  src={flowChart}
                  alt="Flow chart showing the advice we will publish in different seats based on category of seat"
                  sizes="100vw"
                  style={{
                    maxWidth: "95%",
                    height: "auto",
                  }}
                  placeholder="blur"
                />

                <p className="fw-bold mt-3">
                  4 - In seats where automatic advice cannot be given, or where
                  we have specific local intelligence, we may manually override
                  the advice:
                </p>
                <ul>
                  <li>
                    We always make it clear on the website and in our{" "}
                    <Link href="/data">published data</Link> when we have made a
                    manual override.
                  </li>
                  <li>
                    We always cite the reasons for manually overriding advice.
                  </li>
                  <li>
                    When making a decision about whether to manually override,
                    and the advice to give, we will look at various other data,
                    including but not limited to:
                  </li>
                  <ul>
                    <li>
                      Recent local election results in the parliamentary seat in
                      question
                    </li>
                    <li>
                      Any recent parliamentary byelection in the seat in
                      question
                    </li>
                    <li>Historical voting patterns in the seat in question</li>
                  </ul>
                </ul>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col>
                <h2>Methodology FAQ</h2>
                <ToggleText
                  id="2019-results"
                  chevronSize="fs-4"
                  title={
                    <h4>Why aren&apos;t you using the actual 2019 results?</h4>
                  }
                  content={
                    <>
                      <p>
                        <a
                          href="https://en.wikipedia.org/wiki/2023_Periodic_Review_of_Westminster_constituencies"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Westminster constituency boundaries were reviewed in
                          2023
                        </a>
                        , and therefore many constituencies now have new
                        geographic boundaries. Some constituencies have been
                        abolished entirely and some new constituencies have been
                        created.
                      </p>
                      <p>
                        The 2019 general election was fought using the old
                        constituencies and boundaries, and these results cannot
                        be easily mapped onto the new constituency boundaries.
                        However,{" "}
                        <a
                          href="https://interactive.news.sky.com/2024/doc/estimates-2019-general-election-result-new-constituencies-explainer.pdf"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Sky &amp; the BBC commissioned research
                        </a>{" "}
                        which estimates the vote share each party would have
                        achieved in 2019 using the new constituency boundaries.
                        We use these <em>implied</em> 2019 results in our
                        methodology (see above).
                      </p>
                    </>
                  }
                />
                <ToggleText
                  id="byelection-results"
                  chevronSize="fs-4"
                  title={<h4>Why aren&apos;t you using byelection results?</h4>}
                  content={
                    <>
                      <p>
                        Byelections tend to have low turnout compared to general
                        elections, and parties <em>may</em> be able to dedicate
                        more resources to fighting a byelection campaign,
                        because they&amp;re only fighting byelections in a small
                        number of constituencies at any one time.
                      </p>
                      <p>
                        Byelections will still also be using the old
                        constituency boundaries, which means byelection results
                        can be difficult to map directly onto the constituency
                        boundaries which the 2024 election will be fought on.
                      </p>
                      <p>
                        In constituencies where we manually override our
                        automated advice, we will consider any relevant
                        byelection results.
                      </p>
                    </>
                  }
                />
                <ToggleText
                  id="local-results"
                  chevronSize="fs-4"
                  title={
                    <h4>Why aren&apos;t you using council election results?</h4>
                  }
                  content={
                    <>
                      <p>
                        Council elections tend to have low turnout compared to
                        general elections, and the issues they are fought on can
                        be significantly different from those which are the
                        focus in general elections.
                      </p>
                      <p>
                        In constituencies where we manually override our
                        automated advice, we will consider any relevant council
                        election results.
                      </p>
                    </>
                  }
                />
                <ToggleText
                  id="manual-overrides"
                  chevronSize="fs-4"
                  title={
                    <h4>
                      Why don&apos;t your tactical voting recommendations match
                      your methodology?
                    </h4>
                  }
                  content={
                    <>
                      <p>
                        We use the same methodology - described in detail above
                        - on all seats in England, Scotland &amp; Wales. In some
                        cases, this methodology cannot give a tactical vote
                        recommendation, because it&apos;s not clear which
                        progressive party is best placed to stop the tories.
                      </p>
                      <p>
                        In these constituencies, we will manually make a
                        recommendation. This may happen close to the election
                        day, so that we can consider the most up-to-date
                        information, and we can make the most informed &amp;
                        accurate recommendation possible. When making
                        recommendations manually, we consider the data used by
                        our automated methodology - implied 2019 results, recent
                        MRPs, target seat lists - as well as other data such as
                        westminster byelections, local council elections in the
                        area, etc.
                      </p>
                      <p>
                        There may be other situations where we need to manually
                        override our automated methodology, such as if the
                        candidate for the recommended party stands aside.
                      </p>
                      <p>
                        When manually making a recommendation, we always make
                        this clear on the website and in our{" "}
                        <Link href="/data">open data</Link>, and we cite the
                        data we have used to come to our recommendation.
                      </p>
                    </>
                  }
                />
              </Col>
            </Row>

            <Row className="mb-4">
              <Col>
                <p>
                  For questions not related to our methodology, please see our
                  main <Link href="/faq">FAQ page</Link>.
                </p>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </>
  );
}
