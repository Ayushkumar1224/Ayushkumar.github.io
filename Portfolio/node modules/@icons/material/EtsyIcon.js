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
    _react2.default.createElement('path', { d: 'M6.72,20.78C8.23,20.71 10.07,20.78 11.87,20.78C13.72,20.78 15.62,20.66 17.12,20.78C17.72,20.83 18.28,21.19 18.77,20.87C19.16,20.38 18.87,19.71 18.96,19.05C19.12,17.78 20.28,16.27 18.59,15.95C17.87,16.61 18.35,17.23 17.95,18.05C17.45,19.03 15.68,19.37 14,19.5C12.54,19.62 10,19.76 9.5,18.77C9.04,17.94 9.29,16.65 9.29,15.58C9.29,14.38 9.16,13.22 9.5,12.3C11.32,12.43 13.7,11.69 15,12.5C15.87,13 15.37,14.06 16.38,14.4C17.07,14.21 16.7,13.32 16.66,12.5C16.63,11.94 16.63,11.19 16.66,10.57C16.69,9.73 17,8.76 16.1,8.74C15.39,9.3 15.93,10.23 15.18,10.75C14.95,10.92 14.43,11 14.08,11C12.7,11.17 10.54,11.05 9.38,10.84C9.23,9.16 9.24,6.87 9.38,5.19C10,4.57 11.45,4.54 12.42,4.55C14.13,4.55 16.79,4.7 17.3,5.55C17.58,6 17.36,7 17.85,7.1C18.85,7.33 18.36,5.55 18.41,4.73C18.44,4.11 18.71,3.72 18.59,3.27C18.27,2.83 17.79,3.05 17.5,3.09C14.35,3.5 9.6,3.27 6.26,3.27C5.86,3.27 5.16,3.07 4.88,3.54C4.68,4.6 6.12,4.16 6.62,4.73C6.79,4.91 7.03,5.73 7.08,6.28C7.23,7.74 7.08,9.97 7.08,12.12C7.08,14.38 7.26,16.67 7.08,18.05C7,18.53 6.73,19.3 6.62,19.41C6,20.04 4.34,19.35 4.5,20.69C5.09,21.08 5.93,20.82 6.72,20.78Z' })
  );
};