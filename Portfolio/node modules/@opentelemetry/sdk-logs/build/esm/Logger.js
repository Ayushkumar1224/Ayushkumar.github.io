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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { context } from '@opentelemetry/api';
import { LogRecord } from './LogRecord';
import { mergeConfig } from './config';
var Logger = /** @class */ (function () {
    function Logger(instrumentationScope, config, _loggerProvider) {
        this.instrumentationScope = instrumentationScope;
        this._loggerProvider = _loggerProvider;
        this._loggerConfig = mergeConfig(config);
        this.resource = _loggerProvider.resource;
    }
    Logger.prototype.emit = function (logRecord) {
        var currentContext = this._loggerConfig.includeTraceContext
            ? context.active()
            : undefined;
        /**
         * If a Logger was obtained with include_trace_context=true,
         * the LogRecords it emits MUST automatically include the Trace Context from the active Context,
         * if Context has not been explicitly set.
         */
        var logRecordInstance = new LogRecord(this, __assign({ context: currentContext }, logRecord));
        /**
         * the explicitly passed Context,
         * the current Context, or an empty Context if the Logger was obtained with include_trace_context=false
         */
        this.getActiveLogRecordProcessor().onEmit(logRecordInstance, currentContext);
        /**
         * A LogRecordProcessor may freely modify logRecord for the duration of the OnEmit call.
         * If logRecord is needed after OnEmit returns (i.e. for asynchronous processing) only reads are permitted.
         */
        logRecordInstance.makeReadonly();
    };
    Logger.prototype.getLogRecordLimits = function () {
        return this._loggerConfig.logRecordLimits;
    };
    Logger.prototype.getActiveLogRecordProcessor = function () {
        return this._loggerProvider.getActiveLogRecordProcessor();
    };
    return Logger;
}());
export { Logger };
//# sourceMappingURL=Logger.js.map