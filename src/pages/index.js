import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import '../pages/index.css';
import PopupConfirmation from '../components/PopupWithConfirmation.js';


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

const config = {
	formSelector: '.modal__form',
	inputSelector: '.modal__input',
	submitButtonSelector: '.modal__button',
	inactiveButtonClass: 'modal__button_disabled',
	inputErrorClass: 'modal__input_type_error',
	errorClass: 'modal__error_visible',
	errorMessageEl: '.modal__error',
};

// edit profile
const profileEditButton = document.querySelector('#profile-edit-button');
const profileEditModal = document.querySelector('#profile-edit-modal');
const profileEditCloseButton = profileEditModal.querySelector('.modal__close');

// preview
const previewImageModal = document.querySelector('#preview-image-modal');
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

const addFormElement = document.querySelector('#add-card-form');
const editFormElement = document.querySelector('#edit-card-form');
const avatarFormElement = document.querySelector('#avatar-form');
const profilePicture = document.querySelector('.profile__image');



//
// API
//

const api = new Api({
	baseUrl: "https://around-api.en.tripleten-services.com/v1",
	headers: {
		authorization: "c11a15fc-f59e-4aaf-ae30-dd9265e1fb3a",
		"Content-Type": "application/json",
	}
});

let cardSection;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([data, initialCards]) => {
	console.log(data);
    userInfo.setUserInfo(data);
	profilePicture.src = data.avatar;
    cardSection = new Section(
      {
        items: initialCards,
        renderer: createCard,
      },
      '.cards__list'
    );
    cardSection.setItems(initialCards);
  })
  .catch((err) => {
    console.log(err);
  });

//  
// PopupWithForms
//  

const editProfilePopup = new PopupWithForm(
	'#profile-edit-modal',
	handleProfileEditSubmit,
	handleAvatarFormSubmit
);
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm(
	'#add-card-modal',
	handleAddCardFormSubmit
);
addCardPopup.setEventListeners();

const avatarPopup = new PopupWithForm(
	'#avatar-modal',
	handleAvatarFormSubmit
);
avatarPopup.setEventListeners();

//  
// Confirm Delete Popup
//

const confirmDeletePopup = new PopupConfirmation({
	popupSelector: "#delete-card-modal", 
	});
confirmDeletePopup.setEventListeners();

function handleTrashClick(cardElement, cardId, card) {
	console.log(cardId);
	confirmDeletePopup.open();
	confirmDeletePopup.getCardInfo(cardElement, cardId, card);
	confirmDeletePopup.submitButtonState(true, "Yes");
	api
	  .deleteCard(cardId)
	  .then(() => {
		confirmDeletePopup.deleteConfirmed(cardElement, cardId, card);
	  })
	  .catch((err) => {
		console.error(err);
	  })
  }

//  
// Image Preview Popup
//  

const popupImageModal = new PopupWithImage('#preview-image-modal');
popupImageModal.setEventListeners();

//  
// Form Validation
//  

const addEditValidator = new FormValidator(config, editFormElement);
addEditValidator.enableValidation();

const addCardValidator = new FormValidator(config, addFormElement);
addCardValidator.enableValidation();

const updateAvatarValidator = new FormValidator(config, avatarFormElement);
updateAvatarValidator.enableValidation();

// const confirmDeleteValidator = new PopupConfirmation(config, confirmDeletePopup);
// confirmDeleteValidator.enableValidation();

//  
// User Info
//  

const userInfo = new UserInfo({
	nameSelector: '.profile__title',
	jobSelector: '.profile__description',
	userAvatar: '.profile__image',
});

// 
// Functions
//  

function createCard(cardData) {
	const card = new Card(
		cardData,
		'#card-template',
		handleImageClick,
		handleLikeClick,
		handleRemoveLike,
		handleTrashClick
	);
	cardSection.addItem(card.generateCard());
}

function handleImageClick(name, link) {
	popupImageModal.open(name, link);
}

function handleAddCardFormSubmit(data) {
	addCardPopup.submitButtonState(true, "Saving...");
	api
		.addCard(data)
		.then((data) => {
			createCard(data);
		})
		.then(() => {
			addCardPopup.close();
		})
		.catch((err) => {
			console.log(err);
		})
		.finally(() => {
			addCardPopup.submitButtonState(false);
		});
}

function handleProfileEditSubmit(data) {
	editProfilePopup.submitButtonState(true, "Saving...");
	api
	.updateEditProfile(data)
		.then((data) => {
			userInfo.setUserInfo(data);
			editProfilePopup.close();
		})
		.catch((err) => {
			console.log(err);
		})
		.finally(() => {
			editProfilePopup.submitButtonState(false);
		});
}

function handleAvatarFormSubmit(data) {
	avatarPopup.submitButtonState(true, "Saving...");
	api
	.updateUserAvatar(data)
	  .then((data) => {
		userInfo.setUserInfo(data);
		avatarPopup.close();
	  })
	  .catch((err) => {
		console.log(err);
	  })
	  .finally(() => {
		avatarPopup.submitButtonState(false);
	  });
}

function handleLikeClick(card, cardID) {
	if (card.isLiked()) {
		handleLikeClick(card, cardID);
	}
	api
	  .addLike(cardID)
	  .then((data) => {
		console.log(data);
		card.setLikeState(data.isLiked);
	  })
	  .catch((err) => {
		console.error(err);
	  });
  }
  
  function handleRemoveLike(card, cardID) {
	if (card.isLiked()) {
		handleRemoveLike(card, cardID);
	}
	api
	  .removeLike(cardID)
	  .then((data) => {
		console.log(data);
		card.setLikeState(data.isLiked);
	  })
	  .catch((err) => {
		console.error(err);
	  });
  }
  

  function handleOverlayClose(e) {
	if (e.target.classList.contains('modal_opened')) {
		popupImageModal.close();
	}
}

//  
// Event Listeners
//

profileEditButton.addEventListener('click', () => {
	const user = userInfo.getUserInfo();
	profileTitleInput.value = user.name;
	profileDescriptionInput.value = user.job;
	editProfilePopup.open();
});

addNewCardButton.addEventListener('click', () => {
	addCardValidator.resetValidation();
	addCardValidator.toggleButtonState();
	addCardPopup.open();
});







profileEditCloseButton.addEventListener('click', () => {
	editProfilePopup.close();
});

previewImageModalCloseButton.addEventListener('click', () => {
	popupImageModal.close();
});

profileEditModal.addEventListener('mousedown', handleOverlayClose);
addCardModal.addEventListener('mousedown', handleOverlayClose);
previewImageModal.addEventListener('mousedown', handleOverlayClose);


addCardModalCloseButton.addEventListener('click', () => addCardPopup.close());





