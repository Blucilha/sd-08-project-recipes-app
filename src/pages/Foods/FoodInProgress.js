import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from '../../context/Context';
import Recommendations from '../../component/Recommendations';
import { FavoriteButton, ShareDisplay } from '../../component';

export default function FoodInProgress({ match: { params: { id } } }) {
  const { recipeDetail, setSearchParams } = useContext(Context);
  const history = useHistory();
  const [recipe, setRecipe] = useState();

  useEffect(() => {
    setSearchParams({
      searchInput: id,
      selectedParameter: 'recipe',
      location: history.location.pathname,
    });
  }, [setSearchParams, history.location.pathname, id]);

  useEffect(() => setRecipe(...recipeDetail), [recipeDetail, setRecipe]);

  if (!recipe) return <div>Carregando...</div>;

  const {
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
    strArea,
  } = recipe;

  const ingredients = Object.keys(recipe)
    .filter((prop) => prop.includes('strIngredient'))
    .map((ingredient) => recipe[ingredient])
    .filter((ingredient) => ingredient);

  const measures = Object.keys(recipe)
    .filter((prop) => prop.includes('strMeasure'))
    .map((measure) => recipe[measure])
    .filter((measure) => measure);

  return (
    <>
      <img data-testid="recipe-photo" src={ strMealThumb } alt="Recipe Done" />
      <h1 data-testid="recipe-title">{ strMeal }</h1>
      <ShareDisplay />
      <FavoriteButton
        recipeInfo={ {
          id,
          type: 'comida',
          area: strArea,
          category: strCategory,
          alcoholicOrNot: '',
          name: strMeal,
          image: strMealThumb,
        } }
      />
      <h5 data-testid="recipe-category">{ strCategory }</h5>
      {ingredients.map((ingredient, index) => (
        <div key={ index } data-testid={ `${index}-ingredient-step` }>
          <input type="checkbox" />
          <p>
            {`-${ingredient} - ${measures[index]}`}
          </p>
        </div>
      ))}
      <p data-testid="instructions">{ strInstructions }</p>
      <Link
        to="/receitas-feitas"
        data-testid="finish-recipe-btn"
      >
        Finalizar Receita
      </Link>
      <Recommendations />
    </>
  );
}

FoodInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
