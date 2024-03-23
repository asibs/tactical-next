import { storyblokEditable } from "@storyblok/react/rsc";
import {
  FooterExternalLinkStoryblok,
  FooterInternalLinkStoryblok,
} from "@/storyblok/types/storyblok-types";
import Link from "next/link";

// TODO we only want links to Donate About Data Privacy
const FooterLink = ({
  blok,
}: {
  blok: FooterInternalLinkStoryblok | FooterExternalLinkStoryblok;
}) => <>{link(blok)}</>;

const link = (
  blok: FooterInternalLinkStoryblok | FooterExternalLinkStoryblok,
) => {
  {
    const className = `btn ${
      blok.button ? "btn-light" : "btn-link"
    } btn-sm fw-bold text-start`;

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
