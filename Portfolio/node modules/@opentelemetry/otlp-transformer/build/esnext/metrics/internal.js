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
import { ValueType } from '@opentelemetry/api';
import { hrTimeToNanoseconds } from '@opentelemetry/core';
import { AggregationTemporality, DataPointType, } from '@opentelemetry/sdk-metrics';
import { toAttributes } from '../common/internal';
export function toResourceMetrics(resourceMetrics) {
    return {
        resource: {
            attributes: toAttributes(resourceMetrics.resource.attributes),
            droppedAttributesCount: 0,
        },
        schemaUrl: undefined,
        scopeMetrics: toScopeMetrics(resourceMetrics.scopeMetrics),
    };
}
export function toScopeMetrics(scopeMetrics) {
    return Array.from(scopeMetrics.map(metrics => ({
        scope: {
            name: metrics.scope.name,
            version: metrics.scope.version,
        },
        metrics: metrics.metrics.map(metricData => toMetric(metricData)),
        schemaUrl: metrics.scope.schemaUrl,
    })));
}
export function toMetric(metricData) {
    const out = {
        name: metricData.descriptor.name,
        description: metricData.descriptor.description,
        unit: metricData.descriptor.unit,
    };
    const aggregationTemporality = toAggregationTemporality(metricData.aggregationTemporality);
    switch (metricData.dataPointType) {
        case DataPointType.SUM:
            out.sum = {
                aggregationTemporality,
                isMonotonic: metricData.isMonotonic,
                dataPoints: toSingularDataPoints(metricData),
            };
            break;
        case DataPointType.GAUGE:
            out.gauge = {
                dataPoints: toSingularDataPoints(metricData),
            };
            break;
        case DataPointType.HISTOGRAM:
            out.histogram = {
                aggregationTemporality,
                dataPoints: toHistogramDataPoints(metricData),
            };
            break;
        case DataPointType.EXPONENTIAL_HISTOGRAM:
            out.exponentialHistogram = {
                aggregationTemporality,
                dataPoints: toExponentialHistogramDataPoints(metricData),
            };
            break;
    }
    return out;
}
function toSingularDataPoint(dataPoint, valueType) {
    const out = {
        attributes: toAttributes(dataPoint.attributes),
        startTimeUnixNano: hrTimeToNanoseconds(dataPoint.startTime),
        timeUnixNano: hrTimeToNanoseconds(dataPoint.endTime),
    };
    switch (valueType) {
        case ValueType.INT:
            out.asInt = dataPoint.value;
            break;
        case ValueType.DOUBLE:
            out.asDouble = dataPoint.value;
            break;
    }
    return out;
}
function toSingularDataPoints(metricData) {
    return metricData.dataPoints.map(dataPoint => {
        return toSingularDataPoint(dataPoint, metricData.descriptor.valueType);
    });
}
function toHistogramDataPoints(metricData) {
    return metricData.dataPoints.map(dataPoint => {
        const histogram = dataPoint.value;
        return {
            attributes: toAttributes(dataPoint.attributes),
            bucketCounts: histogram.buckets.counts,
            explicitBounds: histogram.buckets.boundaries,
            count: histogram.count,
            sum: histogram.sum,
            min: histogram.min,
            max: histogram.max,
            startTimeUnixNano: hrTimeToNanoseconds(dataPoint.startTime),
            timeUnixNano: hrTimeToNanoseconds(dataPoint.endTime),
        };
    });
}
function toExponentialHistogramDataPoints(metricData) {
    return metricData.dataPoints.map(dataPoint => {
        const histogram = dataPoint.value;
        return {
            attributes: toAttributes(dataPoint.attributes),
            count: histogram.count,
            min: histogram.min,
            max: histogram.max,
            sum: histogram.sum,
            positive: {
                offset: histogram.positive.offset,
                bucketCounts: histogram.positive.bucketCounts,
            },
            negative: {
                offset: histogram.negative.offset,
                bucketCounts: histogram.negative.bucketCounts,
            },
            scale: histogram.scale,
            zeroCount: histogram.zeroCount,
            startTimeUnixNano: hrTimeToNanoseconds(dataPoint.startTime),
            timeUnixNano: hrTimeToNanoseconds(dataPoint.endTime),
        };
    });
}
function toAggregationTemporality(temporality) {
    switch (temporality) {
        case AggregationTemporality.DELTA:
            return 1 /* AGGREGATION_TEMPORALITY_DELTA */;
        case AggregationTemporality.CUMULATIVE:
            return 2 /* AGGREGATION_TEMPORALITY_CUMULATIVE */;
    }
}
//# sourceMappingURL=internal.js.map