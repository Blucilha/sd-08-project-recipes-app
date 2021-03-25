import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import Profile from './pages/Profile';
import Comidas from './pages/Meals/Meals';
import Bebidas from './pages/Drinks/Drinks';
import Details from './pages/Details';
import RecipesInProgress from './pages/RecipesInProgress';
import Explore from './pages/Explore';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import ExploreDrinkIngredients from './pages/ExploreDrinkIngredients';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreMealArea from './pages/ExploreMealArea';
import ExploreMealIngredients from './pages/ExploreMealIngredients';
import ExploreMeals from './pages/ExploreMeals';

import './App.css';

function App() {
  return (
    <Switch>
      <Route path="/receitas-feitas" component={ DoneRecipes } />
      <Route path="/receitas-favoritas" component={ FavoriteRecipes } />

      <Route path="/explorar/comidas/area" component={ Explore } />
      <Route path="/explorar/comidas/ingredientes" component={ Explore } />
      <Route path="/explorar/bebidas/ingredientes" component={ Explore } />
      <Route path="/explorar/comidas" component={ Explore } />
      <Route path="/explorar/bebidas" component={ Explore } />
      <Route path="/explorar" component={ Explore } />

      <Route path="/comidas/:id/in-progress" component={ RecipesInProgress } />
      <Route path="/bebidas/:id/in-progress" component={ RecipesInProgress } />
      <Route path="/comidas/:id" component={ Details } />
      <Route path="/bebidas/:id" component={ Details } />
      <Route path="/comidas" component={ Comidas } />
      <Route path="/bebidas" component={ Bebidas } />
    
      <Route path="/perfil" component={ Profile } />
      <Route exact path="/" component={ LoginPage } /> 
    </Switch>
  );
}

export default App;
