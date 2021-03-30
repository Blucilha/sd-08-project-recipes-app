import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import RecipeCard from '../components/RecipeCard';
import Loading from '../components/Loading';
import CategoryButton from '../components/CategoryButton';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { byAddIngredient, fetchCategories, fetchRecipes } from '../actions/recipes';

function Main({ location: { pathname } }) {
  const {
    list, isFetching, categories, byIngredient,
  } = useSelector((state) => state.recipes);
  const dispatch = useDispatch();
  const type = pathname.slice(1);
  const token = 1;

  useEffect(() => {
    const reqType = { request: 'filter', key: 'i', parameter: byIngredient };
    dispatch(fetchCategories(token, type));
    if (byIngredient) {
      dispatch(fetchRecipes(token, type, reqType));
      dispatch(byAddIngredient(''));
    } else {
      dispatch(fetchRecipes(token, type));
    }
  }, [pathname]);

  return (
    <>
      <Header />
      { categories
        .map((category) => (
          <CategoryButton name={ category } key={ `btn-${category}` } type={ type } />))}
      <CategoryButton name="All" type={ type } />
      { isFetching ? <Loading /> : list.map((recipe, index) => (
        <RecipeCard
          type={ type }
          index={ index }
          recipe={ recipe }
          key={ `recipe-${index}` }
        />))}
      <Footer />
    </>
  );
}

Main.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default Main;
