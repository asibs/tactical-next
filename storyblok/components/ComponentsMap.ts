import { SbReactComponentsMap } from "@storyblok/react/rsc";

import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/footer/Footer";
import FooterLink from "@/components/footer/FooterLink";
import OneColumnLayout from "@/components/page_layout/OneColumnLayout";
import TwoColumnLayout from "@/components/page_layout/TwoColumnLayout";
import ThreeColumnLayout from "@/components/page_layout/ThreeColumnLayout";
import RichText from "@/components/page_content/RichText";
import Page from "@/components/Page";
import ToggleText from "@/components/page_content/ToggleText";

export const ComponentsMap: SbReactComponentsMap = {
  // Navigation
  navbar: Navigation,
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
  toggle_text: ToggleText,
  // Generic page
  page: Page,
};
