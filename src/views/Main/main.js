'use strict';

import MainComponent from '../../components/MainComponent/MainComponent.js';
import Button from '../../components/Button/Button.js';
import ImageComp from '../../components/ImageComp/ImageComp.js';
import Block from '../../components/Block/Block.js';
import Router from '../../modules/Router/Router.js';
import Transport from "../../modules/Transport/Trasport.js";

export default class Main extends MainComponent {
    constructor() {
        super('div', ['menu'], {});
    }

    build() {
        this.append((new Block('p', 'Neon Light', ['menu-logo'], {})).render());
        this.append(new Button('Singleplayer', ['btnDiv'], 'singlPlayerBtn').render());
        this.append(new Button('Multiplayer', ['btnDiv'], 'multiplayerBtn').render());
        this.append(new Button('Sign Up', ['btnDiv'], 'signUpBtn').render());
        this.append(new Button('Sign In', ['btnDiv'], 'signInBtn').render());
        this.append(new Button('Leaders', ['btnDiv'], 'leadersBtn').render());
        this.append(new Button('Profile', ['btnDiv'], 'profileBtn').render());
        this.append(new Button('About', ['btnDiv'], 'aboutBtn').render());
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

        // Transport.Post('http://localhost:8081/logout', {});

        Transport.Get('http://localhost:8081/user').then(response => {
            console.log('All ok main');
            console.log(response)
        }).catch(response => {
            if (!response.json()) {
                console.log(response);
                return;
            }
            response.json().then(json => console.log(json))
        });
    }
}
