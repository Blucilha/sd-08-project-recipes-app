import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, Footer } from '../components';
// import { _ } from '../store/actions';

class Drinks extends Component {
  render() {
    return (
      <div>
        <Header title="Bebidas" />
        Eu sou o pagína de Drinks
        <Footer />
      </div>
    );
  }
}

// _.propTypes = {
//   _: PropTypes._.isRequired,
// };

// const mapDispatchToProps = (dispatch) => ({
//   _: (_) => {
//     dispatch(_(_));
//   },
// });

export default connect(null, null)(Drinks);
