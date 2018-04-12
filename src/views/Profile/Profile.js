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
        const userData = {
            name: UserService.GetUser().login,
            email: UserService.GetUser().email,
        };

        const template = Hogan.compile('{{name}}');
        const name = template.render(userData);

        this.append((new ImageComp('../img/user-default.jpg', [], 'logo')).render());
        this.append((new Block('p', 'Hello, ' + name + '!', ['form-input'], {})).render());

        this.changeLoginInput = new MainComponent('input', ['form-input', 'profile-input'],
            {name: 'changeLoginInput', value: userData.name, placeholder: 'Enter name'});
        this.append(this.changeLoginInput.render());

        this.changeEmailInput = new MainComponent('input', ['form-input', 'profile-input'],
            {name: 'changeEmailInput', value: userData.email, placeholder: 'Enter email'});
        this.append(this.changeEmailInput.render());

        this.password = new MainComponent('input', ['form-input', 'profile-input'],
            {type: 'hidden', id: 'password', name: 'password', placeholder: 'Enter password'});
        this.append(this.password.render());

        this.append(new Button('Change avatar', ['btnDiv'], 'changeAvatarBtn').render());

        const buttonBack = new Button('Back', ['btnDiv'], 'profileBackBtn');
        this.append(buttonBack.render());

        document.getElementById('main').appendChild(this.render());

        this.changeLoginInput.render().onfocus = () => {
            this.password.render().type = 'password';
            buttonBack.render().innerHTML = 'Save and quit';
        };

        this.changeLoginInput.render().onblur = () => {
            console.log('onblur', this.changeLoginInput.render().value, userData.name);
            if (this.changeLoginInput.render().value === userData.name) {
                this.password.render().type = 'hidden';
                buttonBack.render().innerHTML = 'Back';
            }
        };

        this.changeEmailInput.render().onfocus = () => {
            this.password.render().type = 'password';
            buttonBack.render().innerHTML = 'Save and quit';
        };

        this.changeEmailInput.render().onblur = () => {
            if (this.changeEmailInput.render().value === userData.email) {
                this.password.render().type = 'hidden';
                buttonBack.render().innerHTML = 'Back';
            }
        };

        buttonBack.render().addEventListener('click', () => {
            const newData = [...document.getElementsByClassName('profile-input')];

            let backWay = null;
            let body = {};

            newData.forEach((input) => {
                if (input.name === 'changeLoginInput' && input.value !== userData.name) {
                    backWay = '/newlogin';
                    body.change = input.value;
                }
                if (input.name === 'changeEmailInput' && input.value !== userData.email) {
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
                        Router.go('/');
                    });
                });
            } else {
                Router.go('/');
            }
        });
    }
}
