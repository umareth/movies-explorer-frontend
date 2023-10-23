export const BASE_URL = "https://api.shakheth.nomoredomainsrocks.ru";
export const BASE_URL_API_MOVIES = "https://api.nomoreparties.co";
export const REGX_NAME_INPUT = /^[a-zA-Zа-яА-Я\s-]+$/;
export const REGX_MAIL_INPUT = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const KEY_MOVIES = "allMovies";
export const KEY_SEARCH = "search";
export const KEY_RESIZE = "resize";

export const DEVICE_SETTINGS = {
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
  INVALID_LOGIN: "Неверный пароль или логин",
};
