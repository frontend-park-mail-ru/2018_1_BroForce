'use strict';

import MainComponent from '../../components/MainComponent/MainComponent.js';

const signUpForm = '<form class="menu"> ' +
    '<p class="menu-input">Sign up</p> ' +
    '<input type="text" id="signUpLoginInput" class="menu-input" placeholder="Login" required> ' +
    '<input type="email" id="signUpEmailInput" class="menu-input" placeholder="Email address" required> ' +
    '<input type="password" id="inputPassword" class="menu-input" placeholder="Password" required> ' +
    '<input type="password" id="inputConfirmPassword" class="menu-input" placeholder="Confirm Password" required> ' +
    '<button class="form-input" type="submit" id="btnRegistration">Create Account</button> ' +
    '</form>';

export default class SignUp extends MainComponent {
    constructor() {
        super();
        this.template = Hogan.compile(signUpForm);
    }

    build() {
        this.render().innerHTML = this.template.render();
        document.getElementById('main').appendChild(this.render());
    }
}
