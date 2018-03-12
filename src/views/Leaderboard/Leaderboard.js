'use strict';

import MainComponent from '../../components/MainComponent/MainComponent.js';
import Block from '../../components/Block/Block.js';
import Input from '../../components/Input/Input.js';
import Button from '../../components/Button/Button.js';
import Pagination from '../../components/Pagination/Pagination.js'

export default class SignIn extends MainComponent {
    constructor() {
        super('table', ['menu'], {});
    }

    build() {
        let users = {'users': [
                {
                    'email': 'arthurunique24@gmail.com',
                    'name': 'Arthur',
                    'score': '15000',
                },
                {
                    'email': 'bigPapa@gmail.com',
                    'name': 'Papa',
                    'score': '100500',
                },
                {
                    'email': 'master@gmail.com',
                    'name': 'master',
                    'score': '125000',
                },
                {
                    'email': 'lol@mail.ru',
                    'name': 'Lol',
                    'score': '100',
                },
            ]};

        this.append((new Block('p', this.pagination(users, 0, 2), ['menu-input'], {})).render());
        this.append((new Pagination(2, {style: 'margin-top: 60px', id: 'leaderboardpagination'}).render()));
        document.getElementById('main').appendChild(this.render());

        const page = document.querySelector('.pagination');
        page.addEventListener('click', (event) => {
            console.log(event.srcElement.textContent);
            this.remove();

            this.append((new Block('p', this.pagination(users, event.srcElement.textContent - 1, 2), ['menu-input'], {})).render());
            this.append((new Pagination(2, {style: 'margin-top: 90px', id: 'leaderboardpagination'}).render()));
            document.getElementById('main').appendChild(this.render());
        })

    }

    pagination(users, page, countOf) {
        const usersOnPage = {'users': []};
        usersOnPage.users = users.users.slice(page * countOf, countOf + page * countOf);

        const template = Hogan.compile('{{#users}} - {{name}}! - {{score}} <br/> {{/users}}');
        const output = template.render(usersOnPage);

        return output;
    }
}
