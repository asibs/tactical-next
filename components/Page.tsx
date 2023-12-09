import { storyblokEditable, StoryblokComponent } from "@storyblok/react/rsc";
import Header from "./Header";
import { Rubik } from "next/font/google";
import { PageStoryblok } from "@/storyblok/types/storyblok-types";

const rubik = Rubik({ subsets: ["latin"], weight: "variable" });

const Page = ({ blok }: { blok: PageStoryblok }) => (
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
      {blok.body &&
        blok.body.map((nestedBlok) => (
          <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
    </main>
  </>
);

export default Page;
