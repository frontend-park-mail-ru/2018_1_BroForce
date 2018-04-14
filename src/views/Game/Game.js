'use strict';

import MainComponent from '../../components/MainComponent/MainComponent.js';
import GameLogic from './GameLogic.js'
import Button from "../../components/Button/Button.js";
import Router from "../../modules/Router/Router.js";

export default class Game extends MainComponent {
    constructor() {
        super('div', ['game'], {});
    }

    build() {
        const GameBackBtn =new Button('Back', ['btnDiv', 'game-back-btn'], 'btnBack')
        this.append(GameBackBtn.render());

        this.append(new MainComponent('canvas', [], {}).render());
        this.append(new MainComponent('script', [], {src: "gameModule.js"}).render());
        document.getElementById('main').appendChild(this.render());

        new GameLogic();

        GameBackBtn.render().addEventListener('click', () =>{
            Router.go('/')
        });
    }
}
