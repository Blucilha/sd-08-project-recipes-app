import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderP from '../components/HeaderP';
import Context from '../context/Context';
import { fetchListByFilter } from '../services/RequisicaoApi';
import '../styles/ExplorarIngredientes.css';

const TWELVE_INGREDIENTS = 12;

function IngredientesBebidas() {
  const { setInputText, setRadioValue, requestApiData } = useContext(Context);

  const [ingredients, setIngredients] = useState(null);
  const [redirect, setRedirect] = useState(false);

  function handleClick(e) {
    setInputText(e.currentTarget.id);
    setRadioValue('i');
    setRedirect(true);
  }

  async function getIngredients() {
    setIngredients(await fetchListByFilter('thecocktaildb', 'i'));
  }

  useEffect(() => {
    requestApiData('thecocktaildb');
  }, [requestApiData]);

  useEffect(() => {
    getIngredients();
  }, []);

  if (redirect) return <Redirect to="/bebidas" />;

  return (
    <>
      <HeaderP title="Explorar Ingredientes" />
      <main className="ingredients-main-container">
        { ingredients && (
          ingredients.drinks.slice(0, TWELVE_INGREDIENTS).map((ingredient, index) => (
            <button
              className="ingredient-card"
              data-testid={ `${index}-ingredient-card` }
              id={ ingredient.strIngredient1 }
              key={ index }
              onClick={ handleClick }
              type="button"
            >
              <p data-testid={ `${index}-card-name` }>{ ingredient.strIngredient1 }</p>
              <img
                alt="ingredient"
                className="ingredient-img"
                data-testid={ `${index}-card-img` }
                src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
              />
            </button>
          ))
        )}
      </main>
      <Footer />
    </>
  );
}

export default IngredientesBebidas;
