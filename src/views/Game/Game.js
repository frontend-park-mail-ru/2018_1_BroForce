'use strict';

import MainComponent from '../../components/MainComponent/MainComponent.js';
import GameLogic from './GameLogic.js'

export default class Game extends MainComponent {
    constructor() {
        super('div', ['game'], {});
    }

    build() {
        this.append(new MainComponent('canvas', [], {}).render());
        this.append(new MainComponent('script', [], {src: "gameModule.js"}).render());
        document.getElementById('main').appendChild(this.render());

        new GameLogic();
    }

}
