'use strict';

class MainComponent {
    constructor(tagName = 'div', classes = [], attrs = {}) {
        this.element = document.createElement(tagName);
        classes.forEach(function (className) {
            this.element.classList.add(className);
        });
        for (let name in attrs) {
            this.element.setAttribute(name, attrs[name]);
        }
    }

    render() {
        return this.element;
    }

    hide() {
        this.element.style.display = 'none';
    }

    show() {
        this.element.style.display = 'block';
    }

    remove() {
        this.element.parentElement.removeChild(this.element);
    }
}
