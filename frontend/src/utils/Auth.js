export class Auth {
  constructor({ url, cohortId, headers }) {
    this._url = url;
    this._cohortId = cohortId;
    this._headers = headers;
  }

  signUp(data) {
    return fetch(`${this._url}/signup`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify(data),
    }).then((response) => {
      return this._checkResponse(response);
    });
  }
  signIn(data) {
    return fetch(`${this._url}/signin`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify(data),
    }).then((response) => {
      return this._checkResponse(response);
    });
  }
  checkToken(jwt) {
    return fetch(`${this._url}/users/me`, {
      headers: { ...this._headers, Authorization: `Bearer ${jwt}` },
      method: 'GET',
    }).then((response) => {
      return this._checkResponse(response);
    });
  }
  _checkResponse(response) {
    if (!response.ok) {
      return Promise.reject(new Error(response.statusText));
    } else {
      return response.json();
    }
  }
}
const auth = new Auth({
  url: 'https://api.evgsid.nomoredomainsmonster.ru',
  headers: {
    'Content-Type': 'application/json',
    'origin': 'https://evgsid.nomoredomainsmonster.ru'

  },
});
export default auth;
