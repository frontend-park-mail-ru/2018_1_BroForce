'use strict';

import MainComponent from '../../components/MainComponent/MainComponent.js';

const mainForm = '<div class="menu">' +
    '<img src="../img/broforce.png">' +
    '<button type="submit" id="singlPlayerBtn">Singleplayer</button>' +
    '<button type="submit" id="multiplayerBtn">Multiplayer</button>' +
    '<button type="submit" id="signUpBtn">Sign Up</button>' +
    '<button type="submit" id="signInBtn">Sign In</button>' +
    '<button type="submit" id="leadersBtn">Leaders</button>' +
    '<button type="submit" id="aboutBtn">About</button>' +
    '</div>';

export default class Main extends MainComponent {
    constructor() {
        super();
        this.template = Hogan.compile(mainForm);
    }

    build() {
        this.render().innerHTML = this.template.render();
        document.getElementById('main').appendChild(this.render());
    }
}
