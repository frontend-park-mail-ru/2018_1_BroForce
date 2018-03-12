'use strict';

import MainComponent from '../../components/MainComponent/MainComponent.js';
import Button from '../../components/Button/Button.js';
import ImageComp from '../../components/ImageComp/ImageComp.js';
import Router from '../../modules/Router/Router.js';

export default class Main extends MainComponent {
    constructor() {
        super('div', ['menu'], {});
        // this.template = Hogan.compile(mainForm);
    }

    build() {
        //     this.innerHTML(this.template.render());
        //     document.getElementById('main').appendChild(this.render());

        this.append((new ImageComp('../img/broforce.png', [], 'logo')).render());
        this.append((new Button('Singleplayer', 'submit', ['main-input'], 'singlPlayerBtn')).render());
        this.append((new Button('Multiplayer', 'submit', ['main-input'], 'multiplayerBtn').render()));
        this.append((new Button('Sign Up', 'submit', ['main-input'], 'signUpBtn').render()));
        this.append((new Button('Sign In', 'submit', ['main-input'], 'signInBtn').render()));
        this.append((new Button('Leaders', 'submit', ['main-input'], 'leadersBtn').render()));
        this.append((new Button('About', 'submit', ['main-input'], 'aboutBtn').render()));
        document.getElementById('main').appendChild(this.render());

        const signInBtn = document.getElementById('signInBtn');
        signInBtn.addEventListener('click', () => Router.go('/signin/'));

        const signUpBtn = document.getElementById('signUpBtn');
        signUpBtn.addEventListener('click', () => Router.go('/signup/'));

        const leadersBtn = document.getElementById('leadersBtn');
        leadersBtn.addEventListener('click', () => Router.go('/leaderboard/'))
    }
}
