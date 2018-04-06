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
    }

    isValid(inputs = [], errorField = []) {
        const fields = [...document.getElementsByClassName(this.classToFind)];
        const result = Validator(fields);

        if (result !== undefined) {
            for (let input in errorField) {
                for (let err in result) {
                    if (errorField[input].getAttribute('name') === result[err].class[1]) {
                        errorField[input].style.color = '#E8175D';
                        errorField[input].style.marginLeft = '5%';
                        errorField[input].style.marginBottom = '2%';
                        errorField[input].style.animation = 'neon-text 1s infinite alternate';
                        errorField[input].innerHTML = result[err].innerHTML;
                        inputs[input].style.borderColor = '#E8175D';
                        inputs[input].style.boxShadow = '0 0 15px 4px #E8175D';
                    }
                }
            }
        }
    }

    onSubmit() {
        const inputs = [...document.getElementsByClassName(this.classToFind)];
        const errorField = [...document.getElementsByClassName('error')];

        for (let i in inputs) {
            inputs[i].addEventListener('blur', () => {
                errorField[i].innerHTML = '';
                inputs[i].style.borderColor = 'white';
                inputs[i].style.boxShadow = 'none';
                this.isValid(inputs, errorField);
            });
        }
        this.isValid(inputs, errorField);
     }
}
