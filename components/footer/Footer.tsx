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
import { Button, ButtonGroup } from "react-bootstrap";
import { rubik } from "@/utils/Fonts";

const Footer = ({ blok }: { blok: FooterStoryblok }) => (
  <>
    <footer {...storyblokEditable(blok)}>
      <Container>
        <Row>
          {/* QR CODE */}
          <Col sm={10} md={5} lg={3} xl={4} className="pb-4 px-xl-5">
            <a
              className="footer-qr"
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

          <Col sm={10} md={10} lg={5} xl={4} className="pb-3">
            {/* MOVEMENT FORWARD LOGO */}
            <p>
              <span className="d-flex">
                <a
                  href="https://mvtfwd.com/links"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src={mvmtFrwdLogo}
                    alt="Movement Forward Logo"
                    style={{ width: "4rem", height: "4rem" }}
                    placeholder="blur"
                  />
                  <span className="mx-2">@MVTFWD</span>
                </a>
              </span>
            </p>

            {/* MOVEMENT FORWARD SOCIAL LINKS */}
            <ul className="list-inline my-3">
              <li className="list-inline-item">
                <a
                  href="https://twitter.com/mvtfwd"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaSquareTwitter
                    style={{
                      width: "2rem",
                      height: "2rem",
                    }}
                  />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="https://facebook.com/mvtfwd" target="_blank">
                  <FaSquareFacebook
                    style={{
                      width: "2rem",
                      height: "2rem",
                    }}
                  />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="https://instagram.com/mvtfwd" target="_blank">
                  <FaSquareInstagram
                    style={{
                      width: "2rem",
                      height: "2rem",
                    }}
                  />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="https://threads.net/mvtfwd" target="_blank">
                  <FaSquareThreads
                    style={{
                      width: "2rem",
                      height: "2rem",
                    }}
                  />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="https://mvtfwd.com/whatsapp" target="_blank">
                  <FaSquareWhatsapp
                    style={{
                      width: "2rem",
                      height: "2rem",
                    }}
                  />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="https://mvtfwd.com/volunteer" target="_blank">
                  <FaDiscord
                    style={{
                      width: "2.4rem",
                      height: "2.4rem",
                    }}
                  />
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
          <Col sm={10} md={6} lg={4} xl={4} className="order-lg-first">
            <CallToAction />
          </Col>
        </Row>

        <SmallPrint />
      </Container>
    </footer>
    <a className="btn btn-sm disabled brand-tag" role="button">
      @MVTFWD
    </a>
  </>
);

const SmallPrint = () => (
  <Row>
    <Col className="py-4">
      {/* POSTCODE LOOKUP ATTRIBUTION */}
      <p className="small">
        Postcode lookup contains data from&nbsp;
        <a
          href="https://democracyclub.org.uk/"
          target="_blank"
          rel="noreferrer"
        >
          <strong>
            <span
              style={{
                color:
                  "rgba(var(--bs-link-color-rgb),var(--bs-link-opacity,1))",
              }}
            >
              DemocracyClub
            </span>
          </strong>
        </a>
        , the&nbsp;
        <a
          href="https://geoportal.statistics.gov.uk/datasets/3700342d3d184b0d92eae99a78d9c7a3/about"
          target="_blank"
          rel="noreferrer"
        >
          <strong>
            <span
              style={{
                color:
                  "rgba(var(--bs-link-color-rgb),var(--bs-link-opacity,1))",
              }}
              rel="noreferrer"
            >
              ONS
            </span>
          </strong>
        </a>
        &nbsp;&amp;&nbsp;
        <a
          href="https://pages.mysociety.org/2025-constituencies/datasets/parliament_con_2025/0_1_4"
          target="_blank"
        >
          <strong>
            <span
              style={{
                color:
                  "rgba(var(--bs-link-color-rgb),var(--bs-link-opacity,1))",
              }}
              rel="noreferrer"
            >
              MySociety
            </span>
          </strong>
        </a>
        .&nbsp;Contains OS data © Crown copyright and database right 2024.
        Contains Royal Mail data © Royal Mail copyright and Database right
        2024. Contains GeoPlace data © Local Government Information House
        Limited copyright and database right 2024. Source: Office for National
        Statistics licensed under the Open Government Licence v.3.0
      </p>
    </Col>
  </Row>
);

const CallToAction = () => (
  <ButtonGroup vertical size="lg" className="w-100">
    <Button variant="dark" size="lg" className={rubik.className} href="/join">
      <FaBell className="me-2" />
      Join the voting movement
    </Button>
    <Button
      variant="dark"
      size="lg"
      className={rubik.className}
      href="/constituencies"
    >
      <FaMagnifyingGlass className="me-2" />
      Browse constituencies
    </Button>
    <Button
      variant="dark"
      size="lg"
      rel="noreferrer"
      className={rubik.className}
      target="_blank"
      href="https://themovementforward.com/volunteer/"
    >
      <FaPuzzlePiece className="me-2" />
      Volunteer
    </Button>
    <Button
      variant="dark"
      size="lg"
      rel="noreferrer"
      className={rubik.className}
      href="/downloads"
    >
      <FaFileArrowDown className="me-2" />
      Downloads and resources
    </Button>
  </ButtonGroup>
);
export default Footer;
