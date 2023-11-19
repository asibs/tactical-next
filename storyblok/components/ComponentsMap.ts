import { SbReactComponentsMap } from "@storyblok/react/rsc";

import Page from "@/components/Page";
import Grid from "@/components/Grid";
import Feature from "@/components/Feature";
import Teaser from "@/components/Teaser";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

export const ComponentsMap: SbReactComponentsMap = {
  feature: Feature,
  grid: Grid,
  page: Page,
  teaser: Teaser,
  footer: Footer,
  navbar: Navigation,
};