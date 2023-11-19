"use client";
{
  /* Navbar needs to be a client component - it's interactive */
}

import Image from "next/image";
import Link from "next/link";

import { storyblokEditable } from "@storyblok/react/rsc";
import { NavbarStoryblok } from "@/storyblok/types/storyblok-types";

import { Container, Navbar, Nav } from "react-bootstrap";

import logo from "@/assets/stop-the-tories-logo-transparent.png";

const Navigation = ({ blok }: { blok: NavbarStoryblok }) => {
  return (
    <Navbar
      {...storyblokEditable(blok)}
      expand="lg"
      className="bg-body-tertiary"
    >
      <Container>
        <Navbar.Brand as={Link} href="/">
          <Image
            src={logo}
            alt="StopTheTories.vote logo"
            className="d-inline-block me-2"
            style={{ width: "2rem", height: "2rem" }}
          />
          StopTheTories
          <strong>
            .<em>Vote</em>
          </strong>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {blok.links.map((link) => (
              <Nav.Link as={Link} key={link.link_url} href={link.link_url}>
                {link.link_name}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
