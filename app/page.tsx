import StoryblokWrapper from "@/components/StoryblokWrapper"

// Force next.js not to cache unless storyblok live-editing is enabled.
// In Prod, we will use Next.js caching, meaning we will only make requests to Storyblok when a route has been manually invalidated, saving us cash.
// Outside of Prod (Staging/Dev), we will only use Storybloks own built-in cache, meaning lots of requests to Storyblok, but giving us live-editing.
export const revalidate = (process.env.ENABLE_STORYBLOK_LIVE_EDITING === 'true' ? 0 : false)

export default async function Home() {
  return <StoryblokWrapper slug='home' />
}
