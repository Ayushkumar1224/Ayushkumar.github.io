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
    _react2.default.createElement('path', { d: 'M11,2C10.45,2 10,2.45 10,3V5L10,9C10,9.28 10.22,9.5 10.5,9.5H12C12.28,9.5 12.5,9.72 12.5,10C12.5,10.28 12.28,10.5 12,10.5H10.5C9.73,10.5 9,9.77 9,9V5.16C7.27,5.6 6,7.13 6,9V10.5C7.38,10.5 8.5,11.62 8.5,13C8.5,14.38 7.38,15.5 6,15.5V17C6,19.77 8.23,22 11,22H13C15.77,22 18,19.77 18,17V15.5C16.62,15.5 15.5,14.38 15.5,13C15.5,11.62 16.62,10.5 18,10.5V9C18,6.78 16.22,5 14,5V3C14,2.45 13.55,2 13,2H11M10.75,16.5H13.25L12.75,20H11.25L10.75,16.5Z' })
  );
};