import { storyblokEditable, StoryblokComponent } from "@storyblok/react/rsc";
import Header from "./Header";
import { Rubik } from "next/font/google";
import { PageStoryblok } from "@/storyblok/types/storyblok-types";

import rubik from "@/utils/Fonts";

const Page = ({ blok }: { blok: PageStoryblok }) => {
  return (
    <>
      <Header backgroundImage={blok.page_title_background}>
        <h1
          className={`${rubik.className} text-100`}
          style={{ fontSize: "6vmax", fontWeight: "bolder" }}
        >
          {blok.page_title}
        </h1>
      </Header>

      <main className="text-center mt-4" {...storyblokEditable(blok)}>
        {blok.page_content.map((nestedBlok) => (
          <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </main>
    </>
  );
};

export default Page;
