import './base_side_effects-da8c2899.js';
import { ae as assertAndGetBroadcastShape, bV as getBroadcastDims, n as buffer, bW as createScalarValue, bX as computeOutAndReduceShapes, bY as upcastType, bZ as encodeString, b_ as fingerPrint64, b4 as TensorBuffer } from './fused_util-14ebb22b.js';
import { P as computeStrides, s as sizeFromShape, D as getTypedArrayFromDType, U as indexToLoc, T as locToIndex, Q as makeZerosTypedArray, E as getArrayFromDType, q as swap, p as parseAxisParam } from './util_base-b10b4a9e.js';
import { f as fromUint8ToStringArray, i as isSliceContinous, c as computeFlatOffset, a as fromStringArrayToUint8, g as getSparseFillEmptyRowsIndicesDenseShapeMismatch, b as getSparseFillEmptyRowsNegativeIndexErrorMessage, d as getSparseFillEmptyRowsOutOfRangeIndexErrorMessage, e as getSparseReshapeMultipleNegativeOneOutputDimErrorMessage, h as getSparseReshapeNegativeOutputDimErrorMessage, j as getSparseReshapeEmptyTensorZeroOutputDimErrorMessage, k as getSparseReshapeInputOutputMultipleErrorMessage, l as getSparseReshapeInputOutputMismatchErrorMessage, m as getSparseSegmentReductionNegativeSegmentIdsErrorMessage, n as getSparseSegmentReductionNonIncreasingSegmentIdsErrorMessage, o as getSparseSegmentReductionSegmentIdOutOfRangeErrorMessage, p as getSparseSegmentReductionIndicesOutOfRangeErrorMessage } from './backend_util-16d73b56.js';

