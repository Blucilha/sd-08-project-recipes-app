import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header } from '../../components';
import { showHeaderAction } from '../../store/actions/showHeaderAction';

class ExploreFoods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Explorar Comidas',
      showButtonSearch: false,
    };
  }

  render() {
    const { setShowHeaderAction } = this.props;
    const { title, showButtonSearch } = this.state;
    setShowHeaderAction(title, showButtonSearch);
    return (
      <div>
        <Header />
        Eu sou o pagína de Explorar Comidas
      </div>
    );
  }
}

ExploreFoods.propTypes = {
  setShowHeaderAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setShowHeaderAction: (titleHeader, showButtonSearch) => {
    dispatch(showHeaderAction(titleHeader, showButtonSearch));
  },
});

export default connect(null, mapDispatchToProps)(ExploreFoods);
