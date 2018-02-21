'use strict';

const signUpForm = '<form class="menu"> ' +
    '<p class="menu-input">Sign up</p> ' +
    '<input type="text" id="signUpLoginInput" class="menu-input" placeholder="Login" required> ' +
    '<input type="email" id="signUpEmailInput" class="menu-input" placeholder="Email address" required> ' +
    '<input type="password" id="inputPassword" class="menu-input" placeholder="Password" required> ' +
    '<input type="password" id="inputConfirmPassword" class="menu-input" placeholder="Confirm Password" required> ' +
    '<button class="form-input" type="submit" id="btnRegistration">Create Account</button> ' +
    '</form>';

class SignUp {
    constructor() {
        this.template = Hogan.compile(signUpForm);
    }

    show() {
        document.getElementById('main').innerHTML = this.template.render();
    }
}
