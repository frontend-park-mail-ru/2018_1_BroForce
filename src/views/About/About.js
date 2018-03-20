'use strict';

import MainComponent from '../../components/MainComponent/MainComponent.js';
import Block from '../../components/Block/Block.js';
import Input from '../../components/Input/Input.js';
import Button from '../../components/Button/Button.js';
import Router from '../../modules/Router/Router.js';

export default class About extends MainComponent {
    constructor() {
        super('div', ['menu'], {});
    }

    build() {
        const aboutText = 'Neon light - it is web game about neon and fights!';
        this.append((new Block('p', aboutText, ['form-input'], {})).render());
        this.append((new Button('Back', 'button', ['form-input'], 'AboutBackBtn').render()));
        document.getElementById('main').appendChild(this.render());

        const AboutBackBtn = document.getElementById('AboutBackBtn');
        AboutBackBtn.addEventListener('click', () => Router.go('/'));
    }
}
