import { apiSettings, getToken } from "./utils";

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl.mainApi;
    this._headers = headers;
  }

  _handleResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка - ${res.status}`);
  }

  // Запрос запроса с проверкой ответа
  _request(url, options) {
    return fetch(url, options).then(this._handleResponse);
  }

  // Запрос создания нового пользователя addNewUser
  register(data) {
    return this._request(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    });
  }

  // Запрос для авторизации login
  login({ password, email }) {
    return this._request(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,

      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
  }

  // Запрос запроса данных юзера с сервера
  checkToken() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${getToken()}`,
      },
    });
  }

  // Запрос выхода юзера
  logout() {
    return this._request(`${this._baseUrl}/signout`, {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${getToken()}`,
      },
    });
  }

  // Запрос запроса сохраненных фильмов
  getMovies() {
    return this._request(`${this._baseUrl}/movies`, {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${getToken()}`,
      },
    });
  }

  // Метот передачи данных пользователя на сервер updateUserInfo
  updateUserInfo(data) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    });
  }

  // Запрос отправки данных об установке/снятии лайка на сервер
  addSavedMovie(movie) {
    return this._request(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(movie),
    });
  }

  // Запрос удаления карточки с сервера
  deleteMovie(id) {
    return this._request(`${this._baseUrl}/movies/${id}`, {
      method: "DELETE",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${getToken()}`,
      },
    });
  }
}

export const api = new Api(apiSettings);
