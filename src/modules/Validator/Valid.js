'use strict';

let form = document.querySelector('.formWithValidation');
let email = form.querySelector('.email');
let password = form.querySelector('.password');
let passwordConfirmation = form.querySelector('.passwordConfirmation');
let fields = form.querySelectorAll('.field');


let generateError = function(text) {
    let error = document.createElement('div');
    error.className = 'error';
    error.style.color = 'red';
    error.innerHTML = text;
    return error;
};

let removeValidation = function() {
    let errors = form.querySelectorAll('.error');

    for (let i = 0; i < errors.length; i++) {
        errors[i].remove();
    }
};


let checkFieldsPresence = function() {
    for (let i = 0; i < fields.length; i++) {
        if (!fields[i].value) {
            let error = generateError('field is empty');
            form[i].parentElement.insertBefore(error, fields[i]);
        }
    }
};

let checkPasswordMatch = function() {
    if (password.value !== passwordConfirmation.value) {
        let error = generateError('Password doesnt match');
        password.parentElement.insertBefore(error, password);
    }
};

let checkEmailCorr = function() {
    let reg = /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;
    if (!reg.test(email.value)) {
        let error = generateError('Wrong email');
        email.parentElement.insertBefore(error, email);
    }
};

form.addEventListener('submit', function(event) {
    event.preventDefault();

    removeValidation();

    checkFieldsPresence();

    console.log(email.innerHTML);

    checkEmailCorr();

    checkPasswordMatch();
});

