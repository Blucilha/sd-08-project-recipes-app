import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import '../styles/RecipeList.css';

const FIRST_TWELVE_RECIPES = 12;
function RecipeList({ route, recipeType, endpoint }) {
  const {
    isFetching,
    apiReturn,
    requestApiData,
    filteredRecipes,
    toggle,
  } = useContext(Context);

  const history = useHistory();

  useEffect(() => {
    requestApiData(endpoint);
  }, []);
  function renderNoRecipeMessage() {
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    return <p>Nenhuma Receita Encontrada</p>;
  }
  function list(recipes) {
    function redirectToDetails(id) {
      history.push(`/${route}/${id}`);
    }
    return (
      <section>
        {recipes
          && recipes.length
          && recipes.slice(0, FIRST_TWELVE_RECIPES).map((recipe, index) => (
            <div
              data-testid={ `${index}-recipe-card` }
              key={ recipe[`id${recipeType}`] }
              onClick={ () => redirectToDetails(recipe[`id${recipeType}`]) }
              onKeyPress={ () => redirectToDetails(recipe[`id${recipeType}`]) }
              role="button"
              tabIndex="0"
              style={ { cursor: 'pointer' } }
            >
              <p data-testid={ `${index}-card-name` }>
                {recipe[`str${recipeType}`]}
              </p>
              <img
                className="recipe-img"
                data-testid={ `${index}-card-img` }
                src={ recipe[`str${recipeType}Thumb`] }
                alt="recipe thumbnail"
              />
            </div>
          ))}
      </section>
    );
  }

  function renderRecipeList() {
    const recipes = toggle
      ? Object.values(filteredRecipes)[0]
      : Object.values(apiReturn[0])[0];
    // if (recipes !== null && recipes.length === 1) {
    //   return <Redirect to={ `/${route}/${recipes[0][`id${recipeType}`]}` } />;
    // }
    return recipes ? list(recipes) : renderNoRecipeMessage();
  }
  return apiReturn && (isFetching ? <p>Loading...</p> : renderRecipeList());
}
export default RecipeList;
