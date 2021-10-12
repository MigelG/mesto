import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(submit, popupSelector) {
        super(popupSelector);
        this._submit = submit;
    }

    _getInputValues() {
        return Array.from(this._popup.querySelectorAll('.popup__input'));
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.querySelector('.popup__form').addEventListener('submit', (event) => {
            this._submit(event);
            this.close();
        });
    }

    close() {
        super.close();
        const formElement = this._popup.querySelector('.popup__form')
        formElement.reset();
    }
}