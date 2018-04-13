'use strict';

/**
 * Basic class of components
 * @module MainComponent
 */

export default class MainComponent {
    /**
     * @param {string} [tagName='div'] - tagName of element
     * @param {*} [classes=[]] - object with classes of element
     * @param {*} [attrs={}] - object with element data
     * @constructor
     */
    constructor(tagName = 'div', classes = [], attrs = {}) {
        this.element = document.createElement(tagName);
        classes.forEach((className) => {
            this.element.classList.add(className);
        });
        for (let name in attrs) {
            this.element.setAttribute(name, attrs[name]);
        }
    }

    /**
     * Return element
     * @return {HTMLElement}
     */
    render() {
        return this.element;
    }

    /**
     * Hide element
     */
    hide() {
        this.element.style.display = 'none';
    }

    /**
     * Show element
     */
    show() {
        this.element.style.display = 'block';
    }

    /**
     * remove element
     */
    remove() {
        this.element.parentElement.removeChild(this.element);
    }

    /**
     * Remove element child items
     */
    removeItems() {
        while (this.element.firstChild) {
            this.element.removeChild(this.element.firstChild);
        }
    }

    /**
     * Set html
     * @param {*} html
     * @private
     */
    innerHTML(html) {
        this.element.innerHTML = html;
    }

    /**
     * Append items into element
     * @param {HTMLElement} element
     */
    append(element) {
        this.element.appendChild(element);
    }
}
