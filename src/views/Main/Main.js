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
            text: 'Singleplayer',
            class: ['btnDiv'],
            id: 'singlePlayerBtn',
            url: '/singleplayer/',
        },
        {
            text: 'Multiplayer',
            class: ['btnDiv'],
            id: 'multiPlayerBtn',
            url: '/multiplayer/',
        },
        {
            text: 'Leaders',
            class: ['btnDiv'],
            id: 'leadersBtn',
            url: '/leaderboard/',
        },
        {
            text: 'Profile',
            class: ['btnDiv'],
            id: 'profileBtn',
            url: '/profile/',
        },
        {
            text: 'About',
            class: ['btnDiv'],
            id: 'aboutBtn',
            url: '/about/',
        },
        {
            text: 'Sign Out',
            class: ['btnDiv'],
            id: 'signOutBtn',
            url: '/',
        },
    ],
};

const unlogged = {
    buttons: [
        {
            text: 'Play',
            class: ['btnDiv'],
            id: 'singlePlayerBtn',
            url: '/singleplayer/',
        },
        {
            text: 'Sign In',
            class: ['btnDiv'],
            id: 'signInBtn',
            url: '/signin/',
        },
        {
            text: 'Sign Up',
            class: ['btnDiv'],
            id: 'signUpBtn',
            url: '/signup/',
        },
        {
            text: 'About',
            class: ['btnDiv'],
            id: 'aboutBtn',
            url: '/about/',
        },
    ],
};

export default class Main extends MainComponent {
    constructor() {
        super('div', ['menu'], {});
    }

    build() {
        this.append((new Block('p', 'NEON LIGHT', ['menu-logo'], {})).render());
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
