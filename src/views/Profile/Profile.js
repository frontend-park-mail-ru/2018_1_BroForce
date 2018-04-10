'use strict';

import MainComponent from '../../components/MainComponent/MainComponent.js';
import Block from '../../components/Block/Block.js';
import Input from '../../components/Input/Input.js';
import Button from '../../components/Button/Button.js';
import ImageComp from '../../components/ImageComp/ImageComp.js';
import Router from '../../modules/Router/Router.js';
import UserService from '../../Services/UserService.js';

export default class Profile extends MainComponent {
    constructor() {
        super('div', ['profile'], {style: 'margin-top: 2%'});
    }

    build() {
        console.log(UserService.GetUser().login);
        const userData = {
            name: UserService.GetUser().login,
            email: 'user2018@gmail.com',
        };

        const template = Hogan.compile('{{name}}');
        const name = template.render(userData);

        this.append((new ImageComp('../img/user-default.jpg', [], 'logo')).render());
        this.append((new Block('p', 'Hello, ' + name + '!', ['form-input'], {})).render());
        this.append(new Button('Change avatar', ['btnDiv'], '').render());
        this.append((new Button('Back', ['btnDiv'], 'profileBackBtn')).render());
        document.getElementById('main').appendChild(this.render());

        const profileBackBtn = document.getElementById('profileBackBtn');
        profileBackBtn.addEventListener('click', () => Router.go('/'));
    }
}
