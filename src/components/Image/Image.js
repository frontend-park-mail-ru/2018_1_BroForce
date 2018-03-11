'use strict';

import MainComponent from '../MainComponent/MainComponent.js';

export default class Image extends MainComponent {
    constructor(source, classes = [], id) {
        super('img', classes, {src: source, id: id});
    }
}
