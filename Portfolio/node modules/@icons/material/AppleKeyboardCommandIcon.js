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
    _react2.default.createElement('path', { d: 'M6,2C8.21,2 10,3.79 10,6V8H14V6C14,3.79 15.79,2 18,2C20.21,2 22,3.79 22,6C22,8.21 20.21,10 18,10H16V14H18C20.21,14 22,15.79 22,18C22,20.21 20.21,22 18,22C15.79,22 14,20.21 14,18V16H10V18C10,20.21 8.21,22 6,22C3.79,22 2,20.21 2,18C2,15.79 3.79,14 6,14H8V10H6C3.79,10 2,8.21 2,6C2,3.79 3.79,2 6,2M16,18C16,19.1 16.9,20 18,20C19.1,20 20,19.1 20,18C20,16.9 19.1,16 18,16H16V18M14,10H10V14H14V10M6,16C4.9,16 4,16.9 4,18C4,19.1 4.9,20 6,20C7.1,20 8,19.1 8,18V16H6M8,6C8,4.9 7.1,4 6,4C4.9,4 4,4.9 4,6C4,7.1 4.9,8 6,8H8V6M18,8C19.1,8 20,7.1 20,6C20,4.9 19.1,4 18,4C16.9,4 16,4.9 16,6V8H18Z' })
  );
};