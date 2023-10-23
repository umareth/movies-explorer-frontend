export const BASE_URL = "https://api.shakh.nomoredomainsrocks.ru";
export const BASE_URL_API_MOVIES = "https://api.nomoreparties.co";
export const REGX_NAME = /^[a-zA-Zа-яА-Я\s-]+$/;
export const REGX_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const KEYWORD_SEARCH = "search";
export const KEYWORD_RESIZE = "resize";
export const DATA_SAVE = "search";
export const KEYWORD_MOVIES = "allMovies";

export const ROUTS = {
  mainPath: "/",
  moviesPath: "/movies",
  savedMoviesPath: "/saved-movies",
  loginPath: "/signin",
  registerPath: "/signup",
  logoutPath: "/signout",
  profilePath: "/profile",
  userPath: "/users/me",
  anyOtherPath: "*",
  beatfilm: "beatfilm-movies",
};

export const DEVICE_SETTING = {
  mobile: {
    device: "mobile",
    maxSize: 768,
    maxMovies: 5,
    moreMovies: 2,
  },
  tablet: {
    device: "tablet",
    maxSize: 1024,
    maxMovies: 4,
    moreMovies: 3,
  },
  desktop: {
    device: "desktop",
    maxMovies: 4,
    moreMovies: 4,
  },
};

export const INPUT_TYPE_NAME = {
  email: "email",
  text: "text",
  checkbox: "checkbox",
  search: "search",
};

export const INPUT_NAME = {
  nameInput: "name",
  emailInput: "email",
  passwordInput: "password",
  searchInput: "search",
  shortInput: "short",
};

export const MESSAGE = {
  REGISTRATION_SUCCESS: "Регистрация успешно завершена. Перенаправление на страницу фильмов.",
  SEARCH_EMPTY: "Для поиска фильмов введите запрос.",
  NO_MOVIES: "Нет доступных фильмов.",
  INVALID_EMAIL: "Неверный формат электронной почты.",
  INVALID_NAME: "Имя может содержать только латиницу, кириллицу, пробел или дефис.",
  PROFILE_UPDATED: "Данные успешно обновлены.",
  REGISTRATION_REDIRECT: "Регистрация успешно завершена. Перенаправление на страницу поиска фильмов.",
  VALIDATION_ERROR: "Неверный формат данных: ",
  SERVER_ERROR: "При запросе произошла ошибка.",
};
