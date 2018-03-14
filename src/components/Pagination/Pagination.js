'use strict';

import MainComponent from '../MainComponent/MainComponent.js';
import Block from '../Block/Block.js';

export default class Pagination extends MainComponent {
    constructor(countOfPages, attrs ={}) {
        super('div', ['pagination'], attrs);

        this.append((new Block('a', '<<', [], {})).render());
        this.append((new Block('a', 1, ['active'], {})).render());
        for (let i = 1; i < countOfPages; i++) {
            this.append((new Block('a', i + 1, [], {})).render());
        }
        this.append((new Block('a', '>>', [], {})).render());
    }
}
