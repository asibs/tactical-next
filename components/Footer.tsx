import { storyblokEditable } from "@storyblok/react/rsc";
import { FooterStoryblok } from "@/storyblok/types/storyblok-types";
import Link from "next/link";
import Image from "next/image";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import mvmtFrwdLogo from '../assets/movement-forward-logo-bw.png'

import { FaSquareFacebook } from "react-icons/fa6";

const Footer = ({ blok }: { blok: FooterStoryblok }) => (
  <footer {...storyblokEditable(blok)}>

    <Container>
      <Row>
        <Col>
          <a href="https://mvtfwd.com/links" target="_blank" rel="noreferrer">
            <span>
              <Image src={mvmtFrwdLogo} alt="Movement Forward logo" style={{ width: "3rem", height: "3rem" }} />
            </span>
            <span>@MVTFWD</span>
          </a>
        </Col>
        <Col>Foo</Col>
        <Col>Bar</Col>
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
            <a href="https://twitter.com/mvtfwd" target="_blank" rel="noreferrer">
              {/* <Image src={twitterSquare} alt="Follow us on Twitter" width={32} height={32} /> */}
            </a>
          </li>
          <li className="list-inline-item">
            <a href="https://facebook.com/mvtfwd" target="_blank" rel="noreferrer">
              <FaSquareFacebook />
            </a>
          </li>
          <li className="list-inline-item">
            <a href="https://instagram.com/mvtfwd" target="_blank" rel="noreferrer">
              {/* <Image src={instagramSquare} alt="Follow us on Instagram" width={32} height={32} /> */}
            </a>
          </li>
        </ul>
      </div>

      {/* COPYRIGHT NOTICE */}
      <p className="my-3">© 2023 Forward Democracy Limited</p>
      <p className="my-3">
        <Link href="/donate" className="btn btn-primary btn-sm me-2" role="button">Donate</Link>
        <Link href="/about" className="btn btn-link btn-sm me-2" role="button">About</Link>
        <Link href="/contact" className="btn btn-link btn-sm me-2" role="button">Contact</Link>
        <a href="https://themovementforward.com/privacy/" target="_blank" rel="noreferrer" className="btn btn-link btn-sm me-2" role="button">Privacy</a>
      </p>
    </div>
  </footer>
);

export default Footer;
