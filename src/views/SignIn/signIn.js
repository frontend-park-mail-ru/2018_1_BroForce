'use strict';

import MainComponent from '../../components/MainComponent/MainComponent.js';
import Block from '../../components/Block/Block.js';
import Input from '../../components/Input/Input.js';
import Button from '../../components/Button/Button.js';

export default class SignIn extends MainComponent {
    constructor() {
        super('form', ['menu'], {});
        // this.template = Hogan.compile(signInForm);
    }

    build() {
        // this.innerHTML(this.template.render());
        // document.getElementById('main').appendChild(this.render());
        this.append((new Block('p', 'Log in or Sign up', ['menu-input'], {})).render());
        this.append((new Input('email', 'signInEmailInput', ['menu-input'], 'Email address')).render());
        this.append((new Input('password', 'signInPasswordInput', ['menu-input'], 'Password')).render());
        this.append((new Block('a', 'Create an account', ['menu-input'], {href: '', id: 'createAccountLink'})).render());
        this.append((new Button('Sign In', 'submit', ['main-input'], 'signInSubmitBtn').render()));
        document.getElementById('main').appendChild(this.render());
    }
}
