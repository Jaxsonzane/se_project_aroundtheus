import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';



const initialCards = [
  {
    name: 'Yosemite Valley',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg',
  },
  {
    name: 'Lake Louise',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg',
  },
  {
    name: 'Bald Mountains',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg',
  },
  {
    name: 'Latemar',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg',
  },
  {
    name: 'Vanoise National Park',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg',
  },
  {
    name: 'Lago di Braies',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg',
  },
];

  


/* -------------------------------------------------------------------------- */
/*                                  elements                                 */
/* -------------------------------------------------------------------------- */

// buttons

const profileEditButton = document.querySelector('#profile-edit-button');
const profileEditModal = document.querySelector('#profile-edit-modal');
const profileEditCloseButton = profileEditModal.querySelector('.modal__close');

const profileAddButton = document.querySelector('#profile-add-button');
const profileAddModal = document.querySelector('#profile-add-modal');
const profileAddCloseButton = profileAddModal.querySelector('.modal__close');

// preview image
const previewImageModal = document.querySelector('#preview-modal-image');
const previewImageCloseModal = previewImageModal.querySelector('.modal__close');

const previewImgEl = previewImageModal.querySelector('.modal__image');
const previewImgTitle = previewImageModal.querySelector('.modal__title');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileTitleInput = document.querySelector('#modal-profile-title-input');
const profileSubtitleInput = document.querySelector(
  '#modal-profile-subtitle-input'
);
const profileEditForm = profileEditModal.querySelector('.modal__form');
const profileAddForm = profileAddModal.querySelector('.modal__form');

const cardListEl = document.querySelector('.card');

// template
const cardTemplate =
  document.querySelector('#card-template').content.firstElementChild;

const cardTitleInput = profileAddForm.querySelector('.modal__input_type_title');
const cardLinkInput = profileAddForm.querySelector('.modal__input_type_link');
/* -------------------------------------------------------------------------- */
/*                                  functions                                 */
/* -------------------------------------------------------------------------- */



function closePopup(popup) {
  popup.classList.remove('modal_opened');
  document.removeEventListener('keydown', handleEscClose);
  document.removeEventListener('click', handleOverlayClose);
}

function openPopup(modal) {
  modal.classList.add('modal_opened');
  document.addEventListener('keydown', handleEscClose);
  document.addEventListener('click', handleOverlayClose);
}

function handleEscClose(e) {
  if (e.key === 'Escape') {
    const openedModal = document.querySelector('.modal_opened');
    closePopup(openedModal);
  }
}

function handleOverlayClose(e) {
  if (e.target.classList.contains('modal')) {
    closePopup(e.target);
  }
}

// Card.js

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector('.card__image');
  const cardTitleEl = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__button-like');
  const deleteButton = cardElement.querySelector('.card__button-remove');

  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('card__button-like_active');
  });
  deleteButton.addEventListener('click', () => {
    cardElement.remove();
  });
  cardImageEl.addEventListener('click', () => {
    previewImgEl.src = data.link;
    previewImgEl.alt = data.name;
    previewImgTitle.textContent = data.name;
    openPopup(previewImageModal);
  });

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;
  return cardElement;
}

//render
function renderCard(data, cardListEl) {
  const cardElement = getCardElement(data);
  cardListEl.prepend(cardElement);
}

/* -------------------------------------------------------------------------- */
/*                               event handlers                               */
/* -------------------------------------------------------------------------- */

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileSubtitle.textContent = profileSubtitleInput.value;
  closePopup(profileEditModal);
}
function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const titleValue = cardTitleInput.value;
  const linkValue = cardLinkInput.value;
  renderCard({ name: titleValue, link: linkValue }, cardListEl);
  e.target.reset(); 
  closePopup(profileAddModal);
}

/* -------------------------------------------------------------------------- */
/*                               event listeners                              */
/* -------------------------------------------------------------------------- */

profileEditButton.addEventListener('click', () => {
  profileTitleInput.value = profileTitle.textContent;
  profileSubtitleInput.value = profileSubtitle.textContent;
  openPopup(profileEditModal);
});
profileEditCloseButton.addEventListener('click', () => {
  closePopup(profileEditModal);
});

profileAddCloseButton.addEventListener('click', () => {
  closePopup(profileAddModal);
});
profileAddButton.addEventListener('click', () => {
  openPopup(profileAddModal);
});

previewImageCloseModal.addEventListener('click', () =>
  closePopup(previewImageModal)
);


profileEditForm.addEventListener('submit', handleProfileEditSubmit);
profileAddForm.addEventListener('submit', handleAddCardFormSubmit);

// initial cards
initialCards.forEach((data) => renderCard(data, cardListEl));

//Validation
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
};

const editFormValidator = new FormValidator(config, profileEditForm);
const cardFormValidator = new FormValidator(config, profileAddForm);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();

// card data
const card = new Card(data, "#card-template");
card.getView();