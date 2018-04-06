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
        this.errorFields = [...this.render().getElementsByClassName('error')];

        this.inputs.forEach((input, i) => {
                input.addEventListener('blur', () => {
                this.errorFields[i].innerHTML = '';
                input.style.borderColor = 'white';
                input.style.boxShadow = 'none';
                this.isValid([input], [this.errorFields[i]]);
            });
        });
    }

    showErrors(errors, errorFields, inputs) {
        errorFields.forEach((input, i) => {
            errors.forEach((err) => {
                if (input.getAttribute('name') === err.class[1]) {
                    input.innerHTML = err.innerHTML;
                    inputs[i].style.borderColor = '#E8175D';
                    inputs[i].style.boxShadow = '0 0 15px 4px #E8175D';
                }
            });
        });
    }

    isValid(inputs = [], errorFields = []) {
        const fields = [...document.getElementsByClassName(this.classToFind)];
        const errors = Validator(fields);

        if (errors === undefined) {
            return true;
        }

        this.showErrors(errors, errorFields, inputs);

        return false;
    }

    onSubmit() {
        this.isValid(this.inputs, this.errorFields);
    }
}
