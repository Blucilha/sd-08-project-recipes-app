export const Types = {
  ADD_RECIPE: 'favoriteRecipes/ADD_RECIPE',
  REMOVE_RECIPE: 'favoriteRecipes/REMOVE_RECIPE',
};

const INITIAL_STATE = {
  favoriteRecipes: [],
  idCount: 0,
};

const addRecipe = (state, action) => {
  const newRecipe = { id: state.idCount, ...action.payload };
  return {
    ...state,
    favoriteRecipes: [...state.favoriteRecipes, newRecipe],
    idCount: state.idCount + 1,
  };
};

const removeRecipe = (state, action) => ({
  ...state,
  favoriteRecipes: state.favoriteRecipes.filter((recipe) => (
    recipe.id !== action.payload)),
});

const favoriteRecipes = (state = INITIAL_STATE, action) => {
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

export default favoriteRecipes;
