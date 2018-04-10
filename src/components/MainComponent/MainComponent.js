'use strict';

export default class MainComponent {
    constructor(tagName = 'div', classes = [], attrs = {}) {
        this.element = document.createElement(tagName);
        classes.forEach((className) => {
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

    removeItems() {
        while (this.element.firstChild) {
            this.element.removeChild(this.element.firstChild);
        }
    }

    innerHTML(html) {
        this.element.innerHTML = html;
    }

    append(element) {
        this.element.appendChild(element);
    }
}
