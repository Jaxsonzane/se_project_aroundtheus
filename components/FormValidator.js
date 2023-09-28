export default class FormValidator {
	constructor(config, formElement) {
		this._inputSelector = config.inputSelector;
		this._submitButtonSelector = config.submitButtonSelector;
		this._inactiveButtonClass = config.inactiveButtonClass;
		this._inputErrorClass = config.inputErrorClass;
		this._errorClass = config.errorClass;
		this._errorMessageEl = config.errorMessageEl;
		this._formElement = formElement;
		this._inputElements = [
			...this._formElement.querySelectorAll(this._inputSelector),
		];
		this._submitButton = this._formElement.querySelector(
			this._submitButtonSelector
		);
	}

	_showInputError(inputElement) {
		const errorMessageEl = this._formElement.querySelector(
			`#${inputElement.id}-error`
		);
		inputElement.classList.add(this._inputErrorClass);
		if (errorMessageEl) {
			errorMessageEl.textContent = inputElement.validationMessage;
			errorMessageEl.classList.add(this._errorClass);
		} else {
			console.warn(`Error element for ${inputElement.id} not found.`);
		}
	}

	_hideInputError(inputElement) {
		const errorMessageEl = this._formElement.querySelector(
			`#${inputElement.id}-error`
		);
		inputElement.classList.remove(this._inputErrorClass);
		if (errorMessageEl) {
			errorMessageEl.textContent = '';
		} else {
			console.warn(`Error element for ${inputElement.id} not found.`);
		}
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
			this._showInputError(inputElement);
		} else {
			this._hideInputError(inputElement, formEls);
		}
	}

	_setEventListeners() {
		this._inputElements.forEach((inputElement) => {
			inputElement.addEventListener('input', () => {
				this._checkInputValidity(inputElement, this._formElement);
				this.toggleButtonState();
			});
		});
	}

	enableValidation() {
		this._formElement.addEventListener('submit', (e) => {
			e.preventDefault();
		});
		this._setEventListeners();
	}
}
