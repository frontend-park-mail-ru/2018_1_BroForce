'use strict';

import MainComponent from '../../components/MainComponent/MainComponent.js';
import UL from '../../components/UL/UL.js';

export default class Loading extends MainComponent {
    constructor() {
        super('div', ['loading'], {});
    }

    build() {
        this.append(new UL(5, ['loader'], ['circle']).render());
        document.getElementById('main').appendChild(this.render());
    }
}
