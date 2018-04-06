'use strict';

import MainComponent from '../MainComponent/MainComponent.js';
import Input from '../../components/Input/Input.js';
import Button from '../../components/Button/Button.js';
import Validator from '../../modules/Validator/Validator.js';
import Block from '../Block/Block.js';

export default class Form extends MainComponent {
    constructor(data) {
        super('form', [], {});

        this.classToFind = data.classToFind;

        data.fields.forEach((field) => {
            this.append(new Block('div', '', ['error'], {name: field.name}).render());
            this.append(new Input(field.type, field.id, field.name, field.class, field.placeholder).render());
        });

        this.backBtn = new Button(data.button.text, ['btnDiv'], data.button.id).render();
        this.append(this.backBtn);

        this.backBtn.addEventListener('click', this.onSubmit.bind(this));

        this.inputs = [...this.render().getElementsByClassName(this.classToFind)];
        this.errorField = [...this.render().getElementsByClassName('error')];

        this.inputs.forEach((input, i) => {
                input.addEventListener('blur', () => {
                this.errorField[i].innerHTML = '';
                input.style.borderColor = 'white';
                input.style.boxShadow = 'none';
                this.isValid([input], [this.errorField[i]]);
            });
        });
    }

    isValid(inputs = [], errorField = []) {
        const fields = [...document.getElementsByClassName(this.classToFind)];
        const result = Validator(fields);

        if (result !== undefined) {
            errorField.forEach((input, i) => {
                result.forEach((err) => {
                    if (input.getAttribute('name') === err.class[1]) {
                        input.style.color = '#E8175D';
                        input.style.marginLeft = '5%';
                        input.style.marginBottom = '2%';
                        input.style.animation = 'neon-text 1s infinite alternate';
                        input.innerHTML = err.innerHTML;
                        inputs[i].style.borderColor = '#E8175D';
                        inputs[i].style.boxShadow = '0 0 15px 4px #E8175D';
                    }
                });
            });
        }
    }

    onSubmit() {
        this.isValid(this.inputs, this.errorField);
     }
}
