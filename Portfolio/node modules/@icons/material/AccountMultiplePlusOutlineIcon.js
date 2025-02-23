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
    _react2.default.createElement('path', { d: 'M13.5,5C11.57,5 10,6.57 10,8.5C10,10.43 11.57,12 13.5,12C14.25,12 14.94,11.76 15.5,11.36C16.07,11.76 16.76,12 17.5,12C19.43,12 21,10.43 21,8.5C21,6.57 19.43,5 17.5,5C16.76,5 16.08,5.25 15.5,5.65C14.95,5.24 14.25,5 13.5,5M13.5,6.5C14.6,6.5 15.5,7.4 15.5,8.5C15.5,9.6 14.6,10.5 13.5,10.5C12.4,10.5 11.5,9.6 11.5,8.5C11.5,7.4 12.4,6.5 13.5,6.5M17.5,6.5C18.6,6.5 19.5,7.4 19.5,8.5C19.5,9.6 18.6,10.5 17.5,10.5C17.14,10.5 16.81,10.4 16.5,10.23C16.82,9.72 17,9.13 17,8.5C17,7.87 16.82,7.28 16.5,6.77C16.81,6.6 17.14,6.5 17.5,6.5M3,8V11H0V13H3V16H5V13H8V11H5V8H3M13.5,13C11.33,13 7,14.08 7,16.25V19H24V16.25C24,14.08 19.67,13 17.5,13C16.95,13 16.25,13.08 15.5,13.22C14.78,13.08 14.07,13 13.5,13M13.5,14.5C15.94,14.5 18.5,15.71 18.5,16.25V17.5H8.5V16.25C8.5,15.71 11.06,14.5 13.5,14.5M19.08,14.66C20.93,15 22.5,15.83 22.5,16.25V17.5H20V16.25C20,15.63 19.64,15.1 19.08,14.66Z' })
  );
};