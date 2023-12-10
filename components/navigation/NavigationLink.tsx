"use client";
{
  /* NavigationLink needs to be a client component, as it's used within Navigation which
   * is a client component itself...
   */
}

import Link from "next/link";

import { storyblokEditable } from "@storyblok/react/rsc";
import { NavbarLinkStoryblok } from "@/storyblok/types/storyblok-types";

import { Nav } from "react-bootstrap";

const NavigationLink = ({ blok }: { blok: NavbarLinkStoryblok }) => {
  return (
    <Nav.Link {...storyblokEditable(blok)} as={Link} href={blok.link_url}>
      {blok.link_name}
    </Nav.Link>
  );
};

export default NavigationLink;
