'use strict';

export default class Route {
    constructor(path, viewClass) {
        this.path = path;
        this.viewClass = viewClass;
        this.view = null;
    }

    createView() {
        if (!this.view) {
            this.view = new this.viewClass();
            this.view.build();
        } else {
            this.view.show();
        }
    }

    isThisPath(path) {
        return this.path === path;
    }

    getView() {
        return this.view;
    }
}
