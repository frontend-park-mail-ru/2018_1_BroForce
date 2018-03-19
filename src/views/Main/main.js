'use strict';

import MainComponent from '../../components/MainComponent/MainComponent.js';
import Button from '../../components/Button/Button.js';
import ImageComp from '../../components/ImageComp/ImageComp.js';
import Router from '../../modules/Router/Router.js';

export default class Main extends MainComponent {
    constructor() {
        super('div', ['menu'], {});
    }

    build() {
        this.append((new ImageComp('../img/broforce.png', ['menu-logo'], 'logo')).render());
        this.append((new Button('Singleplayer', 'submit', ['menu-input'], 'singlPlayerBtn')).render());
        this.append((new Button('Multiplayer', 'submit', ['menu-input'], 'multiplayerBtn').render()));
        this.append((new Button('Sign Up', 'submit', ['menu-input'], 'signUpBtn').render()));
        this.append((new Button('Sign In', 'submit', ['menu-input'], 'signInBtn').render()));
        this.append((new Button('Leaders', 'submit', ['menu-input'], 'leadersBtn').render()));
        this.append((new Button('Profile', 'submit', ['menu-input'], 'profileBtn').render()));
        this.append((new Button('About', 'submit', ['menu-input'], 'aboutBtn').render()));
        document.getElementById('main').appendChild(this.render());

        const signInBtn = document.getElementById('signInBtn');
        signInBtn.addEventListener('click', () => Router.go('/signin/'));

        const signUpBtn = document.getElementById('signUpBtn');
        signUpBtn.addEventListener('click', () => Router.go('/signup/'));

        const leadersBtn = document.getElementById('leadersBtn');
        leadersBtn.addEventListener('click', () => Router.go('/leaderboard/'));

        const profileBtn = document.getElementById('profileBtn');
        profileBtn.addEventListener('click', () => Router.go('/profile/'));
    }
}
