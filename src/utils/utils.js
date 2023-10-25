import { BASE_URL, BASE_URL_API_MOVIES, MESSAGE } from "./constants";

// Теперь у вас есть токен, который вы можете использовать
export const getToken = () => {
  const cookies = document.cookie.split("; ");
  let token = "";
  for (let i = 0; i < cookies.length; i++) {
    if (cookies[i].startsWith("token=")) {
      token = cookies[i].substring("token=".length);
      break;
    }
  }
  return token;
};
// Данные для запроса на сервер
export const apiSettings = {
  baseUrl: {
    mainApi: BASE_URL,
    moviesApi: BASE_URL_API_MOVIES + "/beatfilm-movies",
  },
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export const selectErrMessage = (error) => {
  return error.message === "Validation failed" ? MESSAGE.validation + error.validation.body.keys[0] : error.message;
};

export const clearCookies = () => {
  const cookies = document.cookie.split("; ");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
};

const registerForm = {
  name: "register",
  title: "Добро пожаловать!",
  buttonTextDefault: "Зарегистрироваться",
  buttonTextLoading: "Регистрация...",
  inputs: [
    {
      type: "text",
      name: "name",
      label: "Имя",
      placeholder: "Виталий",
      minLength: "2",
      maxLength: "30",
      required: true,
      autoFocus: true,
      autoComplete: "off",
    },
    {
      type: "email",
      name: "email",
      label: "E-mail",
      placeholder: "pochta@yandex.ru",
      minLength: "4",
      maxLength: "40",
      required: true,
      autoComplete: "off",
    },
    {
      type: "password",
      name: "password",
      label: "Пароль",
      placeholder: "••••••••••••••",
      minLength: "4",
      maxLength: "40",
      required: true,
      autoComplete: "off",
    },
  ],
};

const loginForm = {
  name: "login",
  title: "Рады видеть!",
  buttonTextDefault: "Войти",
  buttonTextLoading: "Вход...",
  inputs: [
    {
      type: "email",
      name: "email",
      label: "E-mail",
      placeholder: "pochta@yandex.ru|",
      minLength: "4",
      maxLength: "40",
      required: true,
      autoFocus: true,
      autoComplete: "on",
    },
    {
      type: "password",
      name: "password",
      label: "Пароль",
      placeholder: "",
      minLength: "4",
      maxLength: "40",
      required: true,
      autoComplete: "on",
    },
  ],
};

const profileForm = {
  name: "profile",
  title: "Привет, Виталий!",
  buttonTextDefault: "Сохранить",
  buttonTextLoading: "Сохранение...",
  textError: "При обновлении профиля произошла ошибка.",
  inputs: [
    {
      type: "text",
      name: "name",
      label: "Имя",
      placeholder: "",
      minLength: "2",
      maxLength: "30",
      required: true,
      autoFocus: true,
      autoComplete: "off",
    },
    {
      type: "email",
      name: "email",
      label: "E-mail",
      placeholder: "",
      minLength: "4",
      maxLength: "40",
      required: true,
      autoComplete: "off",
    },
  ],
};

const searchForm = {
  name: "search",
  title: "Найти",
  buttonTextDefault: "Найти",
  buttonTextLoading: "Поиск...",
  inputs: [
    {
      type: "search",
      name: "search",
      placeholder: "Фильм",
      required: true,
      autoFocus: true,
      autoComplete: "on",
    },
    {
      type: "checkbox",
      name: "short",
      placeholder: "Короткометражки",
      required: false,
      checked: false,
    },
  ],
};

export { registerForm, loginForm, searchForm, profileForm };
