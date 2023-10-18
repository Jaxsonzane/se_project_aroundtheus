class Card {
	constructor({ name, link, _id, isLiked} , 
		cardSelector, 
		handleImageClick,
		handleRemoveLike,
		handleTrashClick,
		handleLikeClick) {
		this._name = name;
		this._link = link;
		this._handleImageClick = handleImageClick;
		this._cardSelector = cardSelector;
		this._id = _id;
		this._isLiked = isLiked;
		this._handleRemoveLike = handleRemoveLike;
		this._handleTrashClick = handleTrashClick;
		this._handleLikeClick = handleLikeClick;
	}
	// card template
	_getTemplate() {
		const cardElement = document
			.querySelector(this._cardSelector)
			.content
			.querySelector(".card__list-item")
			.cloneNode(true);

		return cardElement;
	}

	// event listeners
	_setEventListeners() {
		this._likeButton.addEventListener('click', () => {
			this._handleLikeClick(this);
		});
		this._deleteButton.addEventListener('click', () => {
			this._handleTrashClick(this);
		});
		this._cardImage.addEventListener('click', () => {
			this._handleImageClick(this._name, this._link);
		});
	}

	_handleLikeIcon(isLiked) {
		this.isLiked = isLiked;
		this._renderLikes();
	}

	_renderLikes() {
		if (this._isLiked) {
			this._likeButton.classList.add('card__button-like_active');
		} else {
			this._likeButton.classList.remove('card__button-like_active');
		}
	}

	isLiked() {
		return this._isLiked;
	}

	_handleRemoveCard() {
		this._cardElement.remove();
		this._cardElement = null;
	}

	

	generateCard() {
		this._cardElement = this._getTemplate();

		this._cardImage = this._cardElement.querySelector('.card__image');
		this._cardTitle = this._cardElement.querySelector('.card__title');
		this._likeButton = this._cardElement.querySelector('.card__button-like');
		this._deleteButton = this._cardElement.querySelector('.card__button-remove');
		this._renderLikes();
		
		this._cardImage.src = this._link;
		this._cardImage.alt = `Image of ${this._name}`;
		this._cardTitle.textContent = this._name;

		this._setEventListeners();
		
		return this._cardElement;
	}
}

export default Card;
