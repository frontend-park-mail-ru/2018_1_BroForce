'use strict';

import MainComponent from '../MainComponent/MainComponent.js';

export default class Form extends MainComponent {
    constructor(type, id, classes = [], placeholder) {
        super('input', classes, {type: type, placeholder: placeholder, id: id});
    }
}
