import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBarLocation from './SearchBar';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      hidden: true,
    };
    this.title = this.title.bind(this);
    this.invertHidden = this.invertHidden.bind(this);
  }

  title(pathname) {
    let title = '';
    switch (pathname) {
    case '/comidas':
      title = 'Comidas';
      break;
    case '/bebidas':
      title = 'Bebidas';
      break;
    case '/explorar':
      title = 'Explorar';
      break;
    case '/explorar/comidas':
      title = 'Explorar Comidas';
      break;
    case '/explorar/bebidas':
      title = 'Explorar Bebidas';
      break;
    case '/explorar/comidas/ingredientes':
    case '/explorar/bebidas/ingredientes':
      title = 'Explorar Ingredientes';
      break;
    case '/explorar/comidas/area':
      title = 'Explorar Origem';
      break;
    case '/perfil':
      title = 'Perfil';
      break;
    case '/receitas-feitas':
      title = 'Receitas Feitas';
      break;
    case '/receitas-favoritas':
      title = 'Receitas Favoritas';
      break;
    default:
      title = '';
    }
    return (title);
  }

  invertHidden() {
    const { hidden } = this.state;
    if (hidden === true) {
      this.setState({ hidden: false });
    }
    if (hidden === false) {
      this.setState({ hidden: true });
    }
  }

  render() {
    const { location, history } = this.props;
    const { hidden } = this.state;
    return (
      <div>
        <button type="button" onClick={ () => { history.push('./perfil'); } }>
          <img
            src={ profileIcon }
            alt="imagem-profile"
            data-testid="profile-top-btn"

          />
        </button>
        <div data-testid="page-title">
          {this.title(location.pathname)}
        </div>
        {
          (location.pathname === '/comidas'
          || location.pathname === '/bebidas'
          || location.pathname === '/explorar/comidas/area'
          || location.pathname === '/explorar/bebidas/area')
            ? (
              <div>
                <button
                  type="button"
                  onClick={ () => this.invertHidden() }
                >
                  <img
                    src={ searchIcon }
                    alt="search-icon"
                    data-testid="search-top-btn"
                  />
                </button>
                {hidden ? <div /> : <SearchBarLocation />}
              </div>
            ) : (
              <div />
            )
        }
      </div>
    );
  }
}

const HeaderLocation = withRouter(Header);
export default HeaderLocation;

Header.propTypes = {
  location: PropTypes.shape.isRequired,
  history: PropTypes.shape.isRequired,
};

// a solução para generalização do Header foi inspirada e adaptada a partir da resolução
// do grupo 11 da T07 https://github.com/tryber/sd-07-project-recipes-app/tree/main-group-11
