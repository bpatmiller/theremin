import { e as env } from './fused_util-14ebb22b.js';
import { D as DTYPE_VALUE_SIZE_MAP, d as decodeWeights, I as IORouterRegistry, b as getModelJSONForModelArtifacts, c as getModelArtifactsInfoForJSON, e as getModelArtifactsForJSON, f as concatenateArrayBuffers } from './base_side_effects-da8c2899.js';
import { a as assert, s as sizeFromShape } from './util_base-b10b4a9e.js';

/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * Monitor Promise.all progress, fire onProgress callback function.
 *
 * @param promises Promise list going to be monitored
 * @param onProgress Callback function. Fired when a promise resolved.
 * @param startFraction Optional fraction start. Default to 0.
 * @param endFraction Optional fraction end. Default to 1.
 */
function monitorPromisesProgress(promises, onProgress, startFraction, endFraction) {
    checkPromises(promises);
    startFraction = startFraction == null ? 0 : startFraction;
    endFraction = endFraction == null ? 1 : endFraction;
    checkFraction(startFraction, endFraction);
    let resolvedPromise = 0;
    const registerMonitor = (promise) => {
        promise.then(value => {
            const fraction = startFraction +
                ++resolvedPromise / promises.length * (endFraction - startFraction);
            // pass fraction as parameter to callback function.
            onProgress(fraction);
            return value;
        });
        return promise;
    };
    function checkPromises(promises) {
        assert(promises != null && Array.isArray(promises) && promises.length > 0, () => 'promises must be a none empty array');
    }
    function checkFraction(startFraction, endFraction) {
        assert(startFraction >= 0 && startFraction <= 1, () => `Progress fraction must be in range [0, 1], but ` +
            `got startFraction ${startFraction}`);
        assert(endFraction >= 0 && endFraction <= 1, () => `Progress fraction must be in range [0, 1], but ` +
            `got endFraction ${endFraction}`);
        assert(endFraction >= startFraction, () => `startFraction must be no more than endFraction, but ` +
            `got startFraction ${startFraction} and endFraction ` +
            `${endFraction}`);
    }
    return Promise.all(promises.map(registerMonitor));
}

/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * Reads binary weights data from a number of URLs.
 *
 * @param fetchURLs URLs to send the HTTP requests at, using `fetch` calls.
 * @param requestOptions RequestInit (options) for the HTTP requests.
 * @param fetchFunc Optional overriding value for the `window.fetch` function.
 * @param onProgress Optional, progress callback function, fired periodically
 *   before the load is completed.
 * @returns A `Promise` of an Array of `ArrayBuffer`. The Array has the same
 *   length as `fetchURLs`.
 */
async function loadWeightsAsArrayBuffer(fetchURLs, loadOptions) {
    if (loadOptions == null) {
        loadOptions = {};
    }
    const fetchFunc = loadOptions.fetchFunc == null ? env().platform.fetch :
        loadOptions.fetchFunc;
    // Create the requests for all of the weights in parallel.
    const requests = fetchURLs.map(fetchURL => fetchFunc(fetchURL, loadOptions.requestInit, { isBinary: true }));
    const fetchStartFraction = 0;
    const fetchEndFraction = 0.5;
    const responses = loadOptions.onProgress == null ?
        await Promise.all(requests) :
        await monitorPromisesProgress(requests, loadOptions.onProgress, fetchStartFraction, fetchEndFraction);
    const bufferPromises = responses.map(response => response.arrayBuffer());
    const bufferStartFraction = 0.5;
    const bufferEndFraction = 1;
    const buffers = loadOptions.onProgress == null ?
        await Promise.all(bufferPromises) :
        await monitorPromisesProgress(bufferPromises, loadOptions.onProgress, bufferStartFraction, bufferEndFraction);
    return buffers;
}
/**
 * Reads a weights manifest JSON configuration, fetches the weights and
 * returns them as `Tensor`s.
 *
 * @param manifest The weights manifest JSON.
 * @param filePathPrefix The path prefix for filenames given in the manifest.
 *     Defaults to the empty string.
 * @param weightNames The names of the weights to be fetched.
 */
