'use strict';

var _index = require('../index.js');

describe('GenericFormFields init', function () {
  var data = {
    email: {
      type: 'input',
      label: 'email',
      validator: _index.Validators.email,
      iconName: 'ios-person',
      defaultValue: 'my@email.com'
    },
    password: {
      type: 'input',
      label: 'password',
      validator: _index.Validators.required,
      iconName: 'ios-lock',
      placeholder: 'PASSWORD',
      defaultValue: 'test'
    }
  };
  var configFormFields = new _index.GenericFormFields('login', data);
  // const names = configFormFields.getFieldsListKeys()
  it('Contains formName after getFormName()', function () {
    expect(configFormFields.getFormName()).toBe('login');
  });
  it('Contains fields keys after getFieldsListKeys()', function () {
    expect(configFormFields.getFieldsListKeys()).toEqual(['email', 'password']);
  });
  it('Contains default fields values after getDefaultValues()', function () {
    var values = configFormFields.getDefaultValues();
    expect(values.email).toBe(data.email.defaultValue);
    expect(values.password).toBe(data.password.defaultValue);
  });
  it('Contains errors after validate({email: "example@dot.com"})', function () {
    var errors = configFormFields.validate({ email: 'example@dot.com' });
    expect(errors.email).toBeFalsy();
    expect(errors.password).toBe(_index.Constants.ERROR_REQUIRED);
  });
  it('Contains errors after validate({email: "example@", password: "toto"})', function () {
    var errors = configFormFields.validate({ email: "example@", password: "toto" });
    expect(errors.email).toBe(_index.Constants.ERROR_INVALID_EMAIL);
    expect(errors.password).toBeFalsy();
  });
});