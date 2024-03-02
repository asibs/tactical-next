import Image from "next/image";

import { rubik } from "@/utils/Fonts";
import { Col, Container, Row } from "react-bootstrap";

import asifKapadia from "@/assets/supporter_portraits/asif-kapadia-540.webp";
import carolVorderman from "@/assets/supporter_portraits/carol-vorderman-540.webp";
import dannyPrice from "@/assets/supporter_portraits/danny-price-540.webp";
import emmaKennedy from "@/assets/supporter_portraits/emma-kennedy-540.webp";
import femiOluwole from "@/assets/supporter_portraits/femi-oluwole-540.webp";
import grahamHughes from "@/assets/supporter_portraits/graham-hughes-540.webp";
import joshRussell from "@/assets/supporter_portraits/josh-russell-540.webp";
import lizWebster from "@/assets/supporter_portraits/liz-webster-540.webp";
import marinaPurkiss from "@/assets/supporter_portraits/marina-purkiss-540.webp";
import patsyStevenson from "@/assets/supporter_portraits/patsy-stevenson-540.webp";
import seanAdams from "@/assets/supporter_portraits/sean-adams-540.webp";
import supertanskiii from "@/assets/supporter_portraits/supertanskiii-540.webp";
import { StaticImageData } from "next/image";



const MovementSection = () => {
  const people = {
    "Asif Kapadia": { "image": asifKapadia },
    "Carol Vorderman": { "image": carolVorderman },
    "Danny Price": { "image": dannyPrice },
    "Emma Kennedy": { "image": emmaKennedy },
    "Femi Oluwole": { "image": femiOluwole },
    "Graham Hughes": { "image": grahamHughes },
    "Patsy Stevenson": { "image": patsyStevenson },
    "Sean Adams": { "image": seanAdams },
    "Liz Webster": { "image": lizWebster },
    "Marina Purkiss": { "image": marinaPurkiss },
    "Supertanskiii": { "image": supertanskiii },
    "Josh Russell": { "image": joshRussell }
  }

  return (
    <section id="section-movement" className="section-light">
      <Container className="py-4 py-md-5">

        {/* PEOPLE */}
        <Row>
          <Col className="pb-3 pb-md-5">
            <h2 className={`${rubik.className} fw-bolder fs-1`}>Join A Movement building voter power, beyond this election.</h2>
          </Col>
        </Row>

        <Row xs={4} md={6} className="g-0 mb-4 mb-md-5" style={{ margin: "0px calc(50% - 50vw)", width: "100vw" }}>
          {Object.keys(people).map((name) => {
            // TS isn't smart enough to work out name is just the keys from the people object,
            // so thinks name might not be a valid key...
            // @ts-expect-error
            const image: StaticImageData = people[name]["image"];

            return (
              <Col>
                <Image src={image} alt={`Photo of ${name}`} style={{ width: "100%", height: "100%" }} />
              </Col>
            )
          })}
        </Row>

        {/* PLAN */}
        <Row xs={1} md={2}>
          <Col>
            <h3 className={`${rubik.className} fw-bolder fs-5`}>We show up</h3>
            <h4 className={`${rubik.className} fw-bolder fs-2`}>To get the tories out</h4>
            <p>In many places around the country, if we vote together for the most likely candidate to beat the Tory, out votes demolish them into tiny numbers.</p>
          </Col>
          <Col>
            <h3 className={`${rubik.className} fw-bolder fs-5`}>We stick together</h3>
            <h4 className={`${rubik.className} fw-bolder fs-2`}>To influence the next government</h4>
            <p>A bigger influence on the next government than the media that currently shape the narrative. We stick together offering our votes for the changes we want.</p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default MovementSection;