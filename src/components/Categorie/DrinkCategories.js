import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDrinkCategories, requestDrinks } from '../../redux/actions';
import { fetchDrinks } from '../../services/API';

// import PropTypes from 'prop-types';

function Categories() {
  const [selectedDrink, setSelectedDrink] = useState('');
  const QUANTITY_OF_CATEGORIES = 5;
  let categoriesFiltred = [];
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.drinkCategoriesReducer.categories);

  useEffect(() => {
    dispatch(getDrinkCategories());
  }, [dispatch]);

  if (categories) {
    categoriesFiltred = categories
      .filter((categorie, index) => index < QUANTITY_OF_CATEGORIES);
  }

  async function handleClick(e) {
    const category = e.target.value;
    setSelectedDrink(category);
    console.log(selectedDrink, 'e', category);
    if (selectedDrink === category || category === 'All') {
      const ops = await fetchDrinks(' ', 'name');
      console.log(ops);
      dispatch(requestDrinks(ops));
      setSelectedDrink('');
    } else {
      const ops = await fetchDrinks(category, 'categories');
      console.log(ops);
      dispatch(requestDrinks(ops));
    }
  }

  return (
    <>
      <button
        value="All"
        type="button"
        onClick={ (e) => handleClick(e) }
        data-testid="All-category-filter"
      >
        All
      </button>
      {categoriesFiltred
        .map((categorie) => (
          <button
            value={ categorie.strCategory }
            key={ categorie.strCategory }
            data-testid={ `${categorie.strCategory}-category-filter` }
            onClick={ (e) => handleClick(e) }
            type="button"
          >
            {categorie.strCategory}
          </button>))}
    </>
  );
}

export default Categories;
