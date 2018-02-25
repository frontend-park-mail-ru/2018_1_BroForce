'use strict';

import MainComponent from '../MainComponent/MainComponent';

export default class Button extends MainComponent {
    constructor(type) {
        super('input', ['menu-input'], {type: type});
    }
}
