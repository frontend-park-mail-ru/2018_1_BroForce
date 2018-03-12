'use strict';

import MainComponent from '../../components/MainComponent/MainComponent.js';
import Block from '../../components/Block/Block.js';
import Input from '../../components/Input/Input.js';
import Button from '../../components/Button/Button.js';
import ImageComp from '../../components/ImageComp/ImageComp.js';

export default class Profile extends MainComponent {
    constructor() {
        super('div', ['menu'], {style: 'margin-top: 2%'});
    }

    build() {
        const userData = {
            name: 'Arthur',
            email: 'arthurunique24@gmail.com',
        };

        const template = Hogan.compile('{{name}}');
        const name = template.render(userData);

        this.append((new ImageComp('../img/user-default.png', ['profile-img'], 'logo')).render());
        this.append((new Block('input', '', ['menu-input'], {type: 'file', style: 'margin-left: 22%'})).render());
        this.append((new Block('p', 'Hello, ' + name + '!', ['menu-input'], {style: 'text-align: center;'})).render());
        document.getElementById('main').appendChild(this.render());
    }
}
