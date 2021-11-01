export class Card {
    constructor(data, cardSelector, handleOpenPopup, handleDeleteCard, handleLikeCard) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._cardId = data._id;
        this._ownerId = data.owner._id;
        this._isOwner = data.isOwner;
        this._isLiked = data.isLiked;

        this._cardSelector = cardSelector;

        this._handleOpenPopup = handleOpenPopup;
        this._handleDeleteCard = handleDeleteCard;
        this._handleLikeCard = handleLikeCard;
    }

    _getTemplate() {
        const _cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.place')
            .cloneNode(true);

        return _cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        const _image = this._element.querySelector('.place__image');
        this._likesScoreElement = this._element.querySelector('.place__like-score');
        this._setEventListeners();
        if (!this._isOwner) {
            this._element.querySelector('.place__delete-button').remove();
        }
        if (this._isLiked) {
            this._toggleLike();
        }

        this._element.querySelector('.place__title').textContent = this._name;
        _image.src = this._link;
        _image.alt = this._name;
        this._likesScoreElement.textContent = this._likes.length;

        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.place__like-button').addEventListener('click', () => {
            this._handleLikeCard(this._cardId, this._isLiked, this);
        });
        this._element.querySelector('.place__delete-button').addEventListener('click', () => {
            this._handleDeleteCard(this._cardId, this);
        });
        this._element.querySelector('.place__image').addEventListener('click', () => {
            this._handleOpenPopup({ name: this._name, link: this._link });
        });
    }

    removeCard() {
        this._element.remove();
        this._element = null;
    }

    updateLikes(score) {
        this._likesScoreElement.textContent = score;
        this._toggleLike();
        this._isLiked = !this._isLiked;
    }

    _toggleLike() {
        this._element.querySelector('.place__like-button').classList.toggle('place__like-button_active');
    }
}