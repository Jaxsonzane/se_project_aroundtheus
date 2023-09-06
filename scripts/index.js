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
    
    const profileTitle = document.querySelector('.profile__title');
    const profileSubtitle = document.querySelector('.profile__subtitle');
    const profileTitleInput = document.querySelector('#profile-title-input');
    const profileSubtitleInput = document.querySelector('#profile-subtitle-input');
    const profileEditForm = profileEditModal.querySelector('.modal__form');
    const profileAddForm = profileAddModal.querySelector('.modal__form');
    
    const cardListEl = document.querySelector('.card');
    const cardTemplate = document.querySelector('#card-template').content.firstElementChild;
    
    /* -------------------------------------------------------------------------- */
    /*                                  functions                                 */
    /* -------------------------------------------------------------------------- */
    
    function closePopup() {
        profileEditModal.classList.remove('modal_opened');
        profileAddModal.classList.remove('modal_opened');
    }
    function getCardElement(cardData) {
        const cardElement = cardTemplate.cloneNode(true);
        const cardImageEl = cardElement.querySelector('.card__image');
        const cardTitleEl = cardElement.querySelector('.card__title');
      
      
        cardImageEl.src = cardData.link;
        cardImageEl.alt = cardData.name;
        cardTitleEl.textContent = cardData.name;
        return cardElement;
    }
    
    
    /* -------------------------------------------------------------------------- */
    /*                               event handlers                               */
    /* -------------------------------------------------------------------------- */
    
    function handleProfileEditSubmit(e) {
        e.preventDefault();
        profileTitle.textContent = profileTitleInput.value;
        profileSubtitle.textContent = profileSubtitleInput.value;
        closePopup();
    }
    
    
    
    /* -------------------------------------------------------------------------- */
    /*                               event listeners                              */
    /* -------------------------------------------------------------------------- */
    
    profileEditButton.addEventListener('click', () => {
        profileTitleInput.value = profileTitle.textContent;
        profileSubtitleInput.value = profileSubtitle.textContent;
        profileEditModal.classList.add('modal_opened')
    });
    profileAddButton.addEventListener('click', () => {
        profileTitleInput.value = profileTitle.textContent;
        profileSubtitleInput.value = profileSubtitle.textContent;
        profileAddModal.classList.add('modal_opened')
    });
    profileEditCloseButton.addEventListener('click', closePopup);
    profileEditForm.addEventListener('submit', handleProfileEditSubmit);
    profileAddCloseButton.addEventListener('click', closePopup);
    profileAddForm.addEventListener('submit', handleProfileEditSubmit);
    
    // for each loop to add cards to the page
    initialCards.forEach((cardData) => {
        const cardElement = getCardElement(cardData);
      cardListEl.append(cardElement);
    });


