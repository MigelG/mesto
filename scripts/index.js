//Попап редактирования профиля
let popup = document.querySelector('.popup_type_edit');
let openPopupButton = document.querySelector('.profile__edit-button');
let closePopupButton = document.querySelector('.popup__close-button_type_edit');
let formElement = document.querySelector('.popup__form__type_edit');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let profileName = document.querySelector('.profile__username');
let profilJob = document.querySelector('.profile__job');

//Функция открытия попапа
function openPopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profilJob.textContent;
    popup.classList.add('popup_opened');
};

//Функция закрытия попапа
function closePopup() {
    popup.classList.remove('popup_opened');
};

//Функция отправки формы
function submitForm(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profilJob.textContent = jobInput.value;
    closePopup();
};

//Обработчики событий
openPopupButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);
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
let addPopup = document.querySelector('.popup_type_add');
let openAddCardButton = document.querySelector('.profile__add-button');
let closeAddPopupButton = document.querySelector('.popup__close-button_type_add');
let placeInput = document.querySelector('.popup__input_type_place');
let linkInput = document.querySelector('.popup__input_type_link');
let formAddElement = document.querySelector('.popup__form__type_add');

//Инициализация массива карточек
initialCards.forEach((card) => {
    addPlace(card);
});

//Функция добавления места
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
    places.prepend(placeElement);
};

//Функция открытия попапа
function openAddPopup() {
    addPopup.classList.add('popup_opened');
};

//Функция закрытия попапа
function closeAddPopup() {
    addPopup.classList.remove('popup_opened');
};

//Функция отправки формы
function submitAddForm(evt) {
    evt.preventDefault();
    let card = { name: '', link: '' };
    card.name = placeInput.value;
    card.link = linkInput.value;
    addPlace(card);
    placeInput.value = '';
    linkInput.value = '';
    closeAddPopup();
};

//Обработчики событий
openAddCardButton.addEventListener('click', openAddPopup);
closeAddPopupButton.addEventListener('click', closeAddPopup);
formAddElement.addEventListener('submit', submitAddForm);


//Попап с картинкой
