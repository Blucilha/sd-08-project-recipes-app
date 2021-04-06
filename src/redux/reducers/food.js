import {
  GET_API_FOOD,
  FETCH_API_FOODS,
  ERROR_REQUEST_API_FOODS,
  FETCH_API_CATEGORIES,
  GET_FILTER_BTN_FOOD,
  GET_MEALS_BY_AREA,
  GET_AREAS,
  FETCH_AREAS,
} from '../actions/types';

const INITIALSTATE = {
  meals: [],
  categories: [],
  areas: [],
  isFetching: false,
  isFetchingAreas: false,
  onClickFilter: false,
};

const food = (state = INITIALSTATE, action) => {
  switch (action.type) {
  case FETCH_API_FOODS:
    return {
      ...state,
      isFetching: true,
    };
  case FETCH_API_CATEGORIES:
    return {
      ...state,
      isFetchingCategories: true,
    };
  case FETCH_AREAS:
    return {
      ...state,
      isFetchingAreas: true,
    };
  case GET_API_FOOD:
    return { ...state,
      meals: action.payload.meals,
      categories: action.payload.categories,
      isFetching: false,
      onClickFilter: false,
    };
  case GET_FILTER_BTN_FOOD:
    return { ...state,
      meals: action.payload,
      isFetching: false,
      onClickFilter: true,
    };
  case GET_AREAS:
    return { ...state,
      areas: action.payload,
      isFetchingAreas: false,
    };
  case GET_MEALS_BY_AREA:
    return { ...state,
      meals: action.payload,
      isFetching: false,
    };
  case ERROR_REQUEST_API_FOODS:
    return { ...state,
      meals: false,
      isFetching: false,
    };
  default:
    return state;
  }
};

export default food;
