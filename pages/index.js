import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';

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



// edit profile
const profileEditButton = document.querySelector('#profile-edit-button');
const profileEditModal = document.querySelector('#profile-edit-modal');
const profileEditCloseButton = profileEditModal.querySelector('.modal__close');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileEditForm = profileEditModal.querySelector('.modal__form');

// preview
const previewImageModal = document.querySelector('#preview-image-modal');
const previewImage = previewImageModal.querySelector('.modal__image');
const previewImageModalTitle = previewImageModal.querySelector('.modal__title');
const previewImageModalCloseButton =
	previewImageModal.querySelector('.modal__close');

// add card
const addCardModal = document.querySelector('#add-card-modal');
const addCardModalCloseButton = addCardModal.querySelector('.modal__close');
const profileTitleInput = document.querySelector('#profile-title-input');
const profileDescriptionInput = document.querySelector(
	'#profile-description-input'
);
const addNewCardButton = document.querySelector('.profile__add-button');
const addCardFormElement = addCardModal.querySelector('.modal__form');
const cardUrlInput = addCardFormElement.querySelector('#form-input-url');
const cardTitleInput = addCardFormElement.querySelector('#form-input-title');

// template
const cardListEl = document.querySelector('.cards__list');
const cardTemplate =
	document.querySelector('#card-template').content.firstElementChild;

	

function openPopup(modal) {
	modal.classList.add('modal_opened');
	document.addEventListener('keydown', escPopup);
}

function closePopup(modal) {
	modal.classList.remove('modal_opened');
	document.removeEventListener('keydown', escPopup);
}

function escPopup(e) {
	if (e.key === 'Escape') {
		const modal = document.querySelector('.modal_opened');
		if (modal) closePopup(modal);
	}
}

function handleOverlayClose(e) {
	if (e.target.classList.contains('modal_opened')) {
		closePopup(e.target);
	}
}

function handleImageClick(data) {
	previewImage.src = data.link;
	previewImage.alt = `Photo of ${data.name}`;
	previewImageModalTitle.textContent = data.name;

	openPopup(previewImageModal);
}

// function getCardElement(cardData) {

//   const cardElement = cardTemplate.cloneNode(true);
//   const cardImageEl = cardElement.querySelector('.card__image');
//   const cardTitleEl = cardElement.querySelector('.card__title');
//   const likeButton = cardElement.querySelector('.card__button-like');
//   const deleteButton = cardElement.querySelector('.card__button-remove');

// likeButton.addEventListener('click', () => {
//   likeButton.classList.toggle('card__button-like-active');
// });
// deleteButton.addEventListener('click', () => {
//   cardElement.remove();
// });

// cardImageEl.addEventListener('click', () => {
//   previewImage.src = cardData.link;
//   previewImage.alt = cardData.name;
//   previewImageModalTitle.textContent = cardData.name;
//   openPopup(previewImageModal);
// });

// cardImageEl.src = cardData.link;
// cardImageEl.alt = cardData.name;
// cardTitleEl.textContent = cardData.name;
// return cardElement;

function renderCard(cardData, cardListEl) {
	const card = new Card(cardData, '#card-template', handleImageClick);
	cardListEl.prepend(card.getView());
}


function handlerProfileEditSubmit(e) {
	e.preventDefault();
	profileTitle.textContent = profileTitleInput.value;
	profileDescription.textContent = profileDescriptionInput.value;
	closePopup(profileEditModal);
}
function handleAddCardFormSubmit(e) {
	e.preventDefault();
	const name = cardTitleInput.value;
	const link = cardUrlInput.value;
	renderCard({ name, link }, cardListEl);
	addCardFormElement.reset();
	closePopup(addCardModal);

	addCardValidator.toggleButtonState();
}

// Event Listeners

profileEditButton.addEventListener('click', () => {
	profileTitleInput.value = profileTitle.textContent;
	profileDescriptionInput.value = profileDescription.textContent;
	openPopup(profileEditModal);
});

profileEditCloseButton.addEventListener('click', () => {
	closePopup(profileEditModal);
});

previewImageModalCloseButton.addEventListener('click', () => {
	closePopup(previewImageModal);
});

profileEditModal.addEventListener('mousedown', handleOverlayClose);
addCardModal.addEventListener('mousedown', handleOverlayClose);
previewImageModal.addEventListener('mousedown', handleOverlayClose);

//form listeners
profileEditForm.addEventListener('submit', handlerProfileEditSubmit);
addCardFormElement.addEventListener('submit', handleAddCardFormSubmit);
//new cards
addNewCardButton.addEventListener('click', () => {
	addCardValidator.toggleButtonState();
	openPopup(addCardModal);
});
addCardModalCloseButton.addEventListener('click', () =>
	closePopup(addCardModal)
);

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

const addFormElement = document.querySelector(
	'#add-card-form'
);
const editFormElement = document.querySelector('#edit-card-form');

const config = {
	formSelector: '.modal__form',
	inputSelector: '.modal__input',
	submitButtonSelector: '.modal__button',
	inactiveButtonClass: 'modal__button_disabled',
	inputErrorClass: 'modal__input_type_error',
	errorClass: 'popup__error_visible',
	errorMessageEl: 'modal__error',
};

const addCardValidator = new FormValidator(config, addFormElement);
addCardValidator.enableValidation();

const addEditValidator = new FormValidator(config, editFormElement);
addEditValidator.enableValidation();
