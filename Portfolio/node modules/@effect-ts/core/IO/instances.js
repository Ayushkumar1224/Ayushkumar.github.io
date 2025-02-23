"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Monad = exports.IdentityFlatten = exports.Covariant = exports.AssociativeFlatten = exports.AssociativeBoth = exports.Applicative = exports.Any = void 0;

var F = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/system/IO"));

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Prelude/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * The `Any` instance for `IO[+_]`.
 */
const Any = {
  any: () => F.succeed({})
};
/**
 * The `Covariant` instance for `IO[+_]`.
 */

exports.Any = Any;
const Covariant = {
  map: F.map
};
/**
 * The `AssociativeBoth` instance for `IO[+_]`.
 */

exports.Covariant = Covariant;
const AssociativeBoth = {
  both: F.zip
};
/**
 * The `AssociativeFlatten` instance for `IO[+_]`.
 */

exports.AssociativeBoth = AssociativeBoth;
const AssociativeFlatten = {
  flatten: ffa => F.chain_(ffa, x => x)
};
/**
 * The `IdentityFlatten` instance for `IO[+_]`.
 */

exports.AssociativeFlatten = AssociativeFlatten;
const IdentityFlatten = { ...Any,
  ...AssociativeFlatten
};
/**
 * The `Monad` instance for `IO[+_]`.
 */

exports.IdentityFlatten = IdentityFlatten;
const Monad = { ...Any,
  ...Covariant,
  ...AssociativeFlatten
};
/**
 * The `Applicative` instance for `IO[+_]`.
 */

exports.Monad = Monad;
const Applicative = { ...Any,
  ...Covariant,
  ...AssociativeBoth
};
exports.Applicative = Applicative;
//# sourceMappingURL=instances.js.map