async function loadWeights(manifest, filePathPrefix = '', weightNames, requestInit) {
    // TODO(nsthorat): Groups are currently fetched atomically. If you need a
    // single weight from a group, the whole group will be fetched. At a future
    // date, we should support fetching only the individual shards within a
    // group that are needed to reconstruct the requested weight.
    // TODO(cais): Use `decodeWeights` for implementation.
    const fetchWeights = (fetchUrls) => loadWeightsAsArrayBuffer(fetchUrls, { requestInit });
    const loadWeights = weightsLoaderFactory(fetchWeights);
    return loadWeights(manifest, filePathPrefix, weightNames);
}
/**
 * Creates a function, which reads a weights manifest JSON configuration,
 * fetches the weight files using the specified function and returns them as
 * `Tensor`s.
 *
 * ```js
 * // example for creating a nodejs weight loader, which reads the weight files
 * // from disk using fs.readFileSync
 *
 * import * as fs from 'fs'
 *
 * const fetchWeightsFromDisk = (filePaths: string[]) =>
 *   filePaths.map(filePath => fs.readFileSync(filePath).buffer)
 *
 * const loadWeights = tf.io.weightsLoaderFactory(fetchWeightsFromDisk)
 *
 * const manifest = JSON.parse(
 *   fs.readFileSync('./my_model-weights_manifest').toString()
 * )
 * const weightMap = await loadWeights(manifest, './')
 * ```
 * @param fetchWeightsFunction The function used for fetching the weight files.
 * @returns Weight loading function.
 */
function weightsLoaderFactory(fetchWeightsFunction) {
    return async (manifest, filePathPrefix = '', weightNames) => {
        // Collect all the groups, weights, and their relative offsets to be
        // fetched.
        const groupIndicesToFetchMap = manifest.map(() => false);
        const groupWeightsToFetch = {};
        const weightsFound = weightNames != null ? weightNames.map(() => false) : [];
        const allManifestWeightNames = [];
        manifest.forEach((manifestGroupConfig, groupIndex) => {
            let groupOffset = 0;
            manifestGroupConfig.weights.forEach(weightsEntry => {
                const rawDtype = ('quantization' in weightsEntry) ?
                    weightsEntry.quantization.dtype :
                    weightsEntry.dtype;
                const weightsBytes = DTYPE_VALUE_SIZE_MAP[rawDtype] *
                    sizeFromShape(weightsEntry.shape);
                const enqueueWeightsForFetchingFn = () => {
                    groupIndicesToFetchMap[groupIndex] = true;
                    if (groupWeightsToFetch[groupIndex] == null) {
                        groupWeightsToFetch[groupIndex] = [];
                    }
                    groupWeightsToFetch[groupIndex].push({
                        manifestEntry: weightsEntry,
                        groupOffset,
                        sizeBytes: weightsBytes
                    });
                };
                if (weightNames != null) {
                    weightNames.forEach((weightName, weightIndex) => {
                        if (weightName === weightsEntry.name) {
                            enqueueWeightsForFetchingFn();
                            weightsFound[weightIndex] = true;
                        }
                    });
                }
                else {
                    enqueueWeightsForFetchingFn();
                }
                allManifestWeightNames.push(weightsEntry.name);
                groupOffset += weightsBytes;
            });
        });
        if (!weightsFound.every(found => found)) {
            const weightsNotFound = weightNames.filter((_, i) => !weightsFound[i]);
            throw new Error(`Could not find weights in manifest with names: ` +
                `${weightsNotFound.join(', ')}. \n` +
                `Manifest JSON has weights with names: ` +
                `${allManifestWeightNames.join(', ')}.`);
        }
        // Convert the one-hot boolean groupId => shouldFetch map to a list of group
        // IDs.
        const groupIndicesToFetch = groupIndicesToFetchMap.reduce((accumulator, shouldFetch, i) => {
            if (shouldFetch) {
                accumulator.push(i);
            }
            return accumulator;
        }, []);
        const fetchUrls = [];
        groupIndicesToFetch.forEach(i => {
            manifest[i].paths.forEach(filepath => {
                const fetchUrl = filePathPrefix +
                    (!filePathPrefix.endsWith('/') ? '/' : '') + filepath;
                fetchUrls.push(fetchUrl);
            });
        });
        const buffers = await fetchWeightsFunction(fetchUrls);
        const weightsTensorMap = {};
        let bufferIndexOffset = 0;
        groupIndicesToFetch.forEach(i => {
            const numBuffers = manifest[i].paths.length;
            let groupBytes = 0;
            for (let i = 0; i < numBuffers; i++) {
                groupBytes += buffers[bufferIndexOffset + i].byteLength;
            }
            // Create a buffer for the whole group.
            const groupBuffer = new ArrayBuffer(groupBytes);
            const groupByteBuffer = new Uint8Array(groupBuffer);
            let groupBufferOffset = 0;
            for (let i = 0; i < numBuffers; i++) {
                const buffer = new Uint8Array(buffers[bufferIndexOffset + i]);
                groupByteBuffer.set(buffer, groupBufferOffset);
                groupBufferOffset += buffer.byteLength;
            }
            const weightsEntries = groupWeightsToFetch[i];
            weightsEntries.forEach(weightsEntry => {
                const byteBuffer = groupBuffer.slice(weightsEntry.groupOffset, weightsEntry.groupOffset + weightsEntry.sizeBytes);
                const nameToTensorMap = decodeWeights(byteBuffer, [weightsEntry.manifestEntry]);
                for (const name in nameToTensorMap) {
                    weightsTensorMap[name] = nameToTensorMap[name];
                }
            });
            bufferIndexOffset += numBuffers;
        });
        return weightsTensorMap;
    };
}

