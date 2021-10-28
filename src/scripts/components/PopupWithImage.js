import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imagePopupElement = document.querySelector('.popup__image');
        this._titlePopupElement = document.querySelector('.popup__caption');
    }

    open(item) {
        this._imagePopupElement.src = item.link;
        this._imagePopupElement.alt = item.name;
        this._titlePopupElement.textContent = item.name;
        super.open();
    }
}