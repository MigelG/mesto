import "./index.css";
import { Card } from "../scripts/components/Card.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import { Section } from "../scripts/components/Section.js";
import { PopupWithImage } from "../scripts/components/PopupWithImage.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { PopupWithConfirm } from "../scripts/components/PopupWithConfirm.js";
import { Api } from "../scripts/components/Api.js";
import { dataForm } from "../scripts/utils/constants.js";
import { UserInfo } from "../scripts/components/UserInfo.js";
import { openEditPopupButton } from "../scripts/utils/constants.js";
import { nameInput } from "../scripts/utils/constants.js";
import { jobInput } from "../scripts/utils/constants.js";
import { openAddCardButton } from "../scripts/utils/constants.js";
import { openAvatarPopupButton } from "../scripts/utils/constants.js";

const popupTypeAdd = new PopupWithForm(submitAddForm, '.popup_type_add');
popupTypeAdd.setEventListeners();

const popupTypeEdit = new PopupWithForm(submitProfileForm, '.popup_type_edit');
popupTypeEdit.setEventListeners();

const popupTypeDelete = new PopupWithConfirm(submitDeleteForm, '.popup_type_delete');
popupTypeDelete.setEventListeners();

const popupTypeAvatar = new PopupWithForm(submitAvatarForm, '.popup_type_avatar');
popupTypeAvatar.setEventListeners();

const userInfo = new UserInfo({ userName: '.profile__username', userJob: '.profile__job', userAvatar: '.profile__img' });

const popupTypeImage = new PopupWithImage('.popup_type_big-image');
popupTypeImage.setEventListeners();

//Открытие попапа просмотра картинки
function handlePicturePreview(item) {
    popupTypeImage.open(item);
};

//Открытие попапа подтверждения удаления карточки
let currentId = '';
function handleDeleteCard(id) {
    popupTypeDelete.open();
    currentId = id;
};

//Функция отправки формы удаления карточки
function submitDeleteForm(event) {
    event.preventDefault();
    api.deleteCard(currentId)
        .then(() => {
            //delete card
        });
}

//Открытие попапа редактирования профиля
openEditPopupButton.addEventListener('click', () => {
    const info = userInfo.getUserInfo();
    nameInput.value = info.name;
    jobInput.value = info.about;
    popupTypeEdit.open();
});

//Функция отправки формы редактирования профиля
function submitProfileForm(event, data) {
    event.preventDefault();
    api.saveUserInfo(data)
        .then(res => {
            userInfo.setUserInfo(res);
        });
};

//Открытие попапа редактирования аватара
openAvatarPopupButton.addEventListener('click', () => {
    popupTypeAvatar.open();
})

//Функция отправки формы редактирования аватара
function submitAvatarForm(event) {
    event.preventDefault();
    const link = document.querySelector('.popup__input_type_avatar').value;
    api.editAvatar({ avatar: link })
        .then((res) => {
            document.querySelector('.profile__img').src = res.avatar;
        });
};

//Открытие попапа создания карточки
openAddCardButton.addEventListener('click', () => {
    formAdd.toggleButtonState();
    popupTypeAdd.open();
});

//Функция отправки формы создания карточки
function submitAddForm(event, item) {
    event.preventDefault();
    const promis = api.addCard(item);
    promis.then(data => {
        renderCard(data);
    });
    popupTypeAdd.close();
};

//Функция рендеринга карточки
function renderCard(data) {
    userData.then(id => {

        id === data.owner._id
            ? data.isOwner = true
            : data.isOwner = false;

        data.likes.forEach(user => {
            id === user._id
                ? data.isLiked = true
                : data.isLiked = false;
        });

        cardsList.addItem(createCard(data));

    });
};

//Функция лайка карточки
function handleLikeCard(event, cardId, isLiked) {
    let promis;
    isLiked
        ? promis = api.likeCard(cardId, 'DELETE')
        : promis = api.likeCard(cardId, 'PUT');
    promis
        .then((res) => {
            event.target.closest('.place').querySelector('.place__like-score').textContent = res.likes.length;
            event.target.closest('.place__like-button').classList.toggle('place__like-button_active');
        });
}

//Включение валидации форм
const formEdit = new FormValidator(dataForm, '.popup__form_type_edit');
formEdit.enableValidation();
const formAdd = new FormValidator(dataForm, '.popup__form_type_add');
formAdd.enableValidation();
const formAvatar = new FormValidator(dataForm, '.popup__form_type_avatar');
formAvatar.enableValidation();

//Функция создания новой карточки
function createCard(item) {
    const card = new Card(item, '#place', handlePicturePreview, handleDeleteCard, handleLikeCard);
    return card.generateCard();
};

//Экземпляр класса Api
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-29',
    headers: {
        authorization: 'abaeba32-e658-413f-86b2-3d2488ef3044',
        'Content-Type': 'application/json'
    }
});

//Экземпляр класса Section
const cardsList = new Section({
    renderer: (item) => {
        renderCard(item);
    },
},
    '.places'
);

//Получение карточек и данных пользователя с сервера и отрисовка их на странице
const userData = api
    .getAppInfo()
    .then(([userInfoRes, cardListRes]) => {
        cardsList.renderItems(cardListRes)
        userInfo.setUserInfo(userInfoRes);
        return userInfoRes._id;
    })
    .catch(err => console.log(`Ошибка загрузки инициирующих данных: ${err}`));