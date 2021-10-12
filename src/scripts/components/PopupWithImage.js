import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(event, popupSelector) {
        super(popupSelector);
        this._event = event;
    }

    open() {
        const imagePopupElement = document.querySelector('.popup__image');
        const titlePopupElement = document.querySelector('.popup__caption');
        const cardName = this._event.target.closest('.place').querySelector('.place__title').textContent;
        imagePopupElement.src = this._event.target.src;
        imagePopupElement.alt = cardName;
        titlePopupElement.textContent = cardName;
        super.open();
    }
}