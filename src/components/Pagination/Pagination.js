'use strict';

import MainComponent from '../MainComponent/MainComponent.js';
import Block from '../Block/Block.js';

export default class Pagination extends MainComponent {
    constructor(countOfPages, attrs ={}) {
        super('div', ['pagination'], attrs);

        this.append((new Block('a', '<<', [], {})).render());
        this.append((new Block('a', 1, ['active'], {})).render());
        for (let i = 1; i < countOfPages; i++) {
            this.append((new Block('a', i + 1, [], {})).render());
        }
        this.append((new Block('a', '>>', [], {})).render());
    }

    getNewPage(page, activePage, currentPage, selectedPage) {
        const isNumeric = (n) => !isNaN(parseFloat(n)) && isFinite(n);

        if (isNumeric(selectedPage.textContent)) {
            page.querySelector('.active').classList.remove('active');
            selectedPage.setAttribute('class', 'active');
            currentPage = selectedPage.textContent;
        } else if (selectedPage.textContent === '<<' && activePage - 1 !== 0) {
            page.querySelector('.active').classList.remove('active');
            page.querySelectorAll('a')[activePage - 1].setAttribute('class', 'active');
            currentPage = activePage - 1;
        } else if (selectedPage.textContent === '>>' && activePage + 1 !== 3) {
            page.querySelector('.active').classList.remove('active');
            page.querySelectorAll('a')[activePage + 1].setAttribute('class', 'active');
            currentPage = activePage + 1;
        }

        return currentPage;
    }
}
