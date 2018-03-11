'use strict';

import MainComponent from '../MainComponent/MainComponent.js';

export default class Button extends MainComponent {
    constructor(text = 'Button', type = 'submit', classes = [], id) {
        super('button', [classes], {type: type, id: id});
        this.innerHTML(text);
    }
}
