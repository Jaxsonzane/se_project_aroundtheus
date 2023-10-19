
  export const config = {
        formSelector: '.modal__form',
        inputSelector: '.modal__input',
        submitButtonSelector: '.modal__button',
        inactiveButtonClass: 'modal__button_disabled',
        inputErrorClass: 'modal__input_type_error',
        errorClass: 'modal__error_visible',
        errorMessageEl: '.modal__error',
    };

    // edit profile
export const profileEditButton = document.querySelector('#profile-edit-button');
export const profileEditModal = document.querySelector('#profile-edit-modal');
export const profileEditCloseButton = profileEditModal.querySelector('.modal__close');

// preview
export const previewImageModal = document.querySelector('#preview-image-modal');
export const previewImageModalCloseButton =
	previewImageModal.querySelector('.modal__close');

// add card
export const addCardModal = document.querySelector('#add-card-modal');
export const addCardModalCloseButton = addCardModal.querySelector('.modal__close');
export const profileTitleInput = document.querySelector('#profile-title-input');
export const profileDescriptionInput = document.querySelector(
	'#profile-description-input'
);
export const addNewCardButton = document.querySelector('.profile__add-button');
export const addCardFormElement = addCardModal.querySelector('.modal__form');
export const cardUrlInput = addCardFormElement.querySelector('#form-input-url');
export const cardTitleInput = addCardFormElement.querySelector('#form-input-title');

// template
export const cardListEl = document.querySelector('.cards__list');

export const addFormElement = document.querySelector('#add-card-form');
export const editFormElement = document.querySelector('#edit-card-form');
export const avatarFormElement = document.querySelector('#avatar-form');
// const avatarButton = document.querySelector('.avatar__edit_button');
export const profilePicture = document.querySelector('.profile__image');
