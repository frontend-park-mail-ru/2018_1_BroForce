'use strict';

import Route from './Route.js';

export default class Router {
    constructor() {
        this.routes =[];
    }

    use(path, viewClass) {
        this.routes.push(new Route(path, viewClass));
        // this.routes.pop().createView();
    }

    static getPath() {
        return window.location.pathname.toString().toLowerCase();
    }

    getRoute(path) {
        return this.routes.find((route) => {
            return route.isThisPath(path);
        });
    }

    changeView() {
        console.log(Router.getPath());
        const route = this.getRoute(Router.getPath());
        console.log('Route', route);

        if (!route) {
            return;
        }

        route.createView();
    }

    // меняет историю, и переходит по урлу
    go(path) {
        window.history.pushState({}, '', path);
        this.changeView();
        // this.metod(); // не должно быть
    }

    // запускает обработчик событий, чтобы автоматически работало
    start() {
        console.log('Start');
        window.addEventListener('popstate', () => {
            console.log('In event Listener');
            return this.changeView();
        });
        this.changeView();
    }
}
