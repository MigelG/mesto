//Попап
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

//Карточки мест
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
    places.prepend(placeElement);
};