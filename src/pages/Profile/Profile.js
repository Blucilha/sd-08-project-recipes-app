import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Footer, Header } from '../../components';
import { logoutUserAction } from '../../store/actions';
import { getProfileEmailLocalStorage as emailLocalStorage } from '../../services';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.emailUser = emailLocalStorage();
  }

  render() {
    const { user: { email } } = this.emailUser;
    const { logoutUser } = this.props;

    return (
      <div>
        <Header title="Perfil" />
        <div className="container">

          <p data-testid="profile-email">{email}</p>
          <Link
            to="/receitas-feitas"
          >
            <button
              type="button"
              data-testid="profile-done-btn"
            >
              Receitas Feitas
            </button>
          </Link>
          <Link
            to="/receitas-favoritas"
          >
            <button
              type="button"
              data-testid="profile-favorite-btn"
            >
              Receitas Favoritas
            </button>
          </Link>
          <Link
            to="/"
          >
            <button
              type="button"
              data-testid="profile-logout-btn"
              onClick={ logoutUser }
            >
              Sair
            </button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
}

Profile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(logoutUserAction()),
});

export default connect(null, mapDispatchToProps)(Profile);
