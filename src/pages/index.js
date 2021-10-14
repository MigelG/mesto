import "./index.css";
import { Card } from "../scripts/components/Card.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import { Section } from "../scripts/components/Section.js";
import { PopupWithImage } from "../scripts/components/PopupWithImage.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { initialCards } from "../scripts/initialCards.js";
import { dataForm } from "../scripts/dataForm.js";
import { UserInfo } from "../scripts/components/UserInfo.js";
import { openEditPopupButton } from "../scripts/utils/constants.js";
import { nameInput } from "../scripts/utils/constants.js";
import { jobInput } from "../scripts/utils/constants.js";
import { openAddCardButton } from "../scripts/utils/constants.js";
import { placeInput } from "../scripts/utils/constants.js";
import { linkInput } from "../scripts/utils/constants.js";

const popupTypeAdd = new PopupWithForm(submitAddForm, '.popup_type_add');
popupTypeAdd.setEventListeners();

const popupTypeEdit = new PopupWithForm(submitProfileForm, '.popup_type_edit');
popupTypeEdit.setEventListeners();

const userInfo = new UserInfo({ userName: '.profile__username', userJob: '.profile__job' });

const popupTypeImage = new PopupWithImage('.popup_type_big-image');

//Открытие попапа просмотра картинки
function handlePicturePreview(name, link) {
    popupTypeImage.open(name, link);
    popupTypeImage.setEventListeners();
};

//Функция отправки формы редактирования профиля
function submitProfileForm(event) {
    event.preventDefault();
    const data = popupTypeEdit._getInputValues();
    userInfo.setUserInfo(data);
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

//Включение валидации форм
const formEdit = new FormValidator(dataForm, '.popup__form_type_edit');
formEdit.enableValidation();
const formAdd = new FormValidator(dataForm, '.popup__form_type_add');
formAdd.enableValidation();

//Один экземпляр класса Section для всех новых карточек
const newCard = new Section({
    items: {},
    renderer: () => { },
},
    '.places'
);

//Функция отправки формы создания карточки
function submitAddForm(event) {
    event.preventDefault();
    const cardData = { name: placeInput.value, link: linkInput.value };
    createCard(cardData, newCard);
    formAdd.toggleButtonState();
    popupTypeAdd.close();
};

//Создание и отрисовка карточек из массива
const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
        createCard(item, cardsList);
    },
},
    '.places'
);

cardsList.renderItems();

//Функция создания новой карточки
function createCard(item, section) {
    const card = new Card(item, '#place', handlePicturePreview);
    section.addItem(card.generateCard());
}