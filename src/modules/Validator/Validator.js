'use strict';

const Validator = (asArray) => {
    let passwd = null;
    let passwdc = null;
    const errors = [];

    const generateError = (text, errorType) => {
        const error = document.createElement('div');
        error.class = ['error', errorType];
        error.style.color = 'red';
        error.innerHTML = text;

        return error;
    };

    const checkFieldsPresenceBool = (field) => {
        return field.value;
    };

    const checkLoginCorrect = (field) => {
        if (!checkFieldsPresenceBool(field)) {
            errors.push(generateError('Login field is empty', 'login'));
            return;
        }

        if (field.value.length < 3) {
            errors.push(generateError('Login is too short', 'login'));
        }
    };

    const checkEmailCorr = (field) => {
        if (!checkFieldsPresenceBool(field)) {
            errors.push(generateError('Email field is empty', 'email'));
            return;
        }
        const reg = /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;

        if (!reg.test(field.value)) {
            errors.push(generateError('Wrong email', 'email'));
        }
    };

    const checkPasswordCorrect = (field) => {
        if (!checkFieldsPresenceBool(field)) {
            errors.push(generateError('Password field is empty', 'password'));
            return;
        }
        if (field.value.length < 6) {
            errors.push(generateError('Password is too short', 'password'));
            return;
        }
        if (field.value.length > 15) {
            errors.push(generateError('Password is too long', 'password'));
        }
    };

    const checkPasswordMatch = (paswd, paswdc) => {
        if (paswd.value !== paswdc.value) {
            errors.push(generateError('Password doesn\'t match', 'passwordConfirm'));
        }
    };

    for (let property in asArray) {
        switch (asArray[property].name) {
            case 'login':
                checkLoginCorrect(asArray[property]);
                break;
            case 'email':
                checkEmailCorr(asArray[property]);
                break;
            case 'password':
                checkPasswordCorrect(asArray[property]);
                passwd = asArray[property];
                break;
            case 'passwordConfirm':
                passwdc = asArray[property];
                break;
            default:
                break;
        }
    }

    if (passwd && passwdc && passwd.value.length !== 0) {
        checkPasswordMatch(passwd, passwdc);
    }

    return errors;
};

export default Validator;
