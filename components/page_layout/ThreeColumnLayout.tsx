import { ThreeColumnLayoutStoryblok } from "@/storyblok/types/storyblok-types";
import { StoryblokComponent, storyblokEditable } from "@storyblok/react/rsc";
import { Col, Container, Row } from "react-bootstrap";

const ThreeColumnLayout = ({ blok }: { blok: ThreeColumnLayoutStoryblok }) => {
  return (
    <Container {...storyblokEditable(blok)}>
      <Row xs={1} md={3}>
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
        <Col>
          {blok.column_3_content.map((subBlok) => (
            <StoryblokComponent blok={subBlok} key={subBlok._uid} />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default ThreeColumnLayout;
