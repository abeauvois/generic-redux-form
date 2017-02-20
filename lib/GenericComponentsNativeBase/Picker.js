'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// var Radium = require('radium');
// var browserifyStyle = require('../../utils/style/browserify')

var PickerIOS = function (_React$Component) {
	_inherits(PickerIOS, _React$Component);

	function PickerIOS(props) {
		_classCallCheck(this, PickerIOS);

		// bind the _onChange
		var _this = _possibleConstructorReturn(this, (PickerIOS.__proto__ || Object.getPrototypeOf(PickerIOS)).call(this, props));

		_this._onChange = _this._onChange.bind(_this);

		// default state
		_this.state = _this._stateFromProps(props);
		return _this;
	}

	// props changed... maybe new items incoming?


	_createClass(PickerIOS, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			this.setState(this._stateFromProps(nextProps));
		}

		// handles current items

	}, {
		key: '_stateFromProps',
		value: function _stateFromProps() {
			var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			// pick the childrens
			var _props$children = props.children,
			    children = _props$children === undefined ? [] : _props$children;

			var items = [];

			_react2.default.Children.forEach(children, function (child, index) {
				items.push({ value: child.props.value, label: child.props.label });
			});
			return { items: items };
		}

		// handles the call for the change events

	}, {
		key: '_onChange',
		value: function _onChange(event) {
			if (this.props.onChange) {
				this.props.onChange({ nativeEvent: { newValue: event.target.value } });
			}
			if (this.props.onValueChange) {
				this.props.onValueChange(event.target.value);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			// deconstruct props and extract the needed ones.

			var _props = this.props,
			    onValueChange = _props.onValueChange,
			    selectedValue = _props.selectedValue,
			    children = _props.children,
			    props = _objectWithoutProperties(_props, ['onValueChange', 'selectedValue', 'children']);

			// classNames
			// var classNames = ['picker-ios'];

			// create the options


			var _state$items = this.state.items,
			    items = _state$items === undefined ? [] : _state$items;

			var options = [];
			for (var i = 0; i < items.length; i++) {
				options.push(_react2.default.createElement(
					'option',
					{ value: items[i].value, key: i },
					items[i].label
				));
			}

			// return the component
			return _react2.default.createElement(
				'select',
				_extends({}, props, { value: selectedValue, onChange: this._onChange, style: { borderColor: '#BDBDC1', borderWidth: 2 } }),
				options
			);
		}
	}]);

	return PickerIOS;
}(_react2.default.Component);

// export the component wrapped in radium
// PickerIOS = Radium(PickerIOS);

// the picker item


var PickerIOSItem = function (_React$Component2) {
	_inherits(PickerIOSItem, _React$Component2);

	function PickerIOSItem() {
		_classCallCheck(this, PickerIOSItem);

		return _possibleConstructorReturn(this, (PickerIOSItem.__proto__ || Object.getPrototypeOf(PickerIOSItem)).apply(this, arguments));
	}

	_createClass(PickerIOSItem, [{
		key: 'render',

		// this component is only a placeholder
		value: function render() {
			return null;
		}
	}]);

	return PickerIOSItem;
}(_react2.default.Component);

// Append the PickerIOS.Item


PickerIOS.Item = PickerIOSItem;

// export the component
exports.default = PickerIOS;