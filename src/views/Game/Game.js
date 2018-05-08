'use strict';

import MainComponent from '../../components/MainComponent/MainComponent.js';
import GameLogic from '../../game/GameLogic.js';
import Button from '../../components/Button/Button.js';
import Router from '../../modules/Router/Router.js';
import Block from '../../components/Block/Block.js';

export default class Game extends MainComponent {
    constructor() {
        super('div', ['game'], {});
    }

    build() {
        const GameBackBtn =new Button('Back', ['main-page__menu__button', 'game-back-btn'], 'btnBack');
        this.append(GameBackBtn.render());
        this.append(new Block('p', '0', ['game-score'], {name: 'gameScore'}).render());
        this.append(new Block('p', '', ['game-win'], {name: 'gameWin'}).render());

        this.append(new MainComponent('canvas', ['game-canvas'], {}).render());
        document.getElementById('main').appendChild(this.render());

        const game = new GameLogic();
        game.Start();

        GameBackBtn.render().addEventListener('click', () =>{
            game.Stop();
            Router.go('/');
        });
    }
}