/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const OCTET_STREAM_MIME_TYPE = 'application/octet-stream';
const JSON_TYPE = 'application/json';
class HTTPRequest {
    constructor(path, loadOptions) {
        this.DEFAULT_METHOD = 'POST';
        if (loadOptions == null) {
            loadOptions = {};
        }
        this.weightPathPrefix = loadOptions.weightPathPrefix;
        this.onProgress = loadOptions.onProgress;
        this.weightUrlConverter = loadOptions.weightUrlConverter;
        if (loadOptions.fetchFunc != null) {
            assert(typeof loadOptions.fetchFunc === 'function', () => 'Must pass a function that matches the signature of ' +
                '`fetch` (see ' +
                'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)');
            this.fetch = loadOptions.fetchFunc;
        }
        else {
            this.fetch = env().platform.fetch;
        }
        assert(path != null && path.length > 0, () => 'URL path for http must not be null, undefined or ' +
            'empty.');
        if (Array.isArray(path)) {
            assert(path.length === 2, () => 'URL paths for http must have a length of 2, ' +
                `(actual length is ${path.length}).`);
        }
        this.path = path;
        if (loadOptions.requestInit != null &&
            loadOptions.requestInit.body != null) {
            throw new Error('requestInit is expected to have no pre-existing body, but has one.');
        }
        this.requestInit = loadOptions.requestInit || {};
    }
    async save(modelArtifacts) {
        if (modelArtifacts.modelTopology instanceof ArrayBuffer) {
            throw new Error('BrowserHTTPRequest.save() does not support saving model topology ' +
                'in binary formats yet.');
        }
        const init = Object.assign({ method: this.DEFAULT_METHOD }, this.requestInit);
        init.body = new FormData();
        const weightsManifest = [{
                paths: ['./model.weights.bin'],
                weights: modelArtifacts.weightSpecs,
            }];
        const modelTopologyAndWeightManifest = getModelJSONForModelArtifacts(modelArtifacts, weightsManifest);
        init.body.append('model.json', new Blob([JSON.stringify(modelTopologyAndWeightManifest)], { type: JSON_TYPE }), 'model.json');
        if (modelArtifacts.weightData != null) {
            init.body.append('model.weights.bin', new Blob([modelArtifacts.weightData], { type: OCTET_STREAM_MIME_TYPE }), 'model.weights.bin');
        }
        const response = await this.fetch(this.path, init);
        if (response.ok) {
            return {
                modelArtifactsInfo: getModelArtifactsInfoForJSON(modelArtifacts),
                responses: [response],
            };
        }
        else {
            throw new Error(`BrowserHTTPRequest.save() failed due to HTTP response status ` +
                `${response.status}.`);
        }
    }
    /**
     * Load model artifacts via HTTP request(s).
     *
     * See the documentation to `tf.io.http` for details on the saved
     * artifacts.
     *
     * @returns The loaded model artifacts (if loading succeeds).
     */
    async load() {
        const modelConfigRequest = await this.fetch(this.path, this.requestInit);
        if (!modelConfigRequest.ok) {
            throw new Error(`Request to ${this.path} failed with status code ` +
                `${modelConfigRequest.status}. Please verify this URL points to ` +
                `the model JSON of the model to load.`);
        }
        let modelJSON;
        try {
            modelJSON = await modelConfigRequest.json();
        }
        catch (e) {
            let message = `Failed to parse model JSON of response from ${this.path}.`;
            // TODO(nsthorat): Remove this after some time when we're comfortable that
            // .pb files are mostly gone.
            if (this.path.endsWith('.pb')) {
                message += ' Your path contains a .pb file extension. ' +
                    'Support for .pb models have been removed in TensorFlow.js 1.0 ' +
                    'in favor of .json models. You can re-convert your Python ' +
                    'TensorFlow model using the TensorFlow.js 1.0 conversion scripts ' +
                    'or you can convert your.pb models with the \'pb2json\'' +
                    'NPM script in the tensorflow/tfjs-converter repository.';
            }
            else {
                message += ' Please make sure the server is serving valid ' +
                    'JSON for this request.';
            }
            throw new Error(message);
        }
        // We do not allow both modelTopology and weightsManifest to be missing.
        const modelTopology = modelJSON.modelTopology;
        const weightsManifest = modelJSON.weightsManifest;
        if (modelTopology == null && weightsManifest == null) {
            throw new Error(`The JSON from HTTP path ${this.path} contains neither model ` +
                `topology or manifest for weights.`);
        }
        return getModelArtifactsForJSON(modelJSON, (weightsManifest) => this.loadWeights(weightsManifest));
    }
    async loadWeights(weightsManifest) {
        const weightPath = Array.isArray(this.path) ? this.path[1] : this.path;
        const [prefix, suffix] = parseUrl(weightPath);
        const pathPrefix = this.weightPathPrefix || prefix;
        const weightSpecs = [];
        for (const entry of weightsManifest) {
            weightSpecs.push(...entry.weights);
        }
        const fetchURLs = [];
        const urlPromises = [];
        for (const weightsGroup of weightsManifest) {
            for (const path of weightsGroup.paths) {
                if (this.weightUrlConverter != null) {
                    urlPromises.push(this.weightUrlConverter(path));
                }
                else {
                    fetchURLs.push(pathPrefix + path + suffix);
                }
            }
        }
        if (this.weightUrlConverter) {
            fetchURLs.push(...await Promise.all(urlPromises));
        }
        const buffers = await loadWeightsAsArrayBuffer(fetchURLs, {
            requestInit: this.requestInit,
            fetchFunc: this.fetch,
            onProgress: this.onProgress
        });
        return [weightSpecs, concatenateArrayBuffers(buffers)];
    }
}
HTTPRequest.URL_SCHEME_REGEX = /^https?:\/\//;
/**
 * Extract the prefix and suffix of the url, where the prefix is the path before
 * the last file, and suffix is the search params after the last file.
 * ```
 * const url = 'http://tfhub.dev/model/1/tensorflowjs_model.pb?tfjs-format=file'
 * [prefix, suffix] = parseUrl(url)
 * // prefix = 'http://tfhub.dev/model/1/'
 * // suffix = '?tfjs-format=file'
 * ```
 * @param url the model url to be parsed.
 */
