import StoryblokWrapper from "@/storyblok/components/StoryblokWrapper";

export default async function Home() {
  return (
    <>
      <StoryblokWrapper slug="home" />
      <p>on the homepage</p>
    </>
  );
}
