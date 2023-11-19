import Link from "next/link";

import { storyblokEditable } from "@storyblok/react/rsc";
import { NavbarLinkStoryblok } from "@/storyblok/types/storyblok-types";

import { Container, Navbar, Nav } from "react-bootstrap";

import logo from "@/assets/stop-the-tories-logo-transparent.png";

const Navigation = ({ blok }: { blok: NavbarLinkStoryblok }) => {
  return (
    <Nav.Link {...storyblokEditable(blok)} as={Link} href={blok.link_url}>
      {blok.link_name}
    </Nav.Link>
  );
}

export default Navigation;