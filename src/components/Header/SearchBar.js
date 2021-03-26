import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchFood, fetchDrink } from '../../store/actions';
import { alertSearch } from '../../serviceWorker';
import '../../styles/components/Header/SearchBar.css';

const SEARCH_LENGTH = 1;
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      searchRadio: 'name',

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { search, searchRadio } = this.state;
    const { getFood, title, getDrink } = this.props;
    const ARGUMENT_REQUEST = { search, searchRadio };
    if (searchRadio === 'firstLetter' && search.length > SEARCH_LENGTH) {
      return alertSearch('14');
    }
    if (title === 'Comidas') {
      return getFood(ARGUMENT_REQUEST);
    }
    return getDrink(ARGUMENT_REQUEST);
  }

  render() {
    const { search, searchRadio } = this.state;
    return (
      <div className="searchBarContainer">
        <div>
          <input
            name="search"
            type="search"
            data-testid="search-input"
            value={ search }
            onChange={ this.handleChange }
          />
        </div>
        <div className="searchBarRadios">
          <label htmlFor="searchRadio">
            <input
              value="ingredient"
              name="searchRadio"
              type="radio"
              data-testid="ingredient-search-radio"
              onChange={ this.handleChange }
              checked={ searchRadio === 'ingredient' }
            />
            Ingredientes
          </label>
          <label htmlFor="searchRadio">
            <input
              value="name"
              name="searchRadio"
              type="radio"
              data-testid="name-search-radio"
              onChange={ this.handleChange }
              checked={ searchRadio === 'name' }
            />
            Nome
          </label>
          <label htmlFor="searchRadio">
            <input
              value="firstLetter"
              name="searchRadio"
              type="radio"
              data-testid="first-letter-search-radio"
              onChange={ this.handleChange }
              checked={ searchRadio === 'firstLetter' }
            />
            Primeira Letra
          </label>
        </div>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ this.handleClick }
        >
          Buscar
        </button>
      </div>
    );
  }
}

SearchBar.propTypes = {
  getFood: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  getFood: (value) => dispatch(fetchFood(value)),
  getDrink: (value) => dispatch(fetchDrink(value)),
});

export default connect(null, mapDispatchToProps)(SearchBar);
