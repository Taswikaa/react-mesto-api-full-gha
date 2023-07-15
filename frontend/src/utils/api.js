class Api {
  constructor({ url }) {
    this._url = url;
  }

  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(res.status);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      credentials: 'include',
    })
    .then(res => {
      return this._checkStatus(res);
    })
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      credentials: 'include',
    })
    .then(res => {
      return this._checkStatus(res);
    })
  }

  editUserInfo(name, job) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        about: job
      }),
      credentials: 'include',
    })
    .then(res => {
      return this._checkStatus(res);
    })
  }

  addNewCard(name, link) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        link,
      }),
      credentials: 'include',
    })
    .then(res => {
      return this._checkStatus(res);
    })
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    .then(res => {
      return this._checkStatus(res);
    })
  }

  likeCard(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'PUT',
      credentials: 'include',
    })
    .then(res => {
      return this._checkStatus(res);
    })
  }

  cancelLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'DELETE',
      credentials: 'include',
    })
    .then(res => {
      return this._checkStatus(res);
    })
  }

  changeAvatar(link) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link
      }),
      credentials: 'include',
    })
    .then(res => {
      return this._checkStatus(res);
    })
  }
} 

const api = new Api({
  url: 'http://api.mesto.yuwarika.nomoredomains.xyz',
});

export default api;