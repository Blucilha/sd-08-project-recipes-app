export const Types = {
  ADD_RECIPE: 'doneRecipes/ADD_RECIPE',
  REMOVE_RECIPE: 'doneRecipes/REMOVE_RECIPE',
};

const INITIAL_STATE = {
  doneRecipes: [],
  idCount: 0,
};

const addRecipe = (state, action) => {
  const newRecipe = { id: idCount, ...action.payload };
  return {
    ...state,
    doneRecipes: [...state.doneRecipes, newRecipe],
    idCount: state.idCount + 1,
  };
};

const removeRecipe = (state, action) => ({
  ...state,
  doneRecipes: state.doneRecipes.filter((recipe) => (
    recipe.id !== action.payload)),
});

const doneRecipes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case Types.ADD_RECIPE: return addRecipe(state, action);
  case Types.REMOVE_RECIPE: return removeRecipe(state, action);
  default: return state;
  }
};

export const Creators = {
  addRecipe: (recipe) => ({
    type: Types.ADD_RECIPE,
    payload: recipe,
  }),

  removeRecipe: (id) => ({
    type: Types.REMOVE_RECIPE,
    payload: id,
  }),
};

export default doneRecipes;
