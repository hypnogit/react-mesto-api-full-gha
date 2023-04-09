import { apiConfig } from "./constants.js"

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  getInitialCards() {
    const token = localStorage.getItem('token');
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        "Authorization": token,
        'Content-Type': 'application/json',
      }
    })
    .then(this._checkResponse)
  }

  getUserInfo() {
    const token = localStorage.getItem('token');
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        "Authorization": token,
        'Content-Type': 'application/json',
      }
    })
    .then(this._checkResponse)
  }

  editUserInfo(name, about) {
    const token = localStorage.getItem('token');
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        "Authorization": token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(this._checkResponse)
  }

  addNewCard(name, link) {
    const token = localStorage.getItem('token');
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        "Authorization": token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(this._checkResponse)
  }

  removeMyCard(id) {
    const token = localStorage.getItem('token');
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        "Authorization": token,
        'Content-Type': 'application/json',
      },
    })
    .then(this._checkResponse)
  }

  likeCard(id) {
    const token = localStorage.getItem('token');
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        "Authorization": token,
        'Content-Type': 'application/json',
      },
    })
    .then(this._checkResponse)
  }

  unlikeCard(id) {
    const token = localStorage.getItem('token');
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        "Authorization": token,
        'Content-Type': 'application/json',
      },
    })
    .then(this._checkResponse)
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this.likeCard(id)
    }
    else {
      return this.unlikeCard(id)
    }
  }

  editAvatar(link) {
    const token = localStorage.getItem('token');
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        "Authorization": token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: link
      })
    })
    .then(this._checkResponse)
  }

  setToken(token) {
    this._headers = { ...this._headers, "Authorization": `Bearer ${token}` }
  }
}

const api = new Api(apiConfig);
export { api }
