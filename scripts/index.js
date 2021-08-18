let popup = document.querySelector('.popup');
let openPopupButton = document.querySelector('.profile__edit-button');
let closePopupButton = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelectorAll('.popup__input')[0];
let jobInput = document.querySelectorAll('.popup__input')[1];

function togglePopup() {
    if (!popup.classList.contains('.popup__opened')) {
        nameInput.value = document.querySelector('.profile__username').textContent;
        jobInput.value = document.querySelector('.profile__job').textContent;
    }
    popup.classList.toggle('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    document.querySelector('.profile__username').textContent = nameInput.value;
    document.querySelector('.profile__job').textContent = jobInput.value;
    togglePopup();
}

openPopupButton.addEventListener('click', togglePopup);
closePopupButton.addEventListener('click', togglePopup);
formElement.addEventListener('submit', formSubmitHandler);