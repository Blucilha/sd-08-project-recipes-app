import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Cards from '../Cards';

// import { Container } from './styles';
function CardsArea({ type }) {
  const { meals } = useSelector((state) => state.foods);
  const { drinks } = useSelector((state) => state.drinks);
  const TWELVE_CARDS = 12;

  const foodDrinks = (name) => {
    let nameString = '';
    if (name === 'comidas') {
      nameString = 'comidas';
    }
    if (name === 'bebidas') {
      nameString = 'bebidas';
    }
    return nameString;
  };

  if (type === 'foods') {
    return (
      <Container
        className="d-flex flex-row flex-wrap align-items-center justify-content-center"
      >
        { !meals ? <p> nada por aqui! </p>
        && alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
          : meals.map(
            ({ strMeal, strMealThumb, idMeal }, index) => (
              index < TWELVE_CARDS && (
                <Cards
                  key={ strMeal }
                  name={ strMeal }
                  thumbSrc={ strMealThumb }
                  index={ index }
                  id={ idMeal }
                />)),
          )}
      </Container>
    );
  }
  if (type === 'drinks') {
    return (
      <Container
        className="d-flex flex-row flex-wrap align-items-center justify-content-center"
      >
        { !drinks ? <p> nada por aqui! </p>
        && alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
          : drinks.map(
            ({ strDrink, strDrinkThumb, idDrink }, index) => (
              index < TWELVE_CARDS && (
                <Cards
                  key={ strDrink }
                  name={ strDrink }
                  thumbSrc={ strDrinkThumb }
                  index={ index }
                  id={ idDrink }
                />)),
          )}
      </Container>
    );
  }
}

export default CardsArea;

CardsArea.propTypes = {
  type: PropTypes.string.isRequired,
};
