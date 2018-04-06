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

    isValid() {
        const fields = [...document.getElementsByClassName(this.classToFind)];
        return Validator(fields)[0];
    }

    onSubmit() {
        if (this.isValid() !== undefined) {
            const result = this.isValid().class[1];
            const errText = this.isValid().innerHTML;
            const fields = [...document.getElementsByClassName('error')];
            const inputs = [...document.getElementsByClassName(this.classToFind)];

            for (let input in fields) {
                if (fields[input].getAttribute('name') === result) {
                    fields[input].style.color = '#E8175D';
                    fields[input].style.marginLeft = '5%';
                    fields[input].style.marginBottom = '2%';
                    fields[input].style.animation = 'neon-text 1s infinite alternate';
                    fields[input].innerHTML = errText;
                    inputs[input].style.borderColor = '#E8175D';
                    inputs[input].style.boxShadow = '0 0 15px 4px #E8175D';

                    setTimeout(function() {
                        fields[input].innerHTML = '';
                        inputs[input].style.borderColor = 'white';
                        inputs[input].style.boxShadow = 'none';
                    }, 3000);
                }
            }
        }

        // Do something
     }
}
