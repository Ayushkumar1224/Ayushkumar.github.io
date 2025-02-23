"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.broadcastDynamic = broadcastDynamic;
exports.broadcastDynamic_ = broadcastDynamic_;

var _index = /*#__PURE__*/require("../../../../Function/index.js");

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Managed/index.js"));

var BroadcastedQueuesDynamic = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./broadcastedQueuesDynamic.js"));

var Chain = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./chain.js"));

var FlattenTake = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./flattenTake.js"));

var FromQueue = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./fromQueue.js"));

var Managed = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./managed.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Fan out the stream, producing a dynamic number of streams that have the same elements as this stream.
 * The driver stream will only ever advance of the `maximumLag` chunks before the
 * slowest downstream stream.
 */
function broadcastDynamic_(self, maximumLag) {
  return M.map_(BroadcastedQueuesDynamic.broadcastedQueuesDynamic_(self, maximumLag), _ => FlattenTake.flattenTake(Chain.chain_(Managed.managed(_), FromQueue.fromQueue())));
}
/**
 * Fan out the stream, producing a dynamic number of streams that have the same elements as this stream.
 * The driver stream will only ever advance of the `maximumLag` chunks before the
 * slowest downstream stream.
 *
 * @ets_data_first broadcastDynamic_
 */


function broadcastDynamic(maximumLag) {
  return self => broadcastDynamic_(self, maximumLag);
}
//# sourceMappingURL=broadcastDynamic.js.map