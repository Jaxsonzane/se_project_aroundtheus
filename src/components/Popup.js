export default class Popup {
    constructor({popupSelector}) {
        this._popupElement = document.querySelector(popupSelector);
        this._open = this.open.bind(this);
        this._close = this.close.bind(this);
        this._handleEscClose = this.handleEscClose.bind(this);
    }

    open() {
        this._popupElement.classList.add('modal_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popupElement.classList.remove('modal_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    handleEscClose(e) {
        if (e.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._popupElement.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal_opened')) {
                this.close();
            }
        });
        this._popupElement.querySelector('.modal__button-close').addEventListener('click', () => {
            this.close();
        });
    }
}