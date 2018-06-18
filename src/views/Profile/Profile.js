'use strict';

import MainComponent from '../../components/MainComponent/MainComponent.js';
import Block from '../../components/Block/Block.js';
import Input from '../../components/Input/Input.js';
import Button from '../../components/Button/Button.js';
import ImageComp from '../../components/ImageComp/ImageComp.js';
import Router from '../../modules/Router/Router.js';
import UserService from '../../Services/UserService/UserService.js';
import Transport from '../../modules/Transport/Trasport.js';
import * as Hogan from 'hogan.js';

export default class Profile extends MainComponent {
    constructor() {
        super('div', ['profile-page']);
    }

    build() {
        // if (!UserService.IsLogIn()) {
        //     Router.go('/')
        // }

        this.userData = {
            name: UserService.GetUser().login,
            email: UserService.GetUser().email,
        };

        const template = Hogan.compile('{{name}}');
        const name = template.render(this.userData);

        this.title = new Block('p', name, ['menu_title'], {});
        this.append(this.title.render());

        this.append((new ImageComp('', ['profile-page__avatar'], 'logo')).render());

        this.changeLoginInput = new MainComponent('input', ['form-input', 'profile-page__dataInput'],
            {name: 'changeLoginInput', placeholder: 'Change name'});
        this.append(this.changeLoginInput.render());

        this.changeEmailInput = new MainComponent('input', ['form-input', 'profile-page__dataInput'],
            {name: 'changeEmailInput', placeholder: 'Change email'});
        this.append(this.changeEmailInput.render());

        this.password = new MainComponent('input', ['form-input', 'profile-page__dataInput'],
            {type: 'hidden', id: 'password', name: 'password', placeholder: 'Enter password'});
        this.append(this.password.render());

        const signOutBtn = new Button('Sign Out', ['main-page__menu__button'], 'signOutBtn');

        this.append(new Button('New Avatar', ['main-page__menu__button'], 'changeAvatarBtn').render());
        this.append(signOutBtn.render());
        this.buttonBack = new Button('Back', ['main-page__menu__button'], 'profileBackBtn');
        this.append(this.buttonBack.render());

        document.getElementById('main').appendChild(this.render());

        signOutBtn.render().addEventListener('click', () => {
            UserService.LogOut().then(() => {
                Router.getRoute('/').getView().Rebuild();
                Router.go('/');
            });
        });

        this.initEvents();
    }

    initEvents() {
        this.changeLoginInput.render().onfocus = () => {
            this.password.render().type = 'password';
            this.buttonBack.render().innerHTML = 'Save';
        };

        this.changeLoginInput.render().onblur = () => {
            if (this.changeLoginInput.render().value === this.userData.name) {
                this.password.render().type = 'hidden';
                this.buttonBack.render().innerHTML = 'Back';
            }
        };

        this.changeEmailInput.render().onfocus = () => {
            this.password.render().type = 'password';
            this.buttonBack.render().innerHTML = 'Save';
        };

        this.changeEmailInput.render().onblur = () => {
            if (this.changeEmailInput.render().value === this.userData.email) {
                this.password.render().type = 'hidden';
                this.buttonBack.render().innerHTML = 'Back';
            }
        };

        this.buttonBack.render().addEventListener('click', () => {
            const newData = [...document.getElementsByClassName('profile-page__dataInput')];

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
                        this.title.innerHTML(UserService.GetUser().login);
                        Router.go('/');
                    });
                });
            } else {
                Router.go('/');
            }
        });
    }
}

