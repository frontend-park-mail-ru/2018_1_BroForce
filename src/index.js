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

// const main = new MainForm();
// main.build();

// const newKek = new MainComponent('button', ['menu-input'], {type: 'submit', value: 'kek',});
// newKek.render().innerHTML = 'kek';
// document.body.appendChild(newKek.render());

// const button = new Button('submit', 'btnKek');
// document.getElementById('main').appendChild(button.render());

const router = new Router();
router.use('/', MainForm);
router.use('/signin/', SignIn);
router.use('/signup/', SignUp);

router.start();
