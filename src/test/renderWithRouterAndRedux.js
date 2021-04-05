import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import search from '../store/searchSlice';
import login from '../store/loginSlice';
import api from '../store/apiSlice';
import categoriesButton from '../store/apiCategoriesSlice';

const renderWithRouter = (
  component,
  {
    initialEntries = ['/'],
    store = configureStore({
      reducer: {
        search,
        login,
        api,
        categoriesButton,
      },
    }),
  } = {},
) => {
  const history = createMemoryHistory({ initialEntries });
  return {
    ...render(
      <BrowserRouter history={ history }>
        <Provider store={ store }>
          {component}
        </Provider>
      </BrowserRouter>,
    ),
    history,
    store,
  };
};

export default renderWithRouter;
