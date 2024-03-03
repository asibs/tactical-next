import Header from "@/components/Header";
import { opendirSync } from "fs";
import Link from "next/link";
import path from "path";
import { Col, Container, Row } from "react-bootstrap";

const getFilenames = () => {
  const dataDirPath = path.join(process.cwd(), "public", "data");
  const dir = opendirSync(dataDirPath);
  const files = [];

  let file;
  while ((file = dir.readSync()) !== null) {
    files.push(file.name);
  }
  dir.closeSync();

  return files;
};

export default function DataPage() {
  const filenames: string[] = getFilenames();

  return (
    <>
      <Header backgroundImage="NONE">
        <Container className="py-4 py-md-6">
          <h1>Data</h1>
        </Container>
      </Header>

      <main>
        <section className="section-light">
          <Container>
            <Row className="pb-4">
              <p>
                We believe in being open &amp; transparent. We make our tactical
                voting recommendations publicly available for anyone to download
                and scrutinise. This includes the data we use to make our
                recommendations, such as past election results and polling.
              </p>
              <p>
                If you would like to understand the exact methodology we use to
                make tactical voting recommendations, please see our{" "}
                <Link href="/methodology">Methodology</Link> page.
              </p>
            </Row>

            <Row className="pb-4">
              <h5>Latest data</h5>
              <p>
                <ul>
                  <li>
                    <Link href="/data/latest.csv">CSV file</Link>
                  </li>
                </ul>
              </p>
            </Row>

            <Row className="pb-4">
              <h5>Historic data</h5>
              <p>
                Historic data files are stamped with the time they were
                generated, in YYYYMMDD_HHmm format.
                <br />
                (Year Month Day _ Hour Minute)
              </p>
              <p>The most recent file will be identical to the latest data.</p>
              <p>
                <ul>
                  {filenames
                    .filter((filename) => filename !== "latest.csv")
                    .sort()
                    .map((filename) => (
                      <li key={filename}>
                        <Link href={`/data/${filename}`}>{filename}</Link>
                      </li>
                    ))}
                </ul>
              </p>
            </Row>

            <Row className="pb-4">
              <h5>Data Overview</h5>
              <p>
                <ul>
                  <li>
                    <b>Short Code</b> - The
                    <a
                      href="https://www.mysociety.org/2023/09/12/navigating-the-new-constituencies/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      mySociety short code
                    </a>{" "}
                    for a constituency (based on the three letter IDs for new
                    constituencies created by Philip Brown and Alasdair Rae)
                  </li>
                  <li>
                    <b>Implied Vote Share / Implied Raw</b> - These columns show
                    the
                    <em>implied</em> result for the new constituency boundaries
                    based on 2019 voting patterns. This data has been taken from
                    the analysis carried out by TODO - Reference and link.
                  </li>
                  <li>
                    <b>MRP Vote Share</b> - These columns show the vote share
                    each party is <em>projected</em> to get based on the average
                    of multiple MRP polls. We use the most recent MRPs from TODO
                    (companies and links), and take the mean of the predicted
                    vote percentage for each party in each constituency.
                  </li>
                  <li>
                    <b>Green Target</b> - Whether this is a Green Party target
                    seat, according to their public list of target seats here -
                    TODO link.
                  </li>
                  <li>
                    <b>Labour Non-Target</b> - Whether this is a non-target seat
                    for Labour, according to their public list of non-target
                    seats here - TODO link.
                  </li>
                  <li>
                    <b>Lib Dem Top 50 MRP</b> - Whether this is in the top 50
                    most winnable seats for the Liberal Democrats, according to
                    TODO - explanation and link.
                  </li>
                  <li>
                    <b>TV Advice</b> - The party StopTheTories.Vote is
                    recommending as the best placed to win the seat and keep the
                    Tories out.
                  </li>
                </ul>
              </p>
            </Row>
          </Container>
        </section>
      </main>
    </>
  );
}
