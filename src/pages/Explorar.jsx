import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Explorar() {
  const history = useHistory();
  return (
    <div>
      <Header title="Explorar" />
      <Button
        type="button"
        label="Explorar Comidas"
        datatestid="explore-food"
        onClick={ () => history.push('explorar/comidas') }
      />
      <Button
        type="button"
        label="Explorar Bebidas"
        datatestid="explore-drinks"
        onClick={ () => history.push('explorar/bebidas') }
      />
      <Footer />
    </div>
  );
}

export default Explorar;
