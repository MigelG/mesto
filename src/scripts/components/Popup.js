export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose.bind(this));
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
    }

    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        const closeButton = this._popup.querySelector('.popup__close-button');
        const popupContainer = this._popup.querySelector('.popup__container');
        closeButton.addEventListener('click', this.close.bind(this));
        this._popup.addEventListener('mousedown', this.close.bind(this));
        popupContainer.addEventListener('mousedown', (event) => {
            event.stopPropagation();
        });
    }
}