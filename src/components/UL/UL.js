'use strict';

import MainComponent from '../MainComponent/MainComponent.js';

export default class UL extends MainComponent {
    constructor(countOfLi, classes, classesOfLi) {
        super('ul', classes, {});
        for (let i = 0; i < countOfLi; i++) {
            this.append(new MainComponent('li', classesOfLi, {}).render());
        }
    }
}
