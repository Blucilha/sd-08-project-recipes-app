import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ContextRecipes from './ContextRecipes';
import {
  getComidasByName,
  getComidasByIngredientes,
  getComidasByPrimeiraLetra,
  getBebidasByName,
  getBebidasByingredientes,
  getBebidasByPrimeiraLetra } from '../services/BuscaNasAPIs';

const copy = require('clipboard-copy');

function ProviderRecipes({ children }) {
  const headerInfoInitial = {
    pageTitle: '',
    showSearchIcon: true,
  };

  const barraBuscarInitial = {
    input: '',
    radio: '',
  };

  const [headerInfo, setHeaderInfo] = useState(headerInfoInitial);
  const [barraBuscar, setBarraBuscar] = useState(barraBuscarInitial);
  const [dataByBusca, setDataByBuscar] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  const fetchDataComidas = useCallback(async () => {
    const { input, radio } = barraBuscar;
    console.log(input, radio);
    if (radio === 'nome') {
      const { meals } = await getComidasByName(input);
      return setDataByBuscar({ meals });
    }
    if (radio === 'ingredientes') {
      const { meals } = await getComidasByIngredientes(input);
      return setDataByBuscar({ meals });
    }
    if (radio === 'primeira letra') {
      if (barraBuscar.input.length === 1) {
        const { meals } = await getComidasByPrimeiraLetra(input);
        return setDataByBuscar({ meals });
      }
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }
    setIsFetching(false);
  }, [barraBuscar]);

  const fetchDataBebidas = useCallback(async () => {
    const { input, radio } = barraBuscar;
    console.log(input, radio);
    if (radio === 'nome') {
      const { drinks } = await getBebidasByName(input);
      return setDataByBuscar({ drinks });
    }
    if (radio === 'ingredientes') {
      const { drinks } = await getBebidasByingredientes(input);
      return setDataByBuscar({ drinks });
    }
    if (radio === 'primeira letra') {
      if (barraBuscar.input.length === 1) {
        const { drinks } = await getBebidasByPrimeiraLetra(input);
        return setDataByBuscar({ drinks });
      }
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }
    setIsFetching(false);
  }, [barraBuscar]);

  // Logica para copiar a URL e fazer aparecer/desaparecer uma MSG
  const [renderMSG, setRenderMSG] = useState(false);
  const msgTime = 10000;
  const copiarURL = (tipo, id) => {
    copy(`http://localhost:3000/${tipo}/${id}`);
    // Esse setRenderMSG faz a msg aparecer
    setRenderMSG(true);
    setTimeout(() => { setRenderMSG(false); }, msgTime);
    // Esse último setRenderMSG faz a msg desaparecer após o tempo de msgTime
  };

  useEffect(() => {
    if (barraBuscar.radio !== '' && headerInfo.pageTitle === 'Comidas') {
      fetchDataComidas();
    }
    if (barraBuscar.radio !== '' && headerInfo.pageTitle === 'Bebidas') {
      fetchDataBebidas();
    }
  }, [barraBuscar, headerInfo.pageTitle, fetchDataComidas, fetchDataBebidas]);

  return (
    <ContextRecipes.Provider
      value={
        {
          headerInfo,
          setHeaderInfo,
          barraBuscar,
          setBarraBuscar,
          dataByBusca,
          isFetching,
          setIsFetching,
          favoriteRecipes,
          setFavoriteRecipes,
          copiarURL,
          renderMSG,
          copy }
      }
    >
      {children}
    </ContextRecipes.Provider>
  );
}

ProviderRecipes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProviderRecipes;
