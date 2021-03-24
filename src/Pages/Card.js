import React from 'react';
import { Card, Nav } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import propTypes from 'prop-types';

function CardItens({ name, image, index, id, food = 'false', drink = 'false' }) {
  const history = useHistory();
  const historyPush = (idPage) => {
    if (food === 'true') {
      history.push(`/comidas/${idPage}`);
    } else if (drink === 'true') {
      history.push(`/bebidas/${idPage}`);
    }
  };
  return (
    <Nav.Link onClick={ () => historyPush(id) }>
      <Card
        style={ {
          width: '20rem',
          marginTop: '20px',
          boxShadow: 'rgba(0, 0, 0, 0.50) 0px 5px 15px',
        } }
        data-testid={ `${index}-recipe-card` }
      >
        <Card.Img
          variant="top"
          src={ image }
          data-testid={ `${index}-card-img` }
        />
        <Card.Body>
          <Card.Title data-testid={ `${index}-card-name` }>{name}</Card.Title>
        </Card.Body>
      </Card>
    </Nav.Link>
  );
}

CardItens.propTypes = {
  name: propTypes.string.isRequired,
  image: propTypes.string.isRequired,
  index: propTypes.number.isRequired,
  id: propTypes.string.isRequired,
  food: propTypes.string,
  drink: propTypes.string,
};

CardItens.defaultProps = {
  food: 'default',
  drink: 'default',
};

export default CardItens;
