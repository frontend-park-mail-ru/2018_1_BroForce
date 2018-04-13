'use strict';

import Route from './Route.js';

/**
 * Router class
 * @module Router
 */
class Router {
    /**
     * @constructor
     * @return {Router|*}
     */
    constructor() {
        if (Router.instance === this) {
            return Router.instance;
        }

        Router.instance = this;

        this.routes =[];
    }

    /**
     * Specify view for path
     * @param {string} path
     * @param {MainComponent} viewClass
     * @return {Router}
     */
    use(path, viewClass) {
        this.routes.push(new Route(path, viewClass));
        return this;
    }

    static getPath() {
        return window.location.pathname.toString().toLowerCase();
    }

    /**
     * Specify Rout for path
     * @param {string} path
     * @return {Route}
     */
    getRoute(path) {
        return this.routes.find((route) => route.isThisPath(path));
    }

    /**
     * Change view for current path
     * @private
     */
    changeView() {
        const route = this.getRoute(Router.getPath());

        if (!route) {
            return;
        }
        this.hideAll();
        route.createView();
    }

    /**
     * Hide all views
     */
    hideAll() {
        this.routes.forEach((route) => {
            if (route.getView()) {
                route.getView().hide();
            }
        });
    }

    /**
     * Change history and view
     * @param {*}path
     */
    go(path) {
        window.history.pushState({}, '', path);
        this.changeView();
    }

    /**
     * Start work of Router
     */
    start() {
        window.addEventListener('popstate', () => this.changeView());
        this.changeView();
    }
}

const router = new Router();
export default router;
