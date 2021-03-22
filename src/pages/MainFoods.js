import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Searchbar from '../components/Searchbar';
import { Context } from '../context';

const MainFoods = () => {
  const { hide } = useContext(Context);

  return (
    <div>
      <Header
        name="Comidas"
        foodClass="main-food"
        Show
      />
      { hide ? null
        : <Searchbar />}
      <Footer
        foodClass="main-food-footer"
      />
    </div>
  );
};

export default MainFoods;
