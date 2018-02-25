'use strict';

import MainComponent from '../MainComponent/MainComponent';

export default class Form extends MainComponent {
    constructor(type) {
        super('button', ['menu-input'], {type: type, placeholder: 'Email address'});
    }
}
