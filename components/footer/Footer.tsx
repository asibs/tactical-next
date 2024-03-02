import { StoryblokComponent, storyblokEditable } from "@storyblok/react/rsc";
import { FooterStoryblok } from "@/storyblok/types/storyblok-types";
import Link from "next/link";
import Image from "next/image";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import mvmtFrwdLogo from "@/assets/movement-forward-logo-bw.png";
import mvmtFrwdQrCode from '@/assets/movement-forward-qr-code-tight.png'

import {
  FaBell,
  FaDiscord,
  FaFileArrowDown,
  FaMagnifyingGlass,
  FaMastodon,
  FaPuzzlePiece,
  FaSquareFacebook,
  FaSquareInstagram,
  FaSquareThreads,
  FaSquareTwitter,
  FaSquareWhatsapp,
  FaTelegram,
} from "react-icons/fa6";
import { MdGroups2 } from "react-icons/md";
import { Button, ButtonGroup } from "react-bootstrap";
import { rubik } from "@/utils/Fonts";

const Footer = ({ blok }: { blok: FooterStoryblok }) => (
  <footer {...storyblokEditable(blok)}>
    <Container>
      <Row>
        {/* FOOTER CALL TO ACTION BUTTONS */}
        <Col sm={10} md={6} lg={4} xl={4} className="pb-4">
          <ButtonGroup vertical size="lg" className="w-100">
            <Link href="/reminders" className={`btn btn-dark btn-lg ${rubik.className} fw-bolder text-start lh-sm mb-1`}>
              <FaBell className="me-2" />Join this voting movement
            </Link>
            <Link href="/constituencies" className={`btn btn-dark btn-lg ${rubik.className} fw-bolder text-start lh-sm mb-1`}>
              <FaMagnifyingGlass className="me-2" />Browse constituencies
            </Link>
            <Link href="/volunteer" className={`btn btn-dark btn-lg ${rubik.className} fw-bolder text-start lh-sm mb-1`}>
              <FaPuzzlePiece className="me-2" />Volunteer
            </Link>
            <Link href="/downloads" className={`btn btn-dark btn-lg ${rubik.className} fw-bolder text-start lh-sm mb-1`}>
              <FaFileArrowDown className="me-2" />Downloads and resources
            </Link>
          </ButtonGroup>
        </Col>

        {/* QR CODE */}
        <Col sm={10} md={5} lg={3} xl={4} className="pb-4 px-xl-5">
          <a href="https://shop.mvtfwd.com/stickers" target="_blank" rel="noreferrer">
            <Image src={mvmtFrwdQrCode} alt="Movement Forward QR Code" style={{ width: "100%", height: "auto" }} />
          </a>
        </Col>

        <Col sm={10} md={10} lg={5} xl={4} className="pb-4">
          {/* MOVEMENT FORWARD LOGO */}
          <p>
            <a href="https://mvtfwd.com/links" target="_blank" rel="noreferrer">
              <Image src={mvmtFrwdLogo} alt="Movement Forward Logo" style={{ width: "4rem", height: "4rem" }} />
              <span className="mx-2 fw-bold">@MVTFWD</span>
            </a>
          </p>

          {/* MOVEMENT FORWARD SOCIAL LINKS */}
          <ul className="list-inline my-3">
            <li className="list-inline-item">
              <a href="https://twitter.com/mvtfwd" target="_blank" rel="noreferrer">
                <FaSquareTwitter className="fs-1" />
              </a>
            </li>
            <li className="list-inline-item">
              <a href="https://facebook.com/mvtfwd" target="_blank">
                <FaSquareFacebook className="fs-1" />
              </a>
            </li>
            <li className="list-inline-item">
              <a href="https://instagram.com/mvtfwd" target="_blank">
                <FaSquareInstagram className="fs-1" />
              </a>
            </li>
            <li className="list-inline-item">
              <a href="https://threads.net/mvtfwd" target="_blank">
                <FaSquareThreads className="fs-1" />
              </a>
            </li>
            <li className="list-inline-item">
              <a href="https://mvtfwd.com/whatsapp" target="_blank">
                <FaSquareWhatsapp className="fs-1" />
              </a>
            </li>
            <li className="list-inline-item">
              <a href="https://mvtfwd.com/volunteer" target="_blank">
                <FaDiscord className="fs-1" />
              </a>
            </li>
          </ul>

          {/* COPYRIGHT */}
          <p className="my-3">
            A Movement Forward initiative
            <br />
            © 2024 Forward Democracy Limited
          </p>

          {/* FOOTER LINKS */}
          <Row xs={4} className="py-3">
            {blok.links.map((link) => (
              <Col className="p-1" key={link._uid}>
                <StoryblokComponent blok={link} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  </footer >
);

export default Footer;
