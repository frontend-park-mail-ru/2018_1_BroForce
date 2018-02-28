'use strict';

import MainComponent from '../../components/MainComponent/MainComponent.js';

const signInForm = '<form class="menu"> ' +
    '<p class="menu-input">Log in or Sign up</p> ' +
    '<input type="email" id="signInEmailInput" class="menu-input" placeholder="Email address" required>' +
    '<input type="password" id="signInPasswordInput" class="menu-input" placeholder="Password" required>' +
    '<a href="" id="createAccountLink" class="menu-input">Create an account</a>' +
    '<button class="menu-input" type="submit" id="signInSubmitBtn">Sign in</button>' +
    '</form>';

export default class SignIn extends MainComponent {
    constructor() {
        super();
        this.template = Hogan.compile(signInForm);
    }

    build() {
        this.render().innerHTML = this.template.render();
        document.getElementById('main').appendChild(this.render());
    }
}
