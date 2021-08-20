//Объявляем переменные
let popup = document.querySelector('.popup');
let openPopupButton = document.querySelector('.profile__edit-button');
let closePopupButton = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let profileName = document.querySelector('.profile__username');
let profilJob = document.querySelector('.profile__job');

//Функция открытия попапа
function openPopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profilJob.textContent;
    popup.classList.add('popup_opened');
}

//Функция закрытия попапа
function closePopup() {
    popup.classList.remove('popup_opened');
}

//Функция отправки формы
function submitForm(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profilJob.textContent = jobInput.value;
    closePopup();
}

//Обработчики событий
openPopupButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', submitForm);