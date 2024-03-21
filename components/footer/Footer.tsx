import { StoryblokComponent, storyblokEditable } from "@storyblok/react/rsc";
import { FooterStoryblok } from "@/storyblok/types/storyblok-types";
import Link from "next/link";
import Image from "next/image";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import mvmtFrwdLogo from "@/assets/movement-forward-logo-bw.png";
import mvmtFrwdQrCode from "@/assets/movement-forward-qr-code-tight.png";

import {
  FaBell,
  FaDiscord,
  FaFileArrowDown,
  FaMagnifyingGlass,
  FaPuzzlePiece,
  FaSquareFacebook,
  FaSquareInstagram,
  FaSquareThreads,
  FaSquareTwitter,
  FaSquareWhatsapp,
} from "react-icons/fa6";
import { ButtonGroup } from "react-bootstrap";
import { rubik } from "@/utils/Fonts";

const Footer = ({ blok }: { blok: FooterStoryblok }) => (
  <footer {...storyblokEditable(blok)}>
    <Container>
      <Row>
        {/* FOOTER CALL TO ACTION BUTTONS */}
        <Col sm={10} md={6} lg={4} xl={4} className="pb-4">
          <ButtonGroup vertical size="lg" className="w-100">
            <Link
              href="/reminders"
              className={`btn btn-dark btn-lg ${rubik.className} fw-bolder text-start lh-sm mb-1`}
            >
              <FaBell className="me-2" />
              Join the voting movement
            </Link>
            <Link
              href="/constituencies"
              className={`btn btn-dark btn-lg ${rubik.className} fw-bolder text-start lh-sm mb-1`}
            >
              <FaMagnifyingGlass className="me-2" />
              Browse constituencies
            </Link>
            <a
              href="https://themovementforward.com/volunteer/"
              target="_blank"
              rel="noreferrer"
              className={`btn btn-dark btn-lg ${rubik.className} fw-bolder text-start lh-sm mb-1`}
            >
              <FaPuzzlePiece className="me-2" />
              Volunteer
            </a>
            <Link
              href="/downloads"
              className={`btn btn-dark btn-lg ${rubik.className} fw-bolder text-start lh-sm mb-1`}
            >
              <FaFileArrowDown className="me-2" />
              Downloads and resources
            </Link>
          </ButtonGroup>
        </Col>

        {/* QR CODE */}
        <Col sm={10} md={5} lg={3} xl={4} className="pb-4 px-xl-5">
          <a
            href="https://shop.mvtfwd.com/stickers"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src={mvmtFrwdQrCode}
              alt="Movement Forward QR Code"
              style={{ width: "100%", height: "auto" }}
              placeholder="blur"
            />
          </a>
        </Col>

        <Col sm={10} md={10} lg={5} xl={4} className="pb-4">
          {/* MOVEMENT FORWARD LOGO */}
          <p>
            <a href="https://mvtfwd.com/links" target="_blank" rel="noreferrer">
              <Image
                src={mvmtFrwdLogo}
                alt="Movement Forward Logo"
                style={{ width: "4rem", height: "4rem" }}
                placeholder="blur"
              />
              <span className="mx-2 fw-bold">@MVTFWD</span>
            </a>
          </p>

          {/* MOVEMENT FORWARD SOCIAL LINKS */}
          <ul className="list-inline my-3">
            <li className="list-inline-item">
              <a
                href="https://twitter.com/mvtfwd"
                target="_blank"
                rel="noreferrer"
              >
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
            <br />© 2024 Forward Democracy Limited
          </p>
          <p className="my-3">
            {/* FOOTER LINKS */}
            {blok.links.map((link) => (
              <StoryblokComponent blok={link} key={link._uid} />
            ))}
          </p>
          <p className="my-3 small">
            We don&apos;t use cookies on this website.
          </p>
        </Col>
      </Row>
    </Container>

    <section className="footer-dark" style={{ fontSize: "14px" }}>
      <Container>
        <Row>
          <Col xs="auto">
            {/* POSTCODE LOOKUP ATTRIBUTION */}
            <p className="mb-1">
              Postcode lookup contains data from{" "}
              <a
                href="https://democracyclub.org.uk/"
                target="_blank"
                rel="noreferrer"
              >
                DemocracyClub
              </a>
              , the{" "}
              <a
                href="https://geoportal.statistics.gov.uk/datasets/3700342d3d184b0d92eae99a78d9c7a3/about"
                target="_blank"
                rel="noreferrer"
              >
                ONS
              </a>{" "}
              &{" "}
              <a
                href="https://pages.mysociety.org/2025-constituencies/datasets/parliament_con_2025/0_1_4"
                target="_blank"
                rel="noreferrer"
              >
                MySociety
              </a>
            </p>
            <ul>
              <li>
                Contains OS data © Crown copyright and database right 2024
              </li>
              <li>
                Contains Royal Mail data © Royal Mail copyright and Database
                right 2024
              </li>
              <li>
                Contains GeoPlace data © Local Government Information House
                Limited copyright and database right 2024
              </li>
              <li>
                Source: Office for National Statistics licensed under the Open
                Government Licence v.3.0
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </section>
  </footer>
);

export default Footer;
