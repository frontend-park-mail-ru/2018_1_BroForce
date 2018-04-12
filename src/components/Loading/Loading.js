'use strict';

import MainComponent from '../MainComponent/MainComponent.js';
import UL from '../UL/UL.js';

export default class Loading extends MainComponent {
    constructor() {
        super('div', ['loading'], {});
        this.append(new UL(5, ['loader'], ['circle']).render());
    }
}
