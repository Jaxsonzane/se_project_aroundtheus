  class Card {
    constructor({name, link}, cardSelector, handleImageClick) {
      //cardSelector= #card-template
      this._name = name;
      this._link = link;
      
      this._handleImageClick = handleImageClick;
      this._cardSelector = cardSelector; 
    }
    _setEventListeners() {
      // card like button
      this._cardElement
        .querySelector(".card__like-button")
        .addEventListener("click", () => {
          this._handleLikeIcon();
        });
      this.cardImageEl.addEventListener("click", () => {
        this._handleImageClick({
          name: this._name,
          link: this._link,
        });
      });
      // card delete button
      this._cardElement
        .querySelector(".card__trash-button")
        .addEventListener("click", () => {
          this._handleRemoveCard();
        });
    }
  
    _handleLikeIcon() {
      this._cardElement
        .querySelector(".card__like-button")
        .classList.toggle("card__like-button_active");
    }
    _handleRemoveCard() {
      this._cardElement.remove();
    }
    getView() {
      this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
      //get the card view
      this._cardElement.querySelector(".card__image")
      .style.backgroundImage = `url(${this._link})`;
      this._cardElement.querySelector(".card_title").textContent = this._name;
      // set event listeners
      this._setEventListeners();
      // return card
      return this._cardElement;
    }
  }
  
  export default Card;