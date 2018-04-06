'use strict';

import MainComponent from '../MainComponent/MainComponent.js';
import Input from '../../components/Input/Input.js';
import Button from '../../components/Button/Button.js';
import Validator from '../../modules/Validator/Valid.js';

export default class Form extends MainComponent {
    constructor(data) {
        super('form', [], {});

        this.classToFind = data.classToFind;

        data.fields.forEach((field) => {
            this.append((new Input(field.type, field.id, field.name, field.class, field.placeholder)).render());
        });

        this.backBtn = new Button(data.button.text, ['btnDiv'], data.button.id).render();
        this.append(this.backBtn);

        this.backBtn.addEventListener('click', this.onSubmit.bind(this));
    }

    isValid() {
        const fields = [...document.getElementsByClassName(this.classToFind)];
        return Validator(fields)[0];
    }

    onSubmit() {
        if (this.isValid() !== undefined) {
            console.log(this.isValid().innerHTML);
        } else {
            console.log('all ok');
        }
     }
}
