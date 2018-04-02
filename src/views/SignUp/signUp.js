'use strict';

import MainComponent from '../../components/MainComponent/MainComponent.js';
import Block from '../../components/Block/Block.js';
import Input from '../../components/Input/Input.js';
import Button from '../../components/Button/Button.js';
import Router from '../../modules/Router/Router.js';
import Form from '../../components/Form/Form.js'

const data = {
    fields: [
        {
            type: 'text',
            id: 'signUpLoginInput',
            class: 'form-input',
            placeholder: 'Login'
        },
        {
            type: 'email',
            id: 'signUpEmailInput',
            class: 'form-input',
            placeholder: 'Email address'
        },
        {
            type: 'password',
            id: 'inputPassword',
            class: 'form-input',
            placeholder: 'Password'
        },
        {
            type: 'password',
            id: 'inputConfirmPassword',
            class: 'form-input',
            placeholder: 'Confirm Password'
        }
    ],

    button: {
            text: 'Create Account',
            id: 'btnRegistration',
            class: 'form-input'
    }
};

export default class SignUp extends MainComponent {
    constructor() {
        super('div', ['login'], {});
    }

    build() {
        this.append((new Block('p', 'Sign up', ['form-input'], {})).render());
        this.append(new Form(data).render());
        this.append((new Button('Back', 'button', ['form-input'], 'signUpBackBtn').render()));
        document.getElementById('main').appendChild(this.render());

        const signUpBackBtn = document.getElementById('signUpBackBtn');
        signUpBackBtn.addEventListener('click', () => Router.go('/'));
    }
}
