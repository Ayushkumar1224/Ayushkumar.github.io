"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scan = scan;
exports.scan_ = scan_;

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var ScanEffect = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./scanEffect.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Statefully maps over the elements of this stream to produce all intermediate results
 * of type `S` given an initial S.
 */
function scan_(self, s, f) {
  return ScanEffect.scanEffect_(self, s, (s, a) => T.succeed(f(s, a)));
}
/**
 * Statefully maps over the elements of this stream to produce all intermediate results
 * of type `S` given an initial S.
 *
 * @ets_data_first scan_
 */


function scan(s, f) {
  return self => scan_(self, s, f);
}
//# sourceMappingURL=scan.js.map