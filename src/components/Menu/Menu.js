'use strict';

import MainComponent from '../MainComponent/MainComponent.js';
import Button from '../Button/Button.js';
import Router from '../../modules/Router/Router.js';
import UserService from '../../Services/UserService.js';

export default class Menu extends MainComponent {
    constructor(data) {
        super('div', [], {});
        this.data = data;

        this.Build();
    }

    Build() {
        this.data.buttons.forEach((item) => {
            const button = new Button(item.text, [item.class], item.id).render();

            button.addEventListener('click', () => Router.go(item.url));

            if (item.url === '/') {
                button.addEventListener('click', () => {
                    UserService.LogOut();
                    UserService.GetData().catch((response) => {
                        console.log(response);
                    }).then(() => {
                        Router.getRoute('/').getView().Rebuild();
                    });
                });
            }

            this.append(button);
        });
    }
}
