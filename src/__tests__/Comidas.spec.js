// import React from 'react';
// import { render, fireEvent } from '@testing-library/react';
// import Comidas from '../pages/Comidas';
// import { useHistory } from 'react-router-dom';
// import { Router } from 'react-router-dom';
// import { createBrowserHistory } from 'history';
// // import userEvent from '@testing-library/user-event';

// describe('Comidas Page', () => {
// //   beforeEach(() => {
// //     Object.defineProperty(window, 'localStorage', {
// //       value: {
// //         getItem: jest.fn(() => null),
// //         setItem: jest.fn(() => null),
// //         clear: jest.fn(() => null),
// //       },
// //       writable: true,
// //     });
// //   });
//   const setup = async ()  => {
//       const history = createBrowserHistory();
//       const utils = render(
//           <Router  history={history}>
//                <Comidas />
//           </Router>
//       );
//       const profileTopButton = await utils.findByTestId('profile-top-btn');
//       const pageTitle =  await utils.findByTestId('page-title');
//       const searchTopButton =  await utils.findByTestId('search-top-btn');
//     //   console.log(inputEmail, inputPassword, loginSubmitBtn);
//     // const historyLocation =  history.location.pathname ;
//       return {
//         profileTopButton, pageTitle, searchTopButton, history,
//       } 
//     }

//   test('9/10 - Implemente os elementos do header na tela principal de receitas, respeitando os atributos descritos no protótipo', async () => {
//     const {profileTopButton, pageTitle, searchTopButton} = await setup();
//     expect(profileTopButton).toBeInTheDocument();
//     expect(pageTitle).toBeInTheDocument();
//     expect(searchTopButton).toBeInTheDocument();
//   });

// });


test('16 - Redirecione para a tela de detalhes da receita caso apenas uma receita seja encontrada, com o ID da mesma na URL', async () => {
    const { searchTopButton, utils, history } = await setup();
    fireEvent.click(searchTopButton);
    const inputSearch = await utils.findByTestId('search-input');
    const radioIngredients =  await utils.findByTestId('ingredient-search-radio');
    const radioName =  await utils.findByTestId('name-search-radio');
    const radioFirstLetter = await utils.findByTestId('first-letter-search-radio');
    const execSearchButton =  await utils.findByTestId('exec-search-btn');
    expect(inputSearch).toBeInTheDocument();
    expect(radioIngredients).toBeInTheDocument();
    expect(radioName).toBeInTheDocument();
    expect(radioFirstLetter).toBeInTheDocument();
    expect(execSearchButton).toBeInTheDocument();
    fireEvent.change(inputSearch, {target: { value: 'Arrabiata'}})
    fireEvent.click(radioIngredients);
    fireEvent.click(execSearchButton);
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken');
    expect(history.location.pathname).toBe('/comidas/52771');
  });