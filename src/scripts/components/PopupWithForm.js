import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(submit, popupSelector) {
        super(popupSelector);
        this._submit = submit;
        this._form = this._popup.querySelector('.popup__form');
        this._submitButton = this._form.querySelector('.popup__submit-button');
        this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
    }

    _getInputValues() {
        const data = {};
        this._inputList.forEach(input => {
            data[input.name] = input.value;
        })
        return data;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (event) => {
            this._submit(event, this._getInputValues());
        });
    }

    close() {
        super.close();
        this._form.reset();
    }

    toggleSubmitButton(text) {
        this._submitButton.textContent = text;
    }
}