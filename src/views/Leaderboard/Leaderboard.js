'use strict';

import MainComponent from '../../components/MainComponent/MainComponent.js';
import Block from '../../components/Block/Block.js';
import Input from '../../components/Input/Input.js';
import Button from '../../components/Button/Button.js';
import Pagination from '../../components/Pagination/Pagination.js';
import Router from '../../modules/Router/Router.js';
import Transport from '../../modules/Transport/Trasport.js';
import UserService from '../../Services/UserService.js';

export default class Leaderboard extends MainComponent {
    constructor() {
        super('div', ['leaderBoard'], {});
        this.usersFromBack = null;
    }

    build() {
        const usersOnLeaderBoard = 2;

        this.GetUsersFromBack(usersOnLeaderBoard, 0).catch((response) => {
            console.log(response);
        }).then(() => {
            const usersTable = new Block('p', this.pagination(this.usersFromBack), [], {});
            this.append(usersTable.render());
            const pagination = new Pagination(usersOnLeaderBoard, {});
            this.append(pagination.render());
            this.append(new Button('Back', ['btnDiv'], 'leaderBoardBackBtn').render());
            document.getElementById('main').appendChild(this.render());

            this.render().addEventListener('click', () => {
                const currentPage = pagination.getCurrentPage();
                this.GetUsersFromBack(usersOnLeaderBoard, currentPage * 2 - 2).catch((response) => {
                    console.log(response);
                }).then(() => {
                    usersTable.innerHTML(this.pagination(this.usersFromBack));
                });
            });

            const leaderBoardBackBtn = document.getElementById('leaderBoardBackBtn');
            leaderBoardBackBtn.addEventListener('click', () => Router.go('/'));
        });
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
            usersFromBack.score = users[i].sscore;
            usersOnPage.users.push(usersFromBack);
        });

        const template = Hogan.compile('{{#users}} {{name}}! - {{score}}<br/> {{/users}}');
        return template.render(usersOnPage);
    }
}
