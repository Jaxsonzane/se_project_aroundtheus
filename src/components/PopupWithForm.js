import Popup from './Popup.js';

class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._popupForm = this._popupElement.querySelector('.modal__form');
        this._formInputs = this._popupForm.querySelectorAll('.modal__input');
        this._handleFormSubmit = handleFormSubmit;
    }

    close() {
        this._popupForm.reset();
        this._popupForm.removeEventListener('submit', this._handleFormSubmit);
        super.close();
    }

    _getInputValues() {
        const inputList = this._popupElement.querySelector('.modal__input');
        const inputValues = {};
        inputList.forEach(input => {
          inputValues[input.name] = input.value;
        });
        return inputValues;
      }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this._handleFormSubmit(inputValues);
        });
    }

}

export default PopupWithForm;