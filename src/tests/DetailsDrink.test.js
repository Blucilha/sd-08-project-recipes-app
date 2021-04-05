import React from 'react';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import renderWithRouter from './utils/renderWithRouter';
import DetailsDrink from '../pages/DetailsDrink';

const CONTAINER_HEADER_SIMPLE = 'container-header-simple';
const CONTAINER_HEADER_SEARCH = 'container-header-search';
const FOOTER = 'footer';

describe('Testes dos elemntos da tela de detalhes de uma bebida', () => {
  it('não existe um cabeçalho e nem um footer no componente', () => {
    const history = createMemoryHistory();
    const path = '/bebidas/15997';
    history.push(path);
    renderWithRouter(<DetailsDrink />, history);

    expect(
      screen.queryByTestId(CONTAINER_HEADER_SIMPLE),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId(CONTAINER_HEADER_SEARCH),
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId(FOOTER)).not.toBeInTheDocument();
  });
});
