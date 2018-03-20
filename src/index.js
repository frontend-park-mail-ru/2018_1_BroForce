'use strict';

// Router
import Router from './modules/Router/Router.js';

// Views
import MainForm from './views/Main/main.js';
import SignIn from './views/SignIn/signIn.js';
import SignUp from './views/SignUp/signUp.js';
import LeaderBoard from './views/Leaderboard/Leaderboard.js';
import Profile from './views/Profile/Profile.js';
import About from './views/About/About.js';

Router.use('/', MainForm)
    .use('/signin/', SignIn)
    .use('/signup/', SignUp)
    .use('/leaderboard/', LeaderBoard)
    .use('/profile/', Profile)
    .use('/about/', About)
    .start();
