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
    _react2.default.createElement('path', { d: 'M18,17.93C15.92,17.92 14.81,16.9 14.04,15.09L13.82,14.6L11.92,10.23C11.29,8.69 9.72,7.64 7.96,7.64C5.57,7.64 3.63,9.59 3.63,12C3.63,14.41 5.57,16.36 7.96,16.36C9.62,16.36 11.08,15.41 11.8,14L12.57,15.81C11.5,17.15 9.82,18 7.96,18C4.67,18 2,15.32 2,12C2,8.69 4.67,6 7.96,6C10.44,6 12.45,7.34 13.47,9.7C13.54,9.89 14.54,12.24 15.42,14.24C15.96,15.5 16.42,16.31 17.91,16.36C19.38,16.41 20.39,15.5 20.39,14.37C20.39,13.26 19.62,13 18.32,12.56C16,11.79 14.79,11 14.79,9.15C14.79,7.33 16,6.12 18,6.12C19.31,6.12 20.24,6.7 20.89,7.86L19.62,8.5C19.14,7.84 18.61,7.57 17.94,7.57C17,7.57 16.33,8.23 16.33,9.1C16.33,10.34 17.43,10.53 18.97,11.03C21.04,11.71 22,12.5 22,14.42C22,16.45 20.27,17.93 18,17.93Z' })
  );
};