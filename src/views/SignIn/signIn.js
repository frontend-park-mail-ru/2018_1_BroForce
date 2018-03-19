'use strict';

import MainComponent from '../../components/MainComponent/MainComponent.js';
import Block from '../../components/Block/Block.js';
import Input from '../../components/Input/Input.js';
import Button from '../../components/Button/Button.js';
import Router from "../../modules/Router/Router.js";

export default class SignIn extends MainComponent {
    constructor() {
        super('form', ['menu'], {});
    }

    build() {
        this.append((new Block('p', 'Sign in', ['menu-input'], {})).render());
        this.append((new Input('email', 'signInEmailInput', ['menu-input'], 'Email address')).render());
        this.append((new Input('password', 'signInPasswordInput', ['menu-input'], 'Password')).render());
        // this.append((new Block('a', 'Create an account', ['menu-input'], {href: '', id: 'createAccountLink'})).render());
        this.append((new Button('Sign In', 'submit', ['menu-input'], 'signInSubmitBtn').render()));
        this.append((new Button('Back', 'button', ['menu-input'], 'signInBackBtn').render()));
        document.getElementById('main').appendChild(this.render());

        const signInBackBtn = document.getElementById('signInBackBtn');
        signInBackBtn.addEventListener('click', () => Router.go('/'));
    }
}
