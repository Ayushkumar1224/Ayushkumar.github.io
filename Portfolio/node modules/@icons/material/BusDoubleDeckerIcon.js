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
    _react2.default.createElement('path', { d: 'M3,4C1.89,4 1,4.89 1,6V17H3C3,18.66 4.34,20 6,20C7.66,20 9,18.66 9,17H15C15,18.66 16.34,20 18,20C19.66,20 21,18.66 21,17H23V14C23,12.89 22.11,12 21,12H19V9.5H23V6C23,4.89 22.11,4 21,4H3M2.5,5.5H6.5V8H2.5V5.5M8,5.5H12V8H8V5.5M13.5,5.5H17.5V8H13.5V5.5M19,5.5H21.5V8H19V5.5M13.5,9.5H17.5V12H13.5V9.5M2.5,9.5H6.5V12H2.5V9.5M8,9.5H12V12H8V9.5M6,15.5C6.83,15.5 7.5,16.17 7.5,17C7.5,17.83 6.83,18.5 6,18.5C5.17,18.5 4.5,17.83 4.5,17C4.5,16.17 5.17,15.5 6,15.5M18,15.5C18.83,15.5 19.5,16.17 19.5,17C19.5,17.83 18.83,18.5 18,18.5C17.17,18.5 16.5,17.83 16.5,17C16.5,16.17 17.17,15.5 18,15.5Z' })
  );
};