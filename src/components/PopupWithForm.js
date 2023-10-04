import Popup from './Popup.js';

class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._popupForm = this._popupElement.querySelector('.modal__form');
        //this._formInputs = this._popupForm.querySelectorAll('.modal__input');
        this._handleFormSubmit = handleFormSubmit;
    }

    close() {
        this._popupForm.reset();
        this._popupForm.removeEventListener('submit', this._handleFormSubmit);
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
            e.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this._handleFormSubmit(this._inputValues);
        });
    }

}

export default PopupWithForm;