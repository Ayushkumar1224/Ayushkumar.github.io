"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unfoldChunkEffect = unfoldChunkEffect;

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Option/index.js"));

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Channel/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Creates a stream by effectfully peeling off the "layers" of a value of type `S`
 */
function unfoldChunkEffect(s, f) {
  const loop = s => CH.unwrap(T.map_(f(s), O.fold(() => CH.end(undefined), ({
    tuple: [as, s]
  }) => CH.zipRight_(CH.write(as), loop(s)))));

  return new C.Stream(loop(s));
}
//# sourceMappingURL=unfoldChunkEffect.js.map