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
            type: 'password',
            name: 'password',
            id: 'signInPasswordInput',
            class: ['form-input', 'login-page__signUpInput'],
            placeholder: 'Password',
        },
    ],

    button: {
        text: 'Sign In',
        id: 'signInSubmitBtn',
        class: 'form-input',
    },

    classToFind: 'login-page__signUpInput',
};

export default class SignIn extends MainComponent {
    constructor() {
        super('form', ['login-page'], {});
    }

    build() {
        this.append((new Block('p', 'Sign in', ['menu_title'], {})).render());
        this.append(new Form(data).render());
        this.append(new Button('Back', ['main-page__menu__button'], 'signInBackBtn').render());
        document.getElementById('main').appendChild(this.render());

        const signInBackBtn = document.getElementById('signInBackBtn');
        signInBackBtn.addEventListener('click', () => Router.go('/'));
    }
}
