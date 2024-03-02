import { storyblokEditable, StoryblokComponent } from "@storyblok/react/rsc";
import Header from "./Header";
import { PageStoryblok } from "@/storyblok/types/storyblok-types";
import { rubik } from "@/utils/Fonts";
import { Container } from "react-bootstrap";

const Page = ({ blok }: { blok: PageStoryblok }) => {
  return (
    <>
      <Header backgroundImage={blok.page_title_background}>
        <Container className="py-4 py-md-6">
          <h1
            className={rubik.className}
          >
            {blok.page_title}
          </h1>
        </Container>
      </Header>

      <main className="py-5" {...storyblokEditable(blok)}>
        {blok.page_content.map((nestedBlok) => (
          <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </main>
    </>
  );
};

export default Page;
