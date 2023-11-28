import { storyblokEditable } from "@storyblok/react/rsc";
import { FooterExternalLinkStoryblok, FooterInternalLinkStoryblok } from "@/storyblok/types/storyblok-types";
import Link from "next/link";

import Col from "react-bootstrap/Col";

const FooterLink = ({ blok }: { blok: (FooterInternalLinkStoryblok | FooterExternalLinkStoryblok) }) => (
  <Col {...storyblokEditable(blok)}>
    {link(blok)}
  </Col>
);

const link = (blok: FooterInternalLinkStoryblok | FooterExternalLinkStoryblok) => {
  {
    switch (blok.component) {
      case "footer_internal_link":
        return (
          <Link href={blok.link_url}>{blok.link_name}</Link>
        )
      case "footer_external_link":
        return (
          <a
            href={blok.link_url}
            target="_blank"
            rel="noreferrer"
          >{blok.link_name}</a>
        )
    }
  }
}

export default FooterLink;
