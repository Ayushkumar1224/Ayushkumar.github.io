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
import { context } from '@opentelemetry/api';
import { suppressTracing } from '../trace/suppress-tracing';
/**
 * @internal
 * Shared functionality used by Exporters while exporting data, including suppresion of Traces.
 */
export function _export(exporter, arg) {
    return new Promise(function (resolve) {
        // prevent downstream exporter calls from generating spans
        context.with(suppressTracing(context.active()), function () {
            exporter.export(arg, function (result) {
                resolve(result);
            });
        });
    });
}
//# sourceMappingURL=exporter.js.map