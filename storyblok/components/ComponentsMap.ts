import { SbReactComponentsMap } from "@storyblok/react/rsc";

import Footer from "@/components/footer/Footer";
import FooterLink from "@/components/footer/FooterLink";
import OneColumnLayout from "@/components/storybloks/page_layout/OneColumnLayout";
import TwoColumnLayout from "@/components/storybloks/page_layout/TwoColumnLayout";
import ThreeColumnLayout from "@/components/storybloks/page_layout/ThreeColumnLayout";
import RichText from "@/components/storybloks/page_content/RichText";
import Page from "@/components/storybloks/Page";
import StoryblokToggleText from "@/components/storybloks/page_content/StoryblokToggleText";
import NavWithHamburger from "@/components/navigation/NavWithHamburger";

export const ComponentsMap: SbReactComponentsMap = {
  // Navigation
  navbar: NavWithHamburger,
  // Footer
  footer: Footer,
  footer_internal_link: FooterLink,
  footer_external_link: FooterLink,
  // Page layouts
  one_column_layout: OneColumnLayout,
  two_column_layout: TwoColumnLayout,
  three_column_layout: ThreeColumnLayout,
  // Page content
  rich_text: RichText,
  toggle_text: StoryblokToggleText,
  // Generic page
  page: Page,
};
