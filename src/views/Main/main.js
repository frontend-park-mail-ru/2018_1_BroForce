'use strict';

import MainComponent from '../../components/MainComponent/MainComponent.js';
import Button from '../../components/Button/Button.js'
import Image from '../../components/Image/Image.js'

// const mainForm = '<div class="menu">' +
//     '<img src="../img/broforce.png">' +
//     '<button type="submit" id="singlePlayerBtn">Singleplayer</button>' +
//     '<button type="submit" id="multiplayerBtn">Multiplayer</button>' +
//     '<button type="submit" id="signUpBtn">Sign Up</button>' +
//     '<button type="submit" id="signInBtn">Sign In</button>' +
//     '<button type="submit" id="leadersBtn">Leaders</button>' +
//     '<button type="submit" id="aboutBtn">About</button>' +
//     '</div>';

export default class Main extends MainComponent {
    constructor() {
        super('div', ['menu'], {});
        // this.template = Hogan.compile(mainForm);
    }

    build() {
        //     this.innerHTML(this.template.render());
        //     document.getElementById('main').appendChild(this.render());

        // this.innerHTML((new MainComponent('img', [], {src: "../img/broforce.png", id: 'img'}).render().outerHTML));
        this.innerHTML((new Image('../img/broforce.png', [], 'logo')).outerHTML);
        this.append((new Button('Singleplayer', 'submit', 'main-input', 'singlPlayerBtn')).render());
        this.append((new Button('Multiplayer', 'submit', 'main-input', 'multiplayerBtn').render()));
        this.append((new Button('Sign Up', 'submit', 'main-input', 'signUpBtn').render()));
        this.append((new Button('Sign In', 'submit', 'main-input', 'signInBtn').render()));
        this.append((new Button('Leaders', 'submit', 'main-input', 'leadersBtn').render()));
        this.append((new Button('About', 'submit', 'main-input', 'aboutBtn').render()));
        document.getElementById('main').appendChild(this.render());
    }
}
