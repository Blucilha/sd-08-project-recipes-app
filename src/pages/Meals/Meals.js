import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getMeals } from '../../redux/actions';
import Card from '../../components/cards/MealCard';
import Categories from '../../components/Categorie/MealsCategories';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading/Loading';
import './Meals.scss';

function Comidas({ history }) {
  const QUANTITY_OF_CARDS = 12;
  let mealsFiltred = [];
  const dispatch = useDispatch();
  const meals = useSelector((state) => state.mealsReducer.meals);

  useEffect(() => {
    if (meals === undefined) dispatch(getMeals());
  }, [dispatch, meals]);

  if (meals) mealsFiltred = meals.filter((meal, index) => index < QUANTITY_OF_CARDS);

  return (
    <>
      <Header history={ history } />
      <Categories />
      <section className="recipesCard">
        {(meals) ? mealsFiltred
          .map((meal, index) => (<Card
            key={ meal.idMeal }
            data={ { meal, index, recipeCard: '-recipe-card' } }
          />))
          : <Loading />}
      </section>
      <Footer />
    </>
  );
}

Comidas.propTypes = {
  history: PropTypes.string.isRequired,
};

export default Comidas;
