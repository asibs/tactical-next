import { StoryblokStory } from "storyblok-generate-ts";

export interface FeatureStoryblok {
  name?: string;
  _uid: string;
  component: "feature";
  [k: string]: any;
}

export interface FooterStoryblok {
  columns?: FooterColumnStoryblok[];
  _uid: string;
  component: "footer";
  [k: string]: any;
}

export interface FooterColumnStoryblok {
  links?: FooterLinkStoryblok[];
  _uid: string;
  component: "footer column";
  [k: string]: any;
}

export type MultilinkStoryblok =
  | {
      id?: string;
      cached_url?: string;
      anchor?: string;
      linktype?: "story";
      story?: {
        name: string;
        created_at?: string;
        published_at?: string;
        id: number;
        uuid: string;
        content?: {
          [k: string]: any;
        };
        slug: string;
        full_slug: string;
        sort_by_date?: null | string;
        position?: number;
        tag_list?: string[];
        is_startpage?: boolean;
        parent_id?: null | number;
        meta_data?: null | {
          [k: string]: any;
        };
        group_id?: string;
        first_published_at?: string;
        release_id?: null | number;
        lang?: string;
        path?: null | string;
        alternates?: any[];
        default_full_slug?: null | string;
        translated_slugs?: null | any[];
        [k: string]: any;
      };
      [k: string]: any;
    }
  | {
      url?: string;
      cached_url?: string;
      anchor?: string;
      linktype?: "asset" | "url";
      [k: string]: any;
    }
  | {
      email?: string;
      linktype?: "email";
      [k: string]: any;
    };

export interface FooterLinkStoryblok {
  link_name?: string;
  link_url?: Exclude<
    MultilinkStoryblok,
    { linktype?: "email" } | { linktype?: "asset" }
  >;
  _uid: string;
  component: "footer link";
  [k: string]: any;
}

export interface GridStoryblok {
  columns?: (
    | FeatureStoryblok
    | FooterStoryblok
    | FooterColumnStoryblok
    | FooterLinkStoryblok
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
  component: "navbar link";
  [k: string]: any;
}

export interface PageStoryblok {
  body?: (
    | FeatureStoryblok
    | FooterStoryblok
    | FooterColumnStoryblok
    | FooterLinkStoryblok
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
