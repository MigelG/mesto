export class Card {
    static _imagePopup = document.querySelector('.popup_type_big-image');
    constructor(data, cardSelector, handleOpenPopup) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleOpenPopup = handleOpenPopup;
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
        this._setEventListeners();

        this._element.querySelector('.place__title').textContent = this._name;
        _image.src = this._link;
        _image.alt = this._name;

        return this._element;
    }

    _setEventListeners() {
        const _closePopupButton = document.querySelector('.popup__close-button_type_big-image');
        const _popupContainer = document.querySelector('.popup__container_type_big-image');
        this._element.querySelector('.place__like-button').addEventListener('click', () => {
            this._handleCardLike();
        });
        this._element.querySelector('.place__delete-button').addEventListener('click', () => {
            this._handleCardDelete();
        });
        this._element.querySelector('.place__image').addEventListener('click', (event) => {
            this._handleOpenPopup(event);
        });
        _closePopupButton.addEventListener('click', () => {
            this._handleClosePopup();
        });
        Card._imagePopup.addEventListener('click', () => {
            this._handleClosePopup();
        });
        _popupContainer.addEventListener('click', (event) => {
            event.stopPropagation();
        });
    }

    _handleCardLike() {
        this._element.querySelector('.place__like-button').classList.toggle('place__like-button_active');
    }

    _handleCardDelete() {
        this._element.remove();
    }

    _handleClosePopup() {
        Card._imagePopup.classList.remove('popup_opened');
    }
}