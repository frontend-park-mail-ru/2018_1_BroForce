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
            this.append(new Button(item.text, [item.class], item.id).render());
        });
        setTimeout(() => {
            this.data.buttons.forEach((item) => {
                if (item.url === '/') {
                    document.getElementById(item.id).addEventListener('click', () => {
                        UserService.LogOut();
                        UserService.GetData().catch((response) => {
                            console.log(response);
                        }).then(() => {
                            console.log('rebuild');
                            this.Rebuild();
                        });
                    });
                }
                document.getElementById(item.id).addEventListener('click', () => Router.go(item.url));
            });
        }, 100);
    }

    Rebuild() {
        this.remove();
        this.Build();
    }
}
