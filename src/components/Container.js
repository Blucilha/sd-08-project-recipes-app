import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/components/Container.module.css';

const Container = ({ children }) => (
  <div className={ styles.container }>
    { children }
  </div>
);

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export default Container;
