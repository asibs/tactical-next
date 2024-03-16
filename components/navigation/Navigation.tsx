"use client";
// Navbar needs to be a client component
// (even tho this navbar doesn't use a collapse, it still fails without use client)

import Image from "next/image";
import Link from "next/link";

import { Container, Navbar, Row, Col } from "react-bootstrap";

import logo from "@/assets/stop-the-tories-logo-transparent.png";

import { rubik } from "@/utils/Fonts";
import { FaBoltLightning, FaMagnifyingGlass } from "react-icons/fa6";

import styles from "./nav.module.css";

// Navbar which just includes our main call to actions, which are (currently) the search
// & join buttons. These are always displayed on the navbar, and there is no hamburger
// menu. Users need to scroll to the footer to see links to non-primary pages.
const Navigation = () => {
  return (
    <Navbar
      bg="light"
      data-bs-theme="light"
      sticky="top"
      className={rubik.className}
    >
      <Container className="p-2">
        {/* Branding section - left-aligned */}
        <Navbar.Brand as={Link} href="/">
          <Image
            src={logo}
            alt="StopTheTories.vote logo"
            className="d-inline-block me-2"
            style={{ width: "2rem", height: "2rem" }}
            placeholder="blur"
          />
          <span className={styles.brandText}>StopTheTories</span>
          <span className={`${styles.brandText} fw-bolder fst-italic`}>
            .Vote
          </span>
        </Navbar.Brand>

        {/* Right-aligned section - always shown links */}
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
            </Row>
          </Container>
        </div>
      </Container>
    </Navbar>
  );
};

export default Navigation;
