'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var DEFAULT_SIZE = 24;

exports.default = function (_ref) {
  var _ref$fill = _ref.fill,
      fill = _ref$fill === undefined ? 'currentColor' : _ref$fill,
      _ref$width = _ref.width,
      width = _ref$width === undefined ? DEFAULT_SIZE : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === undefined ? DEFAULT_SIZE : _ref$height,
      _ref$style = _ref.style,
      style = _ref$style === undefined ? {} : _ref$style,
      props = _objectWithoutProperties(_ref, ['fill', 'width', 'height', 'style']);

  return _react2.default.createElement(
    'svg',
    _extends({
      viewBox: '0 0 ' + DEFAULT_SIZE + ' ' + DEFAULT_SIZE,
      style: _extends({ fill: fill, width: width, height: height }, style)
    }, props),
    _react2.default.createElement('path', { d: 'M7.59,5.41C6.81,4.63 6.81,3.36 7.59,2.58C8.37,1.8 9.64,1.8 10.42,2.58C11.2,3.36 11.2,4.63 10.42,5.41C9.63,6.2 8.37,6.2 7.59,5.41M6,16V7H4V16C4,18.76 6.24,21 9,21H15V19H9C7.34,19 6,17.66 6,16M20,20.07L14.93,15H11.5V11.32C12.9,12.47 15.1,13.5 17,13.5V11.32C15.34,11.34 13.39,10.45 12.33,9.28L10.93,7.73C10.74,7.5 10.5,7.35 10.24,7.23C9.95,7.09 9.62,7 9.28,7H9.25C8,7 7,8 7,9.25V15C7,16.66 8.34,18 10,18H15.07L18.57,21.5' })
  );
};