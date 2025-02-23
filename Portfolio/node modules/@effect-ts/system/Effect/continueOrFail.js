"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.continueOrFail = continueOrFail;
exports.continueOrFailM = continueOrFailM;
exports.continueOrFailM_ = continueOrFailM_;
exports.continueOrFail_ = continueOrFail_;

var _index = /*#__PURE__*/require("../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Option/core.js"));

var _core2 = /*#__PURE__*/require("./core.js");

var _fail = /*#__PURE__*/require("./fail.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * continue with the returned value.
 */
function continueOrFailM_(fa, f, pf, __trace) {
  return (0, _core2.chain_)(fa, a => O.getOrElse_(pf(a), () => (0, _fail.failWith)(f)), __trace);
}
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * continue with the returned value.
 *
 * @ets_data_first continueOrFailM_
 */


function continueOrFailM(f, pf, __trace) {
  return fa => continueOrFailM_(fa, f, pf, __trace);
}
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * succeed with the returned value.
 */


function continueOrFail_(fa, f, pf, __trace) {
  return continueOrFailM_(fa, f, x => O.map_(pf(x), _core2.succeed), __trace);
}
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * succeed with the returned value.
 *
 * @ets_data_first continueOrFail_
 */


function continueOrFail(f, pf, __trace) {
  return fa => continueOrFail_(fa, f, pf, __trace);
}
//# sourceMappingURL=continueOrFail.js.map