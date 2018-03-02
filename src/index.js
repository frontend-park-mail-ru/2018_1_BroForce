'use strict';

// Components
import MainComponent from './components/MainComponent/MainComponent.js';
import Button from './components/Button/Button.js';

// Router
import Router from './modules/Router/Router.js';

// Views
import MainForm from './views/Main/main.js';
import SignIn from './views/SignIn/signIn.js';
import SignUp from './views/SignUp/signUp.js';

Router.use('/', MainForm)
    .use('/signin/', SignIn)
    .use('/signup/', SignUp)
    .start();

const signInBtn = document.getElementById('signInBtn');
signInBtn.addEventListener('click', () => Router.go('/signin/'));

const signUpBtn = document.getElementById('signUpBtn');
signUpBtn.addEventListener('click', () => Router.go('/signup/'));
