import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(submit, popupSelector) {
        super(popupSelector);
        this._submit = submit;
        this._form = this._popup.querySelector('.popup__form');
    }

    _getInputValues() {
        const data = {};
        const inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
        inputList.forEach(input => {
            data[input.id] = input.value;
        })
        return data;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (event) => {
            this._submit(event);
            this.close();
        });
    }

    close() {
        super.close();
        this._form.reset();
    }
}