let popup = document.querySelector('.popup');
let openPopupButton = document.querySelector('.profile__edit-button');
let closePopupButton = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelectorAll('.popup__input')[0];
let jobInput = document.querySelectorAll('.popup__input')[1];
let profileName = document.querySelector('.profile__username');
let profilJob = document.querySelector('.profile__job');

function togglePopup() {
    if (!popup.classList.contains('.popup__opened')) {
        nameInput.value = profileName.textContent;
        jobInput.value = profilJob.textContent;
    }
    popup.classList.toggle('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profilJob.textContent = jobInput.value;
    togglePopup();
}

openPopupButton.addEventListener('click', togglePopup);
closePopupButton.addEventListener('click', togglePopup);
formElement.addEventListener('submit', formSubmitHandler);