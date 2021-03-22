import React from 'react';
import { Col, Container, Nav, Row } from 'react-bootstrap';

import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <Container fluid style={ { bottom: '0px', position: 'fixed' } } data-testid="footer">
      <Row
        style={ { backgroundColor: 'lightgray',
          textAlign: 'center',
          justifyContent: 'space-around' } }
      >
        <Nav.Link href="/bebidas">
          <Col>
            <img src={ drinkIcon } alt="Perfil" data-testid="drinks-bottom-btn" />
          </Col>
        </Nav.Link>
        <Nav.Link href="/explorar">
          <Col>
            <img src={ exploreIcon } alt="Perfil" data-testid="explore-bottom-btn" />
          </Col>
        </Nav.Link>
        <Nav.Link href="/comidas">
          <Col>
            <img src={ mealIcon } alt="Perfil" data-testid="food-bottom-btn" />
          </Col>
        </Nav.Link>
      </Row>
    </Container>
  );
}

export default Footer;
