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
    _react2.default.createElement('path', { d: 'M19.58,12.27C19.54,11.65 19.33,11.18 18.96,10.86C18.59,10.54 18.13,10.38 17.58,10.38C17,10.38 16.5,10.55 16.19,10.89C15.86,11.23 15.65,11.69 15.57,12.27M21.92,12.04C22,12.45 22,13.04 22,13.81H15.5C15.55,14.71 15.85,15.33 16.44,15.69C16.79,15.92 17.22,16.03 17.73,16.03C18.26,16.03 18.69,15.89 19,15.62C19.2,15.47 19.36,15.27 19.5,15H21.88C21.82,15.54 21.53,16.07 21,16.62C20.22,17.5 19.1,17.92 17.66,17.92C16.47,17.92 15.43,17.55 14.5,16.82C13.62,16.09 13.16,14.9 13.16,13.25C13.16,11.7 13.57,10.5 14.39,9.7C15.21,8.87 16.27,8.46 17.58,8.46C18.35,8.46 19.05,8.6 19.67,8.88C20.29,9.16 20.81,9.59 21.21,10.2C21.58,10.73 21.81,11.34 21.92,12.04M9.58,14.07C9.58,13.42 9.31,12.97 8.79,12.73C8.5,12.6 8.08,12.53 7.54,12.5H4.87V15.84H7.5C8.04,15.84 8.46,15.77 8.76,15.62C9.31,15.35 9.58,14.83 9.58,14.07M4.87,10.46H7.5C8.04,10.46 8.5,10.36 8.82,10.15C9.16,9.95 9.32,9.58 9.32,9.06C9.32,8.5 9.1,8.1 8.66,7.91C8.27,7.78 7.78,7.72 7.19,7.72H4.87M11.72,12.42C12.04,12.92 12.2,13.53 12.2,14.24C12.2,15 12,15.64 11.65,16.23C11.41,16.62 11.12,16.94 10.77,17.21C10.37,17.5 9.9,17.72 9.36,17.83C8.82,17.94 8.24,18 7.61,18H2V5.55H8C9.53,5.58 10.6,6 11.23,6.88C11.61,7.41 11.8,8.04 11.8,8.78C11.8,9.54 11.61,10.15 11.23,10.61C11,10.87 10.7,11.11 10.28,11.32C10.91,11.55 11.39,11.92 11.72,12.42M20.06,7.32H15.05V6.07H20.06V7.32Z' })
  );
};