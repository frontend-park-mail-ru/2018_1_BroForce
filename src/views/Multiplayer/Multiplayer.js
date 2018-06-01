'use strict';

import MainComponent from '../../components/MainComponent/MainComponent.js';
import Router from '../../modules/Router/Router.js';
import Block from '../../components/Block/Block.js';
import Button from '../../components/Button/Button.js';
import MultiplayerLogic from '../../game/MultiplayerLogic/MultiplayerLogic.js';

export default class MultiplayerView extends MainComponent {
    constructor() {
        super('div', ['multiplayer-page'], {});
    }

    build() {
        const MainDiv = new Block('div', '', ['multiplayer-page'], {});
        const GameEndingText = new Block('p', '', ['multiplayer-page__text__ending'], {name: 'gameWin'});
        const GameRestartBtn =new Button('Restart', ['multiplayer-page__button', 'multiplayer-page__button__restart'], 'btnRestart');
        GameRestartBtn.render().style.display = 'none';
        const GameBackBtn = new Button('Back', ['multiplayer-page__button', 'multiplayer-page__button__back'], 'btnBack');
        const ScoreText = new Block('p', '0', ['multiplayer-page__text__score'], {name: 'gameScore'});
        const Canvas = new MainComponent('canvas', ['multiplayer-page__canvas'], {});

        MainDiv.render().appendChild(ScoreText.render());
        MainDiv.render().appendChild(GameEndingText.render());
        MainDiv.render().appendChild(GameRestartBtn.render());
        MainDiv.render().appendChild(GameBackBtn.render());
        MainDiv.render().appendChild(Canvas.render());
        document.getElementById('main').appendChild(this.render());

        this.append(MainDiv.render());

        console.log('MultiplayerLogic');
        const game = new MultiplayerLogic();
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
