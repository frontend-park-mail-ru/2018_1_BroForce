'use strict';

import MainComponent from '../MainComponent/MainComponent';

export default class Button extends MainComponent {
    constructor(type) {
        super('button', ['menu-input'], {type: type});
    }
}
