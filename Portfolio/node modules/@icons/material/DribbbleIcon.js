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
    _react2.default.createElement('path', { d: 'M16.42,18.42C16,16.5 15.5,14.73 15,13.17C15.5,13.1 16,13.06 16.58,13.06H16.6V13.06H16.6C17.53,13.06 18.55,13.18 19.66,13.43C19.28,15.5 18.08,17.27 16.42,18.42M12,19.8C10.26,19.8 8.66,19.23 7.36,18.26C7.64,17.81 8.23,16.94 9.18,16.04C10.14,15.11 11.5,14.15 13.23,13.58C13.82,15.25 14.36,17.15 14.77,19.29C13.91,19.62 13,19.8 12,19.8M4.2,12C4.2,11.96 4.2,11.93 4.2,11.89C4.42,11.9 4.71,11.9 5.05,11.9H5.06C6.62,11.89 9.36,11.76 12.14,10.89C12.29,11.22 12.44,11.56 12.59,11.92C10.73,12.54 9.27,13.53 8.19,14.5C7.16,15.46 6.45,16.39 6.04,17C4.9,15.66 4.2,13.91 4.2,12M8.55,5C9.1,5.65 10.18,7.06 11.34,9.25C9,9.96 6.61,10.12 5.18,10.12C5.14,10.12 5.1,10.12 5.06,10.12H5.05C4.81,10.12 4.6,10.12 4.43,10.11C5,7.87 6.5,6 8.55,5M12,4.2C13.84,4.2 15.53,4.84 16.86,5.91C15.84,7.14 14.5,8 13.03,8.65C12,6.67 11,5.25 10.34,4.38C10.88,4.27 11.43,4.2 12,4.2M18.13,7.18C19.1,8.42 19.71,9.96 19.79,11.63C18.66,11.39 17.6,11.28 16.6,11.28V11.28H16.59C15.79,11.28 15.04,11.35 14.33,11.47C14.16,11.05 14,10.65 13.81,10.26C15.39,9.57 16.9,8.58 18.13,7.18M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2Z' })
  );
};