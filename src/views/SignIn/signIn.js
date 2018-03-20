'use strict';

import MainComponent from '../../components/MainComponent/MainComponent.js';
import Block from '../../components/Block/Block.js';
import Input from '../../components/Input/Input.js';
import Button from '../../components/Button/Button.js';
import Router from '../../modules/Router/Router.js';

export default class SignIn extends MainComponent {
    constructor() {
        super('form', ['login'], {});
    }

    build() {
        this.append((new Block('p', 'Sign in', ['form-input'], {})).render());
        this.append((new Input('email', 'signInEmailInput', ['form-input'], 'Email address')).render());
        this.append((new Input('password', 'signInPasswordInput', ['form-input'], 'Password')).render());
        // this.append((new Block('a', 'Create an account', ['form-input'], {href: '', id: 'createAccountLink'})).render());
        this.append((new Button('Sign In', 'submit', ['form-input'], 'signInSubmitBtn').render()));
        this.append((new Button('Back', 'button', ['form-input'], 'signInBackBtn').render()));
        document.getElementById('main').appendChild(this.render());

        const signInBackBtn = document.getElementById('signInBackBtn');
        signInBackBtn.addEventListener('click', () => Router.go('/'));
    }
}
