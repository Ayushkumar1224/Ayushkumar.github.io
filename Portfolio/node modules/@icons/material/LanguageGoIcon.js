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
    _react2.default.createElement('path', { d: 'M13.38,3.5C13.86,3.5 14.25,3.89 14.25,4.38C14.25,4.86 13.86,5.25 13.38,5.25C12.89,5.25 12.5,4.86 12.5,4.38C12.5,3.89 12.89,3.5 13.38,3.5M8.38,3.75C8.86,3.75 9.25,4.14 9.25,4.63C9.25,5.11 8.86,5.5 8.38,5.5C7.89,5.5 7.5,5.11 7.5,4.63C7.5,4.14 7.89,3.75 8.38,3.75M17.75,2C18.58,2 19.25,2.67 19.25,3.5C19.25,4.24 18.71,4.85 18,5L17.9,5.15C18.9,7.88 18.5,11.5 18.5,11.5C19.25,12 20.25,12.5 20,13C19.75,13.5 18.56,13 18.56,13C19,20 17.25,20.75 17.25,20.75C17.25,20.75 18.25,22 17.75,22.5C17.25,23 16,21.75 16,21.75C16,21.75 13.25,22.75 11.5,22.75C9.75,22.75 8,21.75 8,21.75C7.25,22.5 6.25,23 6,22.5C5.75,22 6.75,20.75 6.75,20.75C4.5,19.75 5.5,12.75 5.5,12.75C5.25,13 4.25,13.75 4,13C3.75,12.25 5.5,11.75 5.5,11.75C5.08,8.11 5.29,6.2 5.55,5.21C4.88,5.07 4.38,4.47 4.38,3.75C4.38,2.92 5.05,2.25 5.88,2.25C6.12,2.25 6.34,2.31 6.55,2.41C7.69,1.56 9.65,1 11.88,1C13.94,1 15.78,1.5 16.95,2.23C17.18,2.09 17.45,2 17.75,2M14.25,2.25C13.15,2.25 12.25,3.15 12.25,4.25C12.25,5.35 13.15,6.25 14.25,6.25C15.35,6.25 16.25,5.35 16.25,4.25C16.25,3.15 15.35,2.25 14.25,2.25M9.25,2.5C8.15,2.5 7.25,3.4 7.25,4.5C7.25,5.6 8.15,6.5 9.25,6.5C10.35,6.5 11.25,5.6 11.25,4.5C11.25,3.4 10.35,2.5 9.25,2.5M11.88,7.25C11.25,7.25 10.75,7.47 10.75,7.75C10.75,7.92 10.95,8.08 11.25,8.17V8.75C11.25,8.89 11.36,9 11.5,9H12.25C12.39,9 12.5,8.89 12.5,8.75V8.17C12.8,8.08 13,7.92 13,7.75C13,7.47 12.5,7.25 11.88,7.25Z' })
  );
};