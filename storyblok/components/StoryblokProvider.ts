/** 1. Tag it as a client component */
"use client";
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import { ComponentsMap } from "@/storyblok/components/ComponentsMap";

/** 2. Initialize it as usual */
/* NOTE: When we actually use the Storyblok API (in StoryblokWrapper),
 * we're in the backend, so we don't actually need to initialise Storyblok
 * with an API token, etc here - we just need to configure the clientside
 * to transform the Storyblok components correctly
 */
{
  /*
storyblokInit({
  accessToken: process.env.STORYBLOK_API_TOKEN,
  use: [apiPlugin],
  apiOptions: { region: "eu" },
  components,
});
*/
}

storyblokInit({
  components: ComponentsMap,
});

export default function StoryblokProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
