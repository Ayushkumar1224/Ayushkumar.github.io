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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import { diag } from '@opentelemetry/api';
import * as api from '@opentelemetry/api';
import { timeInputToHrTime, isAttributeValue, } from '@opentelemetry/core';
var LogRecord = /** @class */ (function () {
    function LogRecord(logger, logRecord) {
        this.attributes = {};
        this._isReadonly = false;
        var _a = logRecord.timestamp, timestamp = _a === void 0 ? Date.now() : _a, severityNumber = logRecord.severityNumber, severityText = logRecord.severityText, body = logRecord.body, _b = logRecord.attributes, attributes = _b === void 0 ? {} : _b, context = logRecord.context;
        this.hrTime = timeInputToHrTime(timestamp);
        if (context) {
            var spanContext = api.trace.getSpanContext(context);
            if (spanContext && api.isSpanContextValid(spanContext)) {
                this.spanContext = spanContext;
            }
        }
        this.severityNumber = severityNumber;
        this.severityText = severityText;
        this.body = body;
        this.resource = logger.resource;
        this.instrumentationScope = logger.instrumentationScope;
        this._logRecordLimits = logger.getLogRecordLimits();
        this.setAttributes(attributes);
    }
    Object.defineProperty(LogRecord.prototype, "severityText", {
        get: function () {
            return this._severityText;
        },
        set: function (severityText) {
            if (this._isLogRecordReadonly()) {
                return;
            }
            this._severityText = severityText;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LogRecord.prototype, "severityNumber", {
        get: function () {
            return this._severityNumber;
        },
        set: function (severityNumber) {
            if (this._isLogRecordReadonly()) {
                return;
            }
            this._severityNumber = severityNumber;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LogRecord.prototype, "body", {
        get: function () {
            return this._body;
        },
        set: function (body) {
            if (this._isLogRecordReadonly()) {
                return;
            }
            this._body = body;
        },
        enumerable: false,
        configurable: true
    });
    LogRecord.prototype.setAttribute = function (key, value) {
        if (this._isLogRecordReadonly()) {
            return this;
        }
        if (value === null) {
            return this;
        }
        if (key.length === 0) {
            api.diag.warn("Invalid attribute key: " + key);
            return this;
        }
        if (!isAttributeValue(value)) {
            api.diag.warn("Invalid attribute value set for key: " + key);
            return this;
        }
        if (Object.keys(this.attributes).length >=
            this._logRecordLimits.attributeCountLimit &&
            !Object.prototype.hasOwnProperty.call(this.attributes, key)) {
            return this;
        }
        this.attributes[key] = this._truncateToSize(value);
        return this;
    };
    LogRecord.prototype.setAttributes = function (attributes) {
        var e_1, _a;
        try {
            for (var _b = __values(Object.entries(attributes)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), k = _d[0], v = _d[1];
                this.setAttribute(k, v);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return this;
    };
    LogRecord.prototype.setBody = function (body) {
        this.body = body;
        return this;
    };
    LogRecord.prototype.setSeverityNumber = function (severityNumber) {
        this.severityNumber = severityNumber;
        return this;
    };
    LogRecord.prototype.setSeverityText = function (severityText) {
        this.severityText = severityText;
        return this;
    };
    /**
     * A LogRecordProcessor may freely modify logRecord for the duration of the OnEmit call.
     * If logRecord is needed after OnEmit returns (i.e. for asynchronous processing) only reads are permitted.
     */
    LogRecord.prototype.makeReadonly = function () {
        this._isReadonly = true;
    };
    LogRecord.prototype._truncateToSize = function (value) {
        var _this = this;
        var limit = this._logRecordLimits.attributeValueLengthLimit || 0;
        // Check limit
        if (limit <= 0) {
            // Negative values are invalid, so do not truncate
            api.diag.warn("Attribute value limit must be positive, got " + limit);
            return value;
        }
        // String
        if (typeof value === 'string') {
            return this._truncateToLimitUtil(value, limit);
        }
        // Array of strings
        if (Array.isArray(value)) {
            return value.map(function (val) {
                return typeof val === 'string' ? _this._truncateToLimitUtil(val, limit) : val;
            });
        }
        // Other types, no need to apply value length limit
        return value;
    };
    LogRecord.prototype._truncateToLimitUtil = function (value, limit) {
        if (value.length <= limit) {
            return value;
        }
        return value.substring(0, limit);
    };
    LogRecord.prototype._isLogRecordReadonly = function () {
        if (this._isReadonly) {
            diag.warn('Can not execute the operation on emitted log record');
        }
        return this._isReadonly;
    };
    return LogRecord;
}());
export { LogRecord };
//# sourceMappingURL=LogRecord.js.map