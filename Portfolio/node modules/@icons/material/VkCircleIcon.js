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
    _react2.default.createElement('path', { d: 'M12,2C17.52,2 22,6.48 22,12C22,17.52 17.52,22 12,22C6.48,22 2,17.52 2,12C2,6.48 6.48,2 12,2M17.24,14.03C16.06,12.94 16.22,13.11 17.64,11.22C18.5,10.07 18.85,9.37 18.74,9.07C18.63,8.79 18,8.86 18,8.86L15.89,8.88C15.89,8.88 15.73,8.85 15.62,8.92C15.5,9 15.43,9.15 15.43,9.15C15.43,9.15 15.09,10.04 14.65,10.8C13.71,12.39 13.33,12.47 13.18,12.38C12.83,12.15 12.91,11.45 12.91,10.95C12.91,9.41 13.15,8.76 12.46,8.6C12.23,8.54 12.06,8.5 11.47,8.5C10.72,8.5 10.08,8.5 9.72,8.68C9.5,8.8 9.29,9.06 9.41,9.07C9.55,9.09 9.86,9.16 10.03,9.39C10.25,9.68 10.24,10.34 10.24,10.34C10.24,10.34 10.36,12.16 9.95,12.39C9.66,12.54 9.27,12.22 8.44,10.78C8,10.04 7.68,9.22 7.68,9.22L7.5,9L7.19,8.85H5.18C5.18,8.85 4.88,8.85 4.77,9C4.67,9.1 4.76,9.32 4.76,9.32C4.76,9.32 6.33,12.96 8.11,14.8C9.74,16.5 11.59,16.31 11.59,16.31H12.43C12.43,16.31 12.68,16.36 12.81,16.23C12.93,16.1 12.93,15.94 12.93,15.94C12.93,15.94 12.91,14.81 13.43,14.65C13.95,14.5 14.61,15.73 15.31,16.22C15.84,16.58 16.24,16.5 16.24,16.5L18.12,16.47C18.12,16.47 19.1,16.41 18.63,15.64C18.6,15.58 18.36,15.07 17.24,14.03Z' })
  );
};