/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function simpleAbsImpl(vals) {
    const resultValues = new Float32Array(vals.length);
    for (let i = 0; i < vals.length; ++i) {
        resultValues[i] = Math.abs(vals[i]);
    }
    return resultValues;
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
/**
 * Template that creates implementation for binary ops. Supports broadcast.
 */
function createSimpleBinaryKernelImpl(op) {
    return (aShape, bShape, aVals, bVals, dtype) => {
        const newShape = assertAndGetBroadcastShape(aShape, bShape);
        const resultRank = newShape.length;
        const resultStrides = computeStrides(newShape);
        const resultSize = sizeFromShape(newShape);
        const result = getTypedArrayFromDType(dtype, resultSize);
        const aRank = aShape.length;
        const bRank = bShape.length;
        const aStrides = computeStrides(aShape);
        const bStrides = computeStrides(bShape);
        const aBroadcastDims = getBroadcastDims(aShape, newShape);
        const bBroadcastDims = getBroadcastDims(bShape, newShape);
        if (aBroadcastDims.length + bBroadcastDims.length === 0) {
            for (let i = 0; i < result.length; ++i) {
                result[i] = op(aVals[i % aVals.length], bVals[i % bVals.length]);
            }
        }
        else {
            for (let i = 0; i < result.length; ++i) {
                const loc = indexToLoc(i, resultRank, resultStrides);
                const aLoc = loc.slice(-aRank);
                aBroadcastDims.forEach(d => aLoc[d] = 0);
                const aIndex = locToIndex(aLoc, aRank, aStrides);
                const bLoc = loc.slice(-bRank);
                bBroadcastDims.forEach(d => bLoc[d] = 0);
                const bIndex = locToIndex(bLoc, bRank, bStrides);
                result[i] = op(aVals[aIndex], bVals[bIndex]);
            }
        }
        return [result, newShape];
    };
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
const addImpl = createSimpleBinaryKernelImpl(((a, b) => a + b));

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
function bincountImpl(xVals, weightsVals, weightsDtype, weightsShape, size) {
    const weightsSize = sizeFromShape(weightsShape);
    const outVals = makeZerosTypedArray(size, weightsDtype);
    for (let i = 0; i < xVals.length; i++) {
        const value = xVals[i];
        if (value < 0) {
            throw new Error('Input x must be non-negative!');
        }
        if (value >= size) {
            continue;
        }
        if (weightsSize > 0) {
            outVals[value] += weightsVals[i];
        }
        else {
            outVals[value] += 1;
        }
    }
    return outVals;
}
function bincountReduceImpl(xBuf, weightsBuf, size, binaryOutput = false) {
    const numRows = xBuf.shape[0];
    const numCols = xBuf.shape[1];
    const outBuf = buffer([numRows, size], weightsBuf.dtype);
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            const value = xBuf.get(i, j);
            if (value < 0) {
                throw new Error('Input x must be non-negative!');
            }
            if (value >= size) {
                continue;
            }
            if (binaryOutput) {
                outBuf.set(1, i, value);
            }
            else {
                if (weightsBuf.size > 0) {
                    outBuf.set(outBuf.get(i, value) + weightsBuf.get(i, j), i, value);
                }
                else {
                    outBuf.set(outBuf.get(i, value) + 1, i, value);
                }
            }
        }
    }
    return outBuf;
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
/**
 * Template that creates implementation for unary op.
 */
function createSimpleUnaryImpl(op) {
    return (values, dtype, attrs) => {
        const newValues = getTypedArrayFromDType(dtype, values.length);
        for (let i = 0; i < values.length; ++i) {
            newValues[i] = op(values[i], attrs);
        }
        return newValues;
    };
}

/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const ceilImpl = createSimpleUnaryImpl((xi) => Math.ceil(xi));

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
function concatImpl(inputs, outShape, dtype, simplyConcat) {
    const outVals = getArrayFromDType(dtype, sizeFromShape(outShape));
    if (simplyConcat && dtype !== 'string') {
        // Use built-in TypedArray.set() method for speed.
        let offset = 0;
        inputs.forEach(input => {
            const size = sizeFromShape(input.shape);
            outVals.set(input.vals, offset);
            offset += size;
        });
    }
    else {
        let colOffset = 0;
        inputs.forEach(input => {
            const decodedData = dtype === 'string' ?
                fromUint8ToStringArray(input.vals) :
                input.vals;
            let tIdx = 0;
            for (let row = 0; row < input.shape[0]; ++row) {
                const resIdx = row * outShape[1] + colOffset;
                for (let col = 0; col < input.shape[1]; ++col) {
                    outVals[resIdx + col] = decodedData[tIdx++];
                }
            }
            colOffset += input.shape[1];
        });
    }
    return outVals;
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
const equalImpl = createSimpleBinaryKernelImpl((a, b) => (a === b) ? 1 : 0);

/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const expImpl = createSimpleUnaryImpl((xi) => Math.exp(xi));

/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const expm1Impl = createSimpleUnaryImpl((xi) => Math.expm1(xi));

/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const floorImpl = createSimpleUnaryImpl((xi) => Math.floor(xi));

/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
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
function gatherNdImpl(indicesData, paramsBuf, dtype, numSlices, sliceRank, sliceSize, strides, paramsShape, paramsSize) {
    const outBuf = buffer([numSlices, sliceSize], dtype);
    for (let i = 0; i < numSlices; i++) {
        const index = [];
        let flattenIndex = 0;
        for (let j = 0; j < sliceRank; j++) {
            const dim = indicesData[i * sliceRank + j];
            flattenIndex += dim * strides[j];
            index.push(dim);
        }
        if (flattenIndex < 0 || flattenIndex >= paramsSize / sliceSize) {
            throw new Error(`Invalid indices: ${index} does not index into ${paramsShape}`);
        }
        for (let k = 0; k < sliceSize; k++) {
            outBuf.values[i * sliceSize + k] =
                paramsBuf.get(...paramsBuf.indexToLoc(flattenIndex * sliceSize + k));
        }
    }
    return outBuf;
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
function gatherV2Impl(xBuf, indicesBuf, flattenOutputShape) {
    const outBuf = buffer(flattenOutputShape, xBuf.dtype);
    for (let i = 0; i < outBuf.size; ++i) {
        const newLoc = outBuf.indexToLoc(i);
        const originalLoc = newLoc.slice();
        const batchIdx = originalLoc[0];
        const indicesIdx = originalLoc[2];
        const indicesIndex = indicesBuf.locToIndex([batchIdx, indicesIdx]);
        originalLoc[2] = indicesBuf.values[indicesIndex];
        const originalIndex = xBuf.locToIndex(originalLoc);
        if (0 <= originalIndex && originalIndex < xBuf.values.length) {
            outBuf.values[i] = xBuf.values[originalIndex];
        } // Else, index is out of bounds, so leave the default zero val in outBuf.
    }
    return outBuf;
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
const greaterImpl = createSimpleBinaryKernelImpl((a, b) => (a > b) ? 1 : 0);

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
const greaterEqualImpl = createSimpleBinaryKernelImpl((a, b) => (a >= b) ? 1 : 0);

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
const lessImpl = createSimpleBinaryKernelImpl((a, b) => (a < b) ? 1 : 0);

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
const lessEqualImpl = createSimpleBinaryKernelImpl((a, b) => (a <= b) ? 1 : 0);

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
function linSpaceImpl(start, stop, num) {
    const step = (stop - start) / (num - 1);
    const values = makeZerosTypedArray(num, 'float32');
    values[0] = start;
    for (let i = 1; i < values.length; i++) {
        values[i] = values[i - 1] + step;
    }
    return values;
}

/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const logImpl = createSimpleUnaryImpl((xi) => Math.log(xi));

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
function maxImpl(aVals, reduceSize, outShape, dtype) {
    const vals = getTypedArrayFromDType(dtype, sizeFromShape(outShape));
    for (let i = 0; i < vals.length; ++i) {
        const offset = i * reduceSize;
        let max = aVals[offset];
        for (let j = 0; j < reduceSize; ++j) {
            const value = aVals[offset + j];
            if (Number.isNaN(value) ||
                value > max) { // comparison with NaN always return false
                max = value;
            }
        }
        vals[i] = max;
    }
    return vals;
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
const maximumImpl = createSimpleBinaryKernelImpl(((aValue, bValue) => Math.max(aValue, bValue)));

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
const minimumImpl = createSimpleBinaryKernelImpl(((aValue, bValue) => Math.min(aValue, bValue)));

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
const multiplyImpl = createSimpleBinaryKernelImpl(((aValue, bValue) => aValue * bValue));

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
function negImpl(xVals, xShape, xDtype) {
    const minusOne = createScalarValue(-1, xDtype);
    return multiplyImpl([], xShape, minusOne, xVals, xDtype);
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
const notEqualImpl = createSimpleBinaryKernelImpl(((a, b) => (a !== b) ? 1 : 0));

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
function transposeImpl(xVals, xShape, dtype, perm, newShape) {
    const xRank = xShape.length;
    const xSize = sizeFromShape(xShape);
    const xStrides = computeStrides(xShape);
    const newStrides = computeStrides(newShape);
    const result = getTypedArrayFromDType(dtype, sizeFromShape(newShape));
    for (let i = 0; i < xSize; ++i) {
        const loc = indexToLoc(i, xRank, xStrides);
        // Permute location.
        const newLoc = new Array(loc.length);
        for (let i = 0; i < newLoc.length; i++) {
            newLoc[i] = loc[perm[i]];
        }
        const newIndex = locToIndex(newLoc, xRank, newStrides);
        result[newIndex] = xVals[i];
    }
    return result;
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
function prodImpl(xShape, xDtype, xVals, reductionAxes) {
    const [outShape, reduceShape] = computeOutAndReduceShapes(xShape, reductionAxes);
    const outDtype = upcastType(xDtype, 'int32');
    const outVals = makeZerosTypedArray(sizeFromShape(outShape), outDtype);
    const reduceSize = sizeFromShape(reduceShape);
    for (let i = 0; i < outVals.length; ++i) {
        const offset = i * reduceSize;
        let prod = 1;
        for (let j = 0; j < reduceSize; ++j) {
            prod *= xVals[offset + j];
        }
        outVals[i] = prod;
    }
    return { outVals, outShape, outDtype };
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
function rangeImpl(start, stop, step, dtype) {
    const sameStartStop = start === stop;
    const increasingRangeNegativeStep = start < stop && step < 0;
    const decreasingRangePositiveStep = stop < start && step > 1;
    if (sameStartStop || increasingRangeNegativeStep ||
        decreasingRangePositiveStep) {
        return makeZerosTypedArray(0, dtype);
    }
    const numElements = Math.abs(Math.ceil((stop - start) / step));
    const values = makeZerosTypedArray(numElements, dtype);
    if (stop < start && step === 1) {
        // Auto adjust the step's sign if it hasn't been set
        // (or was set to 1)
        step = -1;
    }
    values[0] = start;
    for (let i = 1; i < values.length; i++) {
        values[i] = values[i - 1] + step;
    }
    return values;
}

/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const rsqrtImpl = createSimpleUnaryImpl((xi) => 1 / Math.sqrt(xi));

/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const sigmoidImpl = createSimpleUnaryImpl((xi) => 1 / (1 + Math.exp(-xi)));

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
function sliceImpl(vals, begin, size, shape, dtype) {
    const isContinous = isSliceContinous(shape, begin, size);
    const length = sizeFromShape(size);
    const xStrides = computeStrides(shape);
    if (isContinous) {
        const flatOffset = computeFlatOffset(begin, xStrides);
        if (dtype === 'string') {
            return vals.slice(flatOffset, flatOffset + length);
        }
        return vals.subarray(flatOffset, flatOffset + length);
    }
    const decodedData = dtype === 'string' ?
        fromUint8ToStringArray(vals) :
        vals;
    const inBuf = buffer(shape, dtype, decodedData);
    const outBuf = buffer(size, dtype);
    for (let i = 0; i < outBuf.size; ++i) {
        const outLoc = outBuf.indexToLoc(i);
        const inLoc = outLoc.map((idx, j) => idx + begin[j]);
        outBuf.set(inBuf.get(...inLoc), ...outLoc);
    }
    if (dtype === 'string') {
        return fromStringArrayToUint8(outBuf.values);
    }
    return outBuf.values;
}

/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
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
function sparseFillEmptyRowsImpl(indices, indicesShape, indicesDType, values, valuesDType, denseShape, defaultValue) {
    const indicesCount = indicesShape[0];
    const denseRows = denseShape[0];
    const emptyRowIndicator = new Array(denseRows);
    const reverseIndexMap = new Array(indicesCount);
    const rank = indicesShape[1];
    if (denseRows === 0) {
        if (indicesCount !== 0) {
            throw new Error(getSparseFillEmptyRowsIndicesDenseShapeMismatch(indicesCount));
        }
        const outputIndices = getArrayFromDType(indicesDType, 0);
        const outputValues = getArrayFromDType(valuesDType, 0);
        return [
            outputIndices, [0, rank], outputValues, emptyRowIndicator, reverseIndexMap
        ];
    }
    let rowsAreOrdered = true;
    let lastIndicesRow = 0;
    const csrOffset = new Array(denseRows).fill(0);
    for (let i = 0; i < indicesCount; ++i) {
        // indices is a 2d tensor with shape of [N, rank]
        const row = indices[i * rank];
        if (row < 0) {
            throw new Error(getSparseFillEmptyRowsNegativeIndexErrorMessage(i, row));
        }
        if (row >= denseRows) {
            throw new Error(getSparseFillEmptyRowsOutOfRangeIndexErrorMessage(i, row, denseRows));
        }
        ++csrOffset[row];
        rowsAreOrdered = rowsAreOrdered && (row >= lastIndicesRow);
        lastIndicesRow = row;
    }
    let allRowsFull = true;
    for (let row = 0; row < denseRows; ++row) {
        // csrOffset here describes the number of elements in this dense row
        const rowEmpty = (csrOffset[row] === 0);
        emptyRowIndicator[row] = rowEmpty;
        allRowsFull = allRowsFull && !rowEmpty;
        // In filled version, each row has at least one element.
        csrOffset[row] = Math.max(csrOffset[row], 1);
        // Update csrOffset to represent the number of elements up to and
        // including denseRows + 1:
        //  csrOffset[0] == #{elements of row 0}
        //  csrOffset[1] == #{elements of row 1} + #{elements of row 0}
        //  ..
        //  csrOffset[i] == starting index for elements in row i + 1.
        if (row > 0) {
            csrOffset[row] += csrOffset[row - 1];
        }
    }
    if (allRowsFull && rowsAreOrdered) {
        const outputIndices = indices;
        const outputValues = values;
        for (let i = 0; i < indicesCount; ++i) {
            reverseIndexMap[i] = i;
        }
        return [
            outputIndices, [indicesCount, rank], outputValues, emptyRowIndicator,
            reverseIndexMap
        ];
    }
    else {
        const fullIndicesCount = csrOffset[denseRows - 1];
        const outputIndices = getArrayFromDType(indicesDType, fullIndicesCount * rank);
        const outputValues = getArrayFromDType(valuesDType, fullIndicesCount);
        const filledCount = new Array(denseRows).fill(0);
        // Fill in values for rows that are not missing
        for (let i = 0; i < indicesCount; ++i) {
            // indices is a 2d tensor with shape of [N, rank]
            const row = indices[i * rank];
            const offset = filledCount[row];
            const outputI = ((row === 0) ? 0 : csrOffset[row - 1]) + offset;
            filledCount[row]++; // Increment the filled count for this row.
            for (let j = 0; j < rank; ++j) {
                // indices and outputIndices are 2d tensors with shape of [N, rank]
                outputIndices[outputI * rank + j] = indices[i * rank + j];
            }
            outputValues[outputI] = values[i];
            // We'll need this reverse index map to backprop correctly.
            reverseIndexMap[i] = outputI;
        }
        // Fill in values for rows that are missing
        for (let row = 0; row < denseRows; ++row) {
            const rowCount = filledCount[row];
            if (rowCount === 0) { // We haven't filled this row
                const startingIndex = (row === 0) ? 0 : csrOffset[row - 1];
                // Remaining index values were set to zero already.
                // Just need to set the row index in the right location.
                // outputIndices is a 2d tensor with shape of [N, rank]
                outputIndices[startingIndex * rank + 0] = row;
                for (let col = 1; col < rank; ++col) {
                    outputIndices[startingIndex * rank + col] = 0;
                }
                outputValues[startingIndex] = defaultValue;
            }
        }
        return [
            outputIndices, [fullIndicesCount, rank], outputValues, emptyRowIndicator,
            reverseIndexMap
        ];
    }
}

/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
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
function sparseReshapeImpl(inputIndices, inputIndicesShape, inputDType, inputShape, targetShape) {
    const denseSize = sizeFromShape(inputShape);
    const nnz = inputIndicesShape[0];
    const outputRank = targetShape.length;
    // Compute the output shape. Determine product of specified dimensions, and
    // find the index of the unspecified one.
    const outputShape = [];
    let product = 1;
    let unknownIndex = -1;
    for (let d = 0; d < outputRank; ++d) {
        const size = targetShape[d];
        if (size === -1) {
            if (unknownIndex !== -1) {
                throw new Error(getSparseReshapeMultipleNegativeOneOutputDimErrorMessage(unknownIndex, d));
            }
            unknownIndex = d;
            outputShape.push(1);
        }
        else {
            if (size < 0) {
                throw new Error(getSparseReshapeNegativeOutputDimErrorMessage(d, size));
            }
            product *= size;
            outputShape.push(size);
        }
    }
    if (unknownIndex !== -1) {
        if (product <= 0) {
            throw new Error(getSparseReshapeEmptyTensorZeroOutputDimErrorMessage());
        }
        const missing = Math.trunc(denseSize / product);
        if (product * missing !== denseSize) {
            throw new Error(getSparseReshapeInputOutputMultipleErrorMessage(inputShape, outputShape));
        }
        outputShape[unknownIndex] = missing;
    }
    const outputSize = sizeFromShape(outputShape);
    if (outputSize !== denseSize) {
        throw new Error(getSparseReshapeInputOutputMismatchErrorMessage(inputShape, outputShape));
    }
    const inputRank = inputShape.length;
    const inputStrides = [];
    if (inputRank > 0) {
        inputStrides[inputRank - 1] = 1;
        for (let d = inputRank - 2; d >= 0; --d) {
            inputStrides[d] = inputStrides[d + 1] * inputShape[d + 1];
        }
    }
    const outputStrides = [];
    if (outputRank > 0) {
        outputStrides[outputRank - 1] = 1;
        for (let d = outputRank - 2; d >= 0; --d) {
            outputStrides[d] = outputStrides[d + 1] * outputShape[d + 1];
        }
    }
    const newIndices = getArrayFromDType(inputDType, nnz * outputRank);
    for (let i = 0; i < nnz; ++i) {
        let id = 0;
        for (let j = 0; j < inputRank; ++j) {
            // inputIndices is a 2d tensor with shape of [nnz, inputRank]
            id += inputIndices[i * inputRank + j] * inputStrides[j];
        }
        for (let j = 0; j < outputRank; ++j) {
            // newIndices is a 2d tensor with shape of [nnz, outputRank]
            newIndices[i * outputRank + j] = Math.trunc(id / outputStrides[j]);
            id %= outputStrides[j];
        }
    }
    return [newIndices, [nnz, outputRank], outputShape];
}

/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
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
function sparseSegmentReductionImpl(input, inputShape, inputDType, indices, segmentIds, isMean = false, defaultValue = 0) {
    const numIndices = indices.length;
    // Flatten the array to two dimensions
    const inputFlat = [inputShape[0], input.length / inputShape[0]];
    const numCol = inputFlat[1];
    // Note that the current implementation assumes that segmentIds values are
    // sorted.
    const lastSegmentIdPlusOne = numIndices > 0 ? segmentIds[numIndices - 1] + 1 : 0;
    const outputRows = lastSegmentIdPlusOne;
    if (outputRows < 0) {
        throw new Error(getSparseSegmentReductionNegativeSegmentIdsErrorMessage());
    }
    const outputShape = inputShape.slice();
    outputShape[0] = outputRows;
    const outputLength = outputShape.reduce((product, value) => product * value, 1);
    // Output array is initialized with the value 0 by default.
    const output = getArrayFromDType(inputDType, outputLength);
    // Note that we do not initialize the output buffer with a default value, so
    // we need to explicitly set missing indices to the default value.
    if (numIndices === 0) {
        if (outputRows > 0) {
            output.fill(defaultValue);
        }
        return [output, outputShape];
    }
    if (outputRows <= 0) {
        throw new Error(getSparseSegmentReductionNegativeSegmentIdsErrorMessage());
    }
    let start = 0, end = 1;
    // Index from which the output is not initialized.
    let uninitializedIndex = 0;
    let outIndex = segmentIds[start];
    while (true) {
        // We initialize nextIndex to 0 to avoid may be uninitialized warning
        let nextIndex = 0;
        if (end < numIndices) {
            nextIndex = segmentIds[end];
            if (outIndex === nextIndex) {
                ++end;
                continue;
            }
            // We have a new segment here.  Verify that the segment ids are growing.
            if (outIndex >= nextIndex) {
                throw new Error(getSparseSegmentReductionNonIncreasingSegmentIdsErrorMessage());
            }
        }
        if (outIndex < 0 || outIndex >= outputRows) {
            throw new Error(getSparseSegmentReductionSegmentIdOutOfRangeErrorMessage(outIndex, outputRows));
        }
        // If there is a gap between two indices, we need to set that gap to the
        // default value.
        if (outIndex > uninitializedIndex) {
            output.fill(defaultValue, uninitializedIndex * numCol, outIndex * numCol);
        }
        for (let i = start; i < end; ++i) {
            const index = indices[i];
            if (index < 0 || index >= inputFlat[0]) {
                throw new Error(getSparseSegmentReductionIndicesOutOfRangeErrorMessage(i, indices[i], inputFlat[0]));
            }
            for (let j = 0; j < numCol; j++) {
                output[outIndex * numCol + j] += input[index * numCol + j];
            }
        }
        if (isMean) {
            for (let j = 0; j < numCol; j++) {
                output[outIndex * numCol + j] /= end - start;
            }
        }
        start = end;
        ++end;
        uninitializedIndex = outIndex + 1;
        outIndex = nextIndex;
        if (end > numIndices) {
            break;
        }
    }
    // Fill the gap at the end with the default value.
    if (uninitializedIndex < outputRows) {
        output.fill(defaultValue, uninitializedIndex * numCol, outputRows * numCol);
    }
    return [output, outputShape];
}

/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const sqrtImpl = createSimpleUnaryImpl((xi) => Math.sqrt(xi));

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
const squaredDifferenceImpl = createSimpleBinaryKernelImpl(((a, b) => {
    const diff = a - b;
    return diff * diff;
}));

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
function stridedSliceImpl(outShape, xBuf, strides, begin) {
    const outBuf = buffer(outShape, xBuf.dtype);
    for (let i = 0; i < outBuf.size; i++) {
        const loc = outBuf.indexToLoc(i);
        const newLoc = new Array(loc.length);
        for (let j = 0; j < newLoc.length; j++) {
            newLoc[j] = loc[j] * strides[j] + begin[j];
        }
        outBuf.set(xBuf.get(...newLoc), ...loc);
    }
    return outBuf;
}

/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
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
 * The StringNGramsOp class creates ngrams from ragged string data.
 * The constructor contains all attributes related to the operation such as
 * padding widths and strings, and the compute function can be used to
 * compute the ngrams for different ragged tensor inputs.
 */
class StringNGramsOp {
    constructor(separator, nGramWidths, leftPad, rightPad, padWidth, preserveShortSequences) {
        this.separator = encodeString(separator);
        this.nGramWidths = nGramWidths;
        this.leftPad = encodeString(leftPad);
        this.rightPad = encodeString(rightPad);
        this.padWidth = padWidth;
        this.preserveShort = preserveShortSequences;
    }
    getPadWidth(nGramWidth) {
        // Ngrams can be padded with either a fixed pad width or a dynamic pad
        // width depending on the 'padWidth' arg, but in no case should the padding
        // ever be wider than 'nGramWidth' - 1.
        return Math.min(this.padWidth < 0 ? nGramWidth - 1 : this.padWidth, nGramWidth - 1);
    }
    getNumNGrams(length, nGramWidth) {
        const padWidth = this.getPadWidth(nGramWidth);
        return Math.max(0, ((length + 2 * padWidth) - nGramWidth) + 1);
    }
    createNGrams(data, splitIndex, output, outputStartIndex, numNGrams, nGramWidth) {
        for (let nGramIndex = 0; nGramIndex < numNGrams; ++nGramIndex) {
            const padWidth = this.getPadWidth(nGramWidth);
            const leftPadding = Math.max(0, padWidth - nGramIndex);
            const rightPadding = Math.max(0, padWidth - (numNGrams - (nGramIndex + 1)));
            const numTokens = nGramWidth - (leftPadding + rightPadding);
            const dataStartIndex = splitIndex + (leftPadding > 0 ? 0 : nGramIndex - padWidth);
            // Calculate the total expected size of the nGram so we can reserve the
            // correct amount of space in the string.
            let nGramSize = 0;
            // Size of the left padding.
            nGramSize += leftPadding * this.leftPad.length;
            // Size of the tokens.
            for (let n = 0; n < numTokens; ++n) {
                nGramSize += data[dataStartIndex + n].length;
            }
            // Size of the right padding.
            nGramSize += rightPadding * this.rightPad.length;
            // Size of the separators.
            const numSeparators = leftPadding + rightPadding + numTokens - 1;
            nGramSize += numSeparators * this.separator.length;
            // Build the nGram.
            output[outputStartIndex + nGramIndex] = new Uint8Array(nGramSize);
            const nGram = output[outputStartIndex + nGramIndex];
            let nextNGramIndex = 0;
            const appendToNGram = (str) => str.forEach((value) => nGram[nextNGramIndex++] = value);
            for (let n = 0; n < leftPadding; ++n) {
                appendToNGram(this.leftPad);
                appendToNGram(this.separator);
            }
            // Only output first numTokens - 1 pairs of data and separator
            for (let n = 0; n < numTokens - 1; ++n) {
                appendToNGram(data[dataStartIndex + n]);
                appendToNGram(this.separator);
            }
            // Handle case when there are no tokens or no right padding as these
            // can result in consecutive separators.
            if (numTokens > 0) {
                // If we have tokens, then output last and then pair each separator
                // with the right padding that follows, to ensure nGram ends either with
                // the token or with the right pad.
                appendToNGram(data[dataStartIndex + numTokens - 1]);
                for (let n = 0; n < rightPadding; ++n) {
                    appendToNGram(this.separator);
                    appendToNGram(this.rightPad);
                }
            }
            else {
                // If we don't have tokens, then the last item inserted into the nGram
                // has been the separator from the left padding loop above. Hence,
                // output right pad and separator and make sure to finish with a
                // padding, not a separator.
                for (let n = 0; n < rightPadding - 1; ++n) {
                    appendToNGram(this.rightPad);
                    appendToNGram(this.separator);
                }
                appendToNGram(this.rightPad);
            }
        }
    }
    // Data and splits together form the definition of the ragged tensor,
    // where data is 1 dimensional and contains the values of the tensor
    // and splits denotes the indices at which each row starts.
    compute(data, splits) {
        // Validate that the splits are valid indices into data, only if there are
        // splits specified.
        const inputDataSize = data.length;
        const splitsSize = splits.length;
        if (splitsSize > 0) {
            let prevSplit = splits[0];
            if (prevSplit !== 0) {
                throw new Error(`First split value must be 0, got ${prevSplit}`);
            }
            for (let i = 1; i < splitsSize; ++i) {
                let validSplits = splits[i] >= prevSplit;
                validSplits = validSplits && (splits[i] <= inputDataSize);
                if (!validSplits) {
                    throw new Error(`Invalid split value ${splits[i]}, must be in [${prevSplit}, ${inputDataSize}]`);
                }
                prevSplit = splits[i];
            }
            if (prevSplit !== inputDataSize) {
                throw new Error(`Last split value must be data size. Expected ${inputDataSize}, got ${prevSplit}`);
            }
        }
        const numBatchItems = splitsSize - 1;
        const nGramsSplits = getArrayFromDType('int32', splitsSize);
        // If there is no data or size, return an empty ragged tensor.
        if (inputDataSize === 0 || splitsSize === 0) {
            const empty = new Array(inputDataSize);
            for (let i = 0; i <= numBatchItems; ++i) {
                nGramsSplits[i] = 0;
            }
            return [empty, nGramsSplits];
        }
        nGramsSplits[0] = 0;
        for (let i = 1; i <= numBatchItems; ++i) {
            const length = splits[i] - splits[i - 1];
            let numNGrams = 0;
            this.nGramWidths.forEach((nGramWidth) => {
                numNGrams += this.getNumNGrams(length, nGramWidth);
            });
            if (this.preserveShort && length > 0 && numNGrams === 0) {
                numNGrams = 1;
            }
            nGramsSplits[i] = nGramsSplits[i - 1] + numNGrams;
        }
        const nGrams = new Array(nGramsSplits[numBatchItems]);
        for (let i = 0; i < numBatchItems; ++i) {
            const splitIndex = splits[i];
            let outputStartIdx = nGramsSplits[i];
            this.nGramWidths.forEach((nGramWidth) => {
                const length = splits[i + 1] - splits[i];
                const numNGrams = this.getNumNGrams(length, nGramWidth);
                this.createNGrams(data, splitIndex, nGrams, outputStartIdx, numNGrams, nGramWidth);
                outputStartIdx += numNGrams;
            });
            // If we're preserving short sequences, check to see if no sequence was
            // generated by comparing the current output start idx to the original
            // one (nGramSplitsdata). If no ngrams were generated, then they will
            // be equal (since we increment outputStartIdx by numNGrams every
            // time we create a set of ngrams.)
            if (this.preserveShort && outputStartIdx === nGramsSplits[i]) {
                const dataLength = splits[i + 1] - splits[i];
                // One legitimate reason to not have any ngrams when this.preserveShort
                // is true is if the sequence itself is empty. In that case, move on.
                if (dataLength === 0) {
                    continue;
                }
                // We don't have to worry about dynamic padding sizes here: if padding
                // was dynamic, every sequence would have had sufficient padding to
                // generate at least one nGram.
                const nGramWidth = dataLength + 2 * this.padWidth;
                const numNGrams = 1;
                this.createNGrams(data, splitIndex, nGrams, outputStartIdx, numNGrams, nGramWidth);
            }
        }
        return [nGrams, nGramsSplits];
    }
}
function stringNGramsImpl(data, dataSplits, separator, nGramWidths, leftPad, rightPad, padWidth, preserveShortSequences) {
    return new StringNGramsOp(separator, nGramWidths, leftPad, rightPad, padWidth, preserveShortSequences)
        .compute(data, dataSplits);
}

/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
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
function split(str, delimiters, skipEmpty, result) {
    if (!str.length) {
        return;
    }
    // When the delimiter is empty, the input is split into individual characters.
    if (delimiters.length === 0) {
        for (let i = 0; i < str.length; ++i) {
            result.push(str.subarray(i, i + 1));
        }
        return;
    }
    // When there is one delimiter, the input is split only at that delimiter.
    if (delimiters.length === 1) {
        const delimiter = delimiters[0];
        let f = str.indexOf(delimiter);
        while (f !== -1) {
            const token = str.subarray(0, f);
            if (!skipEmpty || token.length !== 0) {
                result.push(token);
            }
            str = str.subarray(f + 1);
            f = str.indexOf(delimiter);
        }
        if (!skipEmpty || str.length !== 0) {
            result.push(str);
        }
        return;
    }
    // When there are multiple delimiters, the input is split at every instance
    // one of the delimiters appears.
    let tokenStart = 0;
    for (let i = 0; i < str.length + 1; i++) {
        if ((i === str.length) || (delimiters.indexOf(str[i]) !== -1)) {
            const token = str.subarray(tokenStart, i);
            if (!skipEmpty || token.length !== 0) {
                result.push(token);
            }
            tokenStart = i + 1;
        }
    }
}
function stringSplitImpl(input, delimiter, skipEmpty) {
    const batchSize = input.length;
    // Empty delimiter means split the input character by character.
    const tokens = [];
    let outputSize = 0;
    let maxNumEntries = 0;
    const numIndices = new Array(batchSize);
    for (let i = 0; i < batchSize; ++i) {
        const prevTokensLength = tokens.length;
        split(input[i], delimiter, skipEmpty, tokens);
        const nEntries = tokens.length - prevTokensLength;
        numIndices[i] = nEntries;
        outputSize += nEntries;
        maxNumEntries = Math.max(maxNumEntries, nEntries);
    }
    const indices = getArrayFromDType('int32', outputSize * 2);
    const values = new Array(outputSize);
    const shape = [batchSize, maxNumEntries];
    let c = 0;
    for (let i = 0; i < batchSize; ++i) {
        for (let j = 0; j < numIndices[i]; ++j) {
            // indices is a 2d tensor with shape of [outputSize, 2]
            indices[c * 2] = i;
            indices[c * 2 + 1] = j;
            values[c] = tokens[c];
            ++c;
        }
    }
    return [indices, values, shape];
}

/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
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
function stringToHashBucketFastImpl(input, numBuckets) {
    const output = getArrayFromDType('int32', input.length);
    for (let i = 0; i < input.length; ++i) {
        output[i] =
            fingerPrint64(input[i]).modulo(numBuckets).getLowBitsUnsigned();
    }
    return output;
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
const subImpl = createSimpleBinaryKernelImpl(((aValue, bValue) => aValue - bValue));

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
 * An implementation of the tile kernel shared between webgl and cpu for string
 * tensors only.
 */
function tileImpl(xBuf, reps) {
    const newShape = new Array(xBuf.rank);
    for (let i = 0; i < newShape.length; i++) {
        newShape[i] = xBuf.shape[i] * reps[i];
    }
    const result = buffer(newShape, xBuf.dtype);
    for (let i = 0; i < result.values.length; ++i) {
        const newLoc = result.indexToLoc(i);
        const originalLoc = new Array(xBuf.rank);
        for (let j = 0; j < originalLoc.length; j++) {
            originalLoc[j] = newLoc[j] % xBuf.shape[j];
        }
        const originalIndex = xBuf.locToIndex(originalLoc);
        result.values[i] = xBuf.values[originalIndex];
    }
    return result;
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
const comparePair = (a, b) => {
    const valueDiff = b.value - a.value;
    return valueDiff === 0 ? a.index - b.index : valueDiff;
};
/**
 * Partitions array where all elements smaller than the (k+1) smallest element
 * are found to the left of it, and all larger to the right of it.
 * Based on the Floyd-Rivest Algorithm, ref:
 * https://en.wikipedia.org/wiki/Floyd%E2%80%93Rivest_algorithm
 * @param array: Array to partition
 * @param left: Left index for the interval
 * @param right: Right index for the interval
 * @param k: Desired index value, where array[k] is the (k+1)th smallest element
 *           when left = 0
 */
function select(array, k, left = 0, right = array.length - 1) {
    while (right > left) {
        // Use select recursively to sample a smaller set of size s
        // the arbitrary constants 600 and 0.5 are used in the original
        // version to minimize execution time.
        if (right - left > 600) {
            const n = right - left + 1;
            const i = k - left + 1;
            const z = Math.log(n);
            const s = 0.5 * Math.exp(2 * z / 3);
            const sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * Math.sign(i - n / 2);
            const newLeft = Math.max(left, Math.floor(k - i * s / n + sd));
            const newRight = Math.min(right, Math.floor(k + (n - i) * s / n + sd));
            select(array, k, newLeft, newRight);
        }
        // partition the elements between left and right around t
        const t = array[k];
        let i = left;
        let j = right;
        swap(array, left, k);
        if (comparePair(array[right], t) > 0) {
            swap(array, left, right);
        }
        while (i < j) {
            swap(array, i, j);
            i++;
            j--;
            while (comparePair(array[i], t) < 0) {
                i = i + 1;
            }
            while (comparePair(array[j], t) > 0) {
                j = j - 1;
            }
        }
        if (comparePair(array[left], t) === 0) {
            swap(array, left, j);
        }
        else {
            j = j + 1;
            swap(array, j, right);
        }
        // Adjust left and right towards the boundaries of the subset
        // containing the (k - left + 1)th smallest element.
        if (j <= k) {
            left = j + 1;
        }
        if (k <= j) {
            right = j - 1;
        }
    }
}
function topKImpl(x, xShape, xDtype, k, sorted) {
    // Reshape into a 2d tensor [batch, lastDim] and compute topk along lastDim.
    const lastDim = xShape[xShape.length - 1];
    const [batch, size] = [x.length / lastDim, lastDim];
    const allTopKVals = getTypedArrayFromDType(xDtype, batch * k);
    const allTopKIndices = getTypedArrayFromDType('int32', batch * k);
    for (let b = 0; b < batch; b++) {
        const offset = b * size;
        const vals = x.subarray(offset, offset + size);
        let valAndInd = new Array(vals.length);
        vals.forEach((value, index) => valAndInd[index] = { value, index });
        if (k < valAndInd.length) {
            select(valAndInd, k);
            valAndInd = valAndInd.slice(0, k);
        }
        if (sorted) {
            valAndInd.sort(comparePair);
        }
        const outOffset = b * k;
        const topKVals = allTopKVals.subarray(outOffset, outOffset + k);
        const topKIndices = allTopKIndices.subarray(outOffset, outOffset + k);
        for (let i = 0; i < k; i++) {
            topKVals[i] = valAndInd[i].value;
            topKIndices[i] = valAndInd[i].index;
        }
    }
    // Reshape back to the original input shape, except that the last
    // dimension is k.
    const outputShape = xShape.slice();
    outputShape[outputShape.length - 1] = k;
    return [
        buffer(outputShape, xDtype, allTopKVals),
        buffer(outputShape, 'int32', allTopKIndices)
    ];
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
function uniqueImpl(values, axis, shape, dtype) {
    // Normalize and validate axis.
    const $axis = parseAxisParam(axis, shape)[0];
    // Calculate the new shape that is suitable for extracting data along the
    // given axis.
    //
    // The rank is 3.
    // The size of the 1st dimension is the size of all the axes < the given axis.
    // The size of the 2nd dimension is the same as the size of the given axis.
    // The size of the 3rd dimension is the size of all the axes > the given axis.
    //
    // For example, for a 4D tensor with shape=[2, 3, 5, 4] and axis=2, the
    // newShape would be: [2*3, 5, 4].
    //
    // Note that this is not the final output shape. This will be the shape for an
    // intermediate TensorBuffer (see inputBuffer below) to allow us to extract
    // values along the given axis. To demonstrate how it works, consider the
    // following example:
    //
    // Input: a 3D tensor, with shape [1, 2, 3]
    // [
    //   [
    //      [1,2,3],
    //      [4,5,6]
    //   ]
    // ]
    // Axis: 2 (the last axis).
    // Along axis 2, we expect to extract 3 tensors: [1,4], [2,5], [3,6].
    //
    // For this example, newShape would be: [2, 3, 1], where 2 is calculated from
    // 1*2. The re-shaped data would look like:
    //
    // [
    //   [
    //     [1], [2], [3]
    //   ],
    //   [
    //     [4], [5], [6]
    //   ]
    // ]
    //
    // Then, we can construct a 3-level nested loop by the following dimension
    // order to extract the values along the axis (dimension1):
    // i: dimension1       // 0,1,2 (newShape[1])
    //   m: dimension0     // 0,1   (newShape[0])
    //     n: dimension2   // 0     (newShape[2])
    //
    //                       m, i, n
    //                      ---------
    // Iteration 0: data at [0, 0, 0] => "1"
    // Iteration 1: data at [1, 0, 0] => "4"
    // We got [1,4].
    // Iteration 2: data at [0, 1, 0] => "2"
    // Iteration 3: data at [1, 1, 0] => "5"
    // We got [2,5].
    // Iteration 4: data at [0, 2, 0] => "3"
    // Iteration 5: data at [1, 2, 0] => "6"
    // We got [3,6].
    const newShape = [1, shape[0], 1];
    for (let i = 0; i < $axis; i++) {
        newShape[0] *= shape[i];
    }
    newShape[1] = shape[$axis];
    for (let i = $axis + 1; i < shape.length; i++) {
        newShape[2] *= shape[i];
    }
    // A map from unique elements (their string representations) to their values
    // in "indices" (below).
    const uniqueElements = {};
    // The indices of each unique element in the original tensor along the given
    // axis. It is 1D and has the same size as the given axis.
    const indices = new Int32Array(shape[$axis]);
    // Create a buffer so we can easily extract value at a given location.
    const inputBuffer = new TensorBuffer(newShape, dtype, values);
    // The indices along the given axis that have unique elements. This is a
    // de-duped version of "indices" above.
    const uniqueIndices = [];
    const is1DTensor = newShape[0] === 1 && newShape[2] === 1;
    for (let i = 0; i < shape[$axis]; i++) {
        // Extract values along the axis.
        let element;
        if (is1DTensor) {
            // Fast path for 1D tensor input.
            element = values[i].toString();
        }
        else {
            const axisValues = [];
            for (let m = 0; m < newShape[0]; m++) {
                for (let n = 0; n < newShape[2]; n++) {
                    axisValues.push(inputBuffer.get(m, i, n));
                }
            }
            element = axisValues.join(',');
        }
        // Dedup and update various indices.
        if (uniqueElements[element] !== undefined) {
            indices[i] = uniqueElements[element];
        }
        else {
            const uniqueIndex = Object.keys(uniqueElements).length;
            uniqueElements[element] = uniqueIndex;
            indices[i] = uniqueIndex;
            uniqueIndices.push(i);
        }
    }
    // Now we know where each of the unique elements are located along the axis
    // (uniqueIndices). Extract them from input buffer and store them in the
    // output buffer.
    const outputTmpShape = newShape.slice();
    outputTmpShape[1] = Object.keys(uniqueElements).length;
    const outputBuffer = new TensorBuffer(outputTmpShape, dtype);
    uniqueIndices.forEach((uniqueElementIndex, i) => {
        for (let m = 0; m < newShape[0]; m++) {
            for (let n = 0; n < newShape[2]; n++) {
                outputBuffer.set(inputBuffer.get(m, uniqueElementIndex, n), m, i, n);
            }
        }
    });
    // The output shape can be calculated from the input shape with the size of
    // the given axis replaced by the number of unique elements along that axis.
    const outputShape = shape.slice();
    outputShape[$axis] = outputTmpShape[1];
    return {
        outputValues: outputBuffer.values,
        outputShape,
        indices,
    };
}

export { rsqrtImpl as A, sigmoidImpl as B, sliceImpl as C, sparseFillEmptyRowsImpl as D, sparseReshapeImpl as E, sparseSegmentReductionImpl as F, sqrtImpl as G, squaredDifferenceImpl as H, stridedSliceImpl as I, stringNGramsImpl as J, stringSplitImpl as K, stringToHashBucketFastImpl as L, subImpl as M, tileImpl as N, topKImpl as O, transposeImpl as P, uniqueImpl as Q, addImpl as a, bincountImpl as b, bincountReduceImpl as c, ceilImpl as d, concatImpl as e, equalImpl as f, expImpl as g, expm1Impl as h, floorImpl as i, gatherNdImpl as j, gatherV2Impl as k, greaterImpl as l, greaterEqualImpl as m, lessImpl as n, lessEqualImpl as o, linSpaceImpl as p, logImpl as q, maxImpl as r, simpleAbsImpl as s, maximumImpl as t, minimumImpl as u, multiplyImpl as v, negImpl as w, notEqualImpl as x, prodImpl as y, rangeImpl as z };
