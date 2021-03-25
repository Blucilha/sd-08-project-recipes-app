import React, { Component } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { Redirect } from 'react-router';
import fav from '../images/blackHeartIcon.svg';
import notFav from '../images/whiteHeartIcon.svg';
import share from '../images/shareIcon.svg';
import { addFoodToFavorite, continueRecipe, fetchFoodApiById, fetchDrinkRecomendation,
  getIngredientList, isFavoriteRecipe, recipeIsDone } from '../helpers';
import RecomendationCard from './RecomendationCard';
import './generico.css';
import IngredientList from './IngredientList';

class GenericoComidas extends Component {
  constructor() {
    super();
    this.state = {
      redirectTo: '',
      currentRecipe: '',
      currentVideo: '',
      ingredientList: {},
      recomendations: [],
      isThisRecipeDone: false,
      continueThisRecipe: false,
      favoriteRecipe: false,
    };
    this.fetchFoodRecipe = this.fetchFoodRecipe.bind(this);
    this.redirectToPage = this.redirectToPage.bind(this);
    this.fetchApi = this.fetchApi.bind(this);
    this.favoriteThisItem = this.favoriteThisItem.bind(this);
  }

  componentDidMount() {
    this.fetchApi();
  }

  fetchApi() {
    this.setState({ redirectTo: '' });
    const { match: { params: { id } } } = this.props;
    this.fetchFoodRecipe(id);
  }

  async fetchFoodRecipe(foodId) {
    const recipe = await fetchFoodApiById(foodId);
    const ingredients = getIngredientList(recipe);
    const recomendation = await fetchDrinkRecomendation();
    const youtubeVideo = recipe.strYoutube.replace('watch?v=', 'embed/');
    const finishedRechipe = recipeIsDone(foodId);
    const alreadyStartedThisRecipe = continueRecipe(foodId, 'comidas');
    const isFavorite = isFavoriteRecipe(foodId);
    this.setState({
      ingredientList: ingredients,
      recomendations: recomendation,
      currentVideo: youtubeVideo,
      currentRecipe: recipe,
      displayShareMesage: false,
      isThisRecipeDone: finishedRechipe,
      continueThisRecipe: alreadyStartedThisRecipe,
      favoriteRecipe: isFavorite,
    });
  }

  share() {
    copy(window.location);
    const SHOW_TIME = 3000;
    this.setState({ displayShareMesage: true }, () => {
      setTimeout(() => this.setState({ displayShareMesage: false }), SHOW_TIME);
    });
  }

  redirectToPage(page) {
    this.setState({ redirectTo: page });
  }

  favoriteThisItem() {
    const { currentRecipe } = this.state;
    const done = addFoodToFavorite(currentRecipe, 'comida');
    this.setState({ favoriteRecipe: done });
  }

  render() {
    const { currentRecipe, currentVideo, isThisRecipeDone,
      ingredientList, recomendations, displayShareMesage,
      continueThisRecipe, redirectTo, favoriteRecipe } = this.state;
    const { match: { params: { id } } } = this.props;

    if (redirectTo) {
      return <Redirect to={ redirectTo } />;
    }

    return (
      <div>
        <img
          src={ currentRecipe.strMealThumb }
          alt=""
          data-testid="recipe-photo"
        />
        <h1 data-testid="recipe-title">
          {currentRecipe.strMeal}
        </h1>
        {currentRecipe.strDrink && <h2>{}</h2>}
        <span data-testid="recipe-category">
          {currentRecipe.strCategory}
        </span>
        <button
          type="button"
          onClick={ () => this.share() }
        >
          <img
            src={ share }
            alt="share"
            data-testid="share-btn"
          />
        </button>
        <button
          type="button"
          onClick={ this.favoriteThisItem }
        >
          <img
            src={ favoriteRecipe ? fav : notFav }
            alt="share"
            data-testid="favorite-btn"
          />
        </button>
        {displayShareMesage && <span>Link copiado!</span>}
        <h2>Ingredientes</h2>
        {ingredientList && <IngredientList ingredientList={ ingredientList } />}
        <div data-testid="instructions">{currentRecipe.strInstructions}</div>
        {window.location.href.includes('comidas') && <iframe
          width="683"
          height="384"
          title="video"
          src={ currentVideo }
          data-testid="video"
        />}
        {recomendations
              && <RecomendationCard
                recomendations={ recomendations }
                redirectToPage={ this.redirectToPage }
              />}
        {!isThisRecipeDone
        && (
          <button
            className="start-recipe"
            type="button"
            data-testid="start-recipe-btn"
            onClick={ () => {
              this.redirectToPage(`/comidas/${id}/in-progress`);
            } }
          >
            {continueThisRecipe ? 'Continuar Receita' : 'Iniciar receita'}
          </button>
        )}
      </div>
    );
  }
}

GenericoComidas.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default GenericoComidas;
