export class UserInfo {
    constructor(data) {
        this._userName = document.querySelector(data.userName);
        this._userJob = document.querySelector(data.userJob);
        this._userAvatar = document.querySelector(data.userAvatar);
    }

    getUserInfo() {
        return {
            name: this._userName.textContent,
            about: this._userJob.textContent,
            avatar: this._userAvatar.src,
            id: this._userId,
        };
    }

    setUserInfo(info) {
        this._userName.textContent = info.name;
        this._userJob.textContent = info.about;
        this._userAvatar.src = info.avatar;
        this._userId = info._id;
    }
}