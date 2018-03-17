'use strict';

import MainComponent from '../MainComponent/MainComponent.js';
import Block from '../Block/Block.js';

export default class Pagination extends MainComponent {
    constructor(countOfPages, attrs ={}) {
        super('div', ['pagination'], attrs);
        this.countOfPages = countOfPages;
        this.currentPage = 1;

        this.initEvents();

        this.append((new Block('a', '<<', [], {})).render());
        this.append((new Block('a', 1, ['active'], {})).render());
        for (let i = 1; i < this.countOfPages; i++) {
            this.append((new Block('a', i + 1, [], {})).render());
        }
        this.append((new Block('a', '>>', [], {})).render());
    }

    getNewPage(selectedPage) {
        const isNumeric = (n) => !isNaN(parseFloat(n)) && isFinite(n);

        if (isNumeric(selectedPage.textContent)) {
            this.changeActive(selectedPage.textContent);
            this.currentPage = parseInt(selectedPage.textContent);
        } else if (selectedPage.textContent === '<<' && this.currentPage - 1 !== 0) {
            this.changeActive(--this.currentPage);
        } else if (selectedPage.textContent === '>>' && this.currentPage + 1 !== this.countOfPages + 1) {
            this.changeActive(++this.currentPage);
        }
    }

    initEvents() {
        this.render().addEventListener('click', (event) => this.getNewPage(event.srcElement));
    }

    getCurrentPage() {
        return this.currentPage;
    }

    changeActive(page) {
        this.render().querySelector('.active').classList.remove('active');
        this.render().querySelectorAll('a')[page].setAttribute('class', 'active');
    }
}
