"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.catchSome = catchSome;
exports.catchSome_ = catchSome_;

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Option/index.js"));

var _catchAll = /*#__PURE__*/require("./catchAll.js");

var _fail = /*#__PURE__*/require("./fail.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Switches over to the stream produced by the provided function in case this one
 * fails with some typed error.
 */
function catchSome_(self, f) {
  return (0, _catchAll.catchAll_)(self, e => O.getOrElse_(f(e), () => (0, _fail.fail)(e)));
}
/**
 * Switches over to the stream produced by the provided function in case this one
 * fails with some typed error.
 */


function catchSome(f) {
  return self => catchSome_(self, f);
}
//# sourceMappingURL=catchSome.js.map