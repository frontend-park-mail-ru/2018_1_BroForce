'use strict';

import MainComponent from '../MainComponent/MainComponent.js';

export default class ImageComp extends MainComponent {
    constructor(source, classes = [], id = 'img') {
        super('img', classes, {src: source, id: id});
    }
}
