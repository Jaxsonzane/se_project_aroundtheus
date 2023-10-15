class Card {
	constructor({ data, _id, isLiked }, 
		cardSelector, 
		handleImageClick,
		handleTrashClick,
		handleLikeClick) {
		this._name = data.name;
		this._link = data.link;
		this._handleImageClick = handleImageClick;
		this._cardSelector = cardSelector;
		this._id = _id;
		this._isLiked = isLiked;
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

			const cardImage = cardElement.querySelector('.card__image');
			cardImage.src = this._link;
			cardImage.alt = this._name;
			cardImage.addEventListener('click', () => {
			  this._handleImageClick(this._name, this._link);
			});
		
			const cardTitle = cardElement.querySelector('.card__title');
			cardTitle.textContent = this._name;
		
			const likeButton = cardElement.querySelector('.card__button-like');
			if (this._isLiked) {
			  likeButton.classList.add('card__button-like_active');
			}
			likeButton.addEventListener('click', () => {
			  this._handleLikeClick(this._id, this._isLiked, likeButton);
			});
		
			const deleteButton = cardElement.querySelector('.card__button-remove');
			deleteButton.addEventListener('click', () => {
			  this._handleTrashClick(this._id, cardElement);
			});

		return cardElement;
	}

	// event listeners
	_setEventListeners() {
		this._likeButton.addEventListener('click', () => {
			this._handleLikeIcon(this);
		});
		this._deleteButton.addEventListener('click', () => {
			this._handleRemoveCard(this);
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

	_handleRemoveCard() {
		this._cardElement.remove();
		this._cardElement = null;
	}

	generateCard() {
		this._cardElement = this._getTemplate();

		this._cardImage = this._cardElement.querySelector('.card__image');
		this._cardTitle = this._cardElement.querySelector('.card__title');
		this._likeButton = this._cardElement.querySelector('.card__button-like');
		this._deleteButton = this._cardElement.querySelector('.card__button-trash');
		this._renderLikes();
		
		cardImage.src = this._link;
		cardImage.alt = `Image of ${this._name}`;
		cardTitle.textContent = this._name;

		this._setEventListeners();
		
		return this._cardElement;
	}
}

export default Card;
