import Popup from './Popup.js';

class PopupWithImage extends Popup {
	constructor(popupSelector) {
		super(popupSelector);
		this._popupImage = this._popupElement.querySelector('.modal__image');
		this._popupTitle = this._popupElement.querySelector('.modal__title');
	}

	open({ name, link }) {
		super.open();
		this._popupImage.src = link;
		this._popupImage.alt = name;
		this._popupTitle.textContent = name;
	}
}

export default PopupWithImage;
