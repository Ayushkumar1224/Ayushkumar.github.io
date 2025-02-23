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
    _react2.default.createElement('path', { d: 'M17.5,15.61C17.33,15.37 9.53,5.4 9.27,5.08C9,4.75 9.08,4.65 9.13,4.59C9.22,4.5 9.36,4.5 9.93,4.5C10.26,4.5 13.59,4.5 13.94,4.47C14.66,4.47 14.78,4.53 14.85,4.56C14.93,4.58 15.13,4.75 15.26,4.92C15.33,5 22.32,13.36 22.39,13.45C22.46,13.54 22.59,13.69 22.67,13.84C22.76,14 22.77,14.18 22.64,14.25C22.56,14.3 18.7,15.89 18.59,15.93C18.5,16 18.27,16.06 18.11,16.04C18,16 17.77,15.92 17.5,15.61M21.47,15.42L21.75,15.47C21.75,15.47 22.68,15.65 22.77,15.67C22.87,15.69 22.96,15.76 22.95,15.79C22.94,15.87 22.9,15.91 22.83,15.95C22.77,16 18.58,18.58 18.5,18.62C18.43,18.66 18.33,18.72 18.11,18.75C17.7,18.83 16.91,18.61 16.66,18.56C16.41,18.5 6.15,16.23 6.06,16.2C5.97,16.17 5.91,16.16 5.9,16.08C5.89,15.94 6.11,15.88 6.28,15.81C6.46,15.75 11.28,14 11.45,13.93C11.62,13.86 11.84,13.84 11.95,13.83C12.06,13.82 12.73,13.93 13.03,13.97C13.34,14 14.2,14.15 14.2,14.15L16.16,16.7C16.5,17.09 16.72,17.25 17,17.28C17.15,17.29 17.31,17.25 17.42,17.2C17.5,17.16 21.47,15.42 21.47,15.42M10.25,9.18L11.96,11.37L12,11.45V11.5C11.96,11.54 8.93,14.32 8.91,14.35L5.72,15.5C5.72,15.5 5.63,15.55 5.58,15.58C5.53,15.61 5.47,15.67 5.5,15.82C5.5,15.87 5.5,16.59 5.5,16.79L1.56,18.04C1.37,18.1 1,18.23 0.95,18.19C0.88,18.14 0.97,18.03 1,17.97C1.06,17.91 9.08,10 9.39,9.7C9.84,9.24 10.25,9.18 10.25,9.18' })
  );
};