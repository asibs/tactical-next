import {StoryblokStory} from 'storyblok-generate-ts'

export interface FooterStoryblok {
  links: (FooterInternalLinkStoryblok | FooterExternalLinkStoryblok)[];
  _uid: string;
  component: "footer";
  [k: string]: any;
}

export interface FooterExternalLinkStoryblok {
  link_name: string;
  link_url: string;
  button?: boolean;
  _uid: string;
  component: "footer_external_link";
  [k: string]: any;
}

export interface FooterInternalLinkStoryblok {
  link_name: string;
  link_url: string;
  button?: boolean;
  _uid: string;
  component: "footer_internal_link";
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

export interface OneColumnLayoutStoryblok {
  content: (
    | OneColumnLayoutStoryblok
    | ThreeColumnLayoutStoryblok
    | TwoColumnLayoutStoryblok
    | RichTextStoryblok
    | ToggleTextStoryblok
  )[];
  _uid: string;
  component: "one_column_layout";
  [k: string]: any;
}

export interface PageStoryblok {
  page_title: string;
  page_title_background: "NONE" | "FESTIVAL_CROWD";
  page_content: (
    | OneColumnLayoutStoryblok
    | ThreeColumnLayoutStoryblok
    | TwoColumnLayoutStoryblok
    | RichTextStoryblok
    | ToggleTextStoryblok
  )[];
  _uid: string;
  component: "page";
  uuid?: string;
  [k: string]: any;
}

export interface RichtextStoryblok {
  type: string;
  content?: RichtextStoryblok[];
  marks?: RichtextStoryblok[];
  attrs?: any;
  text?: string;
  [k: string]: any;
}

export interface RichTextStoryblok {
  text: RichtextStoryblok;
  _uid: string;
  component: "rich_text";
  [k: string]: any;
}

export interface ThreeColumnLayoutStoryblok {
  column_1_content: (
    | OneColumnLayoutStoryblok
    | ThreeColumnLayoutStoryblok
    | TwoColumnLayoutStoryblok
    | RichTextStoryblok
    | ToggleTextStoryblok
  )[];
  column_2_content: (
    | OneColumnLayoutStoryblok
    | ThreeColumnLayoutStoryblok
    | TwoColumnLayoutStoryblok
    | RichTextStoryblok
    | ToggleTextStoryblok
  )[];
  column_3_content: (
    | OneColumnLayoutStoryblok
    | ThreeColumnLayoutStoryblok
    | TwoColumnLayoutStoryblok
    | RichTextStoryblok
    | ToggleTextStoryblok
  )[];
  _uid: string;
  component: "three_column_layout";
  [k: string]: any;
}

export interface ToggleTextStoryblok {
  title: string;
  text: RichtextStoryblok;
  text_shown_initially?: boolean;
  _uid: string;
  component: "toggle_text";
  [k: string]: any;
}

export interface TwoColumnLayoutStoryblok {
  column_1_content: (
    | OneColumnLayoutStoryblok
    | ThreeColumnLayoutStoryblok
    | TwoColumnLayoutStoryblok
    | RichTextStoryblok
    | ToggleTextStoryblok
  )[];
  column_2_content: (
    | OneColumnLayoutStoryblok
    | ThreeColumnLayoutStoryblok
    | TwoColumnLayoutStoryblok
    | RichTextStoryblok
    | ToggleTextStoryblok
  )[];
  _uid: string;
  component: "two_column_layout";
  [k: string]: any;
}
