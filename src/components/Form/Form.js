'use strict';

import MainComponent from '../MainComponent/MainComponent.js';
import Input from '../../components/Input/Input.js';
import Button from '../../components/Button/Button.js';
import Validator from '../../modules/Validator/Validator.js';

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
            const result = this.isValid().class[1];
            const errText = this.isValid().innerHTML;
            let itIsPassword = false;

            const fields = [...document.getElementsByClassName(this.classToFind)];
            for (let input in fields) {
                if (fields[input].name === result) {
                    fields[input].style.background = 'red';
                    if (fields[input].type === 'password') {
                        fields[input].type = 'text';
                        itIsPassword = true;
                    }
                    const value = fields[input].value;
                    fields[input].value = errText;
                    setTimeout(function() {
                        if (itIsPassword === true) {
                            fields[input].type = 'password';
                        }
                        fields[input].style.background = 'white';
                        fields[input].value = value;
                    }, 1000);
                }
            }
        }

        // Do something
     }
}
