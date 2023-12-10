import { OneColumnLayoutStoryblok } from "@/storyblok/types/storyblok-types";
import { StoryblokComponent, storyblokEditable } from "@storyblok/react/rsc";
import { Col, Container, Row } from "react-bootstrap";

const OneColumnLayout = ({ blok }: { blok: OneColumnLayoutStoryblok }) => {
  return (
    <Container {...storyblokEditable(blok)}>
      <Row xs={1} md={1}>
        <Col>
          {blok.content.map((subBlok) => (
            <StoryblokComponent blok={subBlok} key={subBlok._uid} />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default OneColumnLayout;
