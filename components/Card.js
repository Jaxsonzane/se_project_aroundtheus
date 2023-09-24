class Card {
    constructor({name, link}, cardSelector) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;

        this._cardListEl = cardListEl;
    }

    _setEventListeners() {
        //.card__button-like
        this._cardElement.querySelector
        (".card__button-like")
        .addEventListener('click', () => {
            this._handleLikeIcon();
        });

        //.card__button-remove
        this._cardElement.querySelector(
            ".card__button-remove")
            .addEventListener('click', () => {
                this._handleDeleteCard();
            });
        

        //.card__image 
        

    }

    _handleDeleteCard() {
        this._cardElement.remove();
        this._cardElement = null;
    }

    _handleLikeIcon () {
        this._cardElement.querySelector('.card__button-like').classList.toggle('card__button-like-active');
    }

    getView() {
        this._cardElement = document
        .querySelector(this._cardSelector)
        .content.querySelector('.card')
        .cloneNode(true);
        // get the card view
        
        // set even listeners
        this._setEventListeners
        //return the card
    }
}

export default Card;