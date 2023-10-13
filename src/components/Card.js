class Card {
	constructor({ name, link, _id, isLiked }, 
		cardSelector, 
		handleImageClick,
		handleTrashClick,
		handleLikeClick) {
		this._name = name;
		this._link = link;
		this._handleImageClick = handleImageClick;
		this._cardSelector = cardSelector;
		this._id = _id;
		this._isLiked = isLiked;
		this._handleTrashClick = handleTrashClick;
		this._handleLikeClick = handleLikeClick;
	}

	_getTemplate() {
		const cardElement = document
			.querySelector(this._cardSelector)
			.content.firstElementChild.cloneNode(true);
		return cardElement;
	}

	_setEventListeners() {
		// card like button
		this._cardElement
			.querySelector('.card__button-like')
			.addEventListener('click', () => {
				this._handleLikeIcon();
			});
		// card delete button
		this._cardElement
			.querySelector('.card__button-remove')
			.addEventListener('click', () => {
				this._handleRemoveCard();
			});

		this._cardElement
			.querySelector('.card__image')
			.addEventListener('click', () => {
				this._handleImageClick({
					name: this._name,
					link: this._link,
				});
			});
	}

	_handleLikeIcon() {
		this._cardElement
			.querySelector('.card__button-like')
			.classList.toggle('card__button-like_active');
	}
	_handleRemoveCard() {
		this._cardElement.remove();
		this._cardElement = null;
	}

	getView() {
		this._cardElement = document
			.querySelector(this._cardSelector)
			.content.querySelector('.card__list-item')
			.cloneNode(true);

		const cardImage = this._cardElement.querySelector('.card__image');
		cardImage.src = this._link;
		cardImage.alt = `Image of ${this._name}`;

		this._cardElement.querySelector('.card__title').textContent = this._name;
		// set event listeners
		this._setEventListeners();
		// return card
		return this._cardElement;
	}
}

export default Card;
