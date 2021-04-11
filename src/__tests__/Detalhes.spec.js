import React from 'react';
import { render, fireEvent, queryAllByAltText } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Detalhes from '../pages/Detalhes';
import Provider from '../context/Provider';
import fetchMock from '../mocks/fetch';
import copy from 'clipboard-copy';
jest.mock('clipboard-copy');



describe('Comidas Page', () => {
  beforeEach(() => {
    fetchMock();
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => JSON.stringify([])),
        setItem: jest.fn(() => null),
        clear: jest.fn(() => null),
      },
      writable: true,
    });
  });


    const setup = async (url)  => {
      const history = createMemoryHistory({initialEntries: [url]});
      const utils = render(
        <Provider>
          <Router  history={history}>
               <Detalhes  />
          </Router>
        </Provider>
      );


      return {
         history, utils: utils,
      } 
    }


test('33 A - Implemente os elementos da tela de detalhes de uma receita respeitando os atributos descritos no protótipo', async () => {
    const { utils } = await setup('/comidas/52771');
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771');
    // const categoryFilter0 = await utils.findByTestId('Beef-category-filter');
    expect(await utils.findByTestId('recipe-photo')).toBeInTheDocument();
    expect(await utils.findByTestId('recipe-title')).toBeInTheDocument();
    expect(await utils.findByTestId('share-btn')).toBeInTheDocument();
    expect(await utils.findByTestId('favorite-btn')).toBeInTheDocument();
    expect(await utils.findByTestId('recipe-category')).toBeInTheDocument();
    expect(await utils.findByTestId('instructions')).toBeInTheDocument();
    // expect(await utils.findByTestId('video')).toBeInTheDocument();
    expect(await utils.findByTestId('start-recipe-btn')).toBeInTheDocument();
  });

  test('33 B - Implemente os elementos da tela de detalhes de uma receita respeitando os atributos descritos no protótipo', async () => {
    const { utils } = await setup('/bebidas/178319');
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319');
    // expect(await utils.findByTestId('recipe-photo')).toBeInTheDocument();
    expect(await utils.findByTestId('recipe-title')).toBeInTheDocument();
    expect(await utils.findByTestId('share-btn')).toBeInTheDocument();
    expect(await utils.findByTestId('favorite-btn')).toBeInTheDocument();
    expect(await utils.findByTestId('recipe-category')).toBeInTheDocument();
    expect(await utils.findByTestId('instructions')).toBeInTheDocument();
    // expect(await utils.findByTestId('video')).toBeInTheDocument();
    expect(await utils.findByTestId('start-recipe-btn')).toBeInTheDocument();
  });
  test('35 A - Desenvolva a tela de forma que contenha uma imagem da receita, o título, a categoria (ou se é ou não alcoólico', async () => {
    const { utils } = await setup('/bebidas/178319');
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319');
    // expect(await utils.findByTestId('recipe-photo')).toBe('')
    expect(await utils.findByTestId('recipe-title')).toBeInTheDocument();
    expect(await utils.findByTestId('share-btn')).toBeInTheDocument();
    expect(await utils.findByTestId('favorite-btn')).toBeInTheDocument();
    expect(await utils.findByTestId('recipe-category')).toBeInTheDocument();
    expect(await utils.findByTestId('instructions')).toBeInTheDocument();
    // expect(await utils.findByTestId('video')).not.toBeInTheDocument();
    expect(await utils.findByTestId('start-recipe-btn')).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  });

  test('35 B - Desenvolva a tela de forma que contenha uma imagem da receita, o título, a categoria (ou se é ou não alcoólico', async () => {
    const { utils } = await setup('/comidas/52771');
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771');
    // expect(await utils.findByTestId('recipe-photo')).toBe('')
    expect(await utils.findByTestId('recipe-title')).toBeInTheDocument();
    expect(await utils.findByTestId('share-btn')).toBeInTheDocument();
    expect(await utils.findByTestId('favorite-btn')).toBeInTheDocument();
    expect(await utils.findByTestId('recipe-category')).toBeInTheDocument();
    expect(await utils.findByTestId('instructions')).toBeInTheDocument();
    // expect(await utils.findByTestId('video')).not.toBeInTheDocument();
    expect(await utils.findByTestId('start-recipe-btn')).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  });
  test('43 - Implemente a solução de forma que, ao clicar no botão de compartilhar, o link da receita dentro do app deve ser copiado para o clipboard e uma mensagem avisando que o link foi copiado deve aparecer', async () => {
    const { utils } = await setup('/comidas/52771');
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771');
    // expect(await utils.findByTestId('recipe-photo')).toBe('')
    const shareBtn = await utils.findByTestId('share-btn');
    // expect(utils.queryAllByText('Link copiado!')[0].hidden).toBeFalsy();
    expect(utils.queryAllByText('Link copiado!')[0].hidden).toBe(true);
    expect(utils.baseElement).toHaveTextContent('Link copiado!');
    fireEvent.click(shareBtn);
    expect(utils.queryAllByText('Link copiado!')[0]).toBeInTheDocument();
    expect(copy).toHaveBeenCalledTimes(1);
    expect(copy).toHaveBeenLastCalledWith('http://localhost:3000/comidas/52771')
    // const favoriteBtn = await utils.findByTestId('favorite-btn');
    // const displayedImage = await utils.f ("img");
    // const imagem = screen.getAllByRole('img');
    // console.log(displayedImage)
    // expect(displayedImage.src).toContain('shareIcon');
    // expect(shareBtn).toBeInTheDocument();
    // expect(favoriteBtn).toBeInTheDocument();
    // expect(await utils.findByTestId('favorite-btn')).toBeInTheDocument();
    // expect(await utils.findByTestId('recipe-category')).toBeInTheDocument();
    // expect(await utils.findByTestId('instructions')).toBeInTheDocument();
    // // expect(await utils.findByTestId('video')).not.toBeInTheDocument();
    // expect(await utils.findByTestId('start-recipe-btn')).toBeInTheDocument();
    // expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    // expect(history.location.pathname).toBe('/comidas');
  });
})
