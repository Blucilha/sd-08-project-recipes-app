import React from 'react';
import Header from '../components/Header';
import SearchButton from '../components/SearchButton';

function Foods() {
  return (
    <Header label="Comidas" Search={ SearchButton } />
  );
}

export default Foods;