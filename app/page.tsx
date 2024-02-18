import Header from "@/components/Header";
import HeaderWithConstituencyLookup from "@/components/HeaderWithConstituencyLookup";
import ConstituencyLookup from "@/components/constituency_lookup/ConstituencyLookup";
import StoryblokWrapper from "@/storyblok/components/StoryblokWrapper";
import { rubik } from "@/utils/Fonts";
import { Col, Container, Row } from "react-bootstrap";

/* Index page. Since we use the Storyblok slug "home" for this page, it will also be
 * visible at the `/home` URL (via the dynamic route under `/app/[slug]/page.tsx`).
 */
export default async function Index() {
  return (
    <>
      {/* <StoryblokWrapper slug="home" /> */}
      {/* <p>on the homepage</p> */}
      <Header backgroundImage="FESTIVAL_CROWD">
        <Container className="py-4 py-md-6">
          <Row xs={1} md={2}>
            <Col md={4} lg={5} xl={7}>
              <h1 className={`${rubik.className} fw-bolder`}>
                Your vote IS<br />your power
              </h1>
              <h3 className={`${rubik.className} fw-bolder`}>
                Join the movement that sticks together using it's votes collectively for change.
              </h3>
            </Col>
            <Col md={7} lg={6} xl={5} className="offset-md-1 offset-xl-0">
              <ConstituencyLookup />
            </Col>
          </Row>
        </Container>
      </Header>
    </>
  );
}
