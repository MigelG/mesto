//Попап редактирования профиля
const editPopup = document.querySelector('.popup_type_edit');
const openEditPopupButton = document.querySelector('.profile__edit-button');
const closePopupButton = document.querySelector('.popup__close-button_type_edit');
const formEditElement = document.querySelector('.popup__form_type_edit');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__username');
const profilJob = document.querySelector('.profile__job');

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


//Попап создания карточек мест
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
const places = document.querySelector('.places');
const placeTemplate = document.querySelector('#place').content;
const addPopup = document.querySelector('.popup_type_add');
const openAddCardButton = document.querySelector('.profile__add-button');
const closeAddPopupButton = document.querySelector('.popup__close-button_type_add');
const closeImagePopupButton = document.querySelector('.popup__close-button_type_big-image');
const placeInput = document.querySelector('.popup__input_type_place');
const linkInput = document.querySelector('.popup__input_type_link');
const formAddElement = document.querySelector('.popup__form_type_add');
const imagePopup = document.querySelector('.popup_type_big-image');
const imagePopupElement = document.querySelector('.popup__image');
const titlePopupElement = document.querySelector('.popup__caption');
const popupContainerList = Array.from(document.querySelectorAll('.popup__container'));
const popupList = Array.from(document.querySelectorAll('.popup'));

//Функция удаления карточки
function handleCardDelete(event) {
    event.target.closest('.place').remove();
};

//Функция лайка карточки
function handleCardLike(event) {
    event.target.classList.toggle('place__like-button_active');
};

//Функция просмотра картинки
function handlePicturePreview(event) {
    const cardName = event.target.closest('.place').querySelector('.place__title').textContent;
    imagePopupElement.src = event.target.src;
    imagePopupElement.alt = cardName;
    titlePopupElement.textContent = cardName;
    openPopup(imagePopup);
};

//Функция создания карточки
function createCard(card) {
    const placeElement = placeTemplate.querySelector('.place').cloneNode(true);
    const cardImage = placeElement.querySelector('.place__image');
    placeElement.querySelector('.place__title').textContent = card.name;
    cardImage.src = card.link;
    cardImage.alt = card.name;
    placeElement.querySelector('.place__delete-button').addEventListener('click', handleCardDelete);
    placeElement.querySelector('.place__like-button').addEventListener('click', handleCardLike);
    cardImage.addEventListener('click', handlePicturePreview);
    return placeElement;
};

//Функция рендеринга карточки
function renderCard(card) {
    places.prepend(card);
};

//Функция отправки формы
function submitAddForm(event) {
    event.preventDefault();
    let card = { name: '', link: '' };
    card.name = placeInput.value;
    card.link = linkInput.value;
    renderCard(createCard(card));
    formAddElement.reset();
    closePopup(addPopup);
};

//Инициализация массива карточек
initialCards.forEach((card) => {
    renderCard(createCard(card));
});

//Обработчики событий
openAddCardButton.addEventListener('click', () => {
    openPopup(addPopup);
});
closeAddPopupButton.addEventListener('click', () => {
    closePopup(addPopup);
});
closeImagePopupButton.addEventListener('click', () => {
    closePopup(imagePopup);
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