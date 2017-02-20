'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MakeMultipleRFNB = exports.CheckboxRFNB = exports.RadioRFNB = exports.SwitchRFNB = exports.FileinputRFNB = exports.SliderRFNB = exports.PickerRFNB = exports.ButtonRFNB = exports.TextinputRFNB = exports.MakeMultiple = exports.GenericToggle = exports.GenericSlider = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _reduxForm = require('redux-form');

var _nativeBase = require('native-base');

var _reactDropzone = require('react-dropzone');

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

require('react-select/dist/react-select.css');

var _reactRangeslider = require('react-rangeslider');

var _reactRangeslider2 = _interopRequireDefault(_reactRangeslider);

require('react-rangeslider/lib/index.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// UI VENDORS

// Picker not available in native-base-web yet
// import Picker from 'react-picker'


// import Picker from './Picker'
// const PickerItem = Picker.Item

var styles = _reactNative.StyleSheet.create({
  wrapped: {
    borderBottomWidth: 1,
    marginLeft: 15,
    padding: 10,
    paddingLeft: 2,
    justifyContent: 'space-between', //: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd'
  },
  inputText: {
    borderWidth: 1,
    borderColor: '#ddd',
    // minWidth: '200',
    width: 450
  },
  slider: {
    width: 450
  }
});

var getDefaultValue = function getDefaultValue(labels, label, defaultValues) {
  if (!labels) return defaultValues; // Case of not Multiple
  return defaultValues.find(function (dv, i) {
    return labels[i] === label;
  });
};

var Multiply = function Multiply(props) {
  var labels = props.labels,
      onChange = props.onChange,
      defaultValue = props.defaultValue,
      values = props.values,
      ListWrapper = props.ListWrapper,
      WrappedComponent = props.WrappedComponent;

  return _react2.default.createElement(
    ListWrapper,
    null,
    labels.map(function (label) {
      return _react2.default.createElement(WrappedComponent, {
        key: label,
        name: label,
        onComponentChange: onChange // Available for createComponent() later..
        , defaultValue: getDefaultValue(labels, label, defaultValue) // value prop for WrappedComponent, not for Field
        , value: values[label]
      });
    })
  );
};

function MakeMultiple(ListWrapper, WrappedComponent) {
  return function createMultiple(config) {
    var isMultiple = function isMultiple(l) {
      return l && l.length && l.length > 0;
    };
    return function (_Component) {
      _inherits(Multiple, _Component);

      function Multiple(props) {
        _classCallCheck(this, Multiple);

        var _this = _possibleConstructorReturn(this, (Multiple.__proto__ || Object.getPrototypeOf(Multiple)).call(this, props));

        _this.state = {
          values: _this.initState(props.label, props.labels, props.defaultValue)
        };
        _this.onChange = _this.onChange.bind(_this);
        return _this;
      }
      // componentDidMount(){
      //   // this.initState(config.labels, config.defaultValue)
      // }
      // componentWillUpdate(nextProps, nextState){
      // }


      _createClass(Multiple, [{
        key: 'initState',
        value: function initState(label, labels, initialValues) {
          var initialState = {};
          if (!labels) return _defineProperty({}, label, initialValues);
          labels.forEach(function (label, index) {
            return initialState[labels[index]] = initialValues[index];
          });
          return initialState;
        }
      }, {
        key: 'radiobuttonStateBehavior',
        value: function radiobuttonStateBehavior(config, lastSelected) {
          var label = config.label,
              labels = config.labels;

          var resetedState = {};
          if (!labels) {
            resetedState[lastSelected.name] = lastSelected.value;
          } else {
            labels.forEach(function (label) {
              return resetedState[label] = false;
            });
            resetedState[lastSelected.name] = true;
          }
          return _extends({}, resetedState);
        }
      }, {
        key: 'independantStateBehavior',
        value: function independantStateBehavior(lastSelected) {
          return _extends({}, lastSelected);
        }
      }, {
        key: 'onChange',
        value: function onChange(lastSelected) {
          var s = void 0;
          switch (config.type) {
            case 'radio':
              s = this.radiobuttonStateBehavior(config, lastSelected);
              break;
            default:
              s = this.independantStateBehavior(_defineProperty({}, lastSelected.name, lastSelected.value));
          }
          this.setState({ values: s }); //.then(console.log)
          if (this.props.onChange) this.props.onChange(s);
        }
      }, {
        key: 'render',
        value: function render() {
          var label = config.label,
              labels = config.labels,
              defaultValue = config.defaultValue;

          if (isMultiple(labels)) {
            // return (
            //   <Field
            //     key={label}
            //     name={label}
            //     component={Multiply}
            //     WrappedComponent={WrappedComponent}
            //     ListWrapper={ListWrapper}
            //     onChange={this.onChange} // Available for createComponent() later..
            //     defaultValue={defaultValue} // value prop for WrappedComponent, not for Field
            //     labels={labels}
            //     values={this.state.values}
            //   />
            // )
            return _react2.default.createElement(Multiply, {
              WrappedComponent: WrappedComponent,
              name: label,
              labels: labels,
              ListWrapper: ListWrapper,
              onChange: this.onChange // Available for createComponent() later..
              , defaultValue: defaultValue // value prop for WrappedComponent, not for Field
              , values: this.state.values
            });
          } else {
            return _react2.default.createElement(WrappedComponent, {
              key: label,
              name: label,
              component: WrappedComponent,
              onComponentChange: this.onChange,
              defaultValue: getDefaultValue(labels, label, defaultValue) // value prop for WrappedComponent, not for Field
              , value: this.state.values[label]
            });
          }
        }
      }]);

      return Multiple;
    }(_react.Component);
  };
}

function createComponent(NativeBaseComponent, mapProps) {
  var InputComponent = function (_Component2) {
    _inherits(InputComponent, _Component2);

    function InputComponent() {
      _classCallCheck(this, InputComponent);

      return _possibleConstructorReturn(this, (InputComponent.__proto__ || Object.getPrototypeOf(InputComponent)).apply(this, arguments));
    }

    _createClass(InputComponent, [{
      key: 'getRenderedComponent',
      value: function getRenderedComponent() {
        return this.refs.component;
      }
    }, {
      key: 'render',
      value: function render() {
        return (0, _react.createElement)(NativeBaseComponent, _extends({}, mapProps(this.props), {
          ref: 'component'
        }));
      }
    }]);

    return InputComponent;
  }(_react.Component);

  InputComponent.displayName = 'ReduxFormNativeBase' + NativeBaseComponent.name;
  return InputComponent;
}

// WRAPPING Native-Base-Web component for better layout and event handling
// TODO: Create a class component based on NativeBaseComponent
// for getting access to Theme via this.getTheme()
var WrappedCheckbox = function WrappedCheckbox(props) {
  return _react2.default.createElement(
    _nativeBase.ListItem,
    { onClick: props.onChange },
    _react2.default.createElement(
      _nativeBase.Text,
      null,
      props.label
    ),
    _react2.default.createElement(_nativeBase.CheckBox, { checked: props.checked })
  );
};
var WrappedPicker = function WrappedPicker(props) {
  return _react2.default.createElement(
    _reactNative.View,
    { style: styles.wrapped },
    _react2.default.createElement(
      _nativeBase.Text,
      null,
      props.label
    ),
    _react2.default.createElement(_reactSelect2.default, {
      style: { width: 200 },
      value: props.value,
      options: props.labels.map(function (label) {
        return { value: label, label: label };
      }),
      onChange: props.onChange
    })
  );
};
var WrappedSwitch = function WrappedSwitch(props) {
  return _react2.default.createElement(
    _reactNative.View,
    { style: styles.wrapped },
    _react2.default.createElement(
      _nativeBase.Text,
      null,
      props.label
    ),
    _react2.default.createElement(_nativeBase.Switch, { value: props.value, onValueChange: props.onChange })
  );
};
var WrappedRadio = function WrappedRadio(props) {
  return _react2.default.createElement(
    _nativeBase.ListItem,
    { onClick: props.onChange },
    _react2.default.createElement(_nativeBase.Radio, { selected: props.selected }),
    _react2.default.createElement(
      _nativeBase.Text,
      null,
      props.label
    )
  );
};
// const WrappedTextinput = (props) =>
//   <InputGroup style={{marginLeft: 15, paddingLeft: 0}}>
//     <Icon style={{padding: 0}}
//       name={props.iconName || 'ios-home'}/>
//     <Input
//       onChangeText={props.onChange} placeholder={props.placeholder}/>
//   </InputGroup>
var WrappedTextinput = function WrappedTextinput(props) {
  return _react2.default.createElement(
    _reactNative.View,
    { style: styles.wrapped },
    _react2.default.createElement(
      _nativeBase.Text,
      null,
      props.label
    ),
    _react2.default.createElement(
      _reactNative.View,
      { style: styles.inputText },
      _react2.default.createElement(_nativeBase.Input, {
        onChangeText: props.onChange, placeholder: props.placeholder })
    )
  );
};
var WrappedSlider = function WrappedSlider(props) {
  return _react2.default.createElement(
    _reactNative.View,
    { style: styles.wrapped },
    _react2.default.createElement(
      _nativeBase.Text,
      null,
      props.label
    ),
    _react2.default.createElement(
      _reactNative.View,
      { style: styles.slider },
      _react2.default.createElement(_reactRangeslider2.default, { style: { marginTop: 0 },
        min: props.min,
        max: props.max,
        value: props.value,
        onChange: props.onChange
      })
    )
  );
};
var WrappedButton = function WrappedButton(props) {
  return _react2.default.createElement(
    Button,
    { onClick: props.onclick },
    props.label
  );
};
var WrappedFileinput = function WrappedFileinput(props) {
  return _react2.default.createElement(
    _reactDropzone2.default,
    { onDrop: props.onDrop },
    _react2.default.createElement(_nativeBase.Thumbnail, { circular: true, size: 200, source: { uri: props.file && props.file.preview || 'https://facebook.github.io/react/img/logo_og.png' } })
  );
};

function mapRFtoNB(Component) {
  // map ReduxForm to NativeBase props
  var isNewValueDependant = function isNewValueDependant(inputType) {
    return inputType === 'textinput' || inputType === 'slider';
  };
  return createComponent(Component,
  // (r) => {debugger},
  function (_ref2) {
    var inputType = _ref2.inputType,
        defaultValue = _ref2.defaultValue,
        limits = _ref2.limits,
        _ref2$input = _ref2.input,
        onChange = _ref2$input.onChange,
        value = _ref2$input.value,
        name = _ref2$input.name,
        inputProps = _objectWithoutProperties(_ref2$input, ['onChange', 'value', 'name']),
        dispatch = _ref2.meta.dispatch,
        props = _objectWithoutProperties(_ref2, ['inputType', 'defaultValue', 'limits', 'input', 'meta']);

    return _extends({}, inputProps, props, {
      label: name,
      min: limits && limits.min,
      max: limits && limits.max,
      checked: !!value ? true : false,
      value: isNewValueDependant(inputType) || inputType === 'dropdown' ? value : !!value ? true : false,
      selected: !!value ? true : false,
      file: value,
      onChange: function (_onChange) {
        function onChange(_x) {
          return _onChange.apply(this, arguments);
        }

        onChange.toString = function () {
          return _onChange.toString();
        };

        return onChange;
      }(function (newValue) {
        // Becomes props.onChange in Component
        var result = void 0;
        if (inputType === 'textinput' || inputType === 'slider') {
          result = newValue;
        } else if (inputType === 'dropdown') {
          // inputType: checkbox, switch, radio
          result = newValue.value;
        } else {
          // inputType: checkbox, switch, radio
          result = !value;
        }
        // let valueVariable = (inputType === 'checked') ? 'checked' : (inputType === 'radio') ? 'selected' : 'value'
        // const r = valueVariable === 'checked' ? result : e
        // result[valueVariable]
        onChange(result); // Calls Field RF onChange() => Field input
      }),
      onDrop: function onDrop(files) {
        // dispatch(change('login', 'file', files[0]))
        // console.log('files uploaded', files)
        onChange(files[0]);
      }
    });
  });
}

var CheckboxRFNB = mapRFtoNB(WrappedCheckbox);
var PickerRFNB = mapRFtoNB(WrappedPicker);
var SwitchRFNB = mapRFtoNB(WrappedSwitch);
var RadioRFNB = mapRFtoNB(WrappedRadio);
var TextinputRFNB = mapRFtoNB(WrappedTextinput);
var SliderRFNB = mapRFtoNB(WrappedSlider);
var ButtonRFNB = mapRFtoNB(WrappedButton);
var FileinputRFNB = mapRFtoNB(WrappedFileinput);

function toMultiple(Component) {
  return createComponent(Component,
  // (r) => {debugger},
  function (_ref3) {
    var onComponentChange = _ref3.onComponentChange,
        inputType = _ref3.inputType,
        defaultValue = _ref3.defaultValue,
        name = _ref3.name,
        value = _ref3.value,
        props = _objectWithoutProperties(_ref3, ['onComponentChange', 'inputType', 'defaultValue', 'name', 'value']);

    return _extends({}, props, {
      label: name,
      checked: !!value ? true : false,
      value: !!value ? true : false,
      selected: !!value ? true : false,
      onDrop: function onDrop(files) {
        console.log('files uploaded', files);
        onChange(files.join(','));
      },
      onChange: function (_onChange2) {
        function onChange(_x2) {
          return _onChange2.apply(this, arguments);
        }

        onChange.toString = function () {
          return _onChange2.toString();
        };

        return onChange;
      }(function (e) {
        var result = void 0;
        // if (value === '') {
        //   result = defaultValue
        // }else {
        result = !value; //{name, [valueVariable]: !!value ? false : true}
        // }
        // let valueVariable = (inputType === 'checked') ? 'checked' : (inputType === 'radio') ? 'selected' : 'value'
        // const r = valueVariable === 'checked' ? result : e
        // result[valueVariable]
        onChange(result);
      }),
      onValueChange: function onValueChange() {
        var result = { name: name, value: !value };
        onComponentChange && onComponentChange(result);
        // onChange(result.value)
        // debugger
        // onChange(newVal)
        // console.log('onComponentChange result', componentState)
        // const currentValue = componentState && componentState.values && componentState.values[name] || defaultValue
        // if (currentValue !== result.value){
        //   Object.keys(componentState.values).forEach(k => {
        //     const newValue = componentState.values[k]
        // onChange(result.value) // Only boolean for WrappedSwitch
        //   })
        // }
      }
    });
  });
}

function MakeMultipleRFNB(ListWrapper, WrappedComponent) {
  return function createMultipleRFNB(config) {
    var M = MakeMultiple(ListWrapper, WrappedComponent)(config);
    return createComponent(M,
    // (RF) => { debugger },
    function (_ref4) {
      var _ref4$input = _ref4.input,
          onChange = _ref4$input.onChange,
          value = _ref4$input.value,
          inputProps = _objectWithoutProperties(_ref4$input, ['onChange', 'value']),
          meta = _ref4.meta,
          props = _objectWithoutProperties(_ref4, ['input', 'meta']);

      return _extends({}, inputProps, props, {
        value: value,
        onChange: function (_onChange3) {
          function onChange(_x3) {
            return _onChange3.apply(this, arguments);
          }

          onChange.toString = function () {
            return _onChange3.toString();
          };

          return onChange;
        }(function (e) {

          onChange(e[name]); // Call ReduxForm onChange()
        }) //onChange(onWrappedChange(value))
      });
    });
  };
}

/**
 * TODO create separated Lib: redux-form-native-base
 */

var DEFAULT_LISTITEM_WIDTH = 220;

var GenericSlider = function GenericSlider(props) {
  return _react2.default.createElement(_nativeBase.ListItem, { style: { width: props.width || DEFAULT_LISTITEM_WIDTH, paddingLeft: 60 },
    disabled: true,
    primaryText: props.label.toUpperCase(),
    leftAvatar: _react2.default.createElement(
      _nativeBase.Avatar,
      {
        style: { left: 0 },
        color: 'white'
      },
      props.input.value || 0
    ),
    secondaryText: _react2.default.createElement(_reactRangeslider2.default, _extends({ sliderStyle: { marginTop: 0 } }, props))
  });
};
var GenericToggle = function GenericToggle(props) {
  return _react2.default.createElement(_nativeBase.ListItem, { style: { width: 180, paddingLeft: 60 },
    disabled: true,
    primaryText: props.label.toUpperCase(),
    leftAvatar: _react2.default.createElement(
      _nativeBase.Avatar,
      {
        style: { left: 0 },
        color: 'white'
      },
      props.input.value ? 'YES' : 'NO'
    ),
    secondaryText: _react2.default.createElement(Toggle, _extends({ style: { marginLeft: 0, overflow: 'visible' } }, props, { label: '' }))
  });
};

exports.GenericSlider = GenericSlider;
exports.GenericToggle = GenericToggle;
exports.MakeMultiple = MakeMultiple;
exports.TextinputRFNB = TextinputRFNB;
exports.ButtonRFNB = ButtonRFNB;
exports.PickerRFNB = PickerRFNB;
exports.SliderRFNB = SliderRFNB;
exports.FileinputRFNB = FileinputRFNB;
exports.SwitchRFNB = SwitchRFNB;
exports.RadioRFNB = RadioRFNB;
exports.CheckboxRFNB = CheckboxRFNB;
exports.MakeMultipleRFNB = MakeMultipleRFNB;