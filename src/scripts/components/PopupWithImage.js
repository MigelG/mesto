import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imagePopupElement = document.querySelector('.popup__image');
        this._titlePopupElement = document.querySelector('.popup__caption');
    }

    open(name, link) {
        this._imagePopupElement.src = link;
        this._imagePopupElement.alt = name;
        this._titlePopupElement.textContent = name;
        super.open();
    }
}