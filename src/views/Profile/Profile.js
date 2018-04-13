'use strict';

import MainComponent from '../../components/MainComponent/MainComponent.js';
import Block from '../../components/Block/Block.js';
import Input from '../../components/Input/Input.js';
import Button from '../../components/Button/Button.js';
import ImageComp from '../../components/ImageComp/ImageComp.js';
import Router from '../../modules/Router/Router.js';
import UserService from '../../Services/UserService/UserService.js';
import Transport from '../../modules/Transport/Trasport.js';

export default class Profile extends MainComponent {
    constructor() {
        super('div', ['profile'], {style: 'margin-top: 2%'});
    }

    build() {
        this.userData = {
            name: UserService.GetUser().login,
            email: UserService.GetUser().email,
        };

        const template = Hogan.compile('{{name}}');
        const name = template.render(this.userData);

        this.append((new ImageComp('../img/user-default.jpg', [], 'logo')).render());

        this.title = new Block('p', 'Hello, ' + name + '!', ['form-input'], {});
        this.append(this.title.render());

        this.changeLoginInput = new MainComponent('input', ['form-input', 'profile-input'],
            {name: 'changeLoginInput', value: this.userData.name, placeholder: 'Enter name'});
        this.append(this.changeLoginInput.render());

        this.changeEmailInput = new MainComponent('input', ['form-input', 'profile-input'],
            {name: 'changeEmailInput', value: this.userData.email, placeholder: 'Enter email'});
        this.append(this.changeEmailInput.render());

        this.password = new MainComponent('input', ['form-input', 'profile-input'],
            {type: 'hidden', id: 'password', name: 'password', placeholder: 'Enter password'});
        this.append(this.password.render());

        this.append(new Button('Change avatar', ['btnDiv'], 'changeAvatarBtn').render());

        this.buttonBack = new Button('Back', ['btnDiv'], 'profileBackBtn');
        this.append(this.buttonBack.render());

        document.getElementById('main').appendChild(this.render());

        this.initEvents();
    }

    initEvents() {
        this.changeLoginInput.render().onfocus = () => {
            this.password.render().type = 'password';
            this.buttonBack.render().innerHTML = 'Save and quit';
        };

        this.changeLoginInput.render().onblur = () => {
            if (this.changeLoginInput.render().value === this.userData.name) {
                this.password.render().type = 'hidden';
                this.buttonBack.render().innerHTML = 'Back';
            }
        };

        this.changeEmailInput.render().onfocus = () => {
            this.password.render().type = 'password';
            this.buttonBack.render().innerHTML = 'Save and quit';
        };

        this.changeEmailInput.render().onblur = () => {
            if (this.changeEmailInput.render().value === this.userData.email) {
                this.password.render().type = 'hidden';
                this.buttonBack.render().innerHTML = 'Back';
            }
        };

        this.buttonBack.render().addEventListener('click', () => {
            const newData = [...document.getElementsByClassName('profile-input')];

            let backWay = null;
            let body = {};

            newData.forEach((input) => {
                if (input.name === 'changeLoginInput' && input.value !== this.userData.name) {
                    backWay = '/newlogin';
                    body.change = input.value;
                }
                if (input.name === 'changeEmailInput' && input.value !== this.userData.email) {
                    backWay = '/newemail';
                    body.change = input.value;
                }
            });

            if (backWay !== null) {
                body.password = this.password.render().value;
                Transport.Post(backWay, body).catch((response) => {
                    console.log(response);
                }).then(() => {
                    UserService.GetData().then(() => {
                        this.password.render().type = 'hidden';
                        this.userData.name = UserService.GetUser().login;
                        this.userData.email = UserService.GetUser().email;
                        this.buttonBack.render().innerHTML = 'Back';
                        this.title.innerHTML('Hello, ' + UserService.GetUser().login + '!');
                        Router.go('/');
                    });
                });
            } else {
                Router.go('/');
            }
        });
    }
}
