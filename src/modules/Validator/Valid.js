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

    const checkFieldsPresence = (field) => {
            if (!field.value) {
                errors.push(generateError('field is empty'));
            }
        };

    const checkPasswordMatch = (paswd, paswdc) => {
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
      for (let property in asArray) {
          switch (property) {
              case 'login': checkFieldsPresence(asArray[property]);
                  break;
              case 'email': checkEmailCorr(asArray[property]); checkFieldsPresence(asArray[property]);
                  break;
              case 'password': checkFieldsPresence(asArray[property]); passwd = asArray[property];
                  break;
              case 'passwordconf': checkFieldsPresence(asArray[property]); passwdc = asArray[property];
                  break;
              default: ;
          }
      }
      if (passwd && passwdc) {
          checkPasswordMatch(passwd, passwdc);
      }
      return errors;
};
export default Validator;
