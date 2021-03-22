export const getMealCategories = async () => {
  const Url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const { meals } = await fetch(Url).then((response) => response.json());
  return meals;
};

export const getMealsByCategory = async (byCategory) => {
  const Url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${byCategory}`;
  const { meals } = await fetch(Url).then((response) => response.json());
  return meals;
};

export const getMealByIngredients = async (ingredient) => {
  const Url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const { meals } = await fetch(Url).then((response) => response.json());
  return meals;
};

export const getMealByName = async (name) => {
  const Url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  const { meals } = await fetch(Url).then((response) => response.json());
  return meals;
};

export const getMealByFirstLetter = async (FirstLetter) => {
  const Url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${FirstLetter}`;
  const { meals } = await fetch(Url).then((response) => response.json());
  return meals;
};

export const getDrinksCategories = async () => {
  const Url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const { drinks } = await fetch(Url).then((response) => response.json());
  return drinks;
};

export const getDrinksByCategory = async (byCategory) => {
  const Url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${byCategory}`;
  const { drinks } = await fetch(Url).then((response) => response.json());
  return drinks;
};

export const getDrinkByIngredients = async (ingredient) => {
  const Url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const { drinks } = await fetch(Url).then((response) => response.json());
  return drinks;
};

export const getDrinkByName = async (name) => {
  const Url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  const { drinks } = await fetch(Url).then((response) => response.json());
  return drinks;
};

export const getDrinkByFirstLetter = async (FirstLetter) => {
  const Url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${FirstLetter}`;
  const { drinks } = await fetch(Url).then((response) => response.json());
  return drinks;
};
