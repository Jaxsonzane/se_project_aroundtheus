import Popup from './Popup.js';
export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._popupForm = this._popupElement.querySelector('.modal__form');
        this._handleFormSubmit = handleFormSubmit;
        this._submitButton = this._popupElement.querySelector('.modal__button');
        this._submitButtonText = this._submitButton.textContent;
    }

    submitButtonState(submit, buttonText = "Deleting...") {
        if (submit) {
            this._submitButton.textContent = buttonText;
        } else {
            this._submitButton.textContent = this._submitButtonText;
        }
    }

    setSubmitCallback(callback) {
        this._handleFormSubmit = callback;
    }
    
    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this._handleFormSubmit();
        });
    }

}