'use strict';

import MainComponent from '../../components/MainComponent/MainComponent.js';
import Button from '../../components/Button/Button.js';
import ImageComp from '../../components/ImageComp/ImageComp.js';
import Block from '../../components/Block/Block.js';
import Router from '../../modules/Router/Router.js';
import Transport from '../../modules/Transport/Trasport.js';
import UserService from '../../Services/UserService/UserService.js';
import Menu from '../../components/Menu/Menu.js';

const logged = {
    buttons: [
        {
            text: 'SingleplayerLogic',
            class: ['main-page__menu__button'],
            id: 'singlePlayerBtn',
            url: '/singleplayer/',
        },
        {
            text: 'MultiplayerLogic',
            class: ['main-page__menu__button'],
            id: 'multiPlayerBtn',
            url: '/multiplayer/',
        },
        {
            text: 'Leaders',
            class: ['main-page__menu__button'],
            id: 'leadersBtn',
            url: '/leaderboard/',
        },
        {
            text: 'Profile',
            class: ['main-page__menu__button'],
            id: 'profileBtn',
            url: '/profile/',
        },
        {
            text: 'About',
            class: ['main-page__menu__button'],
            id: 'aboutBtn',
            url: '/about/',
        },
        // {
        //     text: 'Sign Out',
        //     class: ['main-page__menu__button'],
        //     id: 'signOutBtn',
        //     url: '/',
        // },
    ],
};

const unlogged = {
    buttons: [
        {
            text: 'Play',
            class: ['main-page__menu__button'],
            id: 'singlePlayerBtn',
            url: '/singleplayer/',
        },
        {
            text: 'Sign In',
            class: ['main-page__menu__button'],
            id: 'signInBtn',
            url: '/signin/',
        },
        {
            text: 'Sign Up',
            class: ['main-page__menu__button'],
            id: 'signUpBtn',
            url: '/signup/',
        },
        {
            text: 'About',
            class: ['main-page__menu__button'],
            id: 'aboutBtn',
            url: '/about/',
        },
    ],
};

export default class Main extends MainComponent {
    constructor() {
        super('div', ['main-page__menu'], {});
    }

    build() {
        this.append((new Block('p', 'NEON FIGHT', ['main-page__menu__logo'], {})).render());
        this.append(new Menu(Main.GetData()).render());
        document.getElementById('main').appendChild(this.render());
    }

    static GetData() {
        return UserService.IsLogIn() ? logged : unlogged;
    }

    Rebuild() {
        this.removeItems();
        this.data = Main.GetData();
        console.log(this.data);
        this.build();
    }
}

