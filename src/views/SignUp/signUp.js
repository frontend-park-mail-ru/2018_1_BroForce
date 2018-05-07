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
            class: ['form-input', 'login-page__signUpInput'],
            placeholder: 'Login',
        },
        {
            type: 'email',
            name: 'email',
            id: 'signUpEmailInput',
            class: ['form-input', 'login-page__signUpInput'],
            placeholder: 'Email address',
        },
        {
            type: 'password',
            name: 'password',
            id: 'inputPassword',
            class: ['form-input', 'login-page__signUpInput'],
            placeholder: 'Password',
        },
        {
            type: 'password',
            name: 'passwordConfirm',
            id: 'confirmPassword',
            class: ['form-input', 'login-page__signUpInput'],
            placeholder: 'Confirm Password',
        },
    ],

    button: {
            text: 'Create Account',
            id: 'btnRegistration',
            class: 'form-input',
    },

    classToFind: 'login-page__signUpInput',
};

export default class SignUp extends MainComponent {
    constructor() {
        super('div', ['login-page'], {});
    }

    build() {
        this.append((new Block('p', 'Sign up', ['menu_title'], {})).render());
        this.append(new Form(data).render());
        this.append(new Button('Back', ['main-page__menu__button'], 'signUpBackBtn').render());
        document.getElementById('main').appendChild(this.render());

        const signUpBackBtn = document.getElementById('signUpBackBtn');
        signUpBackBtn.addEventListener('click', () => Router.go('/'));
    }
}
