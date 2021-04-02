import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import HeaderLocation from '../components/Header';
import RecipeCard from '../components/RecipeCard';

const MAX_CATEGORIES = 5;
const MAX_CARDS = 12;

class Bebidas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCategory: null,
      categoryName: '',
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(category) {
    const { drinks:
      { drinks, ordinaryDrink,
        cocktail, milkFloatShake, otherUnknown, cocoa } } = this.props;
    const { categoryName } = this.state;
    if (category !== categoryName && category !== 'All') {
      this.setState({ categoryName: category });
      switch (category) {
      case 'Ordinary Drink':
        this.setState({ selectedCategory: ordinaryDrink });
        break;
      case 'Cocktail':
        this.setState({ selectedCategory: cocktail });
        break;
      case 'Milk / Float / Shake':
        this.setState({ selectedCategory: milkFloatShake });
        break;
      case 'Other/Unknown':
        this.setState({ selectedCategory: otherUnknown });
        break;
      case 'Cocoa':
        this.setState({ selectedCategory: cocoa });
        break;
      default:
        this.setState({ selectedCategory: drinks });
        break;
      }
    } else {
      this.setState({ categoryName: '', selectedCategory: drinks });
    }
  }

  inputButtons() {
    const { categories, bool } = this.props;
    return (
      categories.drinksCategories.map((category, index) => {
        if (index < MAX_CATEGORIES && bool === false) {
          return (
            <button
              type="submit"
              onClick={ () => this.handleClick(category.strCategory) }
              data-testid={ `${category.strCategory}-category-filter` }
            >
              {category.strCategory}
            </button>
          );
        }
        return null;
      })
    );
  }

  render() {
    const { drinks, bool, meals } = this.props;
    const { selectedCategory } = this.state;
    let cards = '';
    if (!meals.ingredienteFilter) {
      console.log('oi');
      cards = drinks.drinks;
    } else {
      console.log('shau');
      cards = meals.ingredienteFilter;
    }
    if (!selectedCategory) {
      return (
        <div>
          <HeaderLocation />
          <button
            type="submit"
            onClick={ (event) => this.handleClick(event.target.name) }
            name="All"
            data-testid="All-category-filter"
            hidden={ bool }
          >
            All
          </button>
          {/* {
            drinksCategories.map((category, index) => {
              if (index < MAX_CATEGORIES && bool === false) {
                return (
                  <button
                    type="submit"
                    onClick={ () => this.handleClick(category.strCategory) }
                    data-testid={ `${category.strCategory}-category-filter` }
                  >
                    {category.strCategory}
                  </button>
                );
              }
              return null;
            })
          } */}
          {
            cards.map((drink, index) => {
              if (index < MAX_CARDS && bool === false) {
                return (
                  <Link
                    to={ `/bebidas/${drink.idDrink}` }
                  >
                    <RecipeCard
                      idRecipeCard={ `${index}-recipe-card` }
                      idImg={ `${index}-card-img` }
                      srcImg={ drink.strDrinkThumb }
                      idCardName={ `${index}-card-name` }
                      mealName={ drink.strDrink }
                    />
                  </Link>
                );
              }
              return null;
            })
          }
          <Footer />
        </div>
      );
    }

    return (
      <div>
        <HeaderLocation />
        <button
          type="button"
          onClick={ (event) => this.handleClick(event.target.name) }
          name="All"
          data-testid="All-category-filter"
        >
          All
        </button>
        {/* {
          drinksCategories.map((category, index) => {
            if (index < MAX_CATEGORIES && bool === false) {
              return (
                <button
                  type="button"
                  onClick={ () => this.handleClick(category.strCategory) }
                  data-testid={ `${category.strCategory}-category-filter` }
                >
                  {category.strCategory}
                </button>
              );
            }
            return null;
          })
        } */}
        {this.inputButtons()}

        {

          selectedCategory.map((drink, index) => {
            if (index < MAX_CARDS && bool === false) {
              return (
                <Link
                  to={ `/bebidas/${drink.idDrink}` }
                >
                  <RecipeCard
                    idRecipeCard={ `${index}-recipe-card` }
                    idImg={ `${index}-card-img` }
                    srcImg={ drink.strDrinkThumb }
                    idCardName={ `${index}-card-name` }
                    mealName={ drink.strDrink }
                  />
                </Link>
              );
            }
            return null;
          })
        }
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  bool: state.user.bool,
  meals: state.meals,
  categories: state.categories,
  drinks: state.drinks,
  selectedCategory: state.selectedCategory,
});

Bebidas.propTypes = {
  drinks: PropTypes.arrayOf(Array).isRequired,
  categories: PropTypes.arrayOf(Array).isRequired,
  bool: PropTypes.bool.isRequired,
  meals: PropTypes.func.isRequired,

};

export default connect(mapStateToProps)(Bebidas);
