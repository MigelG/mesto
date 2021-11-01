import { Popup } from "./Popup.js";

export class PopupWithConfirm extends Popup {
    constructor(submit, popupSelector) {
        super(popupSelector);
        this._submit = submit;
        this._form = this._popup.querySelector('.popup__form');
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (event) => {
            this._submit(event);
        });
    }
}