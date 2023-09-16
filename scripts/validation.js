
// enabling validation by calling enableValidation()
// pass all the settings on call

function showInputError(formEl, inputEl, {inputErrorClass, errorClass}) {
    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(errorClass);
}

function hideInputError(formEl, inputEl, {inputErrorClass, errorClass}) {
    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(errorClass);
}

function checkInputValidity(formEl, inputEl, options) {
    if(!inputEl.validity.valid) {
      return  showInputError(formEl, inputEl, options);
    } 
        hideInputError(formEl, inputEl, options);
    
}

function disabledButton(submitButton, inactiveButtonClass) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
}

function enabledButton(submitButton, inactiveButtonClass) {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
}

function hasInvalidInput(inputList) {
    return !inputList.every((inputEl) => inputEl.validity.valid);
}

function toggleButtonState (inputEls, submitButton, {inactiveButtonClass}) {
    let foundInvalid = false;
    inputEls.forEach(inputEl => {
        if(!inputEl.validity.valid) {
            foundInvalid = true;
        }
    })
    if(foundInvalid) {
        submitButton.classList.add(inactiveButtonClass);
        submitButton.disabled = true;
    } else {
        submitButton.classList.remove(inactiveButtonClass);
        submitButton.disabled = false;
    }
}

function setEventListeners(formEl, options) {
    const {inputSelector} = options;
    const inputEls = [...formEl.querySelectorAll(inputSelector)];
    const submitButton = formEl.querySelector(options.submitButtonSelector);
    inputEls.forEach((inputEl) => {
        inputEl.addEventListener('input', (e) => {
            checkInputValidity(formEl, inputEl, options);
            toggleButtonState(inputEls, submitButton, options);
        });
    })
}

function enableValidation(options) {
    const formEls = [...document.querySelectorAll(options.formSelector)];
    formEls.forEach((formEl) => { 
        formEl.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
    
        setEventListeners(formEl, options);
        // look for all inputs inside of form
        // loop through all the inputs to see if they are valid
        // if the input is not valid, show the error message
        // add error class to input
        // display error message
        // disable button
        // if all inputs are valid
        // endable button
        // reset error messages
        
    });

}

const config = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible"
};
    
    
enableValidation(config);

   