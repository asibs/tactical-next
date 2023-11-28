import { StoryblokComponent, storyblokEditable } from "@storyblok/react/rsc";
import { FooterStoryblok } from "@/storyblok/types/storyblok-types";
import Link from "next/link";
import Image from "next/image";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import mvmtFrwdLogo from "../assets/movement-forward-logo-bw.png";

import {
  FaDiscord,
  FaMastodon,
  FaSquareFacebook,
  FaSquareInstagram,
  FaSquareThreads,
  FaSquareTwitter,
  FaTelegram,
} from "react-icons/fa6";
import { MdGroups2 } from "react-icons/md";
import { IconContext } from "react-icons";

const Footer = ({ blok }: { blok: FooterStoryblok }) => (
  <footer {...storyblokEditable(blok)}>
    <Container className="p-5">
      <Row xs={4} sm={8} className="text-center g-4">
        <Col>
          <a href="https://twitter.com/mvtfwd" target="_blank" rel="noreferrer">
            <IconContext.Provider value={{ color: "pink", size: "4dvh" }}>
              <FaSquareTwitter />
            </IconContext.Provider>
          </a>
        </Col>
        <Col>
          <a
            href="https://facebook.com/mvtfwd"
            target="_blank"
            rel="noreferrer"
          >
            <IconContext.Provider value={{ color: "pink", size: "4dvh" }}>
              <FaSquareFacebook />
            </IconContext.Provider>
          </a>
        </Col>
        <Col>
          <a
            href="https://www.threads.net/@mvtfwd"
            target="_blank"
            rel="noreferrer"
          >
            <IconContext.Provider value={{ color: "pink", size: "4dvh" }}>
              <FaSquareThreads />
            </IconContext.Provider>
          </a>
        </Col>
        <Col>
          <a
            href="https://instagram.com/mvtfwd"
            target="_blank"
            rel="noreferrer"
          >
            <IconContext.Provider value={{ color: "pink", size: "4dvh" }}>
              <FaSquareInstagram />
            </IconContext.Provider>
          </a>
        </Col>
        <Col>
          <a
            href="https://indieweb.social/@MVTFWD"
            target="_blank"
            rel="noreferrer"
          >
            <IconContext.Provider value={{ color: "pink", size: "4dvh" }}>
              <FaMastodon />
            </IconContext.Provider>
          </a>
        </Col>
        <Col>
          <a
            href="https://themovementforward.com/discord"
            target="_blank"
            rel="noreferrer"
          >
            <IconContext.Provider value={{ color: "pink", size: "4dvh" }}>
              <FaDiscord />
            </IconContext.Provider>
          </a>
        </Col>
        <Col>
          <a href="https://t.me/MVTFWD" target="_blank" rel="noreferrer">
            <IconContext.Provider value={{ color: "pink", size: "4dvh" }}>
              <FaTelegram />
            </IconContext.Provider>
          </a>
        </Col>
        <Col>
          <a
            href="https://facebook.com/groups/MVTFWD"
            target="_blank"
            rel="noreferrer"
          >
            <IconContext.Provider value={{ color: "pink", size: "4dvh" }}>
              <MdGroups2 />
            </IconContext.Provider>
          </a>
        </Col>
      </Row>

      <Row className="pt-5">
        <Col>
          <Row>
            <Col className="text-start">
              <a
                href="https://mvtfwd.com/links"
                target="_blank"
                rel="noreferrer"
              >
                <span>
                  <Image
                    src={mvmtFrwdLogo}
                    alt="Movement Forward logo"
                    style={{ width: "4dvh", height: "4dvh" }}
                  />
                </span>
                <span className="px-1">
                  <b>@MVTFWD</b>
                </span>
              </a>
            </Col>
          </Row>
          <Row className="my-2">
            <Col>© 2023 Forward Democracy Limited</Col>
          </Row>
        </Col>

        <Col>
          <Row xs={1} sm={2} md={4} className="text-end">
            {blok.links.map((link) => (
              <StoryblokComponent blok={link} key={link._uid} />
            ))}
          </Row>
        </Col>
      </Row>
    </Container>

    <div className="py-4 py-md-5 px-3 offset-md-2 links">
      {/* SOCIAL LINKS */}
      <div className="fw-bold d-flex align-items-center my-0">
        <span className="bs-icon-md d-flex justify-content-center align-items-center me-2">
          <a href="https://mvtfwd.com/links" target="_blank" rel="noreferrer">
            {/* <Image src={mvmtFrwdLogo} alt="Movement Forward logo" style={{ width: "3rem", height: "3rem" }} /> */}
            <span className="mx-2">@MVTFWD</span>
          </a>
        </span>

        <ul className="list-inline my-1">
          <li className="list-inline-item">
            <a
              href="https://twitter.com/mvtfwd"
              target="_blank"
              rel="noreferrer"
            >
              {/* <Image src={twitterSquare} alt="Follow us on Twitter" width={32} height={32} /> */}
            </a>
          </li>
          <li className="list-inline-item">
            <a
              href="https://facebook.com/mvtfwd"
              target="_blank"
              rel="noreferrer"
            >
              <FaSquareFacebook />
            </a>
          </li>
          <li className="list-inline-item">
            <a
              href="https://instagram.com/mvtfwd"
              target="_blank"
              rel="noreferrer"
            >
              {/* <Image src={instagramSquare} alt="Follow us on Instagram" width={32} height={32} /> */}
            </a>
          </li>
        </ul>
      </div>

      {/* COPYRIGHT NOTICE */}
      <p className="my-3">© 2023 Forward Democracy Limited</p>
      <p className="my-3">
        <Link
          href="/donate"
          className="btn btn-primary btn-sm me-2"
          role="button"
        >
          Donate
        </Link>
        <Link href="/about" className="btn btn-link btn-sm me-2" role="button">
          About
        </Link>
        <Link
          href="/contact"
          className="btn btn-link btn-sm me-2"
          role="button"
        >
          Contact
        </Link>
        <a
          href="https://themovementforward.com/privacy/"
          target="_blank"
          rel="noreferrer"
          className="btn btn-link btn-sm me-2"
          role="button"
        >
          Privacy
        </a>
      </p>
    </div>
  </footer>
);

export default Footer;
