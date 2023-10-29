/** 1. Tag it as a client component */
"use client";
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";

import Page from "@/components/Page"
import Grid from "@/components/Grid"
import Feature from "@/components/Feature"
import Teaser from "@/components/Teaser"

const components = {
  feature: Feature,
  grid: Grid,
  page: Page,
  teaser: Teaser
}
 
/** 2. Initialize it as usual */
storyblokInit({
  accessToken: process.env.STORYBLOK_API_TOKEN,
  use: [apiPlugin],
  apiOptions: { region: 'eu' },
  components
})
 
export default function StoryblokProvider({ children }) {
  return children;
}