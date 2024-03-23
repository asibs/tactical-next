import { TwoColumnLayoutStoryblok } from "@/storyblok/types/storyblok-types";
import { StoryblokComponent, storyblokEditable } from "@storyblok/react/rsc";
import { Col, Container, Row } from "react-bootstrap";

const TwoColumnLayout = ({ blok }: { blok: TwoColumnLayoutStoryblok }) => {
  return (
    <Container {...storyblokEditable(blok)}>
      <Row xs={1} md={2}>
        <Col>
          {blok.column_1_content.map((subBlok) => (
            <StoryblokComponent blok={subBlok} key={subBlok._uid} />
          ))}
        </Col>
        <Col>
          {blok.column_2_content.map((subBlok) => (
            <StoryblokComponent blok={subBlok} key={subBlok._uid} />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default TwoColumnLayout;
