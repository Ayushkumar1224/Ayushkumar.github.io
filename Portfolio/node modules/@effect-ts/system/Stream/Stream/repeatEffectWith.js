"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.repeatEffectWith = repeatEffectWith;

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Tuple/index.js"));

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Option/index.js"));

var SC = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Schedule/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var _chain = /*#__PURE__*/require("./chain.js");

var _concat = /*#__PURE__*/require("./concat.js");

var _fromEffect = /*#__PURE__*/require("./fromEffect.js");

var _succeed = /*#__PURE__*/require("./succeed.js");

var _unfoldM = /*#__PURE__*/require("./unfoldM.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Creates a stream from an effect producing a value of type `A`, which is repeated using the
 * specified schedule.
 */
function repeatEffectWith(effect, schedule) {
  return (0, _chain.chain_)((0, _fromEffect.fromEffect)(T.zip_(effect, SC.driver(schedule))), ({
    tuple: [a, driver]
  }) => (0, _concat.concat_)((0, _succeed.succeed)(a), (0, _unfoldM.unfoldM)(a, _ => T.foldM_(driver.next(_), T.succeed, _ => T.map_(effect, nextA => O.some(Tp.tuple(nextA, nextA)))))));
}
//# sourceMappingURL=repeatEffectWith.js.map