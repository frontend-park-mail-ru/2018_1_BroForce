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
            class: ['form-input', 'signInInput'],
            placeholder: 'Login',
        },
        {
            type: 'password',
            name: 'password',
            id: 'signInPasswordInput',
            class: ['form-input', 'signInInput'],
            placeholder: 'Password',
        },
    ],

    button: {
        text: 'Sign In',
        id: 'signInSubmitBtn',
        class: 'form-input',
    },

    classToFind: 'signInInput',
};

export default class SignIn extends MainComponent {
    constructor() {
        super('form', ['login'], {});
    }

    build() {
        this.append((new Block('p', 'Sign in', ['form-input'], {})).render());
        this.append(new Form(data).render());
        this.append(new Button('Back', ['btnDiv'], 'signInBackBtn').render());
        document.getElementById('main').appendChild(this.render());

        const signInBackBtn = document.getElementById('signInBackBtn');
        signInBackBtn.addEventListener('click', () => Router.go('/'));
    }
}
