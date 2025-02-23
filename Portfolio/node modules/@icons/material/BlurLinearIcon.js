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
    _react2.default.createElement('path', { d: 'M13,17C13.55,17 14,16.55 14,16C14,15.45 13.55,15 13,15C12.45,15 12,15.45 12,16C12,16.55 12.45,17 13,17M13,13C13.55,13 14,12.55 14,12C14,11.45 13.55,11 13,11C12.45,11 12,11.45 12,12C12,12.55 12.45,13 13,13M13,9C13.55,9 14,8.55 14,8C14,7.45 13.55,7 13,7C12.45,7 12,7.45 12,8C12,8.55 12.45,9 13,9M17,12.5C17.28,12.5 17.5,12.28 17.5,12C17.5,11.72 17.28,11.5 17,11.5C16.72,11.5 16.5,11.72 16.5,12C16.5,12.28 16.72,12.5 17,12.5M17,8.5C17.28,8.5 17.5,8.28 17.5,8C17.5,7.72 17.28,7.5 17,7.5C16.72,7.5 16.5,7.72 16.5,8C16.5,8.28 16.72,8.5 17,8.5M3,3V5H21V3M17,16.5C17.28,16.5 17.5,16.28 17.5,16C17.5,15.72 17.28,15.5 17,15.5C16.72,15.5 16.5,15.72 16.5,16C16.5,16.28 16.72,16.5 17,16.5M9,17C9.55,17 10,16.55 10,16C10,15.45 9.55,15 9,15C8.45,15 8,15.45 8,16C8,16.55 8.45,17 9,17M5,13.5C5.83,13.5 6.5,12.83 6.5,12C6.5,11.17 5.83,10.5 5,10.5C4.17,10.5 3.5,11.17 3.5,12C3.5,12.83 4.17,13.5 5,13.5M5,9.5C5.83,9.5 6.5,8.83 6.5,8C6.5,7.17 5.83,6.5 5,6.5C4.17,6.5 3.5,7.17 3.5,8C3.5,8.83 4.17,9.5 5,9.5M3,21H21V19H3M9,9C9.55,9 10,8.55 10,8C10,7.45 9.55,7 9,7C8.45,7 8,7.45 8,8C8,8.55 8.45,9 9,9M9,13C9.55,13 10,12.55 10,12C10,11.45 9.55,11 9,11C8.45,11 8,11.45 8,12C8,12.55 8.45,13 9,13M5,17.5C5.83,17.5 6.5,16.83 6.5,16C6.5,15.17 5.83,14.5 5,14.5C4.17,14.5 3.5,15.17 3.5,16C3.5,16.83 4.17,17.5 5,17.5Z' })
  );
};