import { StoryblokStory } from "storyblok-generate-ts";

export interface FeatureStoryblok {
  name?: string;
  _uid: string;
  component: "feature";
  [k: string]: any;
}

export interface FooterStoryblok {
  links: (FooterInternalLinkStoryblok | FooterExternalLinkStoryblok)[];
  _uid: string;
  component: "footer";
  [k: string]: any;
}

export interface FooterExternalLinkStoryblok {
  link_name: string;
  link_url: string;
  _uid: string;
  component: "footer_external_link";
  [k: string]: any;
}

export interface FooterInternalLinkStoryblok {
  link_name: string;
  link_url: string;
  _uid: string;
  component: "footer_internal_link";
  [k: string]: any;
}

export interface GridStoryblok {
  columns?: (
    | FeatureStoryblok
    | FooterStoryblok
    | FooterExternalLinkStoryblok
    | FooterInternalLinkStoryblok
    | GridStoryblok
    | NavbarStoryblok
    | NavbarLinkStoryblok
    | PageStoryblok
    | TeaserStoryblok
  )[];
  _uid: string;
  component: "grid";
  [k: string]: any;
}

export interface NavbarStoryblok {
  links: NavbarLinkStoryblok[];
  _uid: string;
  component: "navbar";
  [k: string]: any;
}

export interface NavbarLinkStoryblok {
  link_name: string;
  link_url: string;
  _uid: string;
  component: "navbar_link";
  [k: string]: any;
}

export interface PageStoryblok {
  body?: (
    | FeatureStoryblok
    | FooterStoryblok
    | FooterExternalLinkStoryblok
    | FooterInternalLinkStoryblok
    | GridStoryblok
    | NavbarStoryblok
    | NavbarLinkStoryblok
    | PageStoryblok
    | TeaserStoryblok
  )[];
  _uid: string;
  component: "page";
  uuid?: string;
  [k: string]: any;
}

export interface TeaserStoryblok {
  headline?: string;
  _uid: string;
  component: "teaser";
  [k: string]: any;
}
