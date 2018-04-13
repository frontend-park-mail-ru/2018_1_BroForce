'use strict';

import MainComponent from '../MainComponent/MainComponent.js';

export default class Input extends MainComponent {
    constructor(type, id, name, classes = [], placeholder) {
        super('input', classes, {type: type, placeholder: placeholder, id: id, name: name});
    }
}
