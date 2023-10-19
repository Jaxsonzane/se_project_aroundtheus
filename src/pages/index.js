import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import '../pages/index.css';
import PopupConfirmation from '../components/PopupWithConfirmation.js';
import { 
	config, 
	editFormElement, 
	addFormElement, 
	avatarFormElement, 
	profileEditButton, 
	profileTitleInput, 
	profileDescriptionInput, 
	profileEditCloseButton, 
	previewImageModalCloseButton, 
	profileEditModal, 
	addCardModal, 
	previewImageModal, 
	addNewCardButton, 
	addCardModalCloseButton, 
	profilePicture } from '../utils/constants.js';

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


//  
// Image Preview Popup
//  

const popupImageModal = new PopupWithImage('#preview-image-modal');
popupImageModal.setEventListeners();

function handleImageClick(name, link) {
	popupImageModal.open({ name, link });
}

//  
// Form Validation
//  

const addEditValidator = new FormValidator(config, editFormElement);
addEditValidator.enableValidation();

const addCardValidator = new FormValidator(config, addFormElement);
addCardValidator.enableValidation();

const updateAvatarValidator = new FormValidator(config, avatarFormElement);
updateAvatarValidator.enableValidation();

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
		handleTrashClick,
		handleLikeClick,
	);
	cardSection.addItem(card.generateCard());
}

// ADD CARD AND EDIT PROFILE

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

//  
//  Avatar
//  

const avatarPopup = new PopupWithForm(
	'#avatar-modal',
	handleAvatarFormSubmit
);
avatarPopup.setEventListeners();

function handleAvatarFormSubmit(data) {
	avatarPopup.submitButtonState(true, "Saving...");
	api
	.updateAvatar(data)
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

const avatarButton = document.querySelector(".avatar__edit_button");
avatarButton.addEventListener("click", () => {
  updateAvatarValidator.toggleButtonState();
  avatarPopup.open();
});

//  
//  Like Card
//

function handleLikeClick(card) {
  if (card.isLiked) {
	api
	  .unlikeCard(card.id)
	  .then(() => {
		card.updateIsLiked(false)
	  });
	} else {
	api
	  .likeCard(card.id)
	  .then(() => {
		card.updateIsLiked(true)
	  })
	  .catch((err) => {
		console.log(err);
	  });
  }
}

//  
// Confirm Delete Popup
//
const confirmDeletePopup = new PopupConfirmation({
	popupSelector: "#delete-card-modal"
	});
confirmDeletePopup.setEventListeners();

  function handleTrashClick(card) {
	confirmDeletePopup.open();
	confirmDeletePopup.setSubmitCallback(() => {
		api
	.deleteCard(card.id)
	.then(() => {
		card.handleRemoveCard();
		confirmDeletePopup.close();
	})
	.catch((err) => {
		console.log(err);
	});

  });
}
  
//
// Overlay Close
//  

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




