'use strict';

import MainComponent from '../../components/MainComponent/MainComponent.js';
import Button from '../../components/Button/Button.js';
import ImageComp from '../../components/ImageComp/ImageComp.js';
import Block from '../../components/Block/Block.js';
import Router from '../../modules/Router/Router.js';

export default class Main extends MainComponent {
    constructor() {
        super('div', ['menu'], {});
    }

    build() {
        // this.append((new ImageComp('../img/broforce.png', ['menu-logo'], 'logo')).render());
        this.append((new Block('p', 'Neon Light', ['menu-logo'], {})).render());
        this.append((new Button('Singleplayer', 'submit', ['form-input'], 'singlPlayerBtn')).render());
        this.append((new Button('Multiplayer', 'submit', ['form-input'], 'multiplayerBtn').render()));
        this.append((new Button('Sign Up', 'submit', ['form-input'], 'signUpBtn').render()));
        this.append((new Button('Sign In', 'submit', ['form-input'], 'signInBtn').render()));
        this.append((new Button('Leaders', 'submit', ['form-input'], 'leadersBtn').render()));
        this.append((new Button('Profile', 'submit', ['form-input'], 'profileBtn').render()));
        this.append((new Button('About', 'submit', ['form-input'], 'aboutBtn').render()));
        document.getElementById('main').appendChild(this.render());

        const signInBtn = document.getElementById('signInBtn');
        signInBtn.addEventListener('click', () => Router.go('/signin/'));

        const signUpBtn = document.getElementById('signUpBtn');
        signUpBtn.addEventListener('click', () => Router.go('/signup/'));

        const leadersBtn = document.getElementById('leadersBtn');
        leadersBtn.addEventListener('click', () => Router.go('/leaderboard/'));

        const profileBtn = document.getElementById('profileBtn');
        profileBtn.addEventListener('click', () => Router.go('/profile/'));

        const aboutBtn = document.getElementById('aboutBtn');
        aboutBtn.addEventListener('click', () => Router.go('/about/'));
    }
}
