"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.repeatSchedule = repeatSchedule;
exports.repeatSchedule_ = repeatSchedule_;

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Either/index.js"));

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Option/index.js"));

var Collect = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./collect.js"));

var RepeatEither = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./repeatEither.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Repeats the entire stream using the specified schedule. The stream will execute normally,
 * and then repeat again according to the provided schedule.
 */
function repeatSchedule_(self, schedule) {
  return Collect.collect_(RepeatEither.repeatEither_(self, schedule), E.fold(_ => O.none, a => O.some(a)));
}
/**
 * Repeats the entire stream using the specified schedule. The stream will execute normally,
 * and then repeat again according to the provided schedule.
 *
 * @ets_data_first repeat_
 */


function repeatSchedule(schedule) {
  return self => repeatSchedule_(self, schedule);
}
//# sourceMappingURL=repeatSchedule.js.map