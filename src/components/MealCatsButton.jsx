import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearRecipesAction } from '../redux/actions/clearRecipesAction';
import clearSearchAction from '../redux/actions/clearSearchAction';
import fetchMealCatsThunk from '../redux/actions/fetchMealCatsAction';
import filterMealCatsAction from '../redux/actions/filterMealCatAction';

function MealCatsButtons() {
  const { meals } = useSelector((state) => state.recipes.categories);
  // const { meals } = categories;
  const FIVE = 5;
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = () => dispatch(fetchMealCatsThunk());
    fetchData();
  }, []);

  return (
    <div>
      { meals && meals.map((elem, index) => (
        index < FIVE ? (
          <button
            type="button"
            key={ elem.strCategory }
            value={ elem.strCategory }
            onClick={ (event) => dispatch(filterMealCatsAction(event.target.value)) }
            data-testid={ `${elem.strCategory}-category-filter` }
          >
            { elem.strCategory }
          </button>
        ) : ''
      ))}
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => {
          dispatch(clearRecipesAction());
          dispatch(clearSearchAction());
        } }
      >
        All
      </button>
    </div>
  );
}

export default MealCatsButtons;
