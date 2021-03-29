const LISTA_INGREDIENTES_TAMANHO_MAXIMO = 15;

export const getIngredientes = (_detalhesDoIngrediente) => {
  const listaDeIngredientes = [];
  for (let i = 1; i <= LISTA_INGREDIENTES_TAMANHO_MAXIMO; i += 1) {
    if (_detalhesDoIngrediente[`strIngredient${i}`]) {
      listaDeIngredientes.push({
        ingredient: _detalhesDoIngrediente[`strIngredient${i}`],
        measure: _detalhesDoIngrediente[`strMeasure${i}`],
      });
    }
  }
  return listaDeIngredientes;
};

export const removerIngredienteDoArray = (
  ingrediente,
  arrayIngredientes,
) => arrayIngredientes.filter((item) => item !== ingrediente);

export const checkIngrediente = (ingrediente, tipoReceitaAtual, receitaItemId) => {
  const listaReceitas = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (listaReceitas) {
    if (listaReceitas[tipoReceitaAtual][receitaItemId]) {
      if (listaReceitas[tipoReceitaAtual][receitaItemId].includes(ingrediente)) {
        const novoArrayIngredientes = removerIngredienteDoArray(
          ingrediente,
          listaReceitas[tipoReceitaAtual][receitaItemId],
        );
        listaReceitas[tipoReceitaAtual][receitaItemId] = novoArrayIngredientes;
        localStorage.setItem('inProgressRecipes', JSON.stringify(listaReceitas));
      } else {
        listaReceitas[tipoReceitaAtual][receitaItemId].push(ingrediente);
        localStorage.setItem('inProgressRecipes', JSON.stringify(listaReceitas));
      }
    } else {
      listaReceitas[tipoReceitaAtual][receitaItemId] = [ingrediente];
      localStorage.setItem('inProgressRecipes', JSON.stringify(listaReceitas));
    }
  } else {
    const novaListaReceita = {
      cocktails: {
      },
      meals: {
      },
    };
    novaListaReceita[tipoReceitaAtual][receitaItemId] = [ingrediente];
    localStorage.setItem('inProgressRecipes', JSON.stringify(novaListaReceita));
  }
};

export const checkFavoritos = (receitaItemId, setIsFavorito) => {
  const listReceitasFavoritas = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (listReceitasFavoritas !== null && listReceitasFavoritas
    .find((item) => item.id === receitaItemId)) {
    setIsFavorito(true);
  }
};

// https://www.programmersought.com/article/32794147858/
const tresSegundos = 3000;
const copy = require('clipboard-copy');

export const copyLink = (url, exibirMensagemState) => {
  const urlSemTextoInProgress = url.replace('/in-progress', '');
  copy(urlSemTextoInProgress);
  exibirMensagemState('');
  setTimeout(() => { exibirMensagemState('hidden'); }, tresSegundos);
};

export const adicionarFavorito = (
  receitaItemId,
  tipoReceita,
  detalhesDaReceita,
  setIsFavorito,
) => {
  const nomeReceita = tipoReceita === 'meals' ? 'strMeal' : 'strDrink';
  const imagemReceita = tipoReceita === 'meals' ? 'strMealThumb' : 'strDrinkThumb';
  const data = {
    id: receitaItemId,
    type: tipoReceita === 'meals' ? 'comida' : 'bebida',
    area: tipoReceita === 'meals' ? detalhesDaReceita.strArea : '',
    category: detalhesDaReceita.strCategory,
    alcoholicOrNot: tipoReceita === 'cocktails' ? detalhesDaReceita.strAlcoholic : '',
    name: detalhesDaReceita[nomeReceita],
    image: detalhesDaReceita[imagemReceita],
  };

  const listaReceitasFavoritas = JSON.parse(localStorage.getItem('favoriteRecipes'));

  if (listaReceitasFavoritas) {
    if (listaReceitasFavoritas
      .find((item) => item.id === receitaItemId)) {
      const listaReceitasFavoritasFiltradas = listaReceitasFavoritas
        .filter((item) => item.id !== receitaItemId);
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify(listaReceitasFavoritasFiltradas),
      );
      setIsFavorito(false);
    } else {
      setIsFavorito(true);
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify([...listaReceitasFavoritas, data]),
      );
    }
  } else {
    setIsFavorito(true);
    localStorage.setItem('favoriteRecipes', JSON.stringify([data]));
  }
};

export const salvarReceitaFeita = (
  receitaItemId,
  tipoReceita,
  detalhesDaReceita,
) => {
  const dez = 10;
  const dataAtual = new Date();
  const ano = dataAtual.getFullYear();
  const mes = dataAtual.getMonth() < dez
    ? `0${dataAtual.getMonth()}`
    : dataAtual.getMonth();
  const dia = dataAtual.getDate() < dez ? `0${dataAtual.getDate()}` : dataAtual.getDate();
  const nomeReceita = tipoReceita === 'meals' ? 'strMeal' : 'strDrink';
  const imagemReceita = tipoReceita === 'meals' ? 'strMealThumb' : 'strDrinkThumb';
  const data = {
    id: receitaItemId,
    type: tipoReceita === 'meals' ? 'comida' : 'bebida',
    area: tipoReceita === 'meals' ? detalhesDaReceita.strArea : '',
    category: detalhesDaReceita.strCategory,
    alcoholicOrNot: tipoReceita === 'cocktails' ? detalhesDaReceita.strAlcoholic : '',
    name: detalhesDaReceita[nomeReceita],
    image: detalhesDaReceita[imagemReceita],
    doneDate: `${dia}/${mes}/${ano}`,
    tags: detalhesDaReceita.strTags ? (detalhesDaReceita.strTags).split(',') : [],
  };

  const listaReceitasFeitas = JSON.parse(localStorage.getItem('doneRecipes'));

  if (listaReceitasFeitas) {
    if (!listaReceitasFeitas
      .find((item) => item.id === receitaItemId)) {
      listaReceitasFeitas.push(data);
      localStorage.setItem('doneRecipes', JSON.stringify(listaReceitasFeitas));
    }
  } else {
    localStorage.setItem('doneRecipes', JSON.stringify([data]));
  }
};
