'use strict';

import MainComponent from '../../components/MainComponent/MainComponent.js';
import Block from '../../components/Block/Block.js';
import Input from '../../components/Input/Input.js';
import Button from '../../components/Button/Button.js';
import Pagination from '../../components/Pagination/Pagination.js';
import Router from '../../modules/Router/Router.js';
import Transport from '../../modules/Transport/Trasport.js';
import UserService from '../../Services/UserService/UserService.js';
import * as Hogan from 'hogan.js';

export default class Leaderboard extends MainComponent {
    constructor() {
        super('div', ['leaderboard-page'], {});
        this.usersFromBack = null;
    }

    build() {
        this.usersOnLeaderBoard = 4;
        this.append((new Block('p', 'Leaders', ['menu_title'], {})).render());
        this.GetUsersFromBack(this.usersOnLeaderBoard, 0).catch((response) => {
            console.log(response);
        }).then(() => {
            this.usersTable = new Block('p', this.pagination(this.usersFromBack), ['leaderboard-page__users'], {});
            this.append(this.usersTable.render());
            this.usersOnLeaderboard = new Pagination(this.usersOnLeaderBoard, {});
            this.append(this.usersOnLeaderboard.render());
            this.append(new Button('Back', ['main-page__menu__button'], 'leaderBoardBackBtn').render());
            document.getElementById('main').appendChild(this.render());

            this.initEvents();
        });
    }

    initEvents() {
        this.render().addEventListener('click', () => {
            const currentPage = this.usersOnLeaderboard.getCurrentPage();
            this.GetUsersFromBack(this.usersOnLeaderBoard,
                (currentPage - 1) * this.usersOnLeaderBoard).then(() => {
                this.usersTable.innerHTML(this.pagination(this.usersFromBack));
            });
        });

        const leaderBoardBackBtn = document.getElementById('leaderBoardBackBtn');
        leaderBoardBackBtn.addEventListener('click', () => Router.go('/'));
    }

    GetUsersFromBack(limit, since) {
        return Transport.Get('/stop?limit=' + limit + '&since=' + since).then((response) => {
            this.usersFromBack = response;
        }).catch((response) => {
            if (!response.json) {
                console.log(response);
                return;
            }
            response.json().then((json) => {
                console.log(json);
            });
        });
    }

    pagination(users) {
        const usersOnPage = {'users': []};

        users.forEach((item, i) => {
            const usersFromBack = {};
            usersFromBack.email = users[i].email;
            usersFromBack.name = users[i].login;
            usersFromBack.score = users[i].scoreS;
            usersOnPage.users.push(usersFromBack);
        });

        const template = Hogan.compile('{{#users}} {{name}}! - {{score}}<br/> {{/users}}');
        return template.render(usersOnPage);
    }
}
