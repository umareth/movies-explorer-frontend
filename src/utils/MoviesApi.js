import { apiSettings } from "./utils";

class ApiMovies {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl.moviesApi;
    this._headers = headers;
  }

  // Метод проверки успешности запроса _handleResponse
  _handleResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка - ${res.status}`);
  }

  // Метод запроса с проверкой ответа
  _request(url, options) {
    return fetch(url, options).then(this._handleResponse);
  }

  // Метод запроса данных пользователя с сервера
  getMovies() {
    return this._request(this._baseUrl, {
      headers: this._headers,
    });
  }
}

export const apiMovies = new ApiMovies(apiSettings);
