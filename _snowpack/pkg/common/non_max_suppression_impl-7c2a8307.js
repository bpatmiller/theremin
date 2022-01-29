import { e as env, E as ENGINE, bS as getTensorsInContainer, g as complex, bi as makeTensor, n as buffer } from './fused_util-14ebb22b.js';
import { Q as makeZerosTypedArray, s as sizeFromShape, H as isTypedArray } from './util_base-b10b4a9e.js';

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
 * Enables production mode which disables correctness checks in favor of
 * performance.
 *
 * @doc {heading: 'Environment'}
 */
function enableProdMode() {
    env().set('PROD', true);
}
/**
 * Enables debug mode which will log information about all executed kernels:
 * the elapsed time of the kernel execution, as well as the rank, shape, and
 * size of the output tensor.
 *
 * Debug mode will significantly slow down your application as it will
 * download the result of every operation to the CPU. This should not be used in
 * production. Debug mode does not affect the timing information of the kernel
 * execution as we do not measure download time in the kernel execution time.
 *
 * See also: `tf.profile`, `tf.memory`.
 *
 * @doc {heading: 'Environment'}
 */
function enableDebugMode() {
    env().set('DEBUG', true);
}
/** Globally disables deprecation warnings */
function disableDeprecationWarnings() {
    env().set('DEPRECATION_WARNINGS_ENABLED', false);
    console.warn(`TensorFlow.js deprecation warnings have been disabled.`);
}
/** Warn users about deprecated functionality. */
function deprecationWarn(msg) {
    if (env().getBool('DEPRECATION_WARNINGS_ENABLED')) {
        console.warn(msg + ' You can disable deprecation warnings with ' +
            'tf.disableDeprecationWarnings().');
    }
}
/**
 * Dispose all variables kept in backend engine.
 *
 * @doc {heading: 'Environment'}
 */
function disposeVariables() {
    ENGINE.disposeVariables();
}
/**
 * It returns the global engine that keeps track of all tensors and backends.
 *
 * @doc {heading: 'Environment'}
 */
function engine() {
    return ENGINE;
}
/**
 * Returns memory info at the current time in the program. The result is an
 * object with the following properties:
 *
 * - `numBytes`: Number of bytes allocated (undisposed) at this time.
 * - `numTensors`: Number of unique tensors allocated.
 * - `numDataBuffers`: Number of unique data buffers allocated
 *   (undisposed) at this time, which is ≤ the number of tensors
 *   (e.g. `a.reshape(newShape)` makes a new Tensor that shares the same
 *   data buffer with `a`).
 * - `unreliable`: True if the memory usage is unreliable. See `reasons` when
 *    `unreliable` is true.
 * - `reasons`: `string[]`, reasons why the memory is unreliable, present if
 *    `unreliable` is true.
 *
 * WebGL Properties:
 * - `numBytesInGPU`: Number of bytes allocated (undisposed) in the GPU only at
 *     this time.
 *
 * @doc {heading: 'Performance', subheading: 'Memory'}
 */
function memory() {
    return ENGINE.memory();
}
/**
 * Executes the provided function `f()` and returns a promise that resolves
 * with information about the function's memory use:
 * - `newBytes`: the number of new bytes allocated
 * - `newTensors`: the number of new tensors created
 * - `peakBytes`: the peak number of bytes allocated
 * - `kernels`: an array of objects for each kernel involved that reports
 * their input and output shapes, number of bytes used, and number of new
 * tensors created.
 * - `kernelNames`: an array of unique strings with just the names of the
 * kernels in the `kernels` array.
 *
 * ```js
 * const profile = await tf.profile(() => {
 *   const x = tf.tensor1d([1, 2, 3]);
 *   let x2 = x.square();
 *   x2.dispose();
 *   x2 = x.square();
 *   x2.dispose();
 *   return x;
 * });
 *
 * console.log(`newBytes: ${profile.newBytes}`);
 * console.log(`newTensors: ${profile.newTensors}`);
 * console.log(`byte usage over all kernels: ${profile.kernels.map(k =>
 * k.totalBytesSnapshot)}`);
 * ```
 *
 *
 * @doc {heading: 'Performance', subheading: 'Profile'}
 */
