import Header from "@/components/Header";
import LocalTeamBox from "@/components/info_box/LocalTeamBox";
import PlanToVoteBox from "@/components/info_box/PlanToVoteBox";
import TacticalReasoningBox from "@/components/info_box/TacticalReasoningBox";
import { rubik } from "@/utils/Fonts";
import { partyCssClassFromSlug, partyNameFromSlug } from "@/utils/Party";
import { readFileSync } from "fs";
import { unstable_cache } from "next/cache";
import getConfig from "next/config";
import path from "path";
import { Col, Container, Row } from "react-bootstrap";

const { serverRuntimeConfig } = getConfig() || {};

const getConstituencyData = unstable_cache(
  // Cache data function
  async () => {
    console.debug(
      `constituencies/[slug]/page.tsx: Updating cached constituencies data`,
    );
    const filePath = path.join(process.cwd(), "data", "constituency.json");
    const fileContent = readFileSync(filePath, "utf8");
    return JSON.parse(fileContent);
  },
  // Cache key
  [`data/constituency.json.${serverRuntimeConfig.appVersion}`],
  // Cache options
  { revalidate: false }, // Cache will never refresh
);

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  // TODO: Call spreadsheet data module to reload & cache spreadsheet constituency data
  // const posts = await fetch('https://.../posts').then((res) => res.json())

  // TODO: Get constituencies from cached spreadsheet data
  // const constituencies = ["isle-of-wight-west", "isle-of-wight-east"];

  const constituenciesData: ConstituencyData[] = await getConstituencyData();

  return constituenciesData.map((c: any) => ({
    slug: c["constituencySlug"],
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
    (c: any) => c.constituencyIdentifiers.slug === params.slug,
  )[0];

  return (
    <>
      {constituencyData && (
        <>
          <Header backgroundImage="FESTIVAL_CROWD">
            <Container className="py-4 py-md-6">
              <h1 className={rubik.className}>
                {constituencyData.constituencyIdentifiers.name}
              </h1>
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
                    <h2 className={`${rubik.className} pb-3`}>
                      The tactical vote is
                    </h2>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h3
                      className={`${
                        rubik.className
                      } party ${partyCssClassFromSlug(
                        constituencyData.recommendation.partySlug,
                      )}`}
                    >
                      {partyNameFromSlug(
                        constituencyData.recommendation.partySlug,
                      )}
                    </h3>
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
              </Container>
            </section>
          </main>

          {/* DEBUG DATA */}
          {/*
          <h5>{constituencyData["constituency_name"]}</h5>
          <h6>Tactical Vote: {constituencyData["recommendation"]}</h6>
          <p>{JSON.stringify(constituencyData)}</p>
          */}
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
