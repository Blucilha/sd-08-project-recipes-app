import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as InProgressRecipesActions } from '../store/ducks/inProgressRecipes';
import * as mealApi from '../services/mealApi';

import previousIcon from '../images/previousIcon.svg';

import LoadingScreen from '../components/LoadingScreen';
import PrimaryButton from '../components/PrimaryButton';
import RecipeHeader from '../components/RecipeHeader';
import RecipeIngredients from '../components/RecipeIngredients';
import RecipeInstructions from '../components/RecipeInstructions';
import RecipeVideo from '../components/RecipeVideo';

import styles from '../styles/pages/MealsDetails.module.css';
import CocktailRecipeRecommendations from '../components/CocktailRecipeRecommendations';

const MealsDetails = ({ addMeal, meals }) => {
  const { id } = useParams();
  const [meal, setMeal] = useState({});
  const [isFetching, setIsFetching] = useState(true);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [recipeInProgress, setRecipeInProgress] = useState(false);
  const history = useHistory();

  useEffect(() => {
    mealApi.getById(id).then((response) => {
      setMeal(response.meals[0]);
      setIsFetching(false);
    });
  }, []);

  useEffect(() => {
    console.log('changing meal', meal, meals);
    setRecipeInProgress(meals.some((currentMeal) => (
      meal.idMeal === currentMeal.idMeal)));
  });

  useEffect(() => {
    const ingredientKeys = Object.keys(meal)
      .filter((item) => item.includes('Ingredient'));
    const measureKeys = Object.keys(meal).filter((item) => item.includes('Measure'));
    const measureList = measureKeys.map((measure) => meal[measure])
      .filter((item) => item !== '' && item !== null);
    const ingredientList = ingredientKeys.map((key) => meal[key])
      .filter((item) => item !== '' && item !== null);
    setIngredients(ingredientList);
    setMeasures(measureList);
  }, [meal]);

  function handleStartRecipe() {
    addMeal(meal);
    history.push(`/comidas/${meal.idMeal}/in-progress`);
  }

  if (isFetching) return <LoadingScreen />;

  return (
    <div className={ styles.mealsDetails }>
      <Link className={ styles.homeButton } to="/comidas">
        <img src={ previousIcon } alt="Meals button icon" />
      </Link>

      <img
        src={ meal.strMealThumb }
        alt={ meal.strMeal }
        className={ styles.photo }
        data-testid="recipe-photo"
      />

      <div className={ styles.mealsDetailsContainer }>
        <RecipeHeader title={ meal.strMeal } category={ meal.strCategory } />
        <RecipeIngredients ingredients={ ingredients } measures={ measures } />
        <RecipeInstructions instructions={ meal.strInstructions } />
        <RecipeVideo src={ meal.strYoutube.replace('watch?v=', 'embed/') } />
        <CocktailRecipeRecommendations />
        <div data-testid="start-recipe-btn" className={ styles.floatButton }>
          <PrimaryButton
            onClick={ handleStartRecipe }
          >
            { recipeInProgress ? 'Continuar Receita' : 'Iniciar Receita' }
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

MealsDetails.propTypes = {
  addMeal: PropTypes.func.isRequired,
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = ({ inProgressRecipes }) => ({
  meals: inProgressRecipes.meals,
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators(InProgressRecipesActions, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(MealsDetails);
