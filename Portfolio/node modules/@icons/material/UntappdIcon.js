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
    _react2.default.createElement('path', { d: 'M14.41,4C14.41,4 14.94,4.39 14.97,4.71C14.97,4.81 14.73,4.85 14.68,4.93C14.62,5 14.7,5.15 14.65,5.21C14.59,5.26 14.5,5.26 14.41,5.41C14.33,5.56 12.07,10.09 11.73,10.63C11.59,11.03 11.47,12.46 11.37,12.66C11.26,12.85 6.34,19.84 6.16,20.05C5.67,20.63 4.31,20.3 3.28,19.56C2.3,18.86 1.74,17.7 2.11,17.16C2.27,16.93 7.15,9.92 7.29,9.75C7.44,9.58 8.75,9 9.07,8.71C9.47,8.22 12.96,4.54 13.07,4.42C13.18,4.3 13.15,4.2 13.18,4.13C13.22,4.06 13.38,4.08 13.43,4C13.5,3.93 13.39,3.71 13.5,3.68C13.59,3.64 13.96,3.67 14.41,4M10.85,4.44L11.74,5.37L10.26,6.94L9.46,5.37C9.38,5.22 9.28,5.22 9.22,5.17C9.17,5.11 9.24,4.97 9.19,4.89C9.13,4.81 8.9,4.83 8.9,4.73C8.9,4.62 9.05,4.28 9.5,3.96C9.5,3.96 10.06,3.6 10.37,3.68C10.47,3.71 10.43,3.95 10.5,4C10.54,4.1 10.7,4.08 10.73,4.15C10.77,4.21 10.73,4.32 10.85,4.44M21.92,17.15C22.29,17.81 21.53,19 20.5,19.7C19.5,20.39 18.21,20.54 17.83,20C17.66,19.78 12.67,12.82 12.56,12.62C12.45,12.43 12.32,11 12.18,10.59L12.15,10.55C12.45,10 13.07,8.77 13.73,7.47C14.3,8.06 14.75,8.56 14.88,8.72C15.21,9 16.53,9.58 16.68,9.75C16.82,9.92 21.78,16.91 21.92,17.15Z' })
  );
};