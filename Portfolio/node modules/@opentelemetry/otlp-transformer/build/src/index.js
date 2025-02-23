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
exports.createExportLogsServiceRequest = exports.createExportMetricsServiceRequest = exports.createExportTraceServiceRequest = void 0;
__exportStar(require("./common/types"), exports);
__exportStar(require("./metrics/types"), exports);
__exportStar(require("./resource/types"), exports);
__exportStar(require("./trace/types"), exports);
__exportStar(require("./logs/types"), exports);
var trace_1 = require("./trace");
Object.defineProperty(exports, "createExportTraceServiceRequest", { enumerable: true, get: function () { return trace_1.createExportTraceServiceRequest; } });
var metrics_1 = require("./metrics");
Object.defineProperty(exports, "createExportMetricsServiceRequest", { enumerable: true, get: function () { return metrics_1.createExportMetricsServiceRequest; } });
var logs_1 = require("./logs");
Object.defineProperty(exports, "createExportLogsServiceRequest", { enumerable: true, get: function () { return logs_1.createExportLogsServiceRequest; } });
//# sourceMappingURL=index.js.map