'use strict';

class Validator {
    constructor(formWVpm, emailpm, passwdpm, passwdCpm, fieldpm) {
        this.form = document.querySelector(formWVpm);
        this.email = this.form.querySelector(emailpm);
        this.password = this.form.querySelector(passwdpm);
        this.passwordConfirmation = this.form.querySelector(passwdCpm);
        this.fields = this.form.querySelectorAll(fieldpm);
    }

    static generateError(text) {
        let error = document.createElement('div');
        error.className = 'error';
        error.style.color = 'red';
        error.innerHTML = text;
        return error;
    }

    static removeValidation() {
        let errors = this.form.querySelectorAll('.error');

        for (let i = 0; i < errors.length; i++) {
            errors[i].remove();
        }
    }


    checkFieldsPresence() {
        for (let i = 0; i < this.fields.length; i++) {
            if (!this.fields[i].value) {
                let error = this.generateError('field is empty');
                this.form[i].parentElement.insertBefore(error, this.fields[i]);
            }
        }
    }

    checkPasswordMatch() {
        if (this.password.value !== this.passwordConfirmation.value) {
            let error = this.generateError('Password doesnt match');
            this.password.parentElement.insertBefore(error, this.password);
        }
    }

    checkEmailCorr() {
        const reg = /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;
        if (!reg.test(this.email.value)) {
            let error = this.generateError('Wrong email');
            this.email.parentElement.insertBefore(error, this.email);
        }
    }

    check() {
        this.removeValidation();

        this.checkFieldsPresence();

        this.checkEmailCorr();

        this.checkPasswordMatch();

        this.form.addEventListener('submit', function(event) {
            event.preventDefault();
            const valid = new Validator();
            valid.check();
        });
    }
}


