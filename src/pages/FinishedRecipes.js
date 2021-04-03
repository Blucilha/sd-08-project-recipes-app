import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FilterTypeBtn from '../components/FilterTypeBtn';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';
import '../CSS/Cards.css';

function getTags({ tags }, index) {
  if (!tags) return null;
  if (tags) {
    return (
      <>
        { tags.map((e) => (
          <span
            key={ `${index}${e}` }
            data-testid={ `${index}-${e}-horizontal-tag` }
          >
            { e }
          </span>
        ))}
      </>
    );
  }
}

function FinishedRecipes() {
  const finishedRecipesStorage = (localStorage.getItem('doneRecipes'))
    ? JSON.parse(localStorage.getItem('doneRecipes'))
    : [];
  const [filterSelector, setFilterSelector] = useState('all');

  function handleSelector({ target }) {
    setFilterSelector(target.value);
  }

  function generateCard(recipe, index) {
    return (
      <div key={ recipe.id }>
        <Link to={ `/${recipe.type}s/${recipe.id}` }>
          <img
            className="card"
            src={ recipe.image }
            alt={ recipe.name }
            data-testid={ `${index}-horizontal-image` }
          />
        </Link>
        <span data-testid={ `${index}-horizontal-top-text` }>
          { (recipe.area) ? `${recipe.area} - ${recipe.category}` : `${recipe.category}` }
          { (recipe.alcoholicOrNot) && <span>{ recipe.alcoholicOrNot }</span> }
        </span>
        <Link to={ `/${recipe.type}s/${recipe.id}` }>
          <h4 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h4>
        </Link>
        <span
          data-testid={ `${index}-horizontal-done-date` }
        >
          { `Feita em: ${recipe.doneDate} ` }
        </span>
        <ShareButton
          dataTestId={ `${index}-horizontal-share-btn` }
          recipeId={ recipe.id }
          recipeType={ recipe.type }
        />
        { getTags(recipe, index) }
      </div>
    );
  }

  function generateListOfCards() {
    if (finishedRecipesStorage.length === 0) {
      return (
        <div>No done recipes yet!</div>
      );
    }
    if (filterSelector === 'all' && finishedRecipesStorage) {
      return (
        <div>
          { finishedRecipesStorage.map((recipe, index) => generateCard(recipe, index)) }
        </div>
      );
    }
    if (filterSelector === 'food' && finishedRecipesStorage) {
      const filteredRecipes = finishedRecipesStorage
        .filter((elem) => elem.type === 'comida');
      return (
        <div>
          { filteredRecipes.map((recipe, index) => generateCard(recipe, index)) }
        </div>
      );
    }
    if (filterSelector === 'drinks' && finishedRecipesStorage) {
      const filteredRecipes = finishedRecipesStorage
        .filter((elem) => elem.type === 'bebida');
      return (
        <div>
          { filteredRecipes.map((recipe, index) => generateCard(recipe, index)) }
        </div>
      );
    }
  }

  return (
    <section>
      <Header />
      <FilterTypeBtn handleSelector={ handleSelector } />
      { generateListOfCards() }
    </section>
  );
}

export default FinishedRecipes;