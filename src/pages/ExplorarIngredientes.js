import React, { useContext, useEffect } from 'react';
import { CardDeck, Card } from 'react-bootstrap';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContextRecipes from '../context/ContextRecipes';

const MAX_CARDS = 12;

const ExplorarIngredientes = () => {
  const {
    setBarraBuscar, setHeaderInfo, ingredientsList, setType,
  } = useContext(ContextRecipes);
  const history = useHistory();
  const type = history.location.pathname.includes('bebidas') ? 'bebidas' : 'comidas';

  const url = type === 'bebidas' ? 'thecocktaildb' : 'themealdb';
  const one = type === 'bebidas' ? 1 : '';

  useEffect(() => {
    setType(type);
  }, [type, setType]);

  function onClickHandler(food) {
    setBarraBuscar(food);
    history.push(`/${type}`);
  }

  useEffect(() => {
    setHeaderInfo({ pageTitle: 'Explorar Ingredientes', showSearchIcon: false });
  }, [setHeaderInfo]);

  return (
    <section className="w-100 bg-dark cardHeigth2">
      <Header />
      <div className="cardBody">
        <CardDeck className="m-2 d-flex flex-row flex-wrap justify-content-center">
          {
            ingredientsList && ingredientsList.map((ingredient, index) => {
              if (index < MAX_CARDS) {
                const call = `strIngredient${one}`;
                const ingredientName = ingredient[call];
                const buscarIngredient = {
                  input: ingredientName,
                  radio: 'ingredientes',
                };
                return (
                  <Card
                    key={ index }
                    data-testid={ `${index}-ingredient-card` }
                    className="col-5 m-2"
                    onClick={ () => onClickHandler(buscarIngredient) }
                  >
                    <Card.Img
                      variant="top"
                      data-testid={ `${index}-card-img` }
                      src={ `https://www.${url}.com/images/ingredients/${ingredientName}-Small.png` }
                    />
                    <Card.Body>
                      <Card.Title data-testid={ `${index}-card-name` }>
                        { ingredientName }
                      </Card.Title>
                    </Card.Body>
                  </Card>
                );
              }
              return false;
            })
          }
        </CardDeck>
      </div>
      <Footer />
    </section>
  );
};

export default ExplorarIngredientes;
