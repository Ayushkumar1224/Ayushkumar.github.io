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
    _react2.default.createElement('path', { d: 'M16,6L15,6.75L17.5,10H13.5V8.5H12V10H3C1.89,10 1,10.89 1,12V15H3C3,16.66 4.34,18 6,18C7.66,18 9,16.66 9,15H15C15,16.66 16.34,18 18,18C19.66,18 21,16.66 21,15H23V12C23,10.89 22.11,10 21,10H19L16,6M6,13.5C6.83,13.5 7.5,14.17 7.5,15C7.5,15.83 6.83,16.5 6,16.5C5.17,16.5 4.5,15.83 4.5,15C4.5,14.17 5.17,13.5 6,13.5M18,13.5C18.83,13.5 19.5,14.17 19.5,15C19.5,15.83 18.83,16.5 18,16.5C17.17,16.5 16.5,15.83 16.5,15C16.5,14.17 17.17,13.5 18,13.5Z' })
  );
};