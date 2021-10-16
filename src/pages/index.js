import "./index.css";
import { Card } from "../scripts/components/Card.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import { Section } from "../scripts/components/Section.js";
import { PopupWithImage } from "../scripts/components/PopupWithImage.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { initialCards } from "../scripts/utils/constants.js";
import { dataForm } from "../scripts/utils/constants.js";
import { UserInfo } from "../scripts/components/UserInfo.js";
import { openEditPopupButton } from "../scripts/utils/constants.js";
import { nameInput } from "../scripts/utils/constants.js";
import { jobInput } from "../scripts/utils/constants.js";
import { openAddCardButton } from "../scripts/utils/constants.js";

const popupTypeAdd = new PopupWithForm(submitAddForm, '.popup_type_add');
popupTypeAdd.setEventListeners();

const popupTypeEdit = new PopupWithForm(submitProfileForm, '.popup_type_edit');
popupTypeEdit.setEventListeners();

const userInfo = new UserInfo({ userName: '.profile__username', userJob: '.profile__job' });

const popupTypeImage = new PopupWithImage('.popup_type_big-image');
popupTypeImage.setEventListeners();

//Открытие попапа просмотра картинки
function handlePicturePreview(name, link) {
    popupTypeImage.open(name, link);
};

//Функция отправки формы редактирования профиля
function submitProfileForm(event, data) {
    event.preventDefault();
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
    formAdd.toggleButtonState();
    popupTypeAdd.open();
});

//Включение валидации форм
const formEdit = new FormValidator(dataForm, '.popup__form_type_edit');
formEdit.enableValidation();
const formAdd = new FormValidator(dataForm, '.popup__form_type_add');
formAdd.enableValidation();

//Функция отправки формы создания карточки
function submitAddForm(event, data) {
    event.preventDefault();
    cardsList.addItem(createCard(data));
    popupTypeAdd.close();
};

//Создание и отрисовка карточек из массива
const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
        cardsList.addItem(createCard(item));
    },
},
    '.places'
);

cardsList.renderItems();

//Функция создания новой карточки
function createCard(item) {
    const card = new Card(item, '#place', handlePicturePreview);
    return card.generateCard();
}