'use strict';

import MainComponent from '../../components/MainComponent/MainComponent.js';
import Block from '../../components/Block/Block.js';
import Input from '../../components/Input/Input.js';
import Button from '../../components/Button/Button.js';
import Pagination from '../../components/Pagination/Pagination.js';
import Router from "../../modules/Router/Router.js";

export default class Leaderboard extends MainComponent {
    constructor() {
        super('table', ['leaderBoard'], {});
    }

    build() {
        const users = {'users': [
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

        const usersTable = new Block('p', this.pagination(users, 0, 2), ['leaderBoard-input'], {});
        this.append(usersTable.render());
        const pagination = new Pagination(2, {});
        this.append(pagination.render());
        this.append((new Button('Back', 'button', ['leaderBoard-input'], 'leaderBoardBackBtn').render()));
        document.getElementById('main').appendChild(this.render());

        this.render().addEventListener('click', () => {
            const currentPage = pagination.getCurrentPage();
            usersTable.innerHTML(this.pagination(users, currentPage - 1, 2));
        });

        const leaderBoardBackBtn = document.getElementById('leaderBoardBackBtn');
        leaderBoardBackBtn.addEventListener('click', () => Router.go('/'));
    }

    pagination(users, page, countOf) {
        const usersOnPage = {'users': []};
        usersOnPage.users = users.users.slice(page * countOf, countOf + page * countOf);

        const template = Hogan.compile('{{#users}}-{{name}}! - {{score}}<br/> {{/users}}');
        const output = template.render(usersOnPage);

        return output;
    }
}
