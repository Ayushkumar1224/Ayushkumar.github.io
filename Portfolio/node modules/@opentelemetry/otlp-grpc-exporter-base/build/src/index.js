"use strict";
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrpcCompressionAlgorithm = exports.validateAndNormalizeUrl = exports.DEFAULT_COLLECTOR_URL = exports.ServiceClientType = void 0;
__exportStar(require("./OTLPGRPCExporterNodeBase"), exports);
var types_1 = require("./types");
Object.defineProperty(exports, "ServiceClientType", { enumerable: true, get: function () { return types_1.ServiceClientType; } });
var util_1 = require("./util");
Object.defineProperty(exports, "DEFAULT_COLLECTOR_URL", { enumerable: true, get: function () { return util_1.DEFAULT_COLLECTOR_URL; } });
Object.defineProperty(exports, "validateAndNormalizeUrl", { enumerable: true, get: function () { return util_1.validateAndNormalizeUrl; } });
Object.defineProperty(exports, "GrpcCompressionAlgorithm", { enumerable: true, get: function () { return util_1.GrpcCompressionAlgorithm; } });
//# sourceMappingURL=index.js.map