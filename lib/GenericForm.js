'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gReduxForm = exports.GenericForm = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reduxForm = require('redux-form');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GenericForm = function (_Component) {
  _inherits(GenericForm, _Component);

  function GenericForm(props, context) {
    _classCallCheck(this, GenericForm);

    var _this = _possibleConstructorReturn(this, (GenericForm.__proto__ || Object.getPrototypeOf(GenericForm)).call(this, props));

    if (!context._reduxForm) {
      throw new Error('GenericForm must be inside a component decorated with gReduxForm()');
    }
    _this.submit = _this.submit.bind(_this);
    _this.reset = _this.reset.bind(_this);
    return _this;
  }

  _createClass(GenericForm, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // this.refs.firstField            // the Field
      //   .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
      //   .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
      //   .focus()                // on TextField
    }
  }, {
    key: 'submit',
    value: function submit() {
      console.log('submitted');
    }
  }, {
    key: 'reset',
    value: function reset() {
      console.log('reset');
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.props.genericFormFields) return null;
      var _props = this.props,
          genericFormFields = _props.genericFormFields,
          handleSubmit = _props.handleSubmit,
          pristine = _props.pristine,
          submitting = _props.submitting;

      var names = genericFormFields.fieldsListKeys;
      var FormButtons = genericFormFields.fieldsList['FormButtons'] && genericFormFields.fieldsList['FormButtons'].component;
      return _react2.default.createElement(
        _reduxForm.Form,
        { onSubmit: handleSubmit(this.submit) },
        names.map(function (k) {
          var isMultiple = function isMultiple(l) {
            return l && l.length && l.length > 0;
          }; // OR component.name === 'createMultiple'
          var config = genericFormFields.fieldsList[k];
          var type = config.type,
              label = config.label,
              labels = config.labels,
              inputs = config.inputs,
              iconName = config.iconName,
              labelPosition = config.labelPosition,
              component = config.component,
              description = config.description,
              placeholder = config.placeholder,
              defaultValue = config.defaultValue,
              limits = config.limits,
              onChange = config.onChange,
              validator = config.validator,
              touched = config.touched,
              error = config.error,
              ref = config.ref,
              withRef = config.withRef;


          if (type !== 'section' && !component) {
            throw new Error('GenericForm Fields must be provided with a component, here it s undefinded');
          }
          switch (type) {
            case 'section':
              var inputsLabels = Object.keys(inputs);
              return _react2.default.createElement(
                _reduxForm.FormSection,
                { key: k, name: label },
                inputsLabels.map(function (inputLabel) {
                  return _react2.default.createElement(_reduxForm.Field, {
                    key: inputLabel,
                    name: inputLabel,
                    component: inputs[inputLabel].component,
                    inputType: inputs[inputLabel].type,
                    placeholder: inputs[inputLabel].placeholder,
                    iconName: inputs[inputLabel].iconName,
                    defaultValue: inputs[inputLabel].defaultValue,
                    limits: inputs[inputLabel].limits
                  });
                })
              );
            // case 'image':
            // case 'slider':
            // case 'dropdown':
            //   return (
            //     <Field
            //       key={k}
            //       name={label}
            //       component={component}
            //       value={defaultValue}
            //       validate={validator}
            //       hintText={label}
            //       floatingLabelText={label}
            //       ref={ref} withRef={withRef}
            //     />
            //   )
            // case 'FormButtons':
            //   return (
            //     <View key="FormButtons">
            //       {/* <FormButtons primary type="submit" label="Submit" disabled={submitting} /> */}
            //       {/* <FormButtons secondary label="Cancel" disabled={pristine || submitting} onClick={this.reset}/> */}
            //     </View>
            //   )
            default:
              // ref={ref} withRef={withRef}/>
              return _react2.default.createElement(_reduxForm.Field, {
                key: k,
                name: k,
                component: component,
                inputType: type,
                labels: labels,
                placeholder: placeholder,
                iconName: iconName,
                defaultValue: defaultValue,
                limits: limits
              });}
        })
      );
    }
  }]);

  return GenericForm;
}(_react.Component);

GenericForm.contextTypes = {
  _reduxForm: _react.PropTypes.object
};


var gReduxForm = function gReduxForm(genericFormFields, mapStateToProps, mapDispatchToProps) {
  return function (WrappedComponent) {
    return (0, _reduxForm.reduxForm)({
      form: genericFormFields.getFormName(),
      genericFormFields: genericFormFields,
      enableReinitialize: true,
      initialValues: genericFormFields.getDefaultValues()
    }, mapStateToProps, mapDispatchToProps)(WrappedComponent);
  };
};

exports.GenericForm = GenericForm;
exports.gReduxForm = gReduxForm;