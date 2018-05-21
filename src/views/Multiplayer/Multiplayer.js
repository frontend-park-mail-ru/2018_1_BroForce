'use strict';

import MainComponent from '../../components/MainComponent/MainComponent.js';
import Router from '../../modules/Router/Router.js';
import Block from '../../components/Block/Block.js';
import Button from '../../components/Button/Button.js';
import Multiplayer from '../../game/MultiplayerLogic/MultiplayerLogic.js';

export default class MultiplayerView extends MainComponent {
    constructor() {
        super('div', ['game-page'], {});
    }

    build() {
        const MainDiv = new Block('div', '', ['game-page'], {});
        const GameEndingText = new Block('p', '', ['game-page__text__ending'], {name: 'gameWin'});
        const GameRestartBtn =new Button('Restart', ['game-page__button', 'game-page__button__restart'], 'btnRestart');
        GameRestartBtn.render().style.display = 'none';
        const GameBackBtn = new Button('Back', ['game-page__button', 'game-page__button__back'], 'btnBack');
        const ScoreText = new Block('p', '0', ['game-page__text__score'], {name: 'gameScore'});

        MainDiv.render().appendChild(ScoreText.render());
        MainDiv.render().appendChild(GameEndingText.render());
        MainDiv.render().appendChild(GameRestartBtn.render());
        MainDiv.render().appendChild(GameBackBtn.render());
        MainDiv.render().appendChild(new MainComponent('canvas', ['game-page__canvas'], {}).render());
        document.getElementById('main').appendChild(this.render());

        this.append(MainDiv.render());

        const game = new Multiplayer();
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
            ScoreText.render().style.display = 'block';

            const gameText = document.querySelector('.game-page__text__ending');
            gameText.innerHTML = '';
        });
    }
}
