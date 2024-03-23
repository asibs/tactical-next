import Header from "@/components/Header";
import ConstituencyLookup from "@/components/constituency_lookup/ConstituencyLookup";
import ConstituencyFormWithSignup from "@/components/forms/ConstituencyFormWithSignup";
import MovementSection from "@/components/sections/MovementSection";
import { Col, Container, Row } from "react-bootstrap";

export default async function Index() {
  return (
    <>
      <Header backgroundImage="FESTIVAL_CROWD">
        <Container className="py-4 py-md-6">
          <Row xs={1} md={2}>
            <Col md={4} lg={5} xl={7}>
              <h1>
                Your vote IS
                <br />
                your power
              </h1>
              <h3>
                Join the movement that sticks together using it&apos;s votes
                collectively for change.
              </h3>
            </Col>
            <Col md={7} lg={6} xl={5} className="offset-md-1 offset-xl-0">
              <ConstituencyFormWithSignup />
            </Col>
          </Row>
        </Container>
      </Header>

      <MovementSection />
    </>
  );
}
