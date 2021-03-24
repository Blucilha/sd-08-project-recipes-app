import {
  // requestDrinkByName,
  // requestDrinkByIngredient,
  // requestDrinkByFirstLetter,
  requestMainDrinks,
  requestCategoriesDrinks,
  requestDrinkByCategory,
} from '../../services/requestDrinksAPI';
import {
  // requestByName,
  // requestByIngredient,
  // requestByFirstLetter,
  requestMainFoods,
  requestCategoriesMeals,
  requestFoodByCategory,
} from '../../services/requestFoodsAPI';

// ACTION DE LOGIN
export const IS_LOADING = 'IS_LOADING';

export const FINISHED_LOADING = 'FINISHED_LOADING';

export const CATEGORIES_DRINKS_FILTER = 'CATEGORIES_DRINKS_FILTER';

export const CATEGORIES_FOODS_FILTER = 'CATEGORIES_FOODS_FILTER';

export const actionIsLoading = (isLoading) => ({
  type: IS_LOADING,
  payload: {
    isLoading,
  },
});

export const actionFinishedLogin = () => ({
  type: FINISHED_LOADING,
});

// ACTIONS FILTERED_FOODS

export const FILTERED_FOODS = 'FILTERED_FOODS';

export const actionFilteredFoods = (foods) => ({
  type: FILTERED_FOODS,
  payload: {
    foods,
  },
});

export const FILTERED_DRINKS = 'FILTERED_DRINKS';

export const actionFilteredDrinks = (drinks) => ({
  type: FILTERED_DRINKS,
  payload: {
    drinks,
  },
});

// ACTIONS MAIN_FOODS

export const MAIN_FOODS = 'MAIN_FOODS';

export const actionMainFoods = (foods) => ({
  type: MAIN_FOODS,
  payload: {
    foods,
  },
});

// ACTIONS MAIN_DRINKS

export const MAIN_DRINKS = 'MAIN_DRINKS';

export const actionMainDrinks = (drinks) => ({
  type: MAIN_DRINKS,
  payload: {
    drinks,
  },
});

// THUNK ACTIONS MAIN && CATEGORIES RECIPES

export const CATEGORIES_FOODS = 'CATEGORIES_FOODS';
export const CATEGORIES_DRINKS = 'CATEGORIES_DRINKS';

export const actionCategoriesFoods = (foods) => ({
  type: CATEGORIES_FOODS,
  payload: {
    foods,
  },
});

export const actionCategoriesDrinks = (drinks) => ({
  type: CATEGORIES_DRINKS,
  payload: {
    drinks,
  },
});

export const actionThunkMainFoods = () => async (dispatch) => {
  dispatch(actionIsLoading(true));
  const mainFoods = await requestMainFoods();
  const categoriesFoods = await requestCategoriesMeals();
  dispatch(actionCategoriesFoods(categoriesFoods));
  dispatch(actionMainFoods(mainFoods));
  dispatch(actionIsLoading(false));
};

export const actionThunkMainDrinks = () => async (dispatch) => {
  dispatch(actionIsLoading(true));
  const mainDrinks = await requestMainDrinks();
  const categoriesDrinks = await requestCategoriesDrinks();
  dispatch(actionCategoriesDrinks(categoriesDrinks));
  dispatch(actionMainDrinks(mainDrinks));
  dispatch(actionIsLoading(false));
};

// THUNK ACTIONS FILTER CATEGORIES
export const actionFilterCategoryDrinks = (drinks) => ({
  type: CATEGORIES_DRINKS_FILTER,
  payload: {
    drinks,
  },
});

export const actionThunkCategoryDrinks = (category) => async (dispatch) => {
  dispatch(actionIsLoading(true));
  const drinksByCategory = await requestDrinkByCategory(category);
  dispatch(actionFilterCategoryDrinks(drinksByCategory));
  dispatch(actionIsLoading(false));
};

export const actionFilterCategoryFoods = (foods) => ({
  type: CATEGORIES_FOODS_FILTER,
  payload: {
    foods,
  },
});

export const actionThunkCategoryFoods = (category) => async (dispatch) => {
  dispatch(actionIsLoading(true));
  const foodsByCategory = await requestFoodByCategory(category);
  dispatch(actionFilterCategoryFoods(foodsByCategory));
  dispatch(actionIsLoading(false));
};