function parseUrl(url) {
    const lastSlash = url.lastIndexOf('/');
    const lastSearchParam = url.lastIndexOf('?');
    const prefix = url.substring(0, lastSlash);
    const suffix = lastSearchParam > lastSlash ? url.substring(lastSearchParam) : '';
    return [prefix + '/', suffix];
}
function isHTTPScheme(url) {
    return url.match(HTTPRequest.URL_SCHEME_REGEX) != null;
}
const httpRouter = (url, loadOptions) => {
    if (typeof fetch === 'undefined' &&
        (loadOptions == null || loadOptions.fetchFunc == null)) {
        // `http` uses `fetch` or `node-fetch`, if one wants to use it in
        // an environment that is not the browser or node they have to setup a
        // global fetch polyfill.
        return null;
    }
    else {
        let isHTTP = true;
        if (Array.isArray(url)) {
            isHTTP = url.every(urlItem => isHTTPScheme(urlItem));
        }
        else {
            isHTTP = isHTTPScheme(url);
        }
        if (isHTTP) {
            return http(url, loadOptions);
        }
    }
    return null;
};
IORouterRegistry.registerSaveRouter(httpRouter);
IORouterRegistry.registerLoadRouter(httpRouter);
/**
 * Creates an IOHandler subtype that sends model artifacts to HTTP server.
 *
 * An HTTP request of the `multipart/form-data` mime type will be sent to the
 * `path` URL. The form data includes artifacts that represent the topology
 * and/or weights of the model. In the case of Keras-style `tf.Model`, two
 * blobs (files) exist in form-data:
 *   - A JSON file consisting of `modelTopology` and `weightsManifest`.
 *   - A binary weights file consisting of the concatenated weight values.
 * These files are in the same format as the one generated by
 * [tfjs_converter](https://js.tensorflow.org/tutorials/import-keras.html).
 *
 * The following code snippet exemplifies the client-side code that uses this
 * function:
 *
 * ```js
 * const model = tf.sequential();
 * model.add(
 *     tf.layers.dense({units: 1, inputShape: [100], activation: 'sigmoid'}));
 *
 * const saveResult = await model.save(tf.io.http(
 *     'http://model-server:5000/upload', {requestInit: {method: 'PUT'}}));
 * console.log(saveResult);
 * ```
 *
 * If the default `POST` method is to be used, without any custom parameters
 * such as headers, you can simply pass an HTTP or HTTPS URL to `model.save`:
 *
 * ```js
 * const saveResult = await model.save('http://model-server:5000/upload');
 * ```
 *
 * The following GitHub Gist
 * https://gist.github.com/dsmilkov/1b6046fd6132d7408d5257b0976f7864
 * implements a server based on [flask](https://github.com/pallets/flask) that
 * can receive the request. Upon receiving the model artifacts via the requst,
 * this particular server reconsistutes instances of [Keras
 * Models](https://keras.io/models/model/) in memory.
 *
 *
 * @param path A URL path to the model.
 *   Can be an absolute HTTP path (e.g.,
 *   'http://localhost:8000/model-upload)') or a relative path (e.g.,
 *   './model-upload').
 * @param requestInit Request configurations to be used when sending
 *    HTTP request to server using `fetch`. It can contain fields such as
 *    `method`, `credentials`, `headers`, `mode`, etc. See
 *    https://developer.mozilla.org/en-US/docs/Web/API/Request/Request
 *    for more information. `requestInit` must not have a body, because the
 * body will be set by TensorFlow.js. File blobs representing the model
 * topology (filename: 'model.json') and the weights of the model (filename:
 * 'model.weights.bin') will be appended to the body. If `requestInit` has a
 * `body`, an Error will be thrown.
 * @param loadOptions Optional configuration for the loading. It includes the
 *   following fields:
 *   - weightPathPrefix Optional, this specifies the path prefix for weight
 *     files, by default this is calculated from the path param.
 *   - fetchFunc Optional, custom `fetch` function. E.g., in Node.js,
 *     the `fetch` from node-fetch can be used here.
 *   - onProgress Optional, progress callback function, fired periodically
 *     before the load is completed.
 * @returns An instance of `IOHandler`.
 *
 * @doc {
 *   heading: 'Models',
 *   subheading: 'Loading',
 *   namespace: 'io',
 *   ignoreCI: true
 * }
 */
function http(path, loadOptions) {
    return new HTTPRequest(path, loadOptions);
}
/**
 * Deprecated. Use `tf.io.http`.
 * @param path
 * @param loadOptions
 */
function browserHTTPRequest(path, loadOptions) {
    return http(path, loadOptions);
}

export { browserHTTPRequest as b, http as h, isHTTPScheme as i, loadWeights as l, weightsLoaderFactory as w };
