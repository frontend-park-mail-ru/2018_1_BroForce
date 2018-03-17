'use strict';

import MainComponent from '../MainComponent/MainComponent.js';
import Block from '../Block/Block.js';

export default class Pagination extends MainComponent {
    constructor(countOfPages, attrs ={}) {
        super('div', ['pagination'], attrs);
        this.countOfPages = countOfPages;
        this.newPage = 1;

        this.initEvents();

        this.append((new Block('a', '<<', [], {})).render());
        this.append((new Block('a', 1, ['active'], {})).render());
        for (let i = 1; i < countOfPages; i++) {
            this.append((new Block('a', i + 1, [], {})).render());
        }
        this.append((new Block('a', '>>', [], {})).render());
    }

    getNewPage(selectedPage) {
        const isNumeric = (n) => !isNaN(parseFloat(n)) && isFinite(n);
        const activePage = parseInt(this.render().querySelector('.active').textContent);

        if (isNumeric(selectedPage.textContent)) {
            this.render().querySelector('.active').classList.remove('active');
            selectedPage.setAttribute('class', 'active');
            this.newPage = selectedPage.textContent;
        } else if (selectedPage.textContent === '<<' && activePage - 1 !== 0) {
            this.changeActive(activePage, -1);
            this.newPage = activePage - 1;
        } else if (selectedPage.textContent === '>>' && activePage + 1 !== this.countOfPages + 1) {
            this.changeActive(activePage, 1);
            this.newPage = activePage + 1;
        }
    }

    initEvents() {
        this.render().addEventListener('click', (event) => {
            const selectedPage = event.srcElement;
            this.getNewPage(selectedPage);
        });
    }

    getCurrentPage() {
        return this.newPage;
    }

    changeActive(page, n) {
        this.render().querySelector('.active').classList.remove('active');
        this.render().querySelectorAll('a')[page + n].setAttribute('class', 'active');
    }
}
