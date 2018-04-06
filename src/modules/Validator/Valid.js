'use strict';

const Validator = (asArray) => {
    let passwd = null;
    let passwdc = null;
    const errors = [];

    const generateError = (text) => {
        const error = document.createElement('div');
        error.className = 'error';
        error.style.color = 'red';
        error.innerHTML = text;

        return error;
    };

    // const checkFieldsPresence = (field) => {
    //     if (!field.value) {
    //         errors.push(generateError('Field is empty'));
    //     }
    // };

    const checkFieldsPresenceBool = (field) => {
        return field.value;
    };

    const checkLoginCorrect = (field) => {
        if (!checkFieldsPresenceBool(field)) {
            errors.push(generateError('Login field is empty'));
            return;
        }

        if (field.value.length < 4) {
            errors.push(generateError('Login is too short'));
        }
    };

    const checkEmailCorr = (field) => {
        if (!checkFieldsPresenceBool(field)) {
            errors.push(generateError('Email field is empty'));
            return;
        }
        const reg = /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;

        if (!reg.test(field.value)) {
            errors.push(generateError('Wrong email'));
        }
    };

    const checkPasswordCorrect = (field) => {
        if (!checkFieldsPresenceBool(field)) {
            errors.push(generateError('Password field is empty'));
            return;
        }
        if (field.value.length < 6) {
            errors.push(generateError('Password is too short'));
            return;
        }
        if (field.value.length > 15) {
            errors.push(generateError('Password is too long'));
        }
    };

    const checkPasswordMatch = (paswd, paswdc) => {
        if (paswd.value !== paswdc.value) {
            errors.push(generateError('Password doesn\'t match'));
        }
    };

    for (let property in asArray) {
        switch (asArray[property].name) {
            case 'login':
                // checkFieldsPresence(asArray[property]);
                checkLoginCorrect(asArray[property]);
                break;
            case 'email':
                checkEmailCorr(asArray[property]);
                // checkFieldsPresence(asArray[property]);
                break;
            case 'password':
                // checkFieldsPresence(asArray[property]);
                checkPasswordCorrect(asArray[property]);
                passwd = asArray[property];
                break;
            case 'passwordConfirm':
                // checkFieldsPresence(asArray[property]);
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
