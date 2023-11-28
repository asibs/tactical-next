import { SbReactComponentsMap } from "@storyblok/react/rsc";

import Page from "@/components/Page";
import Grid from "@/components/Grid";
import Feature from "@/components/Feature";
import Teaser from "@/components/Teaser";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import NavigationLink from "@/components/NavigationLink";
import FooterLink from "@/components/FooterLink";

export const ComponentsMap: SbReactComponentsMap = {
  feature: Feature,
  grid: Grid,
  page: Page,
  teaser: Teaser,
  footer: Footer,
  footer_internal_link: FooterLink,
  footer_external_link: FooterLink,
  navbar: Navigation,
  navbar_link: NavigationLink
};