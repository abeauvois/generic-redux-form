'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Constants = {
  ERROR: 'ERROR',
  ERROR_REQUIRED: '* Required',
  ERROR_INVALID_EMAIL: 'Invalid Email'
};

// FLOW TYPES


var Validators = {
  noValidation: function noValidation(value) {
    return undefined;
  },
  required: function required(value) {
    return !value ? Constants.ERROR_REQUIRED : undefined;
  },
  email: function email(value) {
    return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? Constants.ERROR_INVALID_EMAIL : undefined;
  }
};

var GenericFormFields = function () {
  function GenericFormFields(formName, fieldsList) {
    _classCallCheck(this, GenericFormFields);

    this.formName = formName;
    this._setFields(fieldsList);
  }

  _createClass(GenericFormFields, [{
    key: '_setFields',
    value: function _setFields(fieldsList) {
      this.fieldsList = fieldsList || this.fieldsList;
      this.fieldsListKeys = Object.keys(this.fieldsList);
      return this.fieldsListKeys;
    }
  }, {
    key: 'getFormName',
    value: function getFormName() {
      return this.formName;
    }
  }, {
    key: 'getFieldsListKeys',
    value: function getFieldsListKeys() {
      return this.fieldsListKeys;
    }
  }, {
    key: 'getDefaultValues',
    value: function getDefaultValues() {
      var _this = this;

      var formDefaultValues = {};
      this.fieldsListKeys.forEach(function (k) {
        var fieldConfig = _this.fieldsList[k];
        if (!fieldConfig.defaultValue && fieldConfig.type === 'section') {
          (function () {
            var defaultValues = [];
            var inputsKeys = Object.keys(fieldConfig.inputs);
            inputsKeys.forEach(function (input) {
              return defaultValues.push(fieldConfig.inputs[input].defaultValue);
            });
            formDefaultValues[k] = defaultValues;
          })();
        } else {
          formDefaultValues[k] = fieldConfig.defaultValue;
        }
      });
      return formDefaultValues;
    }
  }, {
    key: 'validate',
    value: function validate() {
      var _this2 = this;

      var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var errors = {};
      this.fieldsListKeys.forEach(function (k) {
        errors[k] = _this2.fieldsList[k].validator(values[k]);
      });
      return errors;
    }
  }]);

  return GenericFormFields;
}();

exports.Constants = Constants;
exports.Validators = Validators;
exports.default = GenericFormFields;