function profile(f) {
    return ENGINE.profile(f);
}
/**
 * Executes the provided function `fn` and after it is executed, cleans up all
 * intermediate tensors allocated by `fn` except those returned by `fn`.
 * `fn` must not return a Promise (async functions not allowed). The returned
 * result can be a complex object.
 *
 * Using this method helps avoid memory leaks. In general, wrap calls to
 * operations in `tf.tidy` for automatic memory cleanup.
 *
 * NOTE: Variables do *not* get cleaned up when inside a tidy(). If you want to
 * dispose variables, please use `tf.disposeVariables` or call dispose()
 * directly on variables.
 *
 * ```js
 * // y = 2 ^ 2 + 1
 * const y = tf.tidy(() => {
 *   // a, b, and one will be cleaned up when the tidy ends.
 *   const one = tf.scalar(1);
 *   const a = tf.scalar(2);
 *   const b = a.square();
 *
 *   console.log('numTensors (in tidy): ' + tf.memory().numTensors);
 *
 *   // The value returned inside the tidy function will return
 *   // through the tidy, in this case to the variable y.
 *   return b.add(one);
 * });
 *
 * console.log('numTensors (outside tidy): ' + tf.memory().numTensors);
 * y.print();
 * ```
 *
 * @param nameOrFn The name of the closure, or the function to execute.
 *     If a name is provided, the 2nd argument should be the function.
 *     If debug mode is on, the timing and the memory usage of the function
 *     will be tracked and displayed on the console using the provided name.
 * @param fn The function to execute.
 *
 * @doc {heading: 'Performance', subheading: 'Memory'}
 */
function tidy(nameOrFn, fn) {
    return ENGINE.tidy(nameOrFn, fn);
}
/**
 * Disposes any `tf.Tensor`s found within the provided object.
 *
 * @param container an object that may be a `tf.Tensor` or may directly
 *     contain `tf.Tensor`s, such as a `Tensor[]` or `{key: Tensor, ...}`. If
 *     the object is not a `tf.Tensor` or does not contain `Tensors`, nothing
 *     happens. In general it is safe to pass any object here, except that
 *     `Promise`s are not supported.
 *
 * @doc {heading: 'Performance', subheading: 'Memory'}
 */
function dispose(container) {
    const tensors = getTensorsInContainer(container);
    tensors.forEach(tensor => tensor.dispose());
}
/**
 * Keeps a `tf.Tensor` generated inside a `tf.tidy` from being disposed
 * automatically.
 *
 * ```js
 * let b;
 * const y = tf.tidy(() => {
 *   const one = tf.scalar(1);
 *   const a = tf.scalar(2);
 *
 *   // b will not be cleaned up by the tidy. a and one will be cleaned up
 *   // when the tidy ends.
 *   b = tf.keep(a.square());
 *
 *   console.log('numTensors (in tidy): ' + tf.memory().numTensors);
 *
 *   // The value returned inside the tidy function will return
 *   // through the tidy, in this case to the variable y.
 *   return b.add(one);
 * });
 *
 * console.log('numTensors (outside tidy): ' + tf.memory().numTensors);
 * console.log('y:');
 * y.print();
 * console.log('b:');
 * b.print();
 * ```
 *
 * @param result The tensor to keep from being disposed.
 *
 * @doc {heading: 'Performance', subheading: 'Memory'}
 */
function keep(result) {
    return ENGINE.keep(result);
}
/**
 * Executes `f()` and returns a promise that resolves with timing
 * information.
 *
 * The result is an object with the following properties:
 *
 * - `wallMs`: Wall execution time.
 * - `kernelMs`: Kernel execution time, ignoring data transfer. If using the
 * WebGL backend and the query timer extension is not available, this will
 * return an error object.
 * - On `WebGL` The following additional properties exist:
 *   - `uploadWaitMs`: CPU blocking time on texture uploads.
 *   - `downloadWaitMs`: CPU blocking time on texture downloads (readPixels).
 *
 * ```js
 * const x = tf.randomNormal([20, 20]);
 * const time = await tf.time(() => x.matMul(x));
 *
 * console.log(`kernelMs: ${time.kernelMs}, wallTimeMs: ${time.wallMs}`);
 * ```
 *
 * @param f The function to execute and time.
 *
 * @doc {heading: 'Performance', subheading: 'Timing'}
 */
function time(f) {
    return ENGINE.time(f);
}
/**
 * Sets the backend (cpu, webgl, wasm, etc) responsible for creating tensors and
 * executing operations on those tensors. Returns a promise that resolves
 * to a boolean if the backend initialization was successful.
 *
 * Note this disposes the current backend, if any, as well as any tensors
 * associated with it. A new backend is initialized, even if it is of the
 * same type as the previous one.
 *
 * @param backendName The name of the backend. Currently supports
 *     `'webgl'|'cpu'` in the browser, `'tensorflow'` under node.js
 *     (requires tfjs-node), and `'wasm'` (requires tfjs-backend-wasm).
 *
 * @doc {heading: 'Backends'}
 */
function setBackend(backendName) {
    return ENGINE.setBackend(backendName);
}
/**
 * Returns a promise that resolves when the currently selected backend (or the
 * highest priority one) has initialized. Await this promise when you are using
 * a backend that has async initialization.
 *
 * @doc {heading: 'Backends'}
 */
function ready() {
    return ENGINE.ready();
}
/**
 * Returns the current backend name (cpu, webgl, etc). The backend is
 * responsible for creating tensors and executing operations on those tensors.
 *
 * @doc {heading: 'Backends'}
 */
function getBackend() {
    return ENGINE.backendName;
}
/**
 * Removes a backend and the registered factory.
 *
 * @doc {heading: 'Backends'}
 */
function removeBackend(name) {
    ENGINE.removeBackend(name);
}
/**
 * Finds the backend registered under the provided name. Returns null if the
 * name is not in the registry, or the registration hasn't finished yet.
 */
function findBackend(name) {
    return ENGINE.findBackend(name);
}
/**
 * Finds the backend factory registered under the provided name. Returns a
 * function that produces a new backend when called. Returns null if the name
 * is not in the registry.
 */
function findBackendFactory(name) {
    return ENGINE.findBackendFactory(name);
}
/**
 * Registers a global backend. The registration should happen when importing
 * a module file (e.g. when importing `backend_webgl.ts`), and is used for
 * modular builds (e.g. custom tfjs bundle with only webgl support).
 *
 * @param factory The backend factory function. When called, it should
 * return a backend instance, or a promise of an instance.
 * @param priority The priority of the backend (higher = more important).
 *     In case multiple backends are registered, the priority is used to find
 *     the best backend. Defaults to 1.
 * @return False if there is already a registered backend under this name, true
 *     if not.
 *
 * @doc {heading: 'Backends'}
 */
function registerBackend(name, factory, priority = 1) {
    return ENGINE.registerBackend(name, factory, priority);
}
/**
 * Gets the current backend. If no backends have been initialized, this will
 * attempt to initialize the best backend. Will throw an error if the highest
 * priority backend has async initialization, in which case, you should call
 * 'await tf.ready()' before running other code.
 *
 * @doc {heading: 'Backends'}
 */
function backend() {
    return ENGINE.backend;
}
/**
 * Sets the global platform.
 *
 * @param platformName The name of this platform.
 * @param platform A platform implementation.
 */
function setPlatform(platformName, platform) {
    env().setPlatform(platformName, platform);
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
 * Creates a `tf.Tensor` with all elements set to 0.
 *
 * ```js
 * tf.zeros([2, 2]).print();
 * ```
 *
 * @param shape An array of integers defining the output tensor shape.
 * @param dtype The type of an element in the resulting tensor. Can
 *     be 'float32', 'int32' or 'bool'. Defaults to 'float'.
 *
 * @doc {heading: 'Tensors', subheading: 'Creation'}
 */
function zeros(shape, dtype = 'float32') {
    if (dtype === 'complex64') {
        const real = zeros(shape, 'float32');
        const imag = zeros(shape, 'float32');
        return complex(real, imag);
    }
    const values = makeZerosTypedArray(sizeFromShape(shape), dtype);
    return ENGINE.makeTensor(values, shape, dtype);
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
 * Creates rank-0 `tf.Tensor` (scalar) with the provided value and dtype.
 *
 * The same functionality can be achieved with `tf.tensor`, but in general
 * we recommend using `tf.scalar` as it makes the code more readable.
 *
 * ```js
 * tf.scalar(3.14).print();
 * ```
 *
 * @param value The value of the scalar.
 * @param dtype The data type.
 *
 * @doc {heading: 'Tensors', subheading: 'Creation'}
 */
function scalar(value, dtype) {
    if (((isTypedArray(value) && dtype !== 'string') || Array.isArray(value)) &&
        dtype !== 'complex64') {
        throw new Error('Error creating a new Scalar: value must be a primitive ' +
            '(number|boolean|string)');
    }
    if (dtype === 'string' && isTypedArray(value) &&
        !(value instanceof Uint8Array)) {
        throw new Error('When making a scalar from encoded string, ' +
            'the value must be `Uint8Array`.');
    }
    const shape = [];
    const inferredShape = [];
    return makeTensor(value, shape, inferredShape, dtype);
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
function whereImpl(condShape, condVals) {
    const indices = [];
    for (let i = 0; i < condVals.length; i++) {
        if (condVals[i]) {
            indices.push(i);
        }
    }
    const inBuffer = buffer(condShape, 'int32');
    const out = buffer([indices.length, condShape.length], 'int32');
    for (let i = 0; i < indices.length; i++) {
        const loc = inBuffer.indexToLoc(indices[i]);
        const offset = i * condShape.length;
        out.values.set(loc, offset);
    }
    return out.toTensor();
}

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
 * Inserts a value into a sorted array. This method allows duplicate, meaning it
 * allows inserting duplicate value, in which case, the element will be inserted
 * at the lowest index of the value.
 * @param arr The array to modify.
 * @param element The element to insert.
 * @param comparator Optional. If no comparator is specified, elements are
 * compared using array_util.defaultComparator, which is suitable for Strings
 * and Numbers in ascending arrays. If the array contains multiple instances of
 * the target value, the left-most instance will be returned. To provide a
 * comparator, it should take 2 arguments to compare and return a negative,
 * zero, or a positive number.
 */
function binaryInsert(arr, element, comparator) {
    const index = binarySearch(arr, element, comparator);
    const insertionPoint = index < 0 ? -(index + 1) : index;
    arr.splice(insertionPoint, 0, element);
}
/**
 * Searches the array for the target using binary search, returns the index
 * of the found element, or position to insert if element not found. If no
 * comparator is specified, elements are compared using array_
 * util.defaultComparator, which is suitable for Strings and Numbers in
 * ascending arrays. If the array contains multiple instances of the target
 * value, the left-most instance will be returned.
 * @param arr The array to be searched in.
 * @param target The target to be searched for.
 * @param comparator Should take 2 arguments to compare and return a negative,
 *    zero, or a positive number.
 * @return Lowest index of the target value if found, otherwise the insertion
 *    point where the target should be inserted, in the form of
 *    (-insertionPoint - 1).
 */
function binarySearch(arr, target, comparator) {
    return binarySearch_(arr, target, comparator || defaultComparator);
}
/**
 * Compares its two arguments for order.
 * @param a The first element to be compared.
 * @param b The second element to be compared.
 * @return A negative number, zero, or a positive number as the first
 *     argument is less than, equal to, or greater than the second.
 */
function defaultComparator(a, b) {
    return a > b ? 1 : a < b ? -1 : 0;
}
function binarySearch_(arr, target, comparator) {
    let left = 0;
    let right = arr.length;
    let middle = 0;
    let found = false;
    while (left < right) {
        middle = left + ((right - left) >>> 1);
        const compareResult = comparator(target, arr[middle]);
        if (compareResult > 0) {
            left = middle + 1;
        }
        else {
            right = middle;
            // If compareResult is 0, the value is found. We record it is found,
            // and then keep looking because there may be duplicate.
            found = !compareResult;
        }
    }
    return found ? left : -left - 1;
}

/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
function nonMaxSuppressionV3Impl(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold) {
    return nonMaxSuppressionImpl_(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold, 0 /* softNmsSigma */);
}
function nonMaxSuppressionV4Impl(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold, padToMaxOutputSize) {
    return nonMaxSuppressionImpl_(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold, 0 /* softNmsSigma */, false /* returnScoresTensor */, padToMaxOutputSize /* padToMaxOutputSize */, true
    /* returnValidOutputs */ );
}
function nonMaxSuppressionV5Impl(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold, softNmsSigma) {
    return nonMaxSuppressionImpl_(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold, softNmsSigma, true /* returnScoresTensor */);
}
function nonMaxSuppressionImpl_(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold, softNmsSigma, returnScoresTensor = false, padToMaxOutputSize = false, returnValidOutputs = false) {
    // The list is sorted in ascending order, so that we can always pop the
    // candidate with the largest score in O(1) time.
    const candidates = [];
    for (let i = 0; i < scores.length; i++) {
        if (scores[i] > scoreThreshold) {
            candidates.push({ score: scores[i], boxIndex: i, suppressBeginIndex: 0 });
        }
    }
    candidates.sort(ascendingComparator);
    // If softNmsSigma is 0, the outcome of this algorithm is exactly same as
    // before.
    const scale = softNmsSigma > 0 ? (-0.5 / softNmsSigma) : 0.0;
    const selectedIndices = [];
    const selectedScores = [];
    while (selectedIndices.length < maxOutputSize && candidates.length > 0) {
        const candidate = candidates.pop();
        const { score: originalScore, boxIndex, suppressBeginIndex } = candidate;
        if (originalScore < scoreThreshold) {
            break;
        }
        // Overlapping boxes are likely to have similar scores, therefore we
        // iterate through the previously selected boxes backwards in order to
        // see if candidate's score should be suppressed. We use
        // suppressBeginIndex to track and ensure a candidate can be suppressed
        // by a selected box no more than once. Also, if the overlap exceeds
        // iouThreshold, we simply ignore the candidate.
        let ignoreCandidate = false;
        for (let j = selectedIndices.length - 1; j >= suppressBeginIndex; --j) {
            const iou = intersectionOverUnion(boxes, boxIndex, selectedIndices[j]);
            if (iou >= iouThreshold) {
                ignoreCandidate = true;
                break;
            }
            candidate.score =
                candidate.score * suppressWeight(iouThreshold, scale, iou);
            if (candidate.score <= scoreThreshold) {
                break;
            }
        }
        // At this point, if `candidate.score` has not dropped below
        // `scoreThreshold`, then we know that we went through all of the
        // previous selections and can safely update `suppressBeginIndex` to the
        // end of the selected array. Then we can re-insert the candidate with
        // the updated score and suppressBeginIndex back in the candidate list.
        // If on the other hand, `candidate.score` has dropped below the score
        // threshold, we will not add it back to the candidates list.
        candidate.suppressBeginIndex = selectedIndices.length;
        if (!ignoreCandidate) {
            // Candidate has passed all the tests, and is not suppressed, so
            // select the candidate.
            if (candidate.score === originalScore) {
                selectedIndices.push(boxIndex);
                selectedScores.push(candidate.score);
            }
            else if (candidate.score > scoreThreshold) {
                // Candidate's score is suppressed but is still high enough to be
                // considered, so add back to the candidates list.
                binaryInsert(candidates, candidate, ascendingComparator);
            }
        }
    }
    // NonMaxSuppressionV4 feature: padding output to maxOutputSize.
    const validOutputs = selectedIndices.length;
    const elemsToPad = maxOutputSize - validOutputs;
    if (padToMaxOutputSize && elemsToPad > 0) {
        selectedIndices.push(...new Array(elemsToPad).fill(0));
        selectedScores.push(...new Array(elemsToPad).fill(0.0));
    }
    const result = { selectedIndices };
    if (returnScoresTensor) {
        result['selectedScores'] = selectedScores;
    }
    if (returnValidOutputs) {
        result['validOutputs'] = validOutputs;
    }
    return result;
}
function intersectionOverUnion(boxes, i, j) {
    const iCoord = boxes.subarray(i * 4, i * 4 + 4);
    const jCoord = boxes.subarray(j * 4, j * 4 + 4);
    const yminI = Math.min(iCoord[0], iCoord[2]);
    const xminI = Math.min(iCoord[1], iCoord[3]);
    const ymaxI = Math.max(iCoord[0], iCoord[2]);
    const xmaxI = Math.max(iCoord[1], iCoord[3]);
    const yminJ = Math.min(jCoord[0], jCoord[2]);
    const xminJ = Math.min(jCoord[1], jCoord[3]);
    const ymaxJ = Math.max(jCoord[0], jCoord[2]);
    const xmaxJ = Math.max(jCoord[1], jCoord[3]);
    const areaI = (ymaxI - yminI) * (xmaxI - xminI);
    const areaJ = (ymaxJ - yminJ) * (xmaxJ - xminJ);
    if (areaI <= 0 || areaJ <= 0) {
        return 0.0;
    }
    const intersectionYmin = Math.max(yminI, yminJ);
    const intersectionXmin = Math.max(xminI, xminJ);
    const intersectionYmax = Math.min(ymaxI, ymaxJ);
    const intersectionXmax = Math.min(xmaxI, xmaxJ);
    const intersectionArea = Math.max(intersectionYmax - intersectionYmin, 0.0) *
        Math.max(intersectionXmax - intersectionXmin, 0.0);
    return intersectionArea / (areaI + areaJ - intersectionArea);
}
// A Gaussian penalty function, this method always returns values in [0, 1].
// The weight is a function of similarity, the more overlap two boxes are, the
// smaller the weight is, meaning highly overlapping boxe will be significantly
// penalized. On the other hand, a non-overlapping box will not be penalized.
function suppressWeight(iouThreshold, scale, iou) {
    const weight = Math.exp(scale * iou * iou);
    return iou <= iouThreshold ? weight : 0.0;
}
function ascendingComparator(c1, c2) {
    // For objects with same scores, we make the object with the larger index go
    // first. In an array that pops from the end, this means that the object with
    // the smaller index will be popped first. This ensures the same output as
    // the TensorFlow python version.
    return (c1.score - c2.score) ||
        ((c1.score === c2.score) && (c2.boxIndex - c1.boxIndex));
}

export { setPlatform as A, nonMaxSuppressionV5Impl as a, nonMaxSuppressionV4Impl as b, enableProdMode as c, dispose as d, engine as e, enableDebugMode as f, disableDeprecationWarnings as g, deprecationWarn as h, disposeVariables as i, time as j, keep as k, setBackend as l, memory as m, nonMaxSuppressionV3Impl as n, ready as o, profile as p, getBackend as q, registerBackend as r, scalar as s, tidy as t, removeBackend as u, findBackend as v, whereImpl as w, findBackendFactory as x, backend as y, zeros as z };
