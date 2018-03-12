'use strict';
  const Validator = (asArray) => {
      let passwd = null;
      let passwdc = null;
      let errors = [];
      const generateError = (text) => {
        const error = document.createElement('div');
        error.className = 'error';
        error.style.color = 'red';
        error.innerHTML = text;
        return error;
    };

    const checkFieldsPresence = (field) => {
            if (!field.value) {
                errors.push(generateError('field is empty'));
            }
        };

    const checkPasswordMatch = (pswad, paswdc) => {
        if (paswd.value !== paswdc.value) {
            errors.push(generateError('Password doesnt match'));
        }
    };

    const checkEmailCorr = (field) => {
        const reg = /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;
        if (!reg.test(field.value)) {
            errors.push(generateError('Wrong email'));
        }
    };
      for (let value in asArray) {
          switch (value) {
              case 'login': checkFieldsPresence(asArray[value]);
                  break;
              case 'email': checkEmailCorr(asArray[value]); checkFieldsPresence(asArray[value]);
                  break;
              case 'password': checkFieldsPresence(asArray[value]); passwd = value;
                  break;
              case 'passwordconf': checkFieldsPresence(asArray[value]); passwdc = value;
                  break;
              default: ;
          }
      }
      checkPasswordMatch(passwd, passwdc);
      return errors;
};


