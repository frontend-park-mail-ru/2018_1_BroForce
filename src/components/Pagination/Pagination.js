'use strict';

import MainComponent from '../MainComponent/MainComponent.js';
import Block from '../Block/Block.js';

export default class Pagination extends MainComponent {
    constructor(countOfPages, attrs ={}) {
        super('div', ['leaderboard-page__pagination'], attrs);
        this.countOfPages = countOfPages;
        this.currentPage = 1;

        this.initEvents();

        this.append((new Block('a', '<<', ['leaderboard-page__pagination_arrow'], {})).render());
        this.append((new Block('a', 1, ['leaderboard-page__pagination_active', 'leaderboard-page__pagination_leaf'], {})).render());
        for (let i = 1; i < this.countOfPages; i++) {
            this.append((new Block('a', i + 1, ['leaderboard-page__pagination_leaf'], {})).render());
        }
        this.append((new Block('a', '>>', ['leaderboard-page__pagination_arrow'], {})).render());
    }

    getNewPage(selectedPage) {
        const isNumeric = (n) => !isNaN(parseFloat(n)) && isFinite(n);

        if (isNumeric(selectedPage)) {
            this.changeActive(selectedPage);
            this.currentPage = +selectedPage;
        } else if (selectedPage === '<<' && this.currentPage - 1 !== 0) {
            this.changeActive(--this.currentPage);
        } else if (selectedPage === '>>' && this.currentPage + 1 !== this.countOfPages + 1) {
            this.changeActive(++this.currentPage);
        }
    }

    initEvents() {
        this.render().addEventListener('click', (event) => this.getNewPage(event.srcElement.textContent));
    }

    getCurrentPage() {
        return this.currentPage;
    }

    changeActive(page) {
        this.render().querySelector('.leaderboard-page__pagination_active').classList.remove('leaderboard-page__pagination_active');
        this.render().querySelectorAll('a')[page].setAttribute('class', 'leaderboard-page__pagination_active');
    }
}
