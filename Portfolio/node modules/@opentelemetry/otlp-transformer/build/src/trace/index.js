"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExportTraceServiceRequest = void 0;
const internal_1 = require("../common/internal");
const internal_2 = require("./internal");
function createExportTraceServiceRequest(spans, useHex) {
    return {
        resourceSpans: spanRecordsToResourceSpans(spans, useHex),
    };
}
exports.createExportTraceServiceRequest = createExportTraceServiceRequest;
function createResourceMap(readableSpans) {
    const resourceMap = new Map();
    for (const record of readableSpans) {
        let ilmMap = resourceMap.get(record.resource);
        if (!ilmMap) {
            ilmMap = new Map();
            resourceMap.set(record.resource, ilmMap);
        }
        // TODO this is duplicated in basic tracer. Consolidate on a common helper in core
        const instrumentationLibraryKey = `${record.instrumentationLibrary.name}@${record.instrumentationLibrary.version || ''}:${record.instrumentationLibrary.schemaUrl || ''}`;
        let records = ilmMap.get(instrumentationLibraryKey);
        if (!records) {
            records = [];
            ilmMap.set(instrumentationLibraryKey, records);
        }
        records.push(record);
    }
    return resourceMap;
}
function spanRecordsToResourceSpans(readableSpans, useHex) {
    const resourceMap = createResourceMap(readableSpans);
    const out = [];
    const entryIterator = resourceMap.entries();
    let entry = entryIterator.next();
    while (!entry.done) {
        const [resource, ilmMap] = entry.value;
        const scopeResourceSpans = [];
        const ilmIterator = ilmMap.values();
        let ilmEntry = ilmIterator.next();
        while (!ilmEntry.done) {
            const scopeSpans = ilmEntry.value;
            if (scopeSpans.length > 0) {
                const { name, version, schemaUrl } = scopeSpans[0].instrumentationLibrary;
                const spans = scopeSpans.map(readableSpan => (0, internal_2.sdkSpanToOtlpSpan)(readableSpan, useHex));
                scopeResourceSpans.push({
                    scope: { name, version },
                    spans: spans,
                    schemaUrl: schemaUrl,
                });
            }
            ilmEntry = ilmIterator.next();
        }
        // TODO SDK types don't provide resource schema URL at this time
        const transformedSpans = {
            resource: {
                attributes: (0, internal_1.toAttributes)(resource.attributes),
                droppedAttributesCount: 0,
            },
            scopeSpans: scopeResourceSpans,
            schemaUrl: undefined,
        };
        out.push(transformedSpans);
        entry = entryIterator.next();
    }
    return out;
}
//# sourceMappingURL=index.js.map