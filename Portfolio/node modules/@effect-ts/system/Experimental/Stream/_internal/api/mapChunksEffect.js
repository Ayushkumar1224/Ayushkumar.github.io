"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapChunksEffect = mapChunksEffect;
exports.mapChunksEffect_ = mapChunksEffect_;

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Channel/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Effectfully transforms the chunks emitted by this stream.
 */
function mapChunksEffect_(self, f) {
  return new C.Stream(CH.mapOutEffect_(self.channel, f));
}
/**
 * Effectfully transforms the chunks emitted by this stream.
 *
 * @ets_data_first mapChunksEffect_
 */


function mapChunksEffect(f) {
  return self => mapChunksEffect_(self, f);
}
//# sourceMappingURL=mapChunksEffect.js.map