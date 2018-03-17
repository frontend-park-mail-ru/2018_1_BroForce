'use strict';

import MainComponent from '../../components/MainComponent/MainComponent.js';
import Block from '../../components/Block/Block.js';
import Input from '../../components/Input/Input.js';
import Button from '../../components/Button/Button.js';

export default class SignUp extends MainComponent {
    constructor() {
        super('form', ['menu'], {});
        // this.template = Hogan.compile(signUpForm);
    }

    build() {
        // this.innerHTML(this.template.render());
        // document.getElementById('main').appendChild(this.render());

        this.append((new Block('p', 'Sign up', ['menu-input'], {})).render());
        this.append((new Input('text', 'signUpLoginInput', ['menu-input'], 'Login')).render());
        this.append((new Input('email', 'signUpEmailInput', ['menu-input'], 'Email address')).render());
        this.append((new Input('password', 'inputPassword', ['menu-input'], 'Password')).render());
        this.append((new Input('password', 'inputConfirmPassword', ['menu-input'], 'Confirm Password')).render());
        this.append((new Button('Create Account', 'submit', ['menu-input'], 'btnRegistration').render()));
        document.getElementById('main').appendChild(this.render());
    }
}
