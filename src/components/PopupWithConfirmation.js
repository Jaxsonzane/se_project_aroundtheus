import Popup from './Popup.js';
export default class PopupConfirmation extends Popup {
    constructor(popupSelector, { deleteHandler }) {
        super(popupSelector);
        this._popupForm = this._popupElement.querySelector('.modal__form');
        this._deleteHandler = deleteHandler;
        this._submitButton = this._popupElement.querySelector('.modal__button');
        this._submitButtonText = this._submitButton.textContent;
    }

    getCardInfo(cardElement, cardId, card) {
        this._cardElement = cardElement;
        this._cardId = cardId;
        this._card = card;
    }

    submitButtonState(submit, buttonText = "Deleting...") {
        if (submit) {
            this._submitButton.textContent = buttonText;
        } else {
            this._submitButton.textContent = this._submitButtonText;
        }
    }

    setSubmitCallback(callback) {
        this._deleteHandler = callback;
    }
    
    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this._deleteHandler();
        });
    }

    deleteConfirmed(cardElement, cardId, card) {
        this._deleteHandler(cardElement, cardId, card);
    }

}