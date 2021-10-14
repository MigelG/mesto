export class UserInfo {
    constructor(data) {
        this._userName = document.querySelector(data.userName);
        this._userJob = document.querySelector(data.userJob);
    }

    getUserInfo() {
        return { name: this._userName.textContent, job: this._userJob.textContent };
    }

    setUserInfo(info) {
        this._userName.textContent = info.name;
        this._userJob.textContent = info.job;
    }
}