const initialCards = [
    {
        name: "Yosemite Valley",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
    }, 
    {
        name: "Lake Louise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
    }, 
    {
        name: "Bald Mountains",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
    },
    {
        name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
    }, 
    {
        name: "Vanoise National Park",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
    }, 
    {
        name: "Lago di Braies",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
    },
    ]
    
    /* -------------------------------------------------------------------------- */
    /*                                  elements                                 */
    /* -------------------------------------------------------------------------- */
    
    // buttons
    
    const profileEditButton = document.querySelector('#profile-edit-button');
    const profileEditModal = document.querySelector('#profile-edit-modal');
    const profileEditCloseButton = profileEditModal.querySelector('.modal__close');
    
    const profileAddButton = document.querySelector('#profile-add-button');
    const profileAddModal = document.querySelector('#profile-add-modal');
    const profileAddCloseButton = profileAddModal.querySelector('.modal__close');
   // preview image
    const previewImageModal = document.querySelector('#preview-modal-image');
    const previewImageCloseModal = previewImageModal.querySelector('.modal__close');
    
    const previewImgEl = previewImageModal.querySelector('.modal__image');
    const previewImgTitle = previewImageModal.querySelector('.modal__title');
    
    
    const profileTitle = document.querySelector('.profile__title');
    const profileSubtitle = document.querySelector('.profile__subtitle');
    const profileTitleInput = document.querySelector('#modal-profile-title-input');
    const profileSubtitleInput = document.querySelector('#modal-profile-subtitle-input');
    const profileEditForm = profileEditModal.querySelector('.modal__form');
    const profileAddForm = profileAddModal.querySelector('.modal__form');
    
    const cardListEl = document.querySelector('.card');
    const cardTemplate = document.querySelector('#card-template').content.firstElementChild;

    
    const cardTitleInput = profileAddForm.querySelector('.modal__input_type_title');
    const cardLinkInput = profileAddForm.querySelector('.modal__input_type_link');
    
    /* -------------------------------------------------------------------------- */
    /*                                  functions                                 */
    /* -------------------------------------------------------------------------- */
    
    function closePopup(popup) {
        popup.classList.remove('modal_opened');    
    }
    function openPopup(modal) {
        modal.classList.add('modal_opened');
    }


    function getCardElement(cardData) {
        const cardElement = cardTemplate.cloneNode(true);
        const cardImageEl = cardElement.querySelector('.card__image');
        const cardTitleEl = cardElement.querySelector('.card__title');
        const likeButton = cardElement.querySelector('.card__button-like');
        const deleteButton = cardElement.querySelector('.card__button-remove');

        
        likeButton.addEventListener('click', () => {
            likeButton.classList.toggle('card__button-like_active');        
    });
        deleteButton.addEventListener('click', () => {
            cardElement.remove();
    });
        cardImageEl.addEventListener("click", () => {
            previewImgEl.src = cardData.link;
            previewImgEl.alt = cardData.name;
            previewImgTitle.textContent = cardData.name;
            openPopup(previewImageModal);
    });
        


        cardImageEl.src = cardData.link;
        cardImageEl.alt = cardData.name;
        cardTitleEl.textContent = cardData.name;
        return cardElement;

    }


    function renderCard (cardData, cardListEl) {    
        const cardElement = getCardElement(cardData);
        cardListEl.prepend(cardElement);
    }
    
    
    /* -------------------------------------------------------------------------- */
    /*                               event handlers                               */
    /* -------------------------------------------------------------------------- */
    
    function handleProfileEditSubmit(e) {
        e.preventDefault();
        profileTitle.textContent = profileTitleInput.value;
        profileSubtitle.textContent = profileSubtitleInput.value;
        closePopup(profileEditModal);
    }
    function handleAddCardFormSubmit(e) {
        e.preventDefault();
        const titleValue = cardTitleInput.value;
        const linkValue = cardLinkInput.value;
        renderCard({name: titleValue, link: linkValue}, cardListEl).reset();
        closePopup(profileAddModal);  
    }
    
    
    
    /* -------------------------------------------------------------------------- */
    /*                               event listeners                              */
    /* -------------------------------------------------------------------------- */
    profileEditCloseButton.addEventListener('click', () => {
        closePopup(profileEditModal);
    });

    profileEditButton.addEventListener('click', () => {
        openPopup(profileEditModal);
    });

    profileAddCloseButton.addEventListener('click', () => {
        closePopup(profileAddModal);
    });
    profileAddButton.addEventListener('click', () => {
        openPopup(profileAddModal);
    });

    previewImageCloseModal.addEventListener("click", () =>
            closePopup(previewImageModal)
    );
    
    profileEditCloseButton.addEventListener('click', closePopup);
    profileEditForm.addEventListener('submit', handleProfileEditSubmit);
    profileAddCloseButton.addEventListener('click', closePopup);
    profileAddForm.addEventListener('submit', handleAddCardFormSubmit);
    
    // initial cards
    initialCards.forEach(cardData => renderCard(cardData, cardListEl));
    