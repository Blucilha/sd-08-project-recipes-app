import { fetchFoodsByLetter,
  fetchFoodsByName,
  fetchFoodsByIngredients } from '../../services';

export const FETCH_FOOD = 'FETCH_FOOD';

const create = (value) => ({
  ingredient: fetchFoodsByIngredients(value),
  name: fetchFoodsByName(value),
  firstLetter: fetchFoodsByLetter(value),
});

export const fetchFood = ({ search, searchRadio }) => (dispatch) => {
  const fetch = create(search);

  fetch[searchRadio].then((data) => console.log(data, dispatch));
};
