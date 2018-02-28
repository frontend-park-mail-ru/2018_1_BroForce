'use strict';

import MainComponent from '../MainComponent/MainComponent.js';

export default class Button extends MainComponent {
    constructor(type, text) {
        super('button', ['menu-input'], {type: type});
        this.render().innerHTML = text;
    }
}
