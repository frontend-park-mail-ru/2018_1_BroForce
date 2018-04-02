'use strict';

import MainComponent from '../MainComponent/MainComponent.js';
import Input from "../../components/Input/Input.js";
import Button from "../../components/Button/Button.js"

export default class Form extends MainComponent {
    constructor(data) {
        super('form', [], {});

        data.fields.forEach(field => {
            this.append((new Input(field.type, field.id, [field.class], field.placeholder)).render());
        });

        this.backBtn = new Button(data.button.text, 'button', [], data.button.id).render();
        this.append(this.backBtn);

        this.backBtn.addEventListener('click', this.onSubmit());
    }

    isValid() {
        return true
    }

    onSubmit() {
        if (!this.isValid()) {

        }
        // do something
    }
}