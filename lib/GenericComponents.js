'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GenericToggle = exports.GenericSlider = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
// UI VENDORS


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Avatar = require('material-ui/Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _List = require('material-ui/List');

var _reduxFormMaterialUi = require('redux-form-material-ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GenericSlider = function GenericSlider(props) {
  return _react2.default.createElement(_List.ListItem, { style: { width: 180, paddingLeft: 60 },
    disabled: true,
    primaryText: props.label.toUpperCase(),
    leftAvatar: _react2.default.createElement(
      _Avatar2.default,
      {
        style: { left: 0 },
        color: 'white'
      },
      props.input.value || 0
    ),
    secondaryText: _react2.default.createElement(_reduxFormMaterialUi.Slider, _extends({ sliderStyle: { marginTop: 0 } }, props))
  });
};
var GenericToggle = function GenericToggle(props) {
  return _react2.default.createElement(_List.ListItem, { style: { width: 180, paddingLeft: 60 },
    disabled: true,
    primaryText: props.label.toUpperCase(),
    leftAvatar: _react2.default.createElement(
      _Avatar2.default,
      {
        style: { left: 0 },
        color: 'white'
      },
      props.input.value ? 'YES' : 'NO'
    ),
    secondaryText: _react2.default.createElement(_reduxFormMaterialUi.Toggle, _extends({ style: { marginLeft: 0, overflow: 'visible' } }, props, { label: '' }))
  });
};

exports.GenericSlider = GenericSlider;
exports.GenericToggle = GenericToggle;