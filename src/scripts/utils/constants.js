export const openEditPopupButton = document.querySelector('.profile__edit-button');
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_job');
export const openAddCardButton = document.querySelector('.profile__add-button');
export const openAvatarPopupButton = document.querySelector('.profile__avatar');

//Объект с параметрами форм
export const dataForm = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};