/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Button,
} from '@material-ui/core';
import {
  Share as ShareIcon,
} from '@material-ui/icons';
import RecomendationsCarousel from '../../components/RecomendationsCarousel';
import {
  checkDoneRecipes,
  checkProgressRecipes,
  checkFavoriteRecipes,
} from '../../services/localStorage';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import './styles.css';

const DetailsDrink = () => {
  const NUMBER_OF_RECOMENDATIONS = 6;
  const { id } = useParams();
  const location = useLocation();
  const locationPath = location.pathname.replace(/\/(\w+)\/(.+)/, '$1');
  const history = useHistory();

  const [receipeDetails, setReceipeDetails] = useState('');
  const [recomendations, setRecomendations] = useState([]);
  const [bottomButtonText, setBottomButtonText] = useState('Iniciar receita');
  const [favorited, setFavorited] = useState(false);

  const receipeDetailsURL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const mealsURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const drinksURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  const fetchData = async (url, callback) => {
    const results = await fetch(url)
      .then((response) => response.json())
      .then((data) => data);
    callback(results);
  };

  useEffect(() => {
    fetchData(receipeDetailsURL, (results) => setReceipeDetails(results.drinks[0]));
  }, []);
  useEffect(() => {
    switch (locationPath) {
    case 'comidas':
      fetchData(drinksURL, (results) => setRecomendations(
        results.drinks.slice(0, NUMBER_OF_RECOMENDATIONS),
      ));
      break;
    case 'bebidas':
      fetchData(mealsURL, (results) => setRecomendations(
        results.meals.slice(0, NUMBER_OF_RECOMENDATIONS),
      ));
      break;
    default:
      break;
    }
  }, []);
  useEffect(() => {
    if (checkDoneRecipes('drink', id)) setBottomButtonText('');
    else if (checkProgressRecipes('drink', id)) setBottomButtonText('Continuar Receita');
  }, []);
  useEffect(() => {
    if (checkFavoriteRecipes('bebida', id)) setFavorited(true);
  }, [favorited]);

  const ingredientsList = () => {
    const MAX_NUMBER_OF_INGREDIENTS = 20;
    const arrayOfIngredients = [];
    for (let index = 1; index <= MAX_NUMBER_OF_INGREDIENTS; index += 1) {
      arrayOfIngredients.push(
        {
          ingredient: receipeDetails[`strIngredient${index}`],
          measure: receipeDetails[`strMeasure${index}`],
        },
      );
    }
    const filtered = arrayOfIngredients.filter((prop) => prop.ingredient);
    return filtered;
  };

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid item xs={ 12 }>
        {receipeDetails
          ? (
            <Card>
              <CardContent>
                <img
                  src={ receipeDetails.strDrinkThumb }
                  alt={ receipeDetails.idDrink }
                  data-testid="recipe-photo"
                />
                <Typography data-testid="recipe-title">
                  {receipeDetails.strDrink}
                </Typography>
                <Typography data-testid="recipe-category">
                  {receipeDetails.strAlcoholic}
                </Typography>
                {favorited
                  ? (
                    <Button
                      onClick={ () => setFavorited(false) }
                    >
                      <img
                        src={ blackHeartIcon }
                        style={ { width: 20 } }
                        alt="black heart"
                        data-testid="favorite-btn"
                      />
                    </Button>
                  )
                  : (
                    <Button
                      onClick={ () => setFavorited(true) }
                    >
                      <img
                        src={ whiteHeartIcon }
                        style={ { width: 20 } }
                        alt="white heart"
                        data-testid="favorite-btn"
                      />
                    </Button>
                  )}
                <Button
                  data-testid="share-btn"
                >
                  <ShareIcon />
                </Button>
                <List>
                  { ingredientsList().map((ingredientAndMeasure, index) => (
                    <ListItem key={ index }>
                      <ListItemText
                        primary={ ingredientAndMeasure.ingredient }
                        secondary={ ingredientAndMeasure.measure }
                        data-testid={ `${index}-ingredient-name-and-measure` }
                      />
                    </ListItem>
                  ))}
                </List>
                <Typography data-testid="instructions">
                  {receipeDetails.strInstructions}
                </Typography>
                { recomendations
                  ? <RecomendationsCarousel recomendations={ recomendations } />
                  : <p>Loading</p> }
                {bottomButtonText
                  ? (
                    <AppBar
                      data-testid="start-recipe-btn"
                      position="fixed"
                      color="primary"
                      style={ { top: 'auto', bottom: 0 } }
                    >
                      <Button
                        variant="contained"
                        onClick={ () => history.push(`/bebidas/${id}/in-progress`) }
                      >
                        {bottomButtonText}
                      </Button>
                    </AppBar>)
                  : null}
              </CardContent>
            </Card>)
          : <p>Loading</p> }
      </Grid>
    </Grid>
  );
};

export default DetailsDrink;