/**
 * Created by Arthur on 2/21/18.
 */

'use strict';

const signInForm = '<form class="menu"> ' +
    '<p class="menu-input">Log in or Sign up</p> ' +
    '<input type="email" id="signInEmailInput" class="menu-input" placeholder="Email address" required>' +
    '<input type="password" id="signInPasswordInput" class="menu-input" placeholder="Password" required>' +
    '<a href="" id="createAccountLink" class="menu-input">Create an account</a>' +
    '<button class="menu-input" type="submit" id="signInSubmitBtn">Sign in</button>' +
    '</form>';

class SignIn {
    constructor() {
        this.template = Hogan.compile(signInForm);
    }

    show() {
        document.getElementById('main').innerHTML = this.template.render();
    }
}