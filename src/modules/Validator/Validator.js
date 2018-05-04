'use strict';

/**
 * Module with validation for forms
 * @module Validator
 * @param {*}asArray - array with inputs
 * @return {*}
 */
const Validator = (asArray) => {
    let passwd = null;
    let passwdc = null;
    const errors = [];

    /**
     * Generate errors for response
     * @param {string} text - text of error
     * @param {string} errorType - type of error (login, email, password, passwordConfirm)
     * @return {HTMLDivElement}
     */
    const generateError = (text, errorType) => {
        const error = document.createElement('div');
        error.class = ['error', errorType];
        error.style.color = 'red';
        error.innerHTML = text;

        return error;
    };

    /**
     * Check filed for void
     * @param {*} field
     * @return {*}
     */
    const checkFieldsPresenceBool = (field) => {
        return field.value;
    };

    /**
     * Check login correct
     * @param {*} field
     */
    const checkLoginCorrect = (field) => {
        if (!checkFieldsPresenceBool(field)) {
            errors.push(generateError('Field is empty', 'login'));
            return;
        }

        if (field.value.length < 3) {
            errors.push(generateError('Login is too short', 'login'));
        }
    };

    /**
     * Check email correct
     * @param {*} field
     */
    const checkEmailCorr = (field) => {
        if (!checkFieldsPresenceBool(field)) {
            errors.push(generateError('Field is empty', 'email'));
            return;
        }
        const reg = /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;

        if (!reg.test(field.value)) {
            errors.push(generateError('Wrong email', 'email'));
        }
    };

    /**
     * Check password correct
     * @param {*} field
     */
    const checkPasswordCorrect = (field) => {
        if (!checkFieldsPresenceBool(field)) {
            errors.push(generateError('Field is empty', 'password'));
            return;
        }
        if (field.value.length < 8) {
            errors.push(generateError('Password is too short', 'password'));
            return;
        }
        if (field.value.length > 20) {
            errors.push(generateError('Password is too long', 'password'));
        }
    };

    /**
     * Check equality of password and password confirm
     * @param {*} paswd
     * @param {*} paswdc
     */
    const checkPasswordMatch = (paswd, paswdc) => {
        if (paswd.value !== paswdc.value) {
            errors.push(generateError('Password doesn\'t match', 'passwordConfirm'));
        }
    };

    /**
     * Check password confirm correct
     * @param {*} field
     */
    const checkPasswordConfirm = (field) => {
        if (!checkFieldsPresenceBool(field)) {
            errors.push(generateError('Field is empty', 'passwordConfirm'));
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
                checkPasswordConfirm(asArray[property]);
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
