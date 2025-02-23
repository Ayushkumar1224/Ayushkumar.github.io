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
    _react2.default.createElement('path', { d: 'M12.4,7.56C9.6,4.91 7.3,5.65 6.31,6.1C7.06,5.38 7.94,4.8 8.92,4.4C11.7,4.3 14.83,4.84 16.56,7.31C16.56,7.31 19,11.5 19.86,9.65C20.08,10.4 20.2,11.18 20.2,12C20.2,12.3 20.18,12.59 20.15,12.88C18.12,12.65 15.33,10.32 12.4,7.56M19.1,16.1C18.16,16.47 17,17.1 15.14,17.1C13.26,17.1 11.61,16.35 9.56,15.7C7.7,15.11 7,14.2 5.72,14.2C5.06,14.2 4.73,14.86 4.55,15.41C4.07,14.37 3.8,13.22 3.8,12C3.8,11.19 3.92,10.42 4.14,9.68C5.4,8.1 7.33,7.12 10.09,9.26C10.09,9.26 16.32,13.92 19.88,14.23C19.7,14.89 19.43,15.5 19.1,16.1M12,20.2C10.88,20.2 9.81,19.97 8.83,19.56C8.21,18.08 8.22,16.92 9.95,17.5C9.95,17.5 13.87,19 18,17.58C16.5,19.19 14.37,20.2 12,20.2M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.47 17.5,2 12,2Z' })
  );
};