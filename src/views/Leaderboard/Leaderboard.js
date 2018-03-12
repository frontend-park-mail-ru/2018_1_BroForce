'use strict';

import MainComponent from '../../components/MainComponent/MainComponent.js';
import Block from '../../components/Block/Block.js';
import Input from '../../components/Input/Input.js';
import Button from '../../components/Button/Button.js';

export default class SignIn extends MainComponent {
    constructor() {
        super('table', ['menu'], {});
    }

    build() {
        const users = {"users" : [
                {
                    'email': 'arthurunique24@gmail.com',
                    'name': 'Arthur',
                    'score': '15000'
                },
                {
                    'email': 'bigPapa@gmail.com',
                    'name': 'Papa',
                    'score': '100500'
                }
            ]};

        const template = Hogan.compile("{{#users}} - {{name}}! - {{score}} <br/> {{/users}}");
        const output = template.render(users);

        this.append((new Block('p', output, ['menu-input'], {})).render());
        document.getElementById('main').appendChild(this.render());
    }
}
