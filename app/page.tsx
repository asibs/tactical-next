import PostcodeLookup from "@/components/postcode/PostcodeLookup";
import StoryblokWrapper from "@/storyblok/components/StoryblokWrapper";

/* Index page. Since we use the Storyblok slug "home" for this page, it will also be
 * visible at the `/home` URL (via the dynamic route under `/app/[slug]/page.tsx`).
 */
export default async function Index() {
  return (
    <>
      <StoryblokWrapper slug="home" />
      <p>on the homepage</p>
      <PostcodeLookup />
    </>
  );
}
