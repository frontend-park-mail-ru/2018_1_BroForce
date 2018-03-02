'use strict';

import Route from './Route.js';

export default class Router {
    constructor() {
        if (Router.instance === this) {
            return Router.instance;
        }

        Router.instance = this;

        this.routes =[];
    }

    use(path, viewClass) {
        this.routes.push(new Route(path, viewClass));
        return this;
    }

    static getPath() {
        return window.location.pathname.toString().toLowerCase();
    }

    getRoute(path) {
        return this.routes.find(route => route.isThisPath(path));
    }

    changeView() {
        const route = this.getRoute(Router.getPath());

        if (!route) {
            return;
        }
        this.hideAll();
        route.createView();
    }

    hideAll() {
        this.routes.forEach(route => {
            if (route.getView()) {
                route.getView().hide();
            }
        })
    }

    // change history and view
    go(path) {
        window.history.pushState({}, '', path);
        this.changeView();
    }

    start() {
        window.addEventListener('popstate', () => this.changeView());
        this.changeView();
    }
}
