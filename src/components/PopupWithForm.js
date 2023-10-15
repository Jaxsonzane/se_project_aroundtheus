import Popup from './Popup.js';

class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._popupForm = this._popupElement.querySelector('.modal__form');
        this._handleFormSubmit = handleFormSubmit;
        this._submitButton = this._popupElement.querySelector('.modal__button');
        this._submitButtonText = this._submitButton.textContent;
    }

    close() {
        this._popupForm.reset();
        super.close();
    }

    _getInputValues() {
        this._inputList = this._popupElement.querySelectorAll('.modal__input');
        this._inputValues = {};
        this._inputList.forEach(input => {
          this._inputValues[input.name] = input.value;
        });
        return this._inputValues;
      }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (e) => {
            this._handleFormSubmit(this._getInputValues());
        });
    }
    submitButtonState(submit, buttonText = "Saving...") {
        if (submit) {
            this._submitButton.textContent = buttonText;
        } else {
            this._submitButton.textContent = this._submitButtonText;
        }
    }
}

export default PopupWithForm;