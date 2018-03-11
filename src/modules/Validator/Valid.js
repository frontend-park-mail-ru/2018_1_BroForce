'use strict';

  const Validator = (asArray) => {
      generateError:(text) => {
        let error = document.createElement('div');
        error.className = 'error';
        error.style.color = 'red';
        error.innerHTML = text;
        return error;
    };

    checkFieldsPresence:(field) => {
            if (!field.value) {
                let error = generateError('field is empty');
            }
        };

    checkPasswordMatch:(pswad, paswdc) => {
        if (paswd.value !== paswdc.value) {
            let error = generateError('Password doesnt match');
        }
    };

    checkEmailCorr:(field) => {
        const reg = /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;
        if (!reg.test(field.value)) {
            let error = generateError('Wrong email');
        }
    };
      for (let value in asArray) {
          switch (asArray) {
              case 'login': checkFieldsPresence(asArray[value]);
              case 'email': {checkEmailCorr(asArray[value]); checkFieldsPresence(asArray[value]);}
              case 'password': {checkFieldsPresence(asArray[value]); const passwd = asArray[value];}
              case 'passwordconf': {checkFieldsPresence(asArray[value]); const passwdc = asArray[value];}
              default: ;
          }
      }
      checkPasswordMatch(passwd, passwdc);
};


