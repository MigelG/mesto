import "./pages/index.css";
import { Card } from "./scripts/components/Card.js";
import { FormValidator } from "./scripts/components/FormValidator.js";
import { Section } from "./scripts/components/Section.js";
import { PopupWithImage } from "./scripts/components/PopupWithImage.js";
import { PopupWithForm } from "./scripts/components/PopupWithForm.js";
import { initialCards } from "./scripts/initialCards.js";
import { UserInfo } from "./scripts/components/UserInfo.js";

//Глобальные переменные
const openEditPopupButton = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const openAddCardButton = document.querySelector('.profile__add-button');
const placeInput = document.querySelector('.popup__input_type_place');
const linkInput = document.querySelector('.popup__input_type_link');

const popupTypeAdd = new PopupWithForm(submitAddForm, '.popup_type_add');
popupTypeAdd.setEventListeners();

const popupTypeEdit = new PopupWithForm(submitProfileForm, '.popup_type_edit');
popupTypeEdit.setEventListeners();

const userInfo = new UserInfo({ userName: '.profile__username', userJob: '.profile__job' });

//Функция отправки формы редактирования профиля
function submitProfileForm(event) {
    event.preventDefault();
    userInfo.setUserInfo();
};

//Открытие попапа редактирования профиля
openEditPopupButton.addEventListener('click', () => {
    const info = userInfo.getUserInfo();
    nameInput.value = info.name;
    jobInput.value = info.job;
    popupTypeEdit.open();
});

//Открытие попапа создания карточки
openAddCardButton.addEventListener('click', () => {
    popupTypeAdd.open();
});

//Открытие попапа просмотра картинки
function handlePicturePreview(event) {
    const popup = new PopupWithImage(event, '.popup_type_big-image');
    popup.open();
    popup.setEventListeners();
};

//Объект с параметрами форм
const dataForm = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

//Включение валидации форм
const formEdit = new FormValidator(dataForm, '.popup__form_type_edit');
formEdit.enableValidation();
const formAdd = new FormValidator(dataForm, '.popup__form_type_add');
formAdd.enableValidation();

//Функция отправки формы создания карточки
function submitAddForm(event) {
    event.preventDefault();
    const cardData = [{ name: placeInput.value, link: linkInput.value }];
    const newCard = new Section({
        items: cardData,
        renderer: (item) => {
            const card = new Card(item, '#place', handlePicturePreview);
            const cardElement = card.generateCard();
            newCard.addItem(cardElement);
        },
    },
        '.places'
    );
    newCard.renderItems();
    formAdd.toggleButtonState();
    popupTypeAdd.close();
};

//Создание и отрисовка карточек из массива
const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, '#place', handlePicturePreview);
        const cardElement = card.generateCard();
        cardsList.addItem(cardElement);
    },
},
    '.places'
);

cardsList.renderItems();