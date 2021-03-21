import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import RecipeSearchBar from './RecipeSearchBar';

export default function Header() {
  const [search, setSearchBar] = useState(false);

  const handleClick = () => {
    if (!search) {
      setSearchBar(true);
    } else if (search) {
      setSearchBar(false);
    }
  };

  return (
    <header>
      <Link to="/perfil">
        <img
          alt="profile-icon"
          src={ profileIcon }
          data-testid="profile-top-btn"
        />
      </Link>
      <h1
        data-testid="page-title"
      >
        Receitas
      </h1>
      <button
        type="button"
        data-testid="search-top-btn"
        onClick={ handleClick }
      >
        <img
          src={ searchIcon }
          alt="search-icon"
        />
      </button>
      { search ? <RecipeSearchBar /> : ''}

    </header>
    // - Tem os data-testids `profile-top-btn`, `page-title` e `search-top-btn`
  );
}
