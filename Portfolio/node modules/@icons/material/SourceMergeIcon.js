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
    _react2.default.createElement('path', { d: 'M7,3C8.66,3 10,4.34 10,6C10,7.29 9.19,8.39 8.04,8.81C8.58,13.81 13.08,14.77 15.19,14.96C15.61,13.81 16.71,13 18,13C19.66,13 21,14.34 21,16C21,17.66 19.66,19 18,19C16.69,19 15.57,18.16 15.16,17C10.91,16.8 9.44,15.19 8,13.39V15.17C9.17,15.58 10,16.69 10,18C10,19.66 8.66,21 7,21C5.34,21 4,19.66 4,18C4,16.69 4.83,15.58 6,15.17V8.83C4.83,8.42 4,7.31 4,6C4,4.34 5.34,3 7,3M7,5C6.45,5 6,5.45 6,6C6,6.55 6.45,7 7,7C7.55,7 8,6.55 8,6C8,5.45 7.55,5 7,5M7,17C6.45,17 6,17.45 6,18C6,18.55 6.45,19 7,19C7.55,19 8,18.55 8,18C8,17.45 7.55,17 7,17M18,15C17.45,15 17,15.45 17,16C17,16.55 17.45,17 18,17C18.55,17 19,16.55 19,16C19,15.45 18.55,15 18,15Z' })
  );
};