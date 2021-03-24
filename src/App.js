import React from 'react';
import { Route } from 'react-router-dom';
import { Comidas, Bebidas, Login, Perfil, DetalhesComida,
  DetalhesBebida, Explorar, ExplorarComidas, ExplorarBebidas,
  IngredientesComidas, IngredientesBebidas, ExplorarOrigem,
  NotFound,
  inProgressComida,
  inProgressBebidas } from './pages/index';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Route path="/explorar/bebidas/ingredientes" component={ IngredientesBebidas } />
      <Route path="/explorar/comidas/ingredientes" component={ IngredientesComidas } />
      <Route path="/explorar/comidas/area" component={ ExplorarOrigem } />
      <Route path="/explorar/bebidas/area" component={ NotFound } />
      <Route path="/comidas/:id/in-progress" component={ inProgressComida } />
      <Route path="/bebidas/:id/in-progress" component={ inProgressBebidas } />
      <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
      <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
      <Route path="/comidas/:id" component={ DetalhesComida } />
      <Route path="/bebidas/:id" component={ DetalhesBebida } />
      <Route exact path="/explorar" component={ Explorar } />
      <Route exact path="/comidas" component={ Comidas } />
      <Route exact path="/bebidas" component={ Bebidas } />
      <Route path="/perfil" component={ Perfil } />
      {/* // <Route path="/receitas-feitas;" component={ Receitas } />
      // <Route path="/receitas-favoritas" component={ Receitas } /> */}
      <Route exact path="/" component={ Login } />
    </>
  );
}

export default App;
