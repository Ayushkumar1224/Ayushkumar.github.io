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
    _react2.default.createElement('path', { d: 'M17.75,9L18.95,8.24C19.58,8.58 20,9.24 20,10V21.75C20,21.75 12,20 12,11V10C12,9.27 12.39,8.63 12.97,8.28L14.43,9L16,8L17.75,9M14,2C15.53,2 16.8,3.15 17,4.64C18,4.93 18.81,5.67 19.22,6.63L17.75,7.5L16,6.5L14.43,7.5L12.76,6.67C13.15,5.72 13.95,5 14.94,4.66C14.8,4.28 14.43,4 14,4V2M10,10C10,18 13.63,19.84 16,21.75C16,21.75 8,20 8,11V10C8,9.27 8.39,8.63 8.97,8.28L10.3,8.94C10.11,9.25 10,9.61 10,10M10.43,7.5L8.76,6.67C9.15,5.72 9.95,5 10.94,4.66C10.8,4.28 10.43,4 10,4V2C10.77,2 11.47,2.29 12,2.76V4C12.43,4 12.8,4.28 12.94,4.66C11.95,5 11.15,5.72 10.43,7.5M6,10C6,18 9.63,19.84 12,21.75C12,21.75 4,20 4,11V10C4,9.27 4.39,8.63 4.97,8.28L6.3,8.94C6.11,9.25 6,9.61 6,10M6.43,7.5L4.76,6.67C5.15,5.72 5.95,5 6.94,4.66C6.8,4.28 6.43,4 6,4V2C6.77,2 7.47,2.29 8,2.76V4C8.43,4 8.8,4.28 8.94,4.66C7.95,5 7.15,5.72 6.43,7.5Z' })
  );
};