'use strict';

/**
 * Rout class
 * @module Route
 */
export default class Route {
    /**
     * @param {string} path
     * @param {MainComponent} viewClass
     * @constructor
     */
    constructor(path, viewClass) {
        this.path = path;
        this.viewClass = viewClass;
        this.view = null;
    }

    /**
     * Render view
     */
    createView() {
        if (!this.view) {
            this.view = new this.viewClass();
            this.view.build();
        } else {
            this.view.show();
        }
    }

    /**
     * Check, that path of rout === path
     * @param {*}path - path to compare
     * @return {boolean}
     */
    isThisPath(path) {
        return this.path === path;
    }

    /**
     * Get view
     * @return {MainComponent}
     */
    getView() {
        return this.view;
    }
}
