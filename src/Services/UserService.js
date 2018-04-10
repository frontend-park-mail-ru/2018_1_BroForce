'use strict';

import Transport from '../modules/Transport/Trasport.js';

class UserService {
    constructor() {
        this.user = null;
    }

    GetData() {
        return Transport.Get('/user').then((userData) => {
            this.user = userData;
        });
    }

    GetUser() {
        return this.user;
    }

    IsLogIn() {
        return !!this.user;
    }

    LogOut() {
        return Transport.Post('/logout', {}).then((response) => {
            return response;
        }).catch((response) => {
            if (!response.json) {
                return response;
            }
            response.json().then((json) => {
                return json;
            });
        });
    }
}

const userService = new UserService();

export default userService;
