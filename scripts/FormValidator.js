class FormValidator {
    constructor(config, formEl) {
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;

        this._formEl = formEl;
    }

    _showInputError(inputEl) {
        const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
        inputEl.classList.add(this._inputErrorClass);
        errorMessageEl.textContent = inputEl.validationMessage;
        errorMessageEl.classList.add(this._errorClass);
    }

    _hideInputError(inputEl) {
        const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
        inputEl.classList.remove(this._inputErrorClass);
        errorMessageEl.textContent = "";
        errorMessageEl.classList.remove(this._errorClass);
    }

    _toggleButtonState(submitButton) {
        let foundInvalid = false;
        if(!inputEl.validity.valid) {
            foundInvalid = true;
        }
        if(foundInvalid) {
            submitButton.classList.add(this._inactiveButtonClass);
            submitButton.disabled = true;
        } else {
            submitButton.classList.remove(this._inactiveButtonClass);
            submitButton.disabled = false;
        }
    }
    
        

    _hasInvalidInput(inputList) {
        return !inputList.every((inputEl) => inputEl.validity.valid);
    }

    _checkInputValidity(inputEl, options) {
        if(!inputEl.validity.valid) {
            return  showInputError(formEl, inputEl, options);
          } 
              hideInputError(this._formEl, inputEl, options);
    }



    _setEventListeners() {
        inputEl.addEventListener('input', (e) => {
            checkInputValidity(this._formEl, inputEl, options);
            toggleButtonState(inputEls, submitButton, options);
        });
    }

    enableValidation () {
            this._formEl.addEventListener("submit", (evt) => {
                evt.preventDefault();
            });
            this._setEventListeners(); 

    }
}

export default class FormValidator{}