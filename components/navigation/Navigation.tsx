"use client";
{
  /* Navbar needs to be a client component - it's interactive */
}

import Image from "next/image";
import Link from "next/link";
import { Rubik } from "next/font/google";

import { StoryblokComponent, storyblokEditable } from "@storyblok/react/rsc";
import { NavbarStoryblok } from "@/storyblok/types/storyblok-types";

import { Container, Navbar, Nav } from "react-bootstrap";

import logo from "@/assets/stop-the-tories-logo-transparent.png";

const rubik = Rubik({ subsets: ["latin"], weight: "500" });

const Navigation = ({ blok }: { blok: NavbarStoryblok }) => {
  return (
    <Navbar
      {...storyblokEditable(blok)}
      expand="lg"
      bg="dark"
      data-bs-theme="dark"
    >
      <Container>
        <Navbar.Brand as={Link} href="/" className={rubik.className}>
          <Image
            src={logo}
            alt="StopTheTories.vote logo"
            className="d-inline-block me-2"
            style={{ width: "2rem", height: "2rem" }}
          />
          StopTheTories
          <em>
            <strong>.Vote</strong>
          </em>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {blok.links.map((link) => {
              return <StoryblokComponent blok={link} key={link._uid} />;
              // return (
              //   <Nav.Link {...storyblokEditable(blok)} as={Link} key={link.link_url} href={link.link_url}>
              //     {link.link_name}
              //   </Nav.Link>
              // );
            })}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
