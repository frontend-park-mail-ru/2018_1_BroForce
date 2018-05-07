'use strict';

import MainComponent from '../MainComponent/MainComponent.js';
import Button from '../Button/Button.js';
import Router from '../../modules/Router/Router.js';
import UserService from '../../Services/UserService/UserService.js';
import Game from '../../views/Game/GameLogic.js';

export default class Menu extends MainComponent {
    constructor(data) {
        super('div', ['menu_buttons'], {});
        this.data = data;

        this.Build();
    }

    Build() {
        this.data.buttons.forEach((item) => {
            const button = new Button(item.text, [item.class], item.id).render();

            if (item.url === '/singleplayer/') {
                console.log('fuk');
                button.addEventListener('click', () => {
                    console.log('keeeek');
                    Router.go(item.url);
                    new Game().Start();
                });
                this.append(button);
                return;
            }

            button.addEventListener('click', () => Router.go(item.url));

            if (item.url === '/') {
                button.addEventListener('click', () => {
                    UserService.LogOut().then(() => {
                        Router.getRoute('/').getView().Rebuild();
                    });
                });
            }

            this.append(button);
        });
    }
}
