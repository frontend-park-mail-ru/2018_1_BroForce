'use strict';

import MainComponent from '../../components/MainComponent/MainComponent.js';
import Block from '../../components/Block/Block.js';
import Input from '../../components/Input/Input.js';
import Button from '../../components/Button/Button.js';
import Router from '../../modules/Router/Router.js';
import Form from '../../components/Form/Form.js';

const data = {
    fields: [
        {
            type: 'text',
            name: 'login',
            id: 'signUpLoginInput',
            class: ['form-input', 'signUpInput'],
            placeholder: 'Login',
        },
        {
            type: 'email',
            name: 'email',
            id: 'signUpEmailInput',
            class: ['form-input', 'signUpInput'],
            placeholder: 'Email address',
        },
        {
            type: 'password',
            name: 'password',
            id: 'inputPassword',
            class: ['form-input', 'signUpInput'],
            placeholder: 'Password',
        },
        {
            type: 'password',
            name: 'passwordConfirm',
            id: 'inputConfirmPassword',
            class: ['form-input', 'signUpInput'],
            placeholder: 'Confirm Password',
        },
    ],

    button: {
            text: 'Create Account',
            id: 'btnRegistration',
            class: 'form-input',
    },

    classToFind: 'signUpInput'
};

export default class SignUp extends MainComponent {
    constructor() {
        super('div', ['login'], {});
    }

    build() {
        this.append((new Block('p', 'Sign up', ['form-input'], {})).render());
        this.append(new Form(data).render());
        this.append(new Button('Back', ['btnDiv'], 'signUpBackBtn').render());
        document.getElementById('main').appendChild(this.render());

        const signUpBackBtn = document.getElementById('signUpBackBtn');
        signUpBackBtn.addEventListener('click', () => Router.go('/'));
    }
}
