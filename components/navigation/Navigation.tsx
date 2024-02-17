"use client";
{
  /* Navbar needs to be a client component - it's interactive */
}

import Image from "next/image";
import Link from "next/link";

import { StoryblokComponent, storyblokEditable } from "@storyblok/react/rsc";
import { NavbarStoryblok } from "@/storyblok/types/storyblok-types";

import { Container, Navbar, Nav } from "react-bootstrap";

import logo from "@/assets/stop-the-tories-logo-transparent.png";

// const rubik = Rubik({ subsets: ["latin"], weight: "500" });
import rubik from "@/utils/Fonts";

const Navigation = ({ blok }: { blok: NavbarStoryblok }) => {
  return (
    <Navbar
      {...storyblokEditable(blok)}
      expand="lg"
      bg="light"
      data-bs-theme="light"
      sticky="top"
    >
      <Container>
        <Navbar.Brand as={Link} href="/" className={rubik.className}>
          <Image
            src={logo}
            alt="StopTheTories.vote logo"
            className="d-inline-block me-2"
            style={{ width: "2rem", height: "2rem" }}
          />
          <span>StopTheTories</span>
          <span className="fw-bolder fst-italic">.Vote</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {blok.links.map((link) => {
              {
                /* Normally, we'd create a separate React Component for the nested Storyblok
                 * navbar_link blocks... BUT the top-level navigation (this component) is a
                 * Client component, and therefore ALL sub-components need to be client components
                 * too. We can make a client NavigationLink component, but the StoryblokComponent
                 * wrapper is NOT a client component, and this causes errors in the browser
                 * console. So we just render the sub-components directly here (they are simple
                 * anyway).
                 */
              }
              return (
                <Nav.Link
                  {...storyblokEditable(blok)}
                  as={Link}
                  href={link.link_url}
                  key={link.link_url}
                >
                  {link.link_name}
                </Nav.Link>
              );
            })}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
