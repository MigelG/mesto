export class UserInfo {
    constructor(data) {
        this._userName = document.querySelector(data.userName);
        this._userJob = document.querySelector(data.userJob);
    }

    getUserInfo() {
        return { name: this._userName.textContent, job: this._userJob.textContent };
    }

    setUserInfo() {
        const nameInput = document.querySelector('.popup__input_type_name');
        const jobInput = document.querySelector('.popup__input_type_job');
        this._userName.textContent = nameInput.value;
        this._userJob.textContent = jobInput.value;
    }
}