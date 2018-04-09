'use strict';

import Transport from '../modules/Transport/Trasport.js';

export default class UserService {
    constructor(address) {
        this.address = address;
    }

    GetResponse(url) {
        Transport.Get(this.address + '/' + url).then((response) => {
            console.log('1', response);
            return response;
        }).catch((response) => {
            if (!response.json) {
                console.log('2', response);
                return response;
            }
            response.json().then((json) => {
                console.log('3', json);
                return json;
            });
        });
    }

    PostResponse(url, request) {
        Transport.Post(this.address + '/' + url, request).then((response) => {
            console.log('1', response);
            return response;
        }).catch((response) => {
            if (!response.json) {
                console.log('2', response);
                return response;
            }
            response.json().then((json) => {
                console.log('3', json);
                return json;
            });
        });
    }

    GetData() {
        return this.GetResponse('user');
    }

    GetLeaders(countOf, since) {
        return this.GetResponse('stop' + '?' + 'limit=' + countOf + '&' + 'since=' + since);
    }

    SignUp(request) {
        return this.PostResponse('signup', request);
    }

    SignIn(request) {
        return this.PostResponse('signin', request);
    }

    ChangePassword(request) {
        return this.PostResponse('newpswrd', request);
    }

    ChangeLogin(request) {
        return this.PostResponse('newlogin', request);
    }

    ChangeEmail(request) {
        return this.PostResponse('newemail', request);
    }

    LogOut() {
        return this.PostResponse('logout', {});
    }
}
