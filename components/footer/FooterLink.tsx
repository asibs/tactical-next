import React from "react";

import {
  FooterExternalLinkStoryblok,
  FooterInternalLinkStoryblok,
} from "@/storyblok/types/storyblok-types";
import Link from "next/link";
import { storyblokEditable } from "@storyblok/react/rsc";

const FooterLink = ({
  blok,
}: {
  blok: FooterInternalLinkStoryblok | FooterExternalLinkStoryblok;
}) => (
  // React.Fragment is just the explicit version of "<></>" - so we can add a key attribute to it
  <React.Fragment {...storyblokEditable(blok)}>{link(blok)}</React.Fragment>
);

const link = (
  blok: FooterInternalLinkStoryblok | FooterExternalLinkStoryblok,
) => {
  {
    const className = `btn ${blok.button ? "btn-light" : "btn-link"
      } btn-sm fw-bold text-start mx-1`;

    switch (blok.component) {
      case "footer_internal_link":
        return (
          <Link href={blok.link_url} className={className}>
            {blok.link_name}
          </Link>
        );
      case "footer_external_link":
        return (
          <a
            href={blok.link_url}
            target="_blank"
            rel="noreferrer"
            className={className}
          >
            {blok.link_name}
          </a>
        );
    }
  }
};

export default FooterLink;
