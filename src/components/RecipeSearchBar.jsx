import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SEARCH_INPUT } from '../redux/actions';

export default function RecipeSearchBar() {
  const [inputValue, setInputValue] = useState('');
  const [inputType, setInputType] = useState('');

  const dispatch = useDispatch();

  const handleClick = () => {
    const search = { inputValue, inputType };
    if (inputType === 'first-letter' && inputValue.length !== 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
      setInputValue('');
    } else {
      dispatch({
        type: SEARCH_INPUT,
        payload: search,
      });
    }
  };

  return (
    <form action="">
      <label htmlFor="search-input">
        <input
          placeholder="Buscar receita"
          type="text"
          data-testid="search-input"
          id="search-input"
          value={ inputValue }
          onChange={ ({ target }) => setInputValue(target.value) }
        />
      </label>
      <label htmlFor="ingredient">
        Ingrediente
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          id="ingredient"
          value="ingredient"
          name="inputType"
          onChange={ ({ target }) => setInputType(target.value) }
        />
      </label>
      <label htmlFor="name">
        Nome
        <input
          data-testid="name-search-radio"
          type="radio"
          id="name"
          value="name"
          name="inputType"
          onChange={ ({ target }) => setInputType(target.value) }
        />
      </label>
      <label htmlFor="first-letter">
        Primeira Letra
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          id="first-letter"
          value="first-letter"
          name="inputType"
          onChange={ ({ target }) => setInputType(target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Pesquisar
      </button>
    </form>
  );
}
