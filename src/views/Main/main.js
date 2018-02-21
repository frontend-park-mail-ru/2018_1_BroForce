/**
 * Created by Arthur on 2/21/18.
 */

'use strict';

const mainForm = '<div class="menu">' +
    '<img src="../img/broforce.png">' +
    '<button type="submit" id="singlPlayerBtn">Singleplayer</button>' +
    '<button type="submit" id="multiplayerBtn">Multiplayer</button>' +
    '<button type="submit" id="signUpBtn">Sign Up</button>' +
    '<button type="submit" id="signInBtn">Sign In</button>' +
    '<button type="submit" id="leadersBtn">Leaders</button>' +
    '<button type="submit" id="aboutBtn">About</button>' +
    '</div>';

class Main {
    constructor() {
        this.template = Hogan.compile(mainForm);
    }

    show() {
        document.getElementById('main').innerHTML = this.template.render();
    }
}
