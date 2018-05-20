'use strict';

import MainComponent from '../../components/MainComponent/MainComponent.js';
import GameLogic from '../../game/GameLogic.js';
import Button from '../../components/Button/Button.js';
import Router from '../../modules/Router/Router.js';
import Block from '../../components/Block/Block.js';

export default class Game extends MainComponent {
    constructor() {
        super('div', ['game-page'], {});
    }

    build() {
        const GameBackBtn =new Button('Back', ['main-page__menu__button', 'game-page__button__back'], 'btnBack');
        this.append(GameBackBtn.render());
        this.append(new Block('p', '0', ['game-page__text__score'], {name: 'gameScore'}).render());
        const GameEndingText = new Block('p', '', ['game-page__text__ending'], {name: 'gameWin'});
        this.append(GameEndingText.render());

        // Trying to do restart btn
        const GameRestartBtn =new Button('Restart', ['main-page__menu__button', 'game-page__button__restart'], 'btnRestart');
        GameRestartBtn.render().style.display = 'none';
        this.append(GameRestartBtn.render());

        this.append(new MainComponent('canvas', ['game-page__canvas'], {}).render());
        document.getElementById('main').appendChild(this.render());

        const game = new GameLogic();
        game.Start();

        GameBackBtn.render().addEventListener('click', () =>{
            GameRestartBtn.render().style.display = 'none';
            GameEndingText.render().style.display = 'none';

            game.Stop();
            Router.go('/');
        });

        GameRestartBtn.render().addEventListener('click', () => {
            game.Start();
            GameRestartBtn.render().style.display = 'none';

            const gameText = document.querySelector('.game-page__text__ending');
            gameText.innerHTML = '';
        });
    }
}
