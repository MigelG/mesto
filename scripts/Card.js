export class Card {
    static _imagePopup = document.querySelector('.popup_type_big-image');
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
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
        this._setEventListeners();

        this._element.querySelector('.place__title').textContent = this._name;
        this._element.querySelector('.place__image').src = this._link;
        this._element.querySelector('.place__image').alt = this._name;

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
        this._element.querySelector('.place__image').addEventListener('click', () => {
            this._handleOpenPopup();
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
        this._element.closest('.place').remove();
    }

    _handleOpenPopup() {
        const _imagePopupElement = document.querySelector('.popup__image');
        const _titlePopupElement = document.querySelector('.popup__caption');
        _imagePopupElement.src = this._link;
        _imagePopupElement.alt = this._name;
        _titlePopupElement.textContent = this._name;
        Card._imagePopup.classList.add('popup_opened');
    }

    _handleClosePopup() {
        Card._imagePopup.classList.remove('popup_opened');
    }
}