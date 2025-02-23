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
    _react2.default.createElement('path', { d: 'M8,11.5C8,10.67 7.33,10 6.5,10C5.67,10 5,10.67 5,11.5C5,12.33 5.67,13 6.5,13C7.33,13 8,12.33 8,11.5M15,6.5C15,5.67 14.33,5 13.5,5H10.5C9.67,5 9,5.67 9,6.5C9,7.33 9.67,8 10.5,8H13.5C14.33,8 15,7.33 15,6.5M8.5,15C7.67,15 7,15.67 7,16.5C7,17.33 7.67,18 8.5,18C9.33,18 10,17.33 10,16.5C10,15.67 9.33,15 8.5,15M12,1C5.92,1 1,5.92 1,12C1,18.08 5.92,23 12,23C18.08,23 23,18.08 23,12C23,5.92 18.08,1 12,1M12,21C7.04,21 3,16.96 3,12C3,7.04 7.04,3 12,3C16.96,3 21,7.04 21,12C21,16.96 16.96,21 12,21M17.5,10C16.67,10 16,10.67 16,11.5C16,12.33 16.67,13 17.5,13C18.33,13 19,12.33 19,11.5C19,10.67 18.33,10 17.5,10M15.5,15C14.67,15 14,15.67 14,16.5C14,17.33 14.67,18 15.5,18C16.33,18 17,17.33 17,16.5C17,15.67 16.33,15 15.5,15Z' })
  );
};