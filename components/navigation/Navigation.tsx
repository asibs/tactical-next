"use client";
// Navbar needs to be a client component - it's interactive

import Image from "next/image";
import Link from "next/link";

import { Container, Navbar, Nav, Row, Col } from "react-bootstrap";

import logo from "@/assets/stop-the-tories-logo-transparent.png";

import { rubik } from "@/utils/Fonts";
import { FaBoltLightning, FaMagnifyingGlass } from "react-icons/fa6";

const Navigation = () => {
  return (
    <Navbar
      bg="light"
      data-bs-theme="light"
      sticky="top"
      className={rubik.className}
    >
      <Container className="p-2">
        <Navbar.Brand as={Link} href="/">
          <Image
            src={logo}
            alt="StopTheTories.vote logo"
            className="d-inline-block me-2"
            style={{ width: "2rem", height: "2rem" }}
          />
          <span>StopTheTories</span>
          <span className="fw-bolder fst-italic">.Vote</span>
        </Navbar.Brand>

        <Nav>
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
                  <FaBoltLightning className="d-none d-md-inline-block me-2" />
                  <span>Join</span>
                </Link>
              </Col>
            </Row>
          </Container>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigation;
