export class Api {
  constructor({ url, cohortId, headers }) {
    this._url = url;
    this._cohortId = cohortId;
    this._headers = headers;
  }

  setJwt(jwt) {
    this._headers.Authorization = `Bearer ${jwt}`;
  }

  getUserInfo() {
    return fetch(`${this._url}/${this._cohortId}/users/me`, {
      headers: this._headers,
      method: "GET",
    }).then((response) => {
      return this._checkResponse(response);
    });
  }

  getCards() {
    return fetch(`${this._url}/${this._cohortId}/cards`, {
      headers: this._headers,
      method: "GET",
    }).then((response) => {
      return this._checkResponse(response);
    });
  }

  saveProfileData(data) {
    return fetch(`${this._url}/${this._cohortId}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify(data),
    }).then((response) => {
      return this._checkResponse(response);
    });
  }

  addNewCard(data) {
    return fetch(`${this._url}/${this._cohortId}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify(data),
    }).then((response) => {
      return this._checkResponse(response);
    });
  }

  deleteCard(id) {
    return fetch(`${this._url}/${this._cohortId}/cards/${id}`, {
      headers: this._headers,
      method: "DELETE",
    }).then((response) => {
      return this._checkResponse(response);
    });
  }

  setLike(id) {
    return fetch(`${this._url}/${this._cohortId}/cards/${id}/likes`, {
      headers: this._headers,
      method: "PUT",
    }).then((response) => {
      return this._checkResponse(response);
    });
  }

  deleteLike(id) {
    return fetch(`${this._url}/${this._cohortId}/cards/${id}/likes`, {
      headers: this._headers,
      method: "DELETE",
    }).then((response) => {
      return this._checkResponse(response);
    });
  }

  changeLikeCardStatus(id, isLiked) {
    if (!isLiked) {
     return this.deleteLike(id);
    } else {
      return this.setLike(id);
    }
  }


  updateAvatar(url) {
    return fetch(`${this._url}/${this._cohortId}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({ avatar: url }),
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

const api = new Api({
  url: "https://api.evgsid.nomoredomainsmonster.ru",
  cohortId: "cohort-74",
  headers: {
    Authorization: "4ca4dfdd-8688-4312-b496-43b033a0044e",
    "Content-Type": "application/json",
  },
});
export default api;
