import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

//Попап редактирования профиля
const editPopup = document.querySelector('.popup_type_edit');
const openEditPopupButton = document.querySelector('.profile__edit-button');
const closePopupButton = document.querySelector('.popup__close-button_type_edit');
const formEditElement = document.querySelector('.popup__form_type_edit');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__username');
const profilJob = document.querySelector('.profile__job');
const places = document.querySelector('.places');
const addPopup = document.querySelector('.popup_type_add');
const openAddCardButton = document.querySelector('.profile__add-button');
const closeAddPopupButton = document.querySelector('.popup__close-button_type_add');
const placeInput = document.querySelector('.popup__input_type_place');
const linkInput = document.querySelector('.popup__input_type_link');
const formAddElement = document.querySelector('.popup__form_type_add');
const popupContainerList = Array.from(document.querySelectorAll('.popup__container'));
const popupList = Array.from(document.querySelectorAll('.popup'));

//Функция закрытия попапа на клавишу Esc
const closePopupEsc = (event) => {
    const popup = document.querySelector('.popup_opened');
    if (event.key === 'Escape') {
        closePopup(popup);
    }
}

//Функция открытия попапа
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
};

//Функция закрытия попапа
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
};

//Функция отправки формы редактирования профиля
function submitProfileForm(event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profilJob.textContent = jobInput.value;
    closePopup(editPopup);
};

//Обработчики событий
openEditPopupButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profilJob.textContent;
    openPopup(editPopup);
});
closePopupButton.addEventListener('click', () => {
    closePopup(editPopup);
});
formEditElement.addEventListener('submit', submitProfileForm);


//Объект с карточками мест
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

//Отрисовка карточек из объекта
initialCards.forEach((item) => {
    const card = new Card(item, '#place');
    const cardElement = card.generateCard();
    places.prepend(cardElement);
});

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



//Функция отправки формы
function submitAddForm(event) {
    event.preventDefault();
    let card = { name: '', link: '' };
    card.name = placeInput.value;
    card.link = linkInput.value;
    const newCard = new Card(card, '#place');
    const cardElement = newCard.generateCard();
    places.prepend(cardElement);
    formAddElement.reset();
    closePopup(addPopup);
};

//Обработчики событий
openAddCardButton.addEventListener('click', () => {
    openPopup(addPopup);
});
closeAddPopupButton.addEventListener('click', () => {
    closePopup(addPopup);
});

formAddElement.addEventListener('submit', submitAddForm);
popupList.forEach((popup) => {
    popup.addEventListener('click', () => {
        if (popup.classList.contains('popup')) {
            closePopup(popup);
        }
    });
});
popupContainerList.forEach((popupContainer) => {
    popupContainer.addEventListener('click', (event) => {
        event.stopPropagation();
    });
});