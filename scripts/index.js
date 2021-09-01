//Попап редактирования профиля
const editPopup = document.querySelector('.popup_type_edit');
const openEditPopupButton = document.querySelector('.profile__edit-button');
const closePopupButton = document.querySelector('.popup__close-button_type_edit');
const formElement = document.querySelector('.popup__form__type_edit');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__username');
const profilJob = document.querySelector('.profile__job');

//Функция открытия попапа
function openPopup(popup) {
    popup.classList.add('popup_opened');
};

//Функция закрытия попапа
function closePopup(popup) {
    popup.classList.remove('popup_opened');
};

//Функция отправки формы
function submitForm(event) {
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
formElement.addEventListener('submit', submitForm);



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
const deleteButton = document.querySelectorAll('.place__delete-button');
const places = document.querySelector('.places');
const placeTemplate = document.querySelector('#place').content;
const addPopup = document.querySelector('.popup_type_add');
const openAddCardButton = document.querySelector('.profile__add-button');
const closeAddPopupButton = document.querySelector('.popup__close-button_type_add');
const closeImagePopupButton = document.querySelector('.popup__close-button_type_big-image');
const placeInput = document.querySelector('.popup__input_type_place');
const linkInput = document.querySelector('.popup__input_type_link');
const formAddElement = document.querySelector('.popup__form__type_add');
const imagePopup = document.querySelector('.popup_type_big-image');
const imagePopupElement = document.querySelector('.popup__image');
const titlePopupElement = document.querySelector('.popup__caption');

//Инициализация массива карточек
initialCards.forEach((card) => {
    addPlace(card);
});

//Функция добавления карточки
function addPlace(card) {
    const placeElement = placeTemplate.querySelector('.place').cloneNode(true);
    placeElement.querySelector('.place__title').textContent = card.name;
    placeElement.querySelector('.place__image').src = card.link;
    placeElement.querySelector('.place__delete-button').addEventListener('click', (event) => {
        event.target.closest('.place').remove();
    })
    placeElement.querySelector('.place__like-button').addEventListener('click', (event) => {
        event.target.classList.toggle('place__like-button_active');
    })
    placeElement.querySelector('.place__image').addEventListener('click', (event) => {
        imagePopupElement.src = event.target.src;
        titlePopupElement.textContent = event.target.closest('.place').querySelector('.place__title').textContent;
        openPopup(imagePopup);
    })
    places.prepend(placeElement);
};

//Функция отправки формы
function submitAddForm(event) {
    event.preventDefault();
    let card = { name: '', link: '' };
    card.name = placeInput.value;
    card.link = linkInput.value;
    addPlace(card);
    placeInput.value = '';
    linkInput.value = '';
    closePopup(addPopup);
};

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