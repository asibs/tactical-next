"use client";
// Navbar needs to be a client component - it's interactive

import Image from "next/image";
import Link from "next/link";

import { storyblokEditable } from "@storyblok/react/rsc";
import { NavbarStoryblok } from "@/storyblok/types/storyblok-types";

import { Container, Navbar, Nav, Row, Col } from "react-bootstrap";

import logo from "@/assets/stop-the-tories-logo-transparent.png";

import { rubik } from "@/utils/Fonts";
import { FaBoltLightning, FaMagnifyingGlass } from "react-icons/fa6";

import styles from "./styles.module.css";

// Navbar with a hamburger menu which is never expanded, and is populated via Storyblok
// so non-dev users can add items to the hamburger menu easily.
//
// Note the hamburger is never expanded because we want the focus to be on our main
// call to actions, which are (currently) the search & join buttons. These are always
// displayed on the navbar.
const NavWithHamburger = ({ blok }: { blok: NavbarStoryblok }) => {
  return (
    <Navbar
      {...storyblokEditable(blok)}
      expand={false} // Always show hamburger, hide the collapse content on all devices
      bg="light"
      data-bs-theme="light"
      sticky="top"
      className={rubik.className}
    >
      <Container className="p-1">
        {/* Branding section - left-aligned */}
        <Navbar.Brand as={Link} href="/">
          <Image
            src={logo}
            alt="StopTheTories.vote logo"
            className="d-inline-block me-2"
            style={{ width: "2rem", height: "2rem" }}
            placeholder="blur"
          />
          <span className="hamburger-brand-text">StopTheTories</span>
          <span className="hamburger-brand-text fw-bolder fst-italic">
            .Vote
          </span>
        </Navbar.Brand>

        {/* Right-aligned section - always shown links & hamburger */}
        <div>
          <Container className="p-0">
            <Row xs="auto" className="g-1 g-sm-2 g-lg-3">
              <Col>
                <Link
                  className="btn btn-dark fw-bolder px-2 px-sm-3"
                  role="button"
                  href="/"
                >
                  <FaMagnifyingGlass className="me-0 me-sm-2" />
                  <span className="d-none d-sm-inline-block">Search</span>
                </Link>
              </Col>
              <Col>
                <Link
                  className="btn btn-pink-strong text-white fw-bolder px-2 px-sm-3"
                  role="button"
                  href="/reminders"
                >
                  <FaBoltLightning className="d-none d-sm-inline-block me-2" />
                  <span>Join</span>
                </Link>
              </Col>
              <Col>
                <Navbar.Toggle
                  aria-controls="basic-navbar-nav"
                  className="px-1 px-sm-2 px-md-3"
                />
              </Col>
            </Row>
          </Container>
        </div>

        {/* Collapsed content - extra nav links shown when hamburger clicked */}
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
                  className="text-end fw-bold"
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

export default NavWithHamburger;
