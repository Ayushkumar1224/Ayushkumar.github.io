"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapAccum = mapAccum;
exports.mapAccum_ = mapAccum_;

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var _mapAccumM = /*#__PURE__*/require("./mapAccumM.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Statefully maps over the elements of this stream to produce new elements.
 */
function mapAccum_(self, z, f) {
  return (0, _mapAccumM.mapAccumM_)(self, z, (z, o) => T.succeed(f(z, o)));
}
/**
 * Statefully maps over the elements of this stream to produce new elements.
 *
 * @ets_data_first mapAccum_
 */


function mapAccum(z, f) {
  return self => mapAccum_(self, z, f);
}
//# sourceMappingURL=mapAccum.js.map