class Api {
  constructor(url, token) {
    this._url = url;
    this._token = token;
  }

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUser()]);
  }

  _getResponseData(data) {
    if (data.ok) {
      return data.json();
    }
    return Promise.reject("Error");
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  addCard(card) {
    const body = {
      name: card.title,
      link: card.link,
    };
    return fetch(`${this._url}/cards`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => {
      return res.json();
    });
  }

  deletedCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: "PUT",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        return this._getResponseData(res);
      });
    } else {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: "DELETE",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        return this._getResponseData(res);
      });
    }
  }

  getUser() {
    return fetch(`${this._url}/users/me`, {
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  setUser(user) {
    const body = {
      name: user.name,
      about: user.about,
    };
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",     
      },
      body: JSON.stringify(body),
    }).then((res) => {
      return res.json();
    });
  }

  editAvatar(avatar) {
    const body = {
      avatar: avatar,
    };
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => {
      return res.json();
    });
  }
  logout() {
    return fetch(`${this._url}/users/logout`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}



const api = new Api(
  "http://localhost:3001",
);

export default api;
