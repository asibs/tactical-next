import React from 'react'

import festivalCrowsBackground from '../assets/header-crowd-background-bw.jpg'
import { Container, Row, Col } from 'react-bootstrap';

interface Props {
  backgroundImage: string,
  children: React.ReactNode
}

export default function Header({ backgroundImage, children }: Props) {
  let imageUrl = ""
  switch (backgroundImage) {
    case "FESTIVAL_CROWD":
      imageUrl = festivalCrowsBackground.src;
      break;
  }

  const headerStyle = (imageUrl
    ? { background: `var(--bs-black) url(${imageUrl}) center / cover no-repeat` }
    : {}
  )

  return (
    <header className="bg-black" style={headerStyle}>
      <Container fluid className="py-4 py-md-5">
        <Row>
          <Col xs={12} md={8} className="offset-0 offset-md-2 d-md-flex align-items-md-center">
            <div>
              {children}
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  )
}
