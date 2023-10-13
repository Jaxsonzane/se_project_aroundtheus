import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import '../pages/index.css';

const api = new Api({
	baseUrl: "https://around-api.en.tripleten-services.com/v1",
	headers: {
		authorization: "58feb0fec-b9f5-4bc3-b108-bb68825ef5654",
		"Content-Type": "application/json",
	}
});
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

const userInfo = new UserInfo({
	nameSelector: '.profile__title',
	jobSelector: '.profile__description',
});

const editProfilePopup = new PopupWithForm(
	'#profile-edit-modal',
	handleProfileEditSubmit
);
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm(
	'#add-card-modal',
	handleAddCardFormSubmit
);
addCardPopup.setEventListeners();

const popupImageModal = new PopupWithImage('#preview-image-modal');
popupImageModal.setEventListeners();

api.getAllData()
.then(([userData, initialCards]) => {
	userInfo.setUserInfo(userData);
	const cardsList = new Section({
		items: initialCards,
		renderer: (cardData) => {
			const cardElement = createCard(cardData);
			cardsList.addItem(cardElement);
			}
		}, '.cards__list');
	cardsList.renderItems();
})
.catch((err) => {
	console.log(err);
});		

// const cardSection = new Section(
// 	{
// 		items: initialCards,
// 		renderer: renderCard,
// 	},
// 	'.cards__list'
// );
// cardSection.renderItems();

// function createCard(cardData) {
// 	const card = new Card(
// 		cardData, 
// 		'#card-template', 
// 		handleImageClick, 
// 		handleLikeClick,
// 		handleTrashClick);
// 	const cardElement = card.getView();
// 	cardSection.addItem(cardElement);
// }

// function handleImageClick(name, link) {
// 	popupImageModal.open(name, link);
// }
function createCard(cardData) {
	const card = new Card({
	  data: cardData,
	  handleImageClick: () => {
		popupImageModal.open(cardData.name, cardData.link);
	  },
	  handleLikeClick: () => {
		const isLiked = card.isLiked();
		api.changeLikeCardStatus(cardData._id, !isLiked)
		  .then((updatedCardData) => {
			card.updateLikes(updatedCardData.likes);
		  })
		  .catch((err) => {
			console.log(err);
		  });
	  },
	  handleTrashClick: () => {
		const cardId = cardData._id;
		const confirmDeletePopup = new PopupWithConfirm({
		  popupSelector: '.popup_type_confirm-delete',
		  formSubmitHandler: () => {
			api.deleteCard(cardId)
			  .then(() => {
				card.deleteCard();
				confirmDeletePopup.close();
			  })
			  .catch((err) => {
				console.log(err);
			  });
		  }
		});
		confirmDeletePopup.open();
	  }
	}, '#card-template');
	return card.generateCard();
}

function handleProfileEditSubmit(value) {
	editProfilePopup.setLoading(true);
	api.updateEditProfile(value)
		.then((userData) => {
			userInfo.setUserInfo(userData);
			editProfilePopup.close();
		})
		.catch((err) => {
			console.log(err);
		})
		.finally(() => {
			editProfilePopup.setLoading(false);
		});
}

function handleAddCardFormSubmit(value) {
	addCardPopup.setLoading(true);
	api.addCard(value)
		.then((cardData) => {
			const cardElement = createCard(cardData);
			cardSection.addItem(cardElement);
			addCardPopup.close();
		})
		.catch((err) => {
			console.log(err);
		})
		.finally(() => {
			addCardPopup.setLoading(false);
		});

	const name = value.title
	const link = value.link
	renderCard({ name, link }, cardListEl);
	addCardFormElement.reset();
	addCardPopup.close();
}

function handleOverlayClose(e) {
	if (e.target.classList.contains('modal_opened')) {
		popupImageModal.close();
	}
}

// Event Listeners
profileEditButton.addEventListener('click', () => {
	const user = userInfo.getUserInfo();
	profileTitleInput.value = user.name;
	profileDescriptionInput.value = user.job;
	editProfilePopup.open();
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

//new cards
addNewCardButton.addEventListener('click', () => {
	addCardValidator.resetValidation();
	addCardValidator.toggleButtonState();
	addCardPopup.open();
});
addCardModalCloseButton.addEventListener('click', () => addCardPopup.close());

editFormElement.addEventListener('submit', (event) => {
	event.preventDefault();
	editProfileValidator.setLoading(true);
	editProfileValidator.disableSubmitButton();
	handleProfileEditSubmit(new FormData(event.target));
  });
  
  addFormElement.addEventListener('submit', (event) => {
	event.preventDefault();
	addCardValidator.setLoading(true);
	addCardValidator.disableSubmitButton();
	handleAddCardFormSubmit(new FormData(event.target));
  });

const config = {
	formSelector: '.modal__form',
	inputSelector: '.modal__input',
	submitButtonSelector: '.modal__button',
	inactiveButtonClass: 'modal__button_disabled',
	inputErrorClass: 'modal__input_type_error',
	errorClass: 'modal__error_visible',
	errorMessageEl: '.modal__error',
};

const addCardValidator = new FormValidator(config, addFormElement);
addCardValidator.enableValidation();

const addEditValidator = new FormValidator(config, editFormElement);
addEditValidator.enableValidation();
