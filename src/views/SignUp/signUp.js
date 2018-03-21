'use strict';

import MainComponent from '../../components/MainComponent/MainComponent.js';
import Block from '../../components/Block/Block.js';
import Input from '../../components/Input/Input.js';
import Button from '../../components/Button/Button.js';
import Router from '../../modules/Router/Router.js';

export default class SignUp extends MainComponent {
    constructor() {
        super('form', ['login'], {});
    }

    build() {
        this.append((new Block('p', 'Sign up', ['form-input'], {})).render());
        this.append((new Input('text', 'signUpLoginInput', ['form-input'], 'Login')).render());
        this.append((new Input('email', 'signUpEmailInput', ['form-input'], 'Email address')).render());
        this.append((new Input('password', 'inputPassword', ['form-input'], 'Password')).render());
        this.append((new Input('password', 'inputConfirmPassword', ['form-input'], 'Confirm Password')).render());
        this.append((new Button('Create Account', 'submit', ['form-input'], 'btnRegistration').render()));
        this.append((new Button('Back', 'button', ['form-input'], 'signUpBackBtn').render()));
        document.getElementById('main').appendChild(this.render());

        const signUpBackBtn = document.getElementById('signUpBackBtn');
        signUpBackBtn.addEventListener('click', () => Router.go('/'));
    }
}
