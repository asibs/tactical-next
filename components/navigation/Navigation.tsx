"use client";
// Navbar needs to be a client component
// (even tho this navbar doesn't use a collapse, it still fails without use client)

import Image from "next/image";

import { Container, Button, Nav, Navbar } from "react-bootstrap";

import logo from "@/assets/stop-the-tories-logo-transparent.png";

import { rubik } from "@/utils/Fonts";
import { FaBoltLightning, FaMagnifyingGlass } from "react-icons/fa6";

// Navbar which just includes our main call to actions, which are (currently) the search
// & join buttons. These are always displayed on the navbar, and there is no hamburger
// menu. Users need to scroll to the footer to see links to non-primary pages.
const Navigation = () => {
  return (
    <Container fluid className="bg-light sticky-top px-2">
      <Navbar className={`${rubik.className} py-2 py-sm-3`}>
        <Container className="px-0">
          {/* Branding section - left-aligned */}
          <Navbar.Brand href="/" className="d-flex align-items-center">
            <span className="bs-icon-sm d-flex justify-content-center align-items-center me-2 bs-icon">
              <Image
                src={logo}
                alt="StopTheTories.vote logo"
                style={{ width: "2rem", height: "2rem" }}
                placeholder="blur"
              />
            </span>
            <span className="brand-text">StopTheTories</span>
            <span className="brand-text fw-bolder fst-italic">.Vote</span>
          </Navbar.Brand>

          {/* Right-aligned section - always shown links */}
          <Navbar.Collapse>
            {/* pushes the buttons to the right */}
            <Nav as="ul" className="ms-auto"></Nav>
            <Button href="/" variant="dark" className="px-2 px-sm-3">
              <FaMagnifyingGlass className="me-0 me-sm-2" />
              <span className="d-none d-sm-inline-block">Search</span>
            </Button>
            <Button href="/join" className="px-2 px-sm-3 ms-1 ms-sm-2 ms-lg-3 ">
              <FaBoltLightning className="d-none d-sm-inline-block" />
              Join
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  );
};

export default Navigation;
