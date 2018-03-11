'use strict';

  const Validator = (asArray) => {
      let passwd = null;
      let passwdc = null;
      let errors = [];
      let generateError = (text) => {
        let error = document.createElement('div');
        error.className = 'error';
        error.style.color = 'red';
        error.innerHTML = text;
        return error;
    };

    let checkFieldsPresence = (field) => {
            if (!field.value) {
                errors.push(generateError('field is empty'));
            }
        };

    let checkPasswordMatch = (pswad, paswdc) => {
        if (paswd.value !== paswdc.value) {
            errors.push(generateError('Password doesnt match'));
        }
    };

    let checkEmailCorr = (field) => {
        const reg = /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;
        if (!reg.test(field.value)) {
            errors.push(generateError('Wrong email'));
        }
    };
      for (let value in asArray) {
          switch (asArray[value]) {
              case 'login': checkFieldsPresence(value);
              case 'email': {checkEmailCorr(value); checkFieldsPresence(value);}
              case 'password': {checkFieldsPresence(value); passwd = value;}
              case 'passwordconf': {checkFieldsPresence(value); passwdc = value;}
              default: ;
          }
      }
      checkPasswordMatch(passwd, passwdc);
      return errors;
};


