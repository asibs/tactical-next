import { StoryblokComponent, storyblokEditable } from "@storyblok/react/rsc";
import { FooterStoryblok } from "@/storyblok/types/storyblok-types";
import Link from "next/link";
import Image from "next/image";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import mvmtFrwdLogo from "@/assets/movement-forward-logo-bw.png";

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

const Footer = ({ blok }: { blok: FooterStoryblok }) => (
  <footer {...storyblokEditable(blok)}>
    <Container className="p-5">
      <Row xs={4} sm={8} className="text-center g-4">
        <Col>
          <a href="https://twitter.com/mvtfwd" target="_blank" rel="noreferrer">
            <FaSquareTwitter className="fs-1 text-pink-strong" />
          </a>
        </Col>
        <Col>
          <a
            href="https://facebook.com/mvtfwd"
            target="_blank"
            rel="noreferrer"
          >
            <FaSquareFacebook className="fs-1 text-pink-strong" />
          </a>
        </Col>
        <Col>
          <a
            href="https://www.threads.net/@mvtfwd"
            target="_blank"
            rel="noreferrer"
          >
            <FaSquareThreads className="fs-1 text-pink-strong" />
          </a>
        </Col>
        <Col>
          <a
            href="https://instagram.com/mvtfwd"
            target="_blank"
            rel="noreferrer"
          >
            <FaSquareInstagram className="fs-1 text-pink-strong" />
          </a>
        </Col>
        <Col>
          <a
            href="https://indieweb.social/@MVTFWD"
            target="_blank"
            rel="noreferrer"
          >
            <FaMastodon className="fs-1 text-pink-strong" />
          </a>
        </Col>
        <Col>
          <a
            href="https://themovementforward.com/discord"
            target="_blank"
            rel="noreferrer"
          >
            <FaDiscord className="fs-1 text-pink-strong" />
          </a>
        </Col>
        <Col>
          <a href="https://t.me/MVTFWD" target="_blank" rel="noreferrer">
            <FaTelegram className="fs-1 text-pink-strong" />
          </a>
        </Col>
        <Col>
          <a
            href="https://facebook.com/groups/MVTFWD"
            target="_blank"
            rel="noreferrer"
          >
            <MdGroups2 className="fs-1 text-pink-strong" />
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
  </footer>
);

export default Footer;
