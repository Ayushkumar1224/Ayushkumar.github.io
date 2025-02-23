"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("../../Operator/index.js");

var _Stream = /*#__PURE__*/require("@effect-ts/system/Stream");

Object.keys(_Stream).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Stream[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Stream[key];
    }
  });
});
//# sourceMappingURL=index.js.map