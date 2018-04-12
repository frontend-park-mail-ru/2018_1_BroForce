'use strict';

import MainComponent from '../../components/MainComponent/MainComponent.js';
import Block from '../../components/Block/Block.js';
import Input from '../../components/Input/Input.js';
import Button from '../../components/Button/Button.js';
import ImageComp from '../../components/ImageComp/ImageComp.js';
import Router from '../../modules/Router/Router.js';
import UserService from '../../Services/UserService/UserService.js';
import Transport from '../../modules/Transport/Trasport.js';

export default class Profile extends MainComponent {
    constructor() {
        super('div', ['profile'], {style: 'margin-top: 2%'});
    }

    build() {
        const userData = {
            name: UserService.GetUser().login,
            email: UserService.GetUser().email,
        };

        const template = Hogan.compile('{{name}}');
        const name = template.render(userData);

        this.append((new ImageComp('../img/user-default.jpg', [], 'logo')).render());
        this.append((new Block('p', 'Hello, ' + name + '!', ['form-input'], {})).render());
        this.append(new Button('Change avatar', ['btnDiv'], 'changeAvatarBtn').render());

        // this.append(new MainComponent('input', ['form-input', 'profile-input'],
        //     {name: 'changeLoginInput', value: userData.name, placeholder: 'Enter name'}).render());
        // this.append(new MainComponent('input', ['form-input', 'profile-input'],
        //     {name: 'changeEmailInput', value: userData.email, placeholder: 'Enter email'}).render());
        // this.append(new MainComponent('input', ['form-input', 'profile-input'],
        //     {type: 'hidden', id: 'password', name: 'password', placeholder: 'Password'}).render());


        this.append((new Button('Save and quit', ['btnDiv'], 'profileBackBtn')).render());
        document.getElementById('main').appendChild(this.render());

        const profileBackBtn = document.getElementById('profileBackBtn');
        profileBackBtn.addEventListener('click', () => {
            // const newData = [...document.getElementsByClassName('profile-input')];
            //
            // newData.forEach((input) => {
            //     if (input.name === 'changeLoginInput' && input.value !== userData.name) {
            //
            //     }
            //     if (input.name === 'changeEmailInput' && input.value !== userData.email) {
            //
            //     }
            // });

            Router.go('/');
        });
    }
}
