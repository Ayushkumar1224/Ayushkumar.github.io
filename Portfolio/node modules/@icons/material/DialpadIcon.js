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
    _react2.default.createElement('path', { d: 'M12,19C10.9,19 10,19.9 10,21C10,22.1 10.9,23 12,23C13.1,23 14,22.1 14,21C14,19.9 13.1,19 12,19M6,1C4.9,1 4,1.9 4,3C4,4.1 4.9,5 6,5C7.1,5 8,4.1 8,3C8,1.9 7.1,1 6,1M6,7C4.9,7 4,7.9 4,9C4,10.1 4.9,11 6,11C7.1,11 8,10.1 8,9C8,7.9 7.1,7 6,7M6,13C4.9,13 4,13.9 4,15C4,16.1 4.9,17 6,17C7.1,17 8,16.1 8,15C8,13.9 7.1,13 6,13M18,5C19.1,5 20,4.1 20,3C20,1.9 19.1,1 18,1C16.9,1 16,1.9 16,3C16,4.1 16.9,5 18,5M12,13C10.9,13 10,13.9 10,15C10,16.1 10.9,17 12,17C13.1,17 14,16.1 14,15C14,13.9 13.1,13 12,13M18,13C16.9,13 16,13.9 16,15C16,16.1 16.9,17 18,17C19.1,17 20,16.1 20,15C20,13.9 19.1,13 18,13M18,7C16.9,7 16,7.9 16,9C16,10.1 16.9,11 18,11C19.1,11 20,10.1 20,9C20,7.9 19.1,7 18,7M12,7C10.9,7 10,7.9 10,9C10,10.1 10.9,11 12,11C13.1,11 14,10.1 14,9C14,7.9 13.1,7 12,7M12,1C10.9,1 10,1.9 10,3C10,4.1 10.9,5 12,5C13.1,5 14,4.1 14,3C14,1.9 13.1,1 12,1Z' })
  );
};