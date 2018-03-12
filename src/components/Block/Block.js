'use strict';

import MainComponent from '../MainComponent/MainComponent.js';

export default class Block extends MainComponent {
    constructor(tag = 'div', text = 'Text', classes = [], attrs = {}) {
        super(tag, classes, attrs);
        this.innerHTML(text);
    }

    changeBlock(newBlock) {
        this.element = newBlock;
    }
}
