export default class FormValidator {
    constructor(config, formElement) {
      this._inputSelector = config.inputSelector;
      this._submitButtonSelector = config.submitButtonSelector;
      this._inactiveButtonClass = config.inactiveButtonClass;
      this._inputErrorClass = config.inputErrorClass;
      this._errorClass = config.errorClass;
      this._inputElements = [
        ...formElement.querySelectorAll(this._inputSelector),
      ];
      this._submitButton = formElement.querySelector(this._submitButtonSelector);
      this._element = formElement;
    }
    
    _showInputError(inputElement, errorMessageEl) {
      inputElement.classList.add(this._inputErrorClass);
      errorMessageEl.textContent = inputElement.validationMessage;
      errorMessageEl.classList.add(this._errorClass);
    }
    _hideInputError(inputElement, formEls) {
      const errorMessageEl = formEls.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.remove(this._inputErrorClass);
      errorMessageEl.textContent = "";
    }

    _hasInvalidInput() {
      return !this._inputElements.every(
        (inputElement) => inputElement.validity.valid
      );
    }

    toggleButtonState() {
      if (this._hasInvalidInput()) {
        this._submitButton.classList.add(this._inactiveButtonClass);
        this._submitButton.disabled = true;
        return;
      }
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }


    _checkInputValidity(inputElement, formEls) {
      if (!inputElement.validity.valid) {
       this._showInputError(
          inputElement,
          document.querySelector(`#${inputElement.id}-error`)
        );
      } else {
      this._hideInputError(inputElement, formEls);
      }
    }
    
    
    _setEventListeners() {
      this._inputElements.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
          this._checkInputValidity(inputElement, this._element);
          this.toggleButtonState();
        });
      });
    }
  
    enableValidation() {
      //plays roll of init method(public)
      this._element.addEventListener("submit", (e) => {
        e.preventDefault();
      });
      this._setEventListeners();
    }
  }