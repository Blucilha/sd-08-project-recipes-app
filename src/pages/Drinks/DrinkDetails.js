import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import copy from 'clipboard-copy';
import useDrinkDetailsHook from '../hooks/useDrinkDetailsHook';
import { FoodCtx } from '../../context/ContextFood';
import CarouselCard from '../../components/Card/CarouselCard';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import useFavoritesHook from '../hooks/useFavoritesHook';

function DrinkDetails(props) {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { match: { params: { id } } } = props;
  const { foodApi: { meals } } = useContext(FoodCtx);
  const [favorites, updateFavorites] = useFavoritesHook();
  const STOP_INDEX = 5;
  const [
    setId,
    strIBA,
    strDrinkThumb,
    strDrink,
    strCategory,
    strInstructions,
    ingredientsAndMeasuresList,
    strAlcoholic,
  ] = useDrinkDetailsHook();

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  }, []);

  useEffect(() => {
    setId(id);
  }, [id, setId]);

  function handleClick() {
    copy(window.location.href);
    setCopied(true);
  }

  useEffect(() => {
    console.log('favoritos:', favorites);
    function checkIsFavorite() {
      return favorites
        .find((fav) => fav.id === id)
        ? setIsFavorite(true)
        : setIsFavorite(false);
    }
    checkIsFavorite();
  }, [id, favorites]);

  function handleFavorite() {
    const newRecipe = {
      id,
      type: 'bebida',
      area: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
    };
    updateFavorites(newRecipe, isFavorite);
    setIsFavorite(!isFavorite);
  }

  return (
    <>
      { shouldRedirect && <Redirect to={ `/bebidas/${id}/in-progress` } /> }
      <div className="recipe-container">
        <h2 data-testid="recipe-title">{ strDrink }</h2>
        <span data-testid="recipe-category">
          { strCategory }
          <span>{ strAlcoholic }</span>
        </span>
        <div className="icons">
          <button type="button" data-testid="share-btn" onClick={ handleClick }>
            <img src={ shareIcon } alt="Compartilhar" />
            {copied && 'Link copiado!'}
          </button>
          <button
            type="button"
            onClick={ handleFavorite }
          >
            <img
              data-testid="favorite-btn"
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
              alt="Compartilhar"
            />
          </button>
        </div>
        <img
          className="detail-image"
          data-testid="recipe-photo"
          src={ strDrinkThumb }
          alt="Recipe pic"
        />
        <ul>
          { ingredientsAndMeasuresList
            .filter((ingr) => ingr !== '' && ingr !== null)
            .map(
              (ing, index) => (
                <li
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {ing}
                </li>),
            ) }
        </ul>
        <p data-testid="instructions">{ strInstructions }</p>
        {meals && meals
          .filter((meal, index) => index <= STOP_INDEX)
          .map((item, index) => (
            <CarouselCard
              key={ item.idMeal }
              id={ item.idMeal }
              name={ item.strMeal }
              img={ item.strMealThumb }
              index={ index }
            />

          ))}
        <button
          className="start-btn"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => setShouldRedirect(true) }
        >
          Iniciar
        </button>
      </div>
    </>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default DrinkDetails;
