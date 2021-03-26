import React, { useState, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { filterFirstLetter, filterIngredient, filterName } from '../services/api';

export const DrinkCtx = createContext();

function ContextFood(props) {
  const { children } = props;
  const [drinkApi, setDrinkApi] = useState([]);
  const [filterDrink, setFilterDrink] = useState({ key: 'name', value: '' });
  const { key, value } = filterDrink;

  useEffect(() => {
    async function connect() {
      if (key === 'ing') {
        const i = await filterIngredient(value, 'Drinks');
        return setDrinkApi(i);
      }
      if (key === 'name') {
        const n = await filterName(value, 'Drinks');
        return setDrinkApi(n);
      }
      if (key === 'first') {
        if (value.length > 1) {
          // eslint-disable-next-line no-alert
          alert('Sua busca deve conter somente 1 (um) caracter');
          return;
        }
        const f = await filterFirstLetter(value, 'Drinks');
        console.log(value);
        return setDrinkApi(f);
      }
    }
    connect();
  }, [key, value]);

  return (
    <DrinkCtx.Provider
      value={ { drinkApi, filterDrink, setFilterDrink } }
    >
      {children}
    </DrinkCtx.Provider>
  );
}

ContextFood.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ContextFood;