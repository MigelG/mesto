export class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getAppInfo() {
        return Promise.all([this.getUserInfo(), this.getCardList()])
    }

    getCardList() {
        return fetch(this._baseUrl + '/cards', {
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject('Произошла какая-то ошибка');
            });
    }

    addCard(data) {
        return fetch(this._baseUrl + '/cards', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data),
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject('Произошла какая-то ошибка');
            });
    }

    getUserInfo() {
        return fetch(this._baseUrl + '/users/me', {
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject('Произошла какая-то ошибка');
            });
    }

    saveUserInfo(data) {
        return fetch(this._baseUrl + '/users/me', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data),
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject('Произошла какая-то ошибка');
            });
    }

    deleteCard(id) {
        return fetch(this._baseUrl + `/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject('Произошла какая-то ошибка');
            });
    }

    likeCard(id, method) {
        return fetch(this._baseUrl + `/cards/likes/${id}`, {
            method: `${method}`,
            headers: this._headers,
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject('Произошла какая-то ошибка');
            });
    }

    editAvatar(avatar) {
        return fetch(this._baseUrl + '/users/me/avatar', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(avatar),
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject('Произошла какая-то ошибка');
            });
    }
}