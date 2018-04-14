'use strict';

// Router
import Router from './modules/Router/Router.js';

import UserService from './Services/UserService/UserService.js';
import ServiceWorkerRegister from './Services/ServiceWorkerRegister/ServiceWorkerRegister.js';

// Views
import MainForm from './views/Main/Main.js';
import SignIn from './views/SignIn/signIn.js';
import SignUp from './views/SignUp/signUp.js';
import LeaderBoard from './views/Leaderboard/Leaderboard.js';
import Profile from './views/Profile/Profile.js';
import About from './views/About/About.js';
import Loading from './components/Loading/Loading.js';
import Game from "./views/Game/Game.js";

// ServiceWorkerRegister();

const loading = new Loading();
document.getElementById('main').appendChild(loading.render());

UserService.GetData().catch((response) => {
    console.log(response);
}).then(() => {
    loading.remove();
    Router.use('/', MainForm)
        .use('/signin/', SignIn)
        .use('/signup/', SignUp)
        .use('/leaderboard/', LeaderBoard)
        .use('/profile/', Profile)
        .use('/about/', About)
        .use('/singleplayer/', Game)
        .start();
});
