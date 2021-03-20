/* eslint-disable max-len */
// Meals and Drinks API URLS
export const FOOD_INGREDIENTS = 'https://www.themealdb.com/api/json/v1/1/filter.php?i={ingrediente}';
export const FOOD_NAME = 'https://www.themealdb.com/api/json/v1/1/search.php?s={nome}';
export const FOOD_FIRST_LETTER = 'https://www.themealdb.com/api/json/v1/1/search.php?f={primeira-letra}';
export const TEST = 'https://www.themealdb.com/api/json/v1/1/search.php?f=a';

// Login email and password validation constants
export const DATA_TEST_ID_EMAIL = 'email-input';
export const DATA_TEST_ID_PASSWORD = 'password-input';
export const DATA_TEST_ID_LOGING_BTN = 'login-submit-btn';
export const MIN_PASSWORD_LENGTH = 6;
export const VALID_EMAIL = 'alguem@email.com';
export const VALID_EMAIL_REGEX = /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
export const VALID_PASSWORD = '123456';

export const login = {
  MIN_PASSWORD_LENGTH,
  VALID_EMAIL,
  VALID_EMAIL_REGEX,
  VALID_PASSWORD,
  DATA_TEST_ID_EMAIL,
  DATA_TEST_ID_PASSWORD,
  DATA_TEST_ID_LOGING_BTN,
};
