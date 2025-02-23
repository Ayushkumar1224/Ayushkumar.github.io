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
import { diag, ValueType, } from '@opentelemetry/api';
import { AttributeHashMap } from './state/HashMap';
import { isObservableInstrument } from './Instruments';
/**
 * The class implements {@link ObservableResult} interface.
 */
var ObservableResultImpl = /** @class */ (function () {
    function ObservableResultImpl(_descriptor) {
        this._descriptor = _descriptor;
        /**
         * @internal
         */
        this._buffer = new AttributeHashMap();
    }
    /**
     * Observe a measurement of the value associated with the given attributes.
     */
    ObservableResultImpl.prototype.observe = function (value, attributes) {
        if (attributes === void 0) { attributes = {}; }
        if (this._descriptor.valueType === ValueType.INT &&
            !Number.isInteger(value)) {
            diag.warn("INT value type cannot accept a floating-point value for " + this._descriptor.name + ", ignoring the fractional digits.");
            value = Math.trunc(value);
        }
        this._buffer.set(attributes, value);
    };
    return ObservableResultImpl;
}());
export { ObservableResultImpl };
/**
 * The class implements {@link BatchObservableCallback} interface.
 */
var BatchObservableResultImpl = /** @class */ (function () {
    function BatchObservableResultImpl() {
        /**
         * @internal
         */
        this._buffer = new Map();
    }
    /**
     * Observe a measurement of the value associated with the given attributes.
     */
    BatchObservableResultImpl.prototype.observe = function (metric, value, attributes) {
        if (attributes === void 0) { attributes = {}; }
        if (!isObservableInstrument(metric)) {
            return;
        }
        var map = this._buffer.get(metric);
        if (map == null) {
            map = new AttributeHashMap();
            this._buffer.set(metric, map);
        }
        if (metric._descriptor.valueType === ValueType.INT &&
            !Number.isInteger(value)) {
            diag.warn("INT value type cannot accept a floating-point value for " + metric._descriptor.name + ", ignoring the fractional digits.");
            value = Math.trunc(value);
        }
        map.set(attributes, value);
    };
    return BatchObservableResultImpl;
}());
export { BatchObservableResultImpl };
//# sourceMappingURL=ObservableResult.js.map