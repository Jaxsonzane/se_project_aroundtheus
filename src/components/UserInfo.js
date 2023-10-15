class UserInfo {
    constructor({ nameSelector, jobSelector, userAvatar }) {
      this._nameElement = document.querySelector(nameSelector);
      this._aboutElement = document.querySelector(jobSelector);
      this._userAvatar = document.querySelector(userAvatar);
    }
  
    getUserInfo() {
      return {
        name: this._nameElement.textContent,
        job: this._aboutElement.textContent
      };
    }
  
    setUserInfo({ name, about }) {
      this._nameElement.textContent = name;
      this._aboutElement.textContent = about;
    }

    setAvatar(avatar) {
      this._userAvatar.src = avatar;
    }
  }
  
  export default UserInfo;