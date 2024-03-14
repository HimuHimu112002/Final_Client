import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
const HeroSection = () => {

  return (
    <Container className='hero__Bg--color mt-5'>
        <Row>
            <Col className='hero__left--content' md="6">
                <div>
                    <h2>Fast Deliver Your Trusted Product To Your Door Step</h2>
                    <p>Authentic Product, Quick Service, Fast Delivery</p>
                </div>
            </Col>

            <Col md="6">
                <img className='img-fluid w-100' src='image/bannerLogo.png'/>
            </Col>
        </Row>
    </Container>
  )
}
export default HeroSection