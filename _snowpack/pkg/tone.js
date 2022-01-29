import { a as audioContextConstructor, b as audioWorkletNodeConstructor, o as offlineAudioContextConstructor, d as isAnyAudioParam, e as isAnyAudioNode, i as isAnyAudioContext, c as isAnyOfflineAudioContext } from './common/module-e985f1fe.js';
import './common/create-set-target-automation-event-d5a74c30.js';

const version = "14.7.77";

/**
 * Assert that the statement is true, otherwise invoke the error.
 * @param statement
 * @param error The message which is passed into an Error
 */
function assert(statement, error) {
    if (!statement) {
        throw new Error(error);
    }
}
/**
 * Make sure that the given value is within the range
 */
function assertRange(value, gte, lte = Infinity) {
    if (!(gte <= value && value <= lte)) {
        throw new RangeError(`Value must be within [${gte}, ${lte}], got: ${value}`);
    }
}
/**
 * Make sure that the given value is within the range
 */
function assertContextRunning(context) {
    // add a warning if the context is not started
    if (!context.isOffline && context.state !== "running") {
        warn("The AudioContext is \"suspended\". Invoke Tone.start() from a user action to start the audio.");
    }
}
/**
 * The default logger is the console
 */
let defaultLogger = console;
/**
 * Log anything
 */
function log(...args) {
    defaultLogger.log(...args);
}
/**
 * Warn anything
 */
function warn(...args) {
    defaultLogger.warn(...args);
}

/**
 * Test if the arg is undefined
 */
function isUndef(arg) {
    return typeof arg === "undefined";
}
/**
 * Test if the arg is not undefined
 */
function isDefined(arg) {
    return !isUndef(arg);
}
/**
 * Test if the arg is a function
 */
function isFunction(arg) {
    return typeof arg === "function";
}
/**
 * Test if the argument is a number.
 */
function isNumber(arg) {
    return (typeof arg === "number");
}
/**
 * Test if the given argument is an object literal (i.e. `{}`);
 */
function isObject(arg) {
    return (Object.prototype.toString.call(arg) === "[object Object]" && arg.constructor === Object);
}
/**
 * Test if the argument is a boolean.
 */
function isBoolean(arg) {
    return (typeof arg === "boolean");
}
/**
 * Test if the argument is an Array
 */
function isArray(arg) {
    return (Array.isArray(arg));
}
/**
 * Test if the argument is a string.
 */
function isString(arg) {
    return (typeof arg === "string");
}
/**
 * Test if the argument is in the form of a note in scientific pitch notation.
 * e.g. "C4"
 */
function isNote(arg) {
    return isString(arg) && /^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i.test(arg);
}

/**
 * Create a new AudioContext
 */
function createAudioContext(options) {
    return new audioContextConstructor(options);
}
/**
 * Create a new OfflineAudioContext
 */
function createOfflineAudioContext(channels, length, sampleRate) {
    return new offlineAudioContextConstructor(channels, length, sampleRate);
}
/**
 * A reference to the window object
 * @hidden
 */
const theWindow = typeof self === "object" ? self : null;
/**
 * If the browser has a window object which has an AudioContext
 * @hidden
 */
const hasAudioContext = theWindow &&
    (theWindow.hasOwnProperty("AudioContext") || theWindow.hasOwnProperty("webkitAudioContext"));
function createAudioWorkletNode(context, name, options) {
    assert(isDefined(audioWorkletNodeConstructor), "This node only works in a secure context (https or localhost)");
    // @ts-ignore
    return new audioWorkletNodeConstructor(context, name, options);
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

/**
 * A class which provides a reliable callback using either
 * a Web Worker, or if that isn't supported, falls back to setTimeout.
 */
class Ticker {
    constructor(callback, type, updateInterval) {
        this._callback = callback;
        this._type = type;
        this._updateInterval = updateInterval;
        // create the clock source for the first time
        this._createClock();
    }
    /**
     * Generate a web worker
     */
    _createWorker() {
        const blob = new Blob([
            /* javascript */ `
			// the initial timeout time
			let timeoutTime =  ${(this._updateInterval * 1000).toFixed(1)};
			// onmessage callback
			self.onmessage = function(msg){
				timeoutTime = parseInt(msg.data);
			};
			// the tick function which posts a message
			// and schedules a new tick
			function tick(){
				setTimeout(tick, timeoutTime);
				self.postMessage('tick');
			}
			// call tick initially
			tick();
			`
        ], { type: "text/javascript" });
        const blobUrl = URL.createObjectURL(blob);
        const worker = new Worker(blobUrl);
        worker.onmessage = this._callback.bind(this);
        this._worker = worker;
    }
    /**
     * Create a timeout loop
     */
    _createTimeout() {
        this._timeout = setTimeout(() => {
            this._createTimeout();
            this._callback();
        }, this._updateInterval * 1000);
    }
    /**
     * Create the clock source.
     */
    _createClock() {
        if (this._type === "worker") {
            try {
                this._createWorker();
            }
            catch (e) {
                // workers not supported, fallback to timeout
                this._type = "timeout";
                this._createClock();
            }
        }
        else if (this._type === "timeout") {
            this._createTimeout();
        }
    }
    /**
     * Clean up the current clock source
     */
    _disposeClock() {
        if (this._timeout) {
            clearTimeout(this._timeout);
            this._timeout = 0;
        }
        if (this._worker) {
            this._worker.terminate();
            this._worker.onmessage = null;
        }
    }
    /**
     * The rate in seconds the ticker will update
     */
    get updateInterval() {
        return this._updateInterval;
    }
    set updateInterval(interval) {
        this._updateInterval = Math.max(interval, 128 / 44100);
        if (this._type === "worker") {
            this._worker.postMessage(Math.max(interval * 1000, 1));
        }
    }
    /**
     * The type of the ticker, either a worker or a timeout
     */
    get type() {
        return this._type;
    }
    set type(type) {
        this._disposeClock();
        this._type = type;
        this._createClock();
    }
    /**
     * Clean up
     */
    dispose() {
        this._disposeClock();
    }
}

/**
 * Test if the given value is an instanceof AudioParam
 */
function isAudioParam(arg) {
    return isAnyAudioParam(arg);
}
/**
 * Test if the given value is an instanceof AudioNode
 */
function isAudioNode(arg) {
    return isAnyAudioNode(arg);
}
/**
 * Test if the arg is instanceof an OfflineAudioContext
 */
function isOfflineAudioContext(arg) {
    return isAnyOfflineAudioContext(arg);
}
/**
 * Test if the arg is an instanceof AudioContext
 */
function isAudioContext(arg) {
    return isAnyAudioContext(arg);
}
/**
 * Test if the arg is instanceof an AudioBuffer
 */
function isAudioBuffer(arg) {
    return arg instanceof AudioBuffer;
}

/**
 * Some objects should not be merged
 */
function noCopy(key, arg) {
    return key === "value" || isAudioParam(arg) || isAudioNode(arg) || isAudioBuffer(arg);
}
function deepMerge(target, ...sources) {
    if (!sources.length) {
        return target;
    }
    const source = sources.shift();
    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (noCopy(key, source[key])) {
                target[key] = source[key];
            }
            else if (isObject(source[key])) {
                if (!target[key]) {
                    Object.assign(target, { [key]: {} });
                }
                deepMerge(target[key], source[key]);
            }
            else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }
    // @ts-ignore
    return deepMerge(target, ...sources);
}
/**
 * Returns true if the two arrays have the same value for each of the elements
 */
function deepEquals(arrayA, arrayB) {
    return arrayA.length === arrayB.length && arrayA.every((element, index) => arrayB[index] === element);
}
/**
 * Convert an args array into an object.
 */
function optionsFromArguments(defaults, argsArray, keys = [], objKey) {
    const opts = {};
    const args = Array.from(argsArray);
    // if the first argument is an object and has an object key
    if (isObject(args[0]) && objKey && !Reflect.has(args[0], objKey)) {
        // if it's not part of the defaults
        const partOfDefaults = Object.keys(args[0]).some(key => Reflect.has(defaults, key));
        if (!partOfDefaults) {
            // merge that key
            deepMerge(opts, { [objKey]: args[0] });
            // remove the obj key from the keys
            keys.splice(keys.indexOf(objKey), 1);
            // shift the first argument off
            args.shift();
        }
    }
    if (args.length === 1 && isObject(args[0])) {
        deepMerge(opts, args[0]);
    }
    else {
        for (let i = 0; i < keys.length; i++) {
            if (isDefined(args[i])) {
                opts[keys[i]] = args[i];
            }
        }
    }
    return deepMerge(defaults, opts);
}
/**
 * Return this instances default values by calling Constructor.getDefaults()
 */
function getDefaultsFromInstance(instance) {
    return instance.constructor.getDefaults();
}
/**
 * Returns the fallback if the given object is undefined.
 * Take an array of arguments and return a formatted options object.
 */
function defaultArg(given, fallback) {
    if (isUndef(given)) {
        return fallback;
    }
    else {
        return given;
    }
}
/**
 * Remove all of the properties belonging to omit from obj.
 */
function omitFromObject(obj, omit) {
    omit.forEach(prop => {
        if (Reflect.has(obj, prop)) {
            delete obj[prop];
        }
    });
    return obj;
}

/**
 * Tone.js
 * @author Yotam Mann
 * @license http://opensource.org/licenses/MIT MIT License
 * @copyright 2014-2019 Yotam Mann
 */
/**
 * @class  Tone is the base class of all other classes.
 * @category Core
 * @constructor
 */
class Tone {
    constructor() {
        //-------------------------------------
        // 	DEBUGGING
        //-------------------------------------
        /**
         * Set this debug flag to log all events that happen in this class.
         */
        this.debug = false;
        //-------------------------------------
        // 	DISPOSING
        //-------------------------------------
        /**
         * Indicates if the instance was disposed
         */
        this._wasDisposed = false;
    }
    /**
     * Returns all of the default options belonging to the class.
     */
    static getDefaults() {
        return {};
    }
    /**
     * Prints the outputs to the console log for debugging purposes.
     * Prints the contents only if either the object has a property
     * called `debug` set to true, or a variable called TONE_DEBUG_CLASS
     * is set to the name of the class.
     * @example
     * const osc = new Tone.Oscillator();
     * // prints all logs originating from this oscillator
     * osc.debug = true;
     * // calls to start/stop will print in the console
     * osc.start();
     */
    log(...args) {
        // if the object is either set to debug = true
        // or if there is a string on the Tone.global.with the class name
        if (this.debug || (theWindow && this.toString() === theWindow.TONE_DEBUG_CLASS)) {
            log(this, ...args);
        }
    }
    /**
     * disconnect and dispose.
     */
    dispose() {
        this._wasDisposed = true;
        return this;
    }
    /**
     * Indicates if the instance was disposed. 'Disposing' an
     * instance means that all of the Web Audio nodes that were
     * created for the instance are disconnected and freed for garbage collection.
     */
    get disposed() {
        return this._wasDisposed;
    }
    /**
     * Convert the class to a string
     * @example
     * const osc = new Tone.Oscillator();
     * console.log(osc.toString());
     */
    toString() {
        return this.name;
    }
}
/**
 * The version number semver
 */
Tone.version = version;

/**
 * The threshold for correctness for operators. Less than one sample even
 * at very high sampling rates (e.g. `1e-6 < 1 / 192000`).
 */
const EPSILON = 1e-6;
/**
 * Test if A is greater than B
 */
function GT(a, b) {
    return a > b + EPSILON;
}
/**
 * Test if A is greater than or equal to B
 */
function GTE(a, b) {
    return GT(a, b) || EQ(a, b);
}
/**
 * Test if A is less than B
 */
function LT(a, b) {
    return a + EPSILON < b;
}
/**
 * Test if A is less than B
 */
function EQ(a, b) {
    return Math.abs(a - b) < EPSILON;
}
/**
 * Clamp the value within the given range
 */
function clamp(value, min, max) {
    return Math.max(Math.min(value, max), min);
}

/**
 * A Timeline class for scheduling and maintaining state
 * along a timeline. All events must have a "time" property.
 * Internally, events are stored in time order for fast
 * retrieval.
 */
class Timeline extends Tone {
    constructor() {
        super();
        this.name = "Timeline";
        /**
         * The array of scheduled timeline events
         */
        this._timeline = [];
        const options = optionsFromArguments(Timeline.getDefaults(), arguments, ["memory"]);
        this.memory = options.memory;
        this.increasing = options.increasing;
    }
    static getDefaults() {
        return {
            memory: Infinity,
            increasing: false,
        };
    }
    /**
     * The number of items in the timeline.
     */
    get length() {
        return this._timeline.length;
    }
    /**
     * Insert an event object onto the timeline. Events must have a "time" attribute.
     * @param event  The event object to insert into the timeline.
     */
    add(event) {
        // the event needs to have a time attribute
        assert(Reflect.has(event, "time"), "Timeline: events must have a time attribute");
        event.time = event.time.valueOf();
        if (this.increasing && this.length) {
            const lastValue = this._timeline[this.length - 1];
            assert(GTE(event.time, lastValue.time), "The time must be greater than or equal to the last scheduled time");
            this._timeline.push(event);
        }
        else {
            const index = this._search(event.time);
            this._timeline.splice(index + 1, 0, event);
        }
        // if the length is more than the memory, remove the previous ones
        if (this.length > this.memory) {
            const diff = this.length - this.memory;
            this._timeline.splice(0, diff);
        }
        return this;
    }
    /**
     * Remove an event from the timeline.
     * @param  {Object}  event  The event object to remove from the list.
     * @returns {Timeline} this
     */
    remove(event) {
        const index = this._timeline.indexOf(event);
        if (index !== -1) {
            this._timeline.splice(index, 1);
        }
        return this;
    }
    /**
     * Get the nearest event whose time is less than or equal to the given time.
     * @param  time  The time to query.
     */
    get(time, param = "time") {
        const index = this._search(time, param);
        if (index !== -1) {
            return this._timeline[index];
        }
        else {
            return null;
        }
    }
    /**
     * Return the first event in the timeline without removing it
     * @returns {Object} The first event object
     */
    peek() {
        return this._timeline[0];
    }
    /**
     * Return the first event in the timeline and remove it
     */
    shift() {
        return this._timeline.shift();
    }
    /**
     * Get the event which is scheduled after the given time.
     * @param  time  The time to query.
     */
    getAfter(time, param = "time") {
        const index = this._search(time, param);
        if (index + 1 < this._timeline.length) {
            return this._timeline[index + 1];
        }
        else {
            return null;
        }
    }
    /**
     * Get the event before the event at the given time.
     * @param  time  The time to query.
     */
    getBefore(time) {
        const len = this._timeline.length;
        // if it's after the last item, return the last item
        if (len > 0 && this._timeline[len - 1].time < time) {
            return this._timeline[len - 1];
        }
        const index = this._search(time);
        if (index - 1 >= 0) {
            return this._timeline[index - 1];
        }
        else {
            return null;
        }
    }
    /**
     * Cancel events at and after the given time
     * @param  after  The time to query.
     */
    cancel(after) {
        if (this._timeline.length > 1) {
            let index = this._search(after);
            if (index >= 0) {
                if (EQ(this._timeline[index].time, after)) {
                    // get the first item with that time
                    for (let i = index; i >= 0; i--) {
                        if (EQ(this._timeline[i].time, after)) {
                            index = i;
                        }
                        else {
                            break;
                        }
                    }
                    this._timeline = this._timeline.slice(0, index);
                }
                else {
                    this._timeline = this._timeline.slice(0, index + 1);
                }
            }
            else {
                this._timeline = [];
            }
        }
        else if (this._timeline.length === 1) {
            // the first item's time
            if (GTE(this._timeline[0].time, after)) {
                this._timeline = [];
            }
        }
        return this;
    }
    /**
     * Cancel events before or equal to the given time.
     * @param  time  The time to cancel before.
     */
    cancelBefore(time) {
        const index = this._search(time);
        if (index >= 0) {
            this._timeline = this._timeline.slice(index + 1);
        }
        return this;
    }
    /**
     * Returns the previous event if there is one. null otherwise
     * @param  event The event to find the previous one of
     * @return The event right before the given event
     */
    previousEvent(event) {
        const index = this._timeline.indexOf(event);
        if (index > 0) {
            return this._timeline[index - 1];
        }
        else {
            return null;
        }
    }
    /**
     * Does a binary search on the timeline array and returns the
     * nearest event index whose time is after or equal to the given time.
     * If a time is searched before the first index in the timeline, -1 is returned.
     * If the time is after the end, the index of the last item is returned.
     */
    _search(time, param = "time") {
        if (this._timeline.length === 0) {
            return -1;
        }
        let beginning = 0;
        const len = this._timeline.length;
        let end = len;
        if (len > 0 && this._timeline[len - 1][param] <= time) {
            return len - 1;
        }
        while (beginning < end) {
            // calculate the midpoint for roughly equal partition
            let midPoint = Math.floor(beginning + (end - beginning) / 2);
            const event = this._timeline[midPoint];
            const nextEvent = this._timeline[midPoint + 1];
            if (EQ(event[param], time)) {
                // choose the last one that has the same time
                for (let i = midPoint; i < this._timeline.length; i++) {
                    const testEvent = this._timeline[i];
                    if (EQ(testEvent[param], time)) {
                        midPoint = i;
                    }
                    else {
                        break;
                    }
                }
                return midPoint;
            }
            else if (LT(event[param], time) && GT(nextEvent[param], time)) {
                return midPoint;
            }
            else if (GT(event[param], time)) {
                // search lower
                end = midPoint;
            }
            else {
                // search upper
                beginning = midPoint + 1;
            }
        }
        return -1;
    }
    /**
     * Internal iterator. Applies extra safety checks for
     * removing items from the array.
     */
    _iterate(callback, lowerBound = 0, upperBound = this._timeline.length - 1) {
        this._timeline.slice(lowerBound, upperBound + 1).forEach(callback);
    }
    /**
     * Iterate over everything in the array
     * @param  callback The callback to invoke with every item
     */
    forEach(callback) {
        this._iterate(callback);
        return this;
    }
    /**
     * Iterate over everything in the array at or before the given time.
     * @param  time The time to check if items are before
     * @param  callback The callback to invoke with every item
     */
    forEachBefore(time, callback) {
        // iterate over the items in reverse so that removing an item doesn't break things
        const upperBound = this._search(time);
        if (upperBound !== -1) {
            this._iterate(callback, 0, upperBound);
        }
        return this;
    }
    /**
     * Iterate over everything in the array after the given time.
     * @param  time The time to check if items are before
     * @param  callback The callback to invoke with every item
     */
    forEachAfter(time, callback) {
        // iterate over the items in reverse so that removing an item doesn't break things
        const lowerBound = this._search(time);
        this._iterate(callback, lowerBound + 1);
        return this;
    }
    /**
     * Iterate over everything in the array between the startTime and endTime.
     * The timerange is inclusive of the startTime, but exclusive of the endTime.
     * range = [startTime, endTime).
     * @param  startTime The time to check if items are before
     * @param  endTime The end of the test interval.
     * @param  callback The callback to invoke with every item
     */
    forEachBetween(startTime, endTime, callback) {
        let lowerBound = this._search(startTime);
        let upperBound = this._search(endTime);
        if (lowerBound !== -1 && upperBound !== -1) {
            if (this._timeline[lowerBound].time !== startTime) {
                lowerBound += 1;
            }
            // exclusive of the end time
            if (this._timeline[upperBound].time === endTime) {
                upperBound -= 1;
            }
            this._iterate(callback, lowerBound, upperBound);
        }
        else if (lowerBound === -1) {
            this._iterate(callback, 0, upperBound);
        }
        return this;
    }
    /**
     * Iterate over everything in the array at or after the given time. Similar to
     * forEachAfter, but includes the item(s) at the given time.
     * @param  time The time to check if items are before
     * @param  callback The callback to invoke with every item
     */
    forEachFrom(time, callback) {
        // iterate over the items in reverse so that removing an item doesn't break things
        let lowerBound = this._search(time);
        // work backwards until the event time is less than time
        while (lowerBound >= 0 && this._timeline[lowerBound].time >= time) {
            lowerBound--;
        }
        this._iterate(callback, lowerBound + 1);
        return this;
    }
    /**
     * Iterate over everything in the array at the given time
     * @param  time The time to check if items are before
     * @param  callback The callback to invoke with every item
     */
    forEachAtTime(time, callback) {
        // iterate over the items in reverse so that removing an item doesn't break things
        const upperBound = this._search(time);
        if (upperBound !== -1 && EQ(this._timeline[upperBound].time, time)) {
            let lowerBound = upperBound;
            for (let i = upperBound; i >= 0; i--) {
                if (EQ(this._timeline[i].time, time)) {
                    lowerBound = i;
                }
                else {
                    break;
                }
            }
            this._iterate(event => {
                callback(event);
            }, lowerBound, upperBound);
        }
        return this;
    }
    /**
     * Clean up.
     */
    dispose() {
        super.dispose();
        this._timeline = [];
        return this;
    }
}

//-------------------------------------
// INITIALIZING NEW CONTEXT
//-------------------------------------
/**
 * Array of callbacks to invoke when a new context is created
 */
const notifyNewContext = [];
/**
 * Used internally to setup a new Context
 */
function onContextInit(cb) {
    notifyNewContext.push(cb);
}
/**
 * Invoke any classes which need to also be initialized when a new context is created.
 */
function initializeContext(ctx) {
    // add any additional modules
    notifyNewContext.forEach(cb => cb(ctx));
}
/**
 * Array of callbacks to invoke when a new context is created
 */
const notifyCloseContext = [];
/**
 * Used internally to tear down a Context
 */
function onContextClose(cb) {
    notifyCloseContext.push(cb);
}
function closeContext(ctx) {
    // add any additional modules
    notifyCloseContext.forEach(cb => cb(ctx));
}

/**
 * Emitter gives classes which extend it
 * the ability to listen for and emit events.
 * Inspiration and reference from Jerome Etienne's [MicroEvent](https://github.com/jeromeetienne/microevent.js).
 * MIT (c) 2011 Jerome Etienne.
 * @category Core
 */
class Emitter extends Tone {
    constructor() {
        super(...arguments);
        this.name = "Emitter";
    }
    /**
     * Bind a callback to a specific event.
     * @param  event     The name of the event to listen for.
     * @param  callback  The callback to invoke when the event is emitted
     */
    on(event, callback) {
        // split the event
        const events = event.split(/\W+/);
        events.forEach(eventName => {
            if (isUndef(this._events)) {
                this._events = {};
            }
            if (!this._events.hasOwnProperty(eventName)) {
                this._events[eventName] = [];
            }
            this._events[eventName].push(callback);
        });
        return this;
    }
    /**
     * Bind a callback which is only invoked once
     * @param  event     The name of the event to listen for.
     * @param  callback  The callback to invoke when the event is emitted
     */
    once(event, callback) {
        const boundCallback = (...args) => {
            // invoke the callback
            callback(...args);
            // remove the event
            this.off(event, boundCallback);
        };
        this.on(event, boundCallback);
        return this;
    }
    /**
     * Remove the event listener.
     * @param  event     The event to stop listening to.
     * @param  callback  The callback which was bound to the event with Emitter.on.
     *                   If no callback is given, all callbacks events are removed.
     */
    off(event, callback) {
        const events = event.split(/\W+/);
        events.forEach(eventName => {
            if (isUndef(this._events)) {
                this._events = {};
            }
            if (this._events.hasOwnProperty(event)) {
                if (isUndef(callback)) {
                    this._events[event] = [];
                }
                else {
                    const eventList = this._events[event];
                    for (let i = eventList.length - 1; i >= 0; i--) {
                        if (eventList[i] === callback) {
                            eventList.splice(i, 1);
                        }
                    }
                }
            }
        });
        return this;
    }
    /**
     * Invoke all of the callbacks bound to the event
     * with any arguments passed in.
     * @param  event  The name of the event.
     * @param args The arguments to pass to the functions listening.
     */
    emit(event, ...args) {
        if (this._events) {
            if (this._events.hasOwnProperty(event)) {
                const eventList = this._events[event].slice(0);
                for (let i = 0, len = eventList.length; i < len; i++) {
                    eventList[i].apply(this, args);
                }
            }
        }
        return this;
    }
    /**
     * Add Emitter functions (on/off/emit) to the object
     */
    static mixin(constr) {
        // instance._events = {};
        ["on", "once", "off", "emit"].forEach(name => {
            const property = Object.getOwnPropertyDescriptor(Emitter.prototype, name);
            Object.defineProperty(constr.prototype, name, property);
        });
    }
    /**
     * Clean up
     */
    dispose() {
        super.dispose();
        this._events = undefined;
        return this;
    }
}

class BaseContext extends Emitter {
    constructor() {
        super(...arguments);
        this.isOffline = false;
    }
    /*
     * This is a placeholder so that JSON.stringify does not throw an error
     * This matches what JSON.stringify(audioContext) returns on a native
     * audioContext instance.
     */
    toJSON() {
        return {};
    }
}

/**
 * Wrapper around the native AudioContext.
 * @category Core
 */
class Context extends BaseContext {
    constructor() {
        super();
        this.name = "Context";
        /**
         * An object containing all of the constants AudioBufferSourceNodes
         */
        this._constants = new Map();
        /**
         * All of the setTimeout events.
         */
        this._timeouts = new Timeline();
        /**
         * The timeout id counter
         */
        this._timeoutIds = 0;
        /**
         * Private indicator if the context has been initialized
         */
        this._initialized = false;
        /**
         * Indicates if the context is an OfflineAudioContext or an AudioContext
         */
        this.isOffline = false;
        //--------------------------------------------
        // AUDIO WORKLET
        //--------------------------------------------
        /**
         * Maps a module name to promise of the addModule method
         */
        this._workletModules = new Map();
        const options = optionsFromArguments(Context.getDefaults(), arguments, [
            "context",
        ]);
        if (options.context) {
            this._context = options.context;
        }
        else {
            this._context = createAudioContext({
                latencyHint: options.latencyHint,
            });
        }
        this._ticker = new Ticker(this.emit.bind(this, "tick"), options.clockSource, options.updateInterval);
        this.on("tick", this._timeoutLoop.bind(this));
        // fwd events from the context
        this._context.onstatechange = () => {
            this.emit("statechange", this.state);
        };
        this._setLatencyHint(options.latencyHint);
        this.lookAhead = options.lookAhead;
    }
    static getDefaults() {
        return {
            clockSource: "worker",
            latencyHint: "interactive",
            lookAhead: 0.1,
            updateInterval: 0.05,
        };
    }
    /**
     * Finish setting up the context. **You usually do not need to do this manually.**
     */
    initialize() {
        if (!this._initialized) {
            // add any additional modules
            initializeContext(this);
            this._initialized = true;
        }
        return this;
    }
    //---------------------------
    // BASE AUDIO CONTEXT METHODS
    //---------------------------
    createAnalyser() {
        return this._context.createAnalyser();
    }
    createOscillator() {
        return this._context.createOscillator();
    }
    createBufferSource() {
        return this._context.createBufferSource();
    }
    createBiquadFilter() {
        return this._context.createBiquadFilter();
    }
    createBuffer(numberOfChannels, length, sampleRate) {
        return this._context.createBuffer(numberOfChannels, length, sampleRate);
    }
    createChannelMerger(numberOfInputs) {
        return this._context.createChannelMerger(numberOfInputs);
    }
    createChannelSplitter(numberOfOutputs) {
        return this._context.createChannelSplitter(numberOfOutputs);
    }
    createConstantSource() {
        return this._context.createConstantSource();
    }
    createConvolver() {
        return this._context.createConvolver();
    }
    createDelay(maxDelayTime) {
        return this._context.createDelay(maxDelayTime);
    }
    createDynamicsCompressor() {
        return this._context.createDynamicsCompressor();
    }
    createGain() {
        return this._context.createGain();
    }
    createIIRFilter(feedForward, feedback) {
        // @ts-ignore
        return this._context.createIIRFilter(feedForward, feedback);
    }
    createPanner() {
        return this._context.createPanner();
    }
    createPeriodicWave(real, imag, constraints) {
        return this._context.createPeriodicWave(real, imag, constraints);
    }
    createStereoPanner() {
        return this._context.createStereoPanner();
    }
    createWaveShaper() {
        return this._context.createWaveShaper();
    }
    createMediaStreamSource(stream) {
        assert(isAudioContext(this._context), "Not available if OfflineAudioContext");
        const context = this._context;
        return context.createMediaStreamSource(stream);
    }
    createMediaElementSource(element) {
        assert(isAudioContext(this._context), "Not available if OfflineAudioContext");
        const context = this._context;
        return context.createMediaElementSource(element);
    }
    createMediaStreamDestination() {
        assert(isAudioContext(this._context), "Not available if OfflineAudioContext");
        const context = this._context;
        return context.createMediaStreamDestination();
    }
    decodeAudioData(audioData) {
        return this._context.decodeAudioData(audioData);
    }
    /**
     * The current time in seconds of the AudioContext.
     */
    get currentTime() {
        return this._context.currentTime;
    }
    /**
     * The current time in seconds of the AudioContext.
     */
    get state() {
        return this._context.state;
    }
    /**
     * The current time in seconds of the AudioContext.
     */
    get sampleRate() {
        return this._context.sampleRate;
    }
    /**
     * The listener
     */
    get listener() {
        this.initialize();
        return this._listener;
    }
    set listener(l) {
        assert(!this._initialized, "The listener cannot be set after initialization.");
        this._listener = l;
    }
    /**
     * There is only one Transport per Context. It is created on initialization.
     */
    get transport() {
        this.initialize();
        return this._transport;
    }
    set transport(t) {
        assert(!this._initialized, "The transport cannot be set after initialization.");
        this._transport = t;
    }
    /**
     * This is the Draw object for the context which is useful for synchronizing the draw frame with the Tone.js clock.
     */
    get draw() {
        this.initialize();
        return this._draw;
    }
    set draw(d) {
        assert(!this._initialized, "Draw cannot be set after initialization.");
        this._draw = d;
    }
    /**
     * A reference to the Context's destination node.
     */
    get destination() {
        this.initialize();
        return this._destination;
    }
    set destination(d) {
        assert(!this._initialized, "The destination cannot be set after initialization.");
        this._destination = d;
    }
    /**
     * Create an audio worklet node from a name and options. The module
     * must first be loaded using [[addAudioWorkletModule]].
     */
    createAudioWorkletNode(name, options) {
        return createAudioWorkletNode(this.rawContext, name, options);
    }
    /**
     * Add an AudioWorkletProcessor module
     * @param url The url of the module
     * @param name The name of the module
     */
    addAudioWorkletModule(url, name) {
        return __awaiter(this, void 0, void 0, function* () {
            assert(isDefined(this.rawContext.audioWorklet), "AudioWorkletNode is only available in a secure context (https or localhost)");
            if (!this._workletModules.has(name)) {
                this._workletModules.set(name, this.rawContext.audioWorklet.addModule(url));
            }
            yield this._workletModules.get(name);
        });
    }
    /**
     * Returns a promise which resolves when all of the worklets have been loaded on this context
     */
    workletsAreReady() {
        return __awaiter(this, void 0, void 0, function* () {
            const promises = [];
            this._workletModules.forEach((promise) => promises.push(promise));
            yield Promise.all(promises);
        });
    }
    //---------------------------
    // TICKER
    //---------------------------
    /**
     * How often the interval callback is invoked.
     * This number corresponds to how responsive the scheduling
     * can be. context.updateInterval + context.lookAhead gives you the
     * total latency between scheduling an event and hearing it.
     */
    get updateInterval() {
        return this._ticker.updateInterval;
    }
    set updateInterval(interval) {
        this._ticker.updateInterval = interval;
    }
    /**
     * What the source of the clock is, either "worker" (default),
     * "timeout", or "offline" (none).
     */
    get clockSource() {
        return this._ticker.type;
    }
    set clockSource(type) {
        this._ticker.type = type;
    }
    /**
     * The type of playback, which affects tradeoffs between audio
     * output latency and responsiveness.
     * In addition to setting the value in seconds, the latencyHint also
     * accepts the strings "interactive" (prioritizes low latency),
     * "playback" (prioritizes sustained playback), "balanced" (balances
     * latency and performance).
     * @example
     * // prioritize sustained playback
     * const context = new Tone.Context({ latencyHint: "playback" });
     * // set this context as the global Context
     * Tone.setContext(context);
     * // the global context is gettable with Tone.getContext()
     * console.log(Tone.getContext().latencyHint);
     */
    get latencyHint() {
        return this._latencyHint;
    }
    /**
     * Update the lookAhead and updateInterval based on the latencyHint
     */
    _setLatencyHint(hint) {
        let lookAheadValue = 0;
        this._latencyHint = hint;
        if (isString(hint)) {
            switch (hint) {
                case "interactive":
                    lookAheadValue = 0.1;
                    break;
                case "playback":
                    lookAheadValue = 0.5;
                    break;
                case "balanced":
                    lookAheadValue = 0.25;
                    break;
            }
        }
        this.lookAhead = lookAheadValue;
        this.updateInterval = lookAheadValue / 2;
    }
    /**
     * The unwrapped AudioContext or OfflineAudioContext
     */
    get rawContext() {
        return this._context;
    }
    /**
     * The current audio context time plus a short [[lookAhead]].
     */
    now() {
        return this._context.currentTime + this.lookAhead;
    }
    /**
     * The current audio context time without the [[lookAhead]].
     * In most cases it is better to use [[now]] instead of [[immediate]] since
     * with [[now]] the [[lookAhead]] is applied equally to _all_ components including internal components,
     * to making sure that everything is scheduled in sync. Mixing [[now]] and [[immediate]]
     * can cause some timing issues. If no lookAhead is desired, you can set the [[lookAhead]] to `0`.
     */
    immediate() {
        return this._context.currentTime;
    }
    /**
     * Starts the audio context from a suspended state. This is required
     * to initially start the AudioContext. See [[Tone.start]]
     */
    resume() {
        if (isAudioContext(this._context)) {
            return this._context.resume();
        }
        else {
            return Promise.resolve();
        }
    }
    /**
     * Close the context. Once closed, the context can no longer be used and
     * any AudioNodes created from the context will be silent.
     */
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            if (isAudioContext(this._context)) {
                yield this._context.close();
            }
            if (this._initialized) {
                closeContext(this);
            }
        });
    }
    /**
     * **Internal** Generate a looped buffer at some constant value.
     */
    getConstant(val) {
        if (this._constants.has(val)) {
            return this._constants.get(val);
        }
        else {
            const buffer = this._context.createBuffer(1, 128, this._context.sampleRate);
            const arr = buffer.getChannelData(0);
            for (let i = 0; i < arr.length; i++) {
                arr[i] = val;
            }
            const constant = this._context.createBufferSource();
            constant.channelCount = 1;
            constant.channelCountMode = "explicit";
            constant.buffer = buffer;
            constant.loop = true;
            constant.start(0);
            this._constants.set(val, constant);
            return constant;
        }
    }
    /**
     * Clean up. Also closes the audio context.
     */
    dispose() {
        super.dispose();
        this._ticker.dispose();
        this._timeouts.dispose();
        Object.keys(this._constants).map((val) => this._constants[val].disconnect());
        return this;
    }
    //---------------------------
    // TIMEOUTS
    //---------------------------
    /**
     * The private loop which keeps track of the context scheduled timeouts
     * Is invoked from the clock source
     */
    _timeoutLoop() {
        const now = this.now();
        let firstEvent = this._timeouts.peek();
        while (this._timeouts.length && firstEvent && firstEvent.time <= now) {
            // invoke the callback
            firstEvent.callback();
            // shift the first event off
            this._timeouts.shift();
            // get the next one
            firstEvent = this._timeouts.peek();
        }
    }
    /**
     * A setTimeout which is guaranteed by the clock source.
     * Also runs in the offline context.
     * @param  fn       The callback to invoke
     * @param  timeout  The timeout in seconds
     * @returns ID to use when invoking Context.clearTimeout
     */
    setTimeout(fn, timeout) {
        this._timeoutIds++;
        const now = this.now();
        this._timeouts.add({
            callback: fn,
            id: this._timeoutIds,
            time: now + timeout,
        });
        return this._timeoutIds;
    }
    /**
     * Clears a previously scheduled timeout with Tone.context.setTimeout
     * @param  id  The ID returned from setTimeout
     */
    clearTimeout(id) {
        this._timeouts.forEach((event) => {
            if (event.id === id) {
                this._timeouts.remove(event);
            }
        });
        return this;
    }
    /**
     * Clear the function scheduled by [[setInterval]]
     */
    clearInterval(id) {
        return this.clearTimeout(id);
    }
    /**
     * Adds a repeating event to the context's callback clock
     */
    setInterval(fn, interval) {
        const id = ++this._timeoutIds;
        const intervalFn = () => {
            const now = this.now();
            this._timeouts.add({
                callback: () => {
                    // invoke the callback
                    fn();
                    // invoke the event to repeat it
                    intervalFn();
                },
                id,
                time: now + interval,
            });
        };
        // kick it off
        intervalFn();
        return id;
    }
}

class DummyContext extends BaseContext {
    constructor() {
        super(...arguments);
        this.lookAhead = 0;
        this.latencyHint = 0;
        this.isOffline = false;
    }
    //---------------------------
    // BASE AUDIO CONTEXT METHODS
    //---------------------------
    createAnalyser() {
        return {};
    }
    createOscillator() {
        return {};
    }
    createBufferSource() {
        return {};
    }
    createBiquadFilter() {
        return {};
    }
    createBuffer(_numberOfChannels, _length, _sampleRate) {
        return {};
    }
    createChannelMerger(_numberOfInputs) {
        return {};
    }
    createChannelSplitter(_numberOfOutputs) {
        return {};
    }
    createConstantSource() {
        return {};
    }
    createConvolver() {
        return {};
    }
    createDelay(_maxDelayTime) {
        return {};
    }
    createDynamicsCompressor() {
        return {};
    }
    createGain() {
        return {};
    }
    createIIRFilter(_feedForward, _feedback) {
        return {};
    }
    createPanner() {
        return {};
    }
    createPeriodicWave(_real, _imag, _constraints) {
        return {};
    }
    createStereoPanner() {
        return {};
    }
    createWaveShaper() {
        return {};
    }
    createMediaStreamSource(_stream) {
        return {};
    }
    createMediaElementSource(_element) {
        return {};
    }
    createMediaStreamDestination() {
        return {};
    }
    decodeAudioData(_audioData) {
        return Promise.resolve({});
    }
    //---------------------------
    // TONE AUDIO CONTEXT METHODS
    //---------------------------
    createAudioWorkletNode(_name, _options) {
        return {};
    }
    get rawContext() {
        return {};
    }
    addAudioWorkletModule(_url, _name) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve();
        });
    }
    resume() {
        return Promise.resolve();
    }
    setTimeout(_fn, _timeout) {
        return 0;
    }
    clearTimeout(_id) {
        return this;
    }
    setInterval(_fn, _interval) {
        return 0;
    }
    clearInterval(_id) {
        return this;
    }
    getConstant(_val) {
        return {};
    }
    get currentTime() {
        return 0;
    }
    get state() {
        return {};
    }
    get sampleRate() {
        return 0;
    }
    get listener() {
        return {};
    }
    get transport() {
        return {};
    }
    get draw() {
        return {};
    }
    set draw(_d) { }
    get destination() {
        return {};
    }
    set destination(_d) { }
    now() {
        return 0;
    }
    immediate() {
        return 0;
    }
}

/**
 * Make the property not writable using `defineProperty`. Internal use only.
 */
function readOnly(target, property) {
    if (isArray(property)) {
        property.forEach(str => readOnly(target, str));
    }
    else {
        Object.defineProperty(target, property, {
            enumerable: true,
            writable: false,
        });
    }
}
/**
 * Make an attribute writeable. Internal use only.
 */
function writable(target, property) {
    if (isArray(property)) {
        property.forEach(str => writable(target, str));
    }
    else {
        Object.defineProperty(target, property, {
            writable: true,
        });
    }
}
const noOp = () => {
    // no operation here!
};

/**
 * AudioBuffer loading and storage. ToneAudioBuffer is used internally by all
 * classes that make requests for audio files such as Tone.Player,
 * Tone.Sampler and Tone.Convolver.
 * @example
 * const buffer = new Tone.ToneAudioBuffer("https://tonejs.github.io/audio/casio/A1.mp3", () => {
 * 	console.log("loaded");
 * });
 * @category Core
 */
class ToneAudioBuffer extends Tone {
    constructor() {
        super();
        this.name = "ToneAudioBuffer";
        /**
         * Callback when the buffer is loaded.
         */
        this.onload = noOp;
        const options = optionsFromArguments(ToneAudioBuffer.getDefaults(), arguments, ["url", "onload", "onerror"]);
        this.reverse = options.reverse;
        this.onload = options.onload;
        if (options.url && isAudioBuffer(options.url) || options.url instanceof ToneAudioBuffer) {
            this.set(options.url);
        }
        else if (isString(options.url)) {
            // initiate the download
            this.load(options.url).catch(options.onerror);
        }
    }
    static getDefaults() {
        return {
            onerror: noOp,
            onload: noOp,
            reverse: false,
        };
    }
    /**
     * The sample rate of the AudioBuffer
     */
    get sampleRate() {
        if (this._buffer) {
            return this._buffer.sampleRate;
        }
        else {
            return getContext().sampleRate;
        }
    }
    /**
     * Pass in an AudioBuffer or ToneAudioBuffer to set the value of this buffer.
     */
    set(buffer) {
        if (buffer instanceof ToneAudioBuffer) {
            // if it's loaded, set it
            if (buffer.loaded) {
                this._buffer = buffer.get();
            }
            else {
                // otherwise when it's loaded, invoke it's callback
                buffer.onload = () => {
                    this.set(buffer);
                    this.onload(this);
                };
            }
        }
        else {
            this._buffer = buffer;
        }
        // reverse it initially
        if (this._reversed) {
            this._reverse();
        }
        return this;
    }
    /**
     * The audio buffer stored in the object.
     */
    get() {
        return this._buffer;
    }
    /**
     * Makes an fetch request for the selected url then decodes the file as an audio buffer.
     * Invokes the callback once the audio buffer loads.
     * @param url The url of the buffer to load. filetype support depends on the browser.
     * @returns A Promise which resolves with this ToneAudioBuffer
     */
    load(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const doneLoading = ToneAudioBuffer.load(url).then(audioBuffer => {
                this.set(audioBuffer);
                // invoke the onload method
                this.onload(this);
            });
            ToneAudioBuffer.downloads.push(doneLoading);
            try {
                yield doneLoading;
            }
            finally {
                // remove the downloaded file
                const index = ToneAudioBuffer.downloads.indexOf(doneLoading);
                ToneAudioBuffer.downloads.splice(index, 1);
            }
            return this;
        });
    }
    /**
     * clean up
     */
    dispose() {
        super.dispose();
        this._buffer = undefined;
        return this;
    }
    /**
     * Set the audio buffer from the array.
     * To create a multichannel AudioBuffer, pass in a multidimensional array.
     * @param array The array to fill the audio buffer
     */
    fromArray(array) {
        const isMultidimensional = isArray(array) && array[0].length > 0;
        const channels = isMultidimensional ? array.length : 1;
        const len = isMultidimensional ? array[0].length : array.length;
        const context = getContext();
        const buffer = context.createBuffer(channels, len, context.sampleRate);
        const multiChannelArray = !isMultidimensional && channels === 1 ?
            [array] : array;
        for (let c = 0; c < channels; c++) {
            buffer.copyToChannel(multiChannelArray[c], c);
        }
        this._buffer = buffer;
        return this;
    }
    /**
     * Sums multiple channels into 1 channel
     * @param chanNum Optionally only copy a single channel from the array.
     */
    toMono(chanNum) {
        if (isNumber(chanNum)) {
            this.fromArray(this.toArray(chanNum));
        }
        else {
            let outputArray = new Float32Array(this.length);
            const numChannels = this.numberOfChannels;
            for (let channel = 0; channel < numChannels; channel++) {
                const channelArray = this.toArray(channel);
                for (let i = 0; i < channelArray.length; i++) {
                    outputArray[i] += channelArray[i];
                }
            }
            // divide by the number of channels
            outputArray = outputArray.map(sample => sample / numChannels);
            this.fromArray(outputArray);
        }
        return this;
    }
    /**
     * Get the buffer as an array. Single channel buffers will return a 1-dimensional
     * Float32Array, and multichannel buffers will return multidimensional arrays.
     * @param channel Optionally only copy a single channel from the array.
     */
    toArray(channel) {
        if (isNumber(channel)) {
            return this.getChannelData(channel);
        }
        else if (this.numberOfChannels === 1) {
            return this.toArray(0);
        }
        else {
            const ret = [];
            for (let c = 0; c < this.numberOfChannels; c++) {
                ret[c] = this.getChannelData(c);
            }
            return ret;
        }
    }
    /**
     * Returns the Float32Array representing the PCM audio data for the specific channel.
     * @param  channel  The channel number to return
     * @return The audio as a TypedArray
     */
    getChannelData(channel) {
        if (this._buffer) {
            return this._buffer.getChannelData(channel);
        }
        else {
            return new Float32Array(0);
        }
    }
    /**
     * Cut a subsection of the array and return a buffer of the
     * subsection. Does not modify the original buffer
     * @param start The time to start the slice
     * @param end The end time to slice. If none is given will default to the end of the buffer
     */
    slice(start, end = this.duration) {
        const startSamples = Math.floor(start * this.sampleRate);
        const endSamples = Math.floor(end * this.sampleRate);
        assert(startSamples < endSamples, "The start time must be less than the end time");
        const length = endSamples - startSamples;
        const retBuffer = getContext().createBuffer(this.numberOfChannels, length, this.sampleRate);
        for (let channel = 0; channel < this.numberOfChannels; channel++) {
            retBuffer.copyToChannel(this.getChannelData(channel).subarray(startSamples, endSamples), channel);
        }
        return new ToneAudioBuffer(retBuffer);
    }
    /**
     * Reverse the buffer.
     */
    _reverse() {
        if (this.loaded) {
            for (let i = 0; i < this.numberOfChannels; i++) {
                this.getChannelData(i).reverse();
            }
        }
        return this;
    }
    /**
     * If the buffer is loaded or not
     */
    get loaded() {
        return this.length > 0;
    }
    /**
     * The duration of the buffer in seconds.
     */
    get duration() {
        if (this._buffer) {
            return this._buffer.duration;
        }
        else {
            return 0;
        }
    }
    /**
     * The length of the buffer in samples
     */
    get length() {
        if (this._buffer) {
            return this._buffer.length;
        }
        else {
            return 0;
        }
    }
    /**
     * The number of discrete audio channels. Returns 0 if no buffer is loaded.
     */
    get numberOfChannels() {
        if (this._buffer) {
            return this._buffer.numberOfChannels;
        }
        else {
            return 0;
        }
    }
    /**
     * Reverse the buffer.
     */
    get reverse() {
        return this._reversed;
    }
    set reverse(rev) {
        if (this._reversed !== rev) {
            this._reversed = rev;
            this._reverse();
        }
    }
    /**
     * Create a ToneAudioBuffer from the array. To create a multichannel AudioBuffer,
     * pass in a multidimensional array.
     * @param array The array to fill the audio buffer
     * @return A ToneAudioBuffer created from the array
     */
    static fromArray(array) {
        return (new ToneAudioBuffer()).fromArray(array);
    }
    /**
     * Creates a ToneAudioBuffer from a URL, returns a promise which resolves to a ToneAudioBuffer
     * @param  url The url to load.
     * @return A promise which resolves to a ToneAudioBuffer
     */
    static fromUrl(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const buffer = new ToneAudioBuffer();
            return yield buffer.load(url);
        });
    }
    /**
     * Loads a url using fetch and returns the AudioBuffer.
     */
    static load(url) {
        return __awaiter(this, void 0, void 0, function* () {
            // test if the url contains multiple extensions
            const matches = url.match(/\[([^\]\[]+\|.+)\]$/);
            if (matches) {
                const extensions = matches[1].split("|");
                let extension = extensions[0];
                for (const ext of extensions) {
                    if (ToneAudioBuffer.supportsType(ext)) {
                        extension = ext;
                        break;
                    }
                }
                url = url.replace(matches[0], extension);
            }
            // make sure there is a slash between the baseUrl and the url
            const baseUrl = ToneAudioBuffer.baseUrl === "" || ToneAudioBuffer.baseUrl.endsWith("/") ? ToneAudioBuffer.baseUrl : ToneAudioBuffer.baseUrl + "/";
            const response = yield fetch(baseUrl + url);
            if (!response.ok) {
                throw new Error(`could not load url: ${url}`);
            }
            const arrayBuffer = yield response.arrayBuffer();
            const audioBuffer = yield getContext().decodeAudioData(arrayBuffer);
            return audioBuffer;
        });
    }
    /**
     * Checks a url's extension to see if the current browser can play that file type.
     * @param url The url/extension to test
     * @return If the file extension can be played
     * @static
     * @example
     * Tone.ToneAudioBuffer.supportsType("wav"); // returns true
     * Tone.ToneAudioBuffer.supportsType("path/to/file.wav"); // returns true
     */
    static supportsType(url) {
        const extensions = url.split(".");
        const extension = extensions[extensions.length - 1];
        const response = document.createElement("audio").canPlayType("audio/" + extension);
        return response !== "";
    }
    /**
     * Returns a Promise which resolves when all of the buffers have loaded
     */
    static loaded() {
        return __awaiter(this, void 0, void 0, function* () {
            // this makes sure that the function is always async
            yield Promise.resolve();
            while (ToneAudioBuffer.downloads.length) {
                yield ToneAudioBuffer.downloads[0];
            }
        });
    }
}
//-------------------------------------
// STATIC METHODS
//-------------------------------------
/**
 * A path which is prefixed before every url.
 */
ToneAudioBuffer.baseUrl = "";
/**
 * All of the downloads
 */
ToneAudioBuffer.downloads = [];

/**
 * Wrapper around the OfflineAudioContext
 * @category Core
 * @example
 * // generate a single channel, 0.5 second buffer
 * const context = new Tone.OfflineContext(1, 0.5, 44100);
 * const osc = new Tone.Oscillator({ context });
 * context.render().then(buffer => {
 * 	console.log(buffer.numberOfChannels, buffer.duration);
 * });
 */
class OfflineContext extends Context {
    constructor() {
        super({
            clockSource: "offline",
            context: isOfflineAudioContext(arguments[0]) ?
                arguments[0] : createOfflineAudioContext(arguments[0], arguments[1] * arguments[2], arguments[2]),
            lookAhead: 0,
            updateInterval: isOfflineAudioContext(arguments[0]) ?
                128 / arguments[0].sampleRate : 128 / arguments[2],
        });
        this.name = "OfflineContext";
        /**
         * An artificial clock source
         */
        this._currentTime = 0;
        this.isOffline = true;
        this._duration = isOfflineAudioContext(arguments[0]) ?
            arguments[0].length / arguments[0].sampleRate : arguments[1];
    }
    /**
     * Override the now method to point to the internal clock time
     */
    now() {
        return this._currentTime;
    }
    /**
     * Same as this.now()
     */
    get currentTime() {
        return this._currentTime;
    }
    /**
     * Render just the clock portion of the audio context.
     */
    _renderClock(asynchronous) {
        return __awaiter(this, void 0, void 0, function* () {
            let index = 0;
            while (this._duration - this._currentTime >= 0) {
                // invoke all the callbacks on that time
                this.emit("tick");
                // increment the clock in block-sized chunks
                this._currentTime += 128 / this.sampleRate;
                // yield once a second of audio
                index++;
                const yieldEvery = Math.floor(this.sampleRate / 128);
                if (asynchronous && index % yieldEvery === 0) {
                    yield new Promise(done => setTimeout(done, 1));
                }
            }
        });
    }
    /**
     * Render the output of the OfflineContext
     * @param asynchronous If the clock should be rendered asynchronously, which will not block the main thread, but be slightly slower.
     */
    render(asynchronous = true) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.workletsAreReady();
            yield this._renderClock(asynchronous);
            const buffer = yield this._context.startRendering();
            return new ToneAudioBuffer(buffer);
        });
    }
    /**
     * Close the context
     */
    close() {
        return Promise.resolve();
    }
}

/**
 * This dummy context is used to avoid throwing immediate errors when importing in Node.js
 */
const dummyContext = new DummyContext();
/**
 * The global audio context which is getable and assignable through
 * getContext and setContext
 */
let globalContext = dummyContext;
/**
 * Returns the default system-wide [[Context]]
 * @category Core
 */
function getContext() {
    if (globalContext === dummyContext && hasAudioContext) {
        setContext(new Context());
    }
    return globalContext;
}
/**
 * Set the default audio context
 * @category Core
 */
function setContext(context) {
    if (isAudioContext(context)) {
        globalContext = new Context(context);
    }
    else if (isOfflineAudioContext(context)) {
        globalContext = new OfflineContext(context);
    }
    else {
        globalContext = context;
    }
}
/**
 * Log Tone.js + version in the console.
 */
if (theWindow && !theWindow.TONE_SILENCE_LOGGING) {
    let prefix = "v";
    const printString = ` * Tone.js ${prefix}${version} * `;
    // eslint-disable-next-line no-console
    console.log(`%c${printString}`, "background: #000; color: #fff");
}

/**
 * Equal power gain scale. Good for cross-fading.
 * @param  percent (0-1)
 */
/**
 * Convert decibels into gain.
 */
function dbToGain(db) {
    return Math.pow(10, db / 20);
}
/**
 * Convert gain to decibels.
 */
function gainToDb(gain) {
    return 20 * (Math.log(gain) / Math.LN10);
}
/**
 * Convert an interval (in semitones) to a frequency ratio.
 * @param interval the number of semitones above the base note
 * @example
 * Tone.intervalToFrequencyRatio(0); // 1
 * Tone.intervalToFrequencyRatio(12); // 2
 * Tone.intervalToFrequencyRatio(-12); // 0.5
 */
function intervalToFrequencyRatio(interval) {
    return Math.pow(2, (interval / 12));
}
/**
 * The Global [concert tuning pitch](https://en.wikipedia.org/wiki/Concert_pitch) which is used
 * to generate all the other pitch values from notes. A4's values in Hertz.
 */
let A4 = 440;
function getA4() {
    return A4;
}
function setA4(freq) {
    A4 = freq;
}
/**
 * Convert a frequency value to a MIDI note.
 * @param frequency The value to frequency value to convert.
 * @example
 * Tone.ftom(440); // returns 69
 */
function ftom(frequency) {
    return Math.round(ftomf(frequency));
}
/**
 * Convert a frequency to a floating point midi value
 */
function ftomf(frequency) {
    return 69 + 12 * Math.log2(frequency / A4);
}
/**
 * Convert a MIDI note to frequency value.
 * @param  midi The midi number to convert.
 * @return The corresponding frequency value
 * @example
 * Tone.mtof(69); // 440
 */
function mtof(midi) {
    return A4 * Math.pow(2, (midi - 69) / 12);
}

/**
 * TimeBase is a flexible encoding of time which can be evaluated to and from a string.
 */
class TimeBaseClass extends Tone {
    /**
     * @param context The context associated with the time value. Used to compute
     * Transport and context-relative timing.
     * @param  value  The time value as a number, string or object
     * @param  units  Unit values
     */
    constructor(context, value, units) {
        super();
        /**
         * The default units
         */
        this.defaultUnits = "s";
        this._val = value;
        this._units = units;
        this.context = context;
        this._expressions = this._getExpressions();
    }
    /**
     * All of the time encoding expressions
     */
    _getExpressions() {
        return {
            hz: {
                method: (value) => {
                    return this._frequencyToUnits(parseFloat(value));
                },
                regexp: /^(\d+(?:\.\d+)?)hz$/i,
            },
            i: {
                method: (value) => {
                    return this._ticksToUnits(parseInt(value, 10));
                },
                regexp: /^(\d+)i$/i,
            },
            m: {
                method: (value) => {
                    return this._beatsToUnits(parseInt(value, 10) * this._getTimeSignature());
                },
                regexp: /^(\d+)m$/i,
            },
            n: {
                method: (value, dot) => {
                    const numericValue = parseInt(value, 10);
                    const scalar = dot === "." ? 1.5 : 1;
                    if (numericValue === 1) {
                        return this._beatsToUnits(this._getTimeSignature()) * scalar;
                    }
                    else {
                        return this._beatsToUnits(4 / numericValue) * scalar;
                    }
                },
                regexp: /^(\d+)n(\.?)$/i,
            },
            number: {
                method: (value) => {
                    return this._expressions[this.defaultUnits].method.call(this, value);
                },
                regexp: /^(\d+(?:\.\d+)?)$/,
            },
            s: {
                method: (value) => {
                    return this._secondsToUnits(parseFloat(value));
                },
                regexp: /^(\d+(?:\.\d+)?)s$/,
            },
            samples: {
                method: (value) => {
                    return parseInt(value, 10) / this.context.sampleRate;
                },
                regexp: /^(\d+)samples$/,
            },
            t: {
                method: (value) => {
                    const numericValue = parseInt(value, 10);
                    return this._beatsToUnits(8 / (Math.floor(numericValue) * 3));
                },
                regexp: /^(\d+)t$/i,
            },
            tr: {
                method: (m, q, s) => {
                    let total = 0;
                    if (m && m !== "0") {
                        total += this._beatsToUnits(this._getTimeSignature() * parseFloat(m));
                    }
                    if (q && q !== "0") {
                        total += this._beatsToUnits(parseFloat(q));
                    }
                    if (s && s !== "0") {
                        total += this._beatsToUnits(parseFloat(s) / 4);
                    }
                    return total;
                },
                regexp: /^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?$/,
            },
        };
    }
    //-------------------------------------
    // 	VALUE OF
    //-------------------------------------
    /**
     * Evaluate the time value. Returns the time in seconds.
     */
    valueOf() {
        if (this._val instanceof TimeBaseClass) {
            this.fromType(this._val);
        }
        if (isUndef(this._val)) {
            return this._noArg();
        }
        else if (isString(this._val) && isUndef(this._units)) {
            for (const units in this._expressions) {
                if (this._expressions[units].regexp.test(this._val.trim())) {
                    this._units = units;
                    break;
                }
            }
        }
        else if (isObject(this._val)) {
            let total = 0;
            for (const typeName in this._val) {
                if (isDefined(this._val[typeName])) {
                    const quantity = this._val[typeName];
                    // @ts-ignore
                    const time = (new this.constructor(this.context, typeName)).valueOf() * quantity;
                    total += time;
                }
            }
            return total;
        }
        if (isDefined(this._units)) {
            const expr = this._expressions[this._units];
            const matching = this._val.toString().trim().match(expr.regexp);
            if (matching) {
                return expr.method.apply(this, matching.slice(1));
            }
            else {
                return expr.method.call(this, this._val);
            }
        }
        else if (isString(this._val)) {
            return parseFloat(this._val);
        }
        else {
            return this._val;
        }
    }
    //-------------------------------------
    // 	UNIT CONVERSIONS
    //-------------------------------------
    /**
     * Returns the value of a frequency in the current units
     */
    _frequencyToUnits(freq) {
        return 1 / freq;
    }
    /**
     * Return the value of the beats in the current units
     */
    _beatsToUnits(beats) {
        return (60 / this._getBpm()) * beats;
    }
    /**
     * Returns the value of a second in the current units
     */
    _secondsToUnits(seconds) {
        return seconds;
    }
    /**
     * Returns the value of a tick in the current time units
     */
    _ticksToUnits(ticks) {
        return (ticks * (this._beatsToUnits(1)) / this._getPPQ());
    }
    /**
     * With no arguments, return 'now'
     */
    _noArg() {
        return this._now();
    }
    //-------------------------------------
    // 	TEMPO CONVERSIONS
    //-------------------------------------
    /**
     * Return the bpm
     */
    _getBpm() {
        return this.context.transport.bpm.value;
    }
    /**
     * Return the timeSignature
     */
    _getTimeSignature() {
        return this.context.transport.timeSignature;
    }
    /**
     * Return the PPQ or 192 if Transport is not available
     */
    _getPPQ() {
        return this.context.transport.PPQ;
    }
    //-------------------------------------
    // 	CONVERSION INTERFACE
    //-------------------------------------
    /**
     * Coerce a time type into this units type.
     * @param type Any time type units
     */
    fromType(type) {
        this._units = undefined;
        switch (this.defaultUnits) {
            case "s":
                this._val = type.toSeconds();
                break;
            case "i":
                this._val = type.toTicks();
                break;
            case "hz":
                this._val = type.toFrequency();
                break;
            case "midi":
                this._val = type.toMidi();
                break;
        }
        return this;
    }
    /**
     * Return the value in hertz
     */
    toFrequency() {
        return 1 / this.toSeconds();
    }
    /**
     * Return the time in samples
     */
    toSamples() {
        return this.toSeconds() * this.context.sampleRate;
    }
    /**
     * Return the time in milliseconds.
     */
    toMilliseconds() {
        return this.toSeconds() * 1000;
    }
}

/**
 * TimeClass is a primitive type for encoding and decoding Time values.
 * TimeClass can be passed into the parameter of any method which takes time as an argument.
 * @param  val    The time value.
 * @param  units  The units of the value.
 * @example
 * const time = Tone.Time("4n"); // a quarter note
 * @category Unit
 */
class TimeClass extends TimeBaseClass {
    constructor() {
        super(...arguments);
        this.name = "TimeClass";
    }
    _getExpressions() {
        return Object.assign(super._getExpressions(), {
            now: {
                method: (capture) => {
                    return this._now() + new this.constructor(this.context, capture).valueOf();
                },
                regexp: /^\+(.+)/,
            },
            quantize: {
                method: (capture) => {
                    const quantTo = new TimeClass(this.context, capture).valueOf();
                    return this._secondsToUnits(this.context.transport.nextSubdivision(quantTo));
                },
                regexp: /^@(.+)/,
            },
        });
    }
    /**
     * Quantize the time by the given subdivision. Optionally add a
     * percentage which will move the time value towards the ideal
     * quantized value by that percentage.
     * @param  subdiv    The subdivision to quantize to
     * @param  percent  Move the time value towards the quantized value by a percentage.
     * @example
     * Tone.Time(21).quantize(2); // returns 22
     * Tone.Time(0.6).quantize("4n", 0.5); // returns 0.55
     */
    quantize(subdiv, percent = 1) {
        const subdivision = new this.constructor(this.context, subdiv).valueOf();
        const value = this.valueOf();
        const multiple = Math.round(value / subdivision);
        const ideal = multiple * subdivision;
        const diff = ideal - value;
        return value + diff * percent;
    }
    //-------------------------------------
    // CONVERSIONS
    //-------------------------------------
    /**
     * Convert a Time to Notation. The notation values are will be the
     * closest representation between 1m to 128th note.
     * @return {Notation}
     * @example
     * // if the Transport is at 120bpm:
     * Tone.Time(2).toNotation(); // returns "1m"
     */
    toNotation() {
        const time = this.toSeconds();
        const testNotations = ["1m"];
        for (let power = 1; power < 9; power++) {
            const subdiv = Math.pow(2, power);
            testNotations.push(subdiv + "n.");
            testNotations.push(subdiv + "n");
            testNotations.push(subdiv + "t");
        }
        testNotations.push("0");
        // find the closets notation representation
        let closest = testNotations[0];
        let closestSeconds = new TimeClass(this.context, testNotations[0]).toSeconds();
        testNotations.forEach(notation => {
            const notationSeconds = new TimeClass(this.context, notation).toSeconds();
            if (Math.abs(notationSeconds - time) < Math.abs(closestSeconds - time)) {
                closest = notation;
                closestSeconds = notationSeconds;
            }
        });
        return closest;
    }
    /**
     * Return the time encoded as Bars:Beats:Sixteenths.
     */
    toBarsBeatsSixteenths() {
        const quarterTime = this._beatsToUnits(1);
        let quarters = this.valueOf() / quarterTime;
        quarters = parseFloat(quarters.toFixed(4));
        const measures = Math.floor(quarters / this._getTimeSignature());
        let sixteenths = (quarters % 1) * 4;
        quarters = Math.floor(quarters) % this._getTimeSignature();
        const sixteenthString = sixteenths.toString();
        if (sixteenthString.length > 3) {
            // the additional parseFloat removes insignificant trailing zeroes
            sixteenths = parseFloat(parseFloat(sixteenthString).toFixed(3));
        }
        const progress = [measures, quarters, sixteenths];
        return progress.join(":");
    }
    /**
     * Return the time in ticks.
     */
    toTicks() {
        const quarterTime = this._beatsToUnits(1);
        const quarters = this.valueOf() / quarterTime;
        return Math.round(quarters * this._getPPQ());
    }
    /**
     * Return the time in seconds.
     */
    toSeconds() {
        return this.valueOf();
    }
    /**
     * Return the value as a midi note.
     */
    toMidi() {
        return ftom(this.toFrequency());
    }
    _now() {
        return this.context.now();
    }
}

/**
 * Frequency is a primitive type for encoding Frequency values.
 * Eventually all time values are evaluated to hertz using the `valueOf` method.
 * @example
 * Tone.Frequency("C3"); // 261
 * Tone.Frequency(38, "midi");
 * Tone.Frequency("C3").transpose(4);
 * @category Unit
 */
class FrequencyClass extends TimeClass {
    constructor() {
        super(...arguments);
        this.name = "Frequency";
        this.defaultUnits = "hz";
    }
    /**
     * The [concert tuning pitch](https://en.wikipedia.org/wiki/Concert_pitch) which is used
     * to generate all the other pitch values from notes. A4's values in Hertz.
     */
    static get A4() {
        return getA4();
    }
    static set A4(freq) {
        setA4(freq);
    }
    //-------------------------------------
    // 	AUGMENT BASE EXPRESSIONS
    //-------------------------------------
    _getExpressions() {
        return Object.assign({}, super._getExpressions(), {
            midi: {
                regexp: /^(\d+(?:\.\d+)?midi)/,
                method(value) {
                    if (this.defaultUnits === "midi") {
                        return value;
                    }
                    else {
                        return FrequencyClass.mtof(value);
                    }
                },
            },
            note: {
                regexp: /^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i,
                method(pitch, octave) {
                    const index = noteToScaleIndex[pitch.toLowerCase()];
                    const noteNumber = index + (parseInt(octave, 10) + 1) * 12;
                    if (this.defaultUnits === "midi") {
                        return noteNumber;
                    }
                    else {
                        return FrequencyClass.mtof(noteNumber);
                    }
                },
            },
            tr: {
                regexp: /^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?/,
                method(m, q, s) {
                    let total = 1;
                    if (m && m !== "0") {
                        total *= this._beatsToUnits(this._getTimeSignature() * parseFloat(m));
                    }
                    if (q && q !== "0") {
                        total *= this._beatsToUnits(parseFloat(q));
                    }
                    if (s && s !== "0") {
                        total *= this._beatsToUnits(parseFloat(s) / 4);
                    }
                    return total;
                },
            },
        });
    }
    //-------------------------------------
    // 	EXPRESSIONS
    //-------------------------------------
    /**
     * Transposes the frequency by the given number of semitones.
     * @return  A new transposed frequency
     * @example
     * Tone.Frequency("A4").transpose(3); // "C5"
     */
    transpose(interval) {
        return new FrequencyClass(this.context, this.valueOf() * intervalToFrequencyRatio(interval));
    }
    /**
     * Takes an array of semitone intervals and returns
     * an array of frequencies transposed by those intervals.
     * @return  Returns an array of Frequencies
     * @example
     * Tone.Frequency("A4").harmonize([0, 3, 7]); // ["A4", "C5", "E5"]
     */
    harmonize(intervals) {
        return intervals.map(interval => {
            return this.transpose(interval);
        });
    }
    //-------------------------------------
    // 	UNIT CONVERSIONS
    //-------------------------------------
    /**
     * Return the value of the frequency as a MIDI note
     * @example
     * Tone.Frequency("C4").toMidi(); // 60
     */
    toMidi() {
        return ftom(this.valueOf());
    }
    /**
     * Return the value of the frequency in Scientific Pitch Notation
     * @example
     * Tone.Frequency(69, "midi").toNote(); // "A4"
     */
    toNote() {
        const freq = this.toFrequency();
        const log = Math.log2(freq / FrequencyClass.A4);
        let noteNumber = Math.round(12 * log) + 57;
        const octave = Math.floor(noteNumber / 12);
        if (octave < 0) {
            noteNumber += -12 * octave;
        }
        const noteName = scaleIndexToNote[noteNumber % 12];
        return noteName + octave.toString();
    }
    /**
     * Return the duration of one cycle in seconds.
     */
    toSeconds() {
        return 1 / super.toSeconds();
    }
    /**
     * Return the duration of one cycle in ticks
     */
    toTicks() {
        const quarterTime = this._beatsToUnits(1);
        const quarters = this.valueOf() / quarterTime;
        return Math.floor(quarters * this._getPPQ());
    }
    //-------------------------------------
    // 	UNIT CONVERSIONS HELPERS
    //-------------------------------------
    /**
     * With no arguments, return 0
     */
    _noArg() {
        return 0;
    }
    /**
     * Returns the value of a frequency in the current units
     */
    _frequencyToUnits(freq) {
        return freq;
    }
    /**
     * Returns the value of a tick in the current time units
     */
    _ticksToUnits(ticks) {
        return 1 / ((ticks * 60) / (this._getBpm() * this._getPPQ()));
    }
    /**
     * Return the value of the beats in the current units
     */
    _beatsToUnits(beats) {
        return 1 / super._beatsToUnits(beats);
    }
    /**
     * Returns the value of a second in the current units
     */
    _secondsToUnits(seconds) {
        return 1 / seconds;
    }
    /**
     * Convert a MIDI note to frequency value.
     * @param  midi The midi number to convert.
     * @return The corresponding frequency value
     */
    static mtof(midi) {
        return mtof(midi);
    }
    /**
     * Convert a frequency value to a MIDI note.
     * @param frequency The value to frequency value to convert.
     */
    static ftom(frequency) {
        return ftom(frequency);
    }
}
//-------------------------------------
// 	FREQUENCY CONVERSIONS
//-------------------------------------
/**
 * Note to scale index.
 * @hidden
 */
const noteToScaleIndex = {
    cbb: -2, cb: -1, c: 0, "c#": 1, cx: 2,
    dbb: 0, db: 1, d: 2, "d#": 3, dx: 4,
    ebb: 2, eb: 3, e: 4, "e#": 5, ex: 6,
    fbb: 3, fb: 4, f: 5, "f#": 6, fx: 7,
    gbb: 5, gb: 6, g: 7, "g#": 8, gx: 9,
    abb: 7, ab: 8, a: 9, "a#": 10, ax: 11,
    bbb: 9, bb: 10, b: 11, "b#": 12, bx: 13,
};
/**
 * scale index to note (sharps)
 * @hidden
 */
const scaleIndexToNote = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

/**
 * TransportTime is a the time along the Transport's
 * timeline. It is similar to Tone.Time, but instead of evaluating
 * against the AudioContext's clock, it is evaluated against
 * the Transport's position. See [TransportTime wiki](https://github.com/Tonejs/Tone.js/wiki/TransportTime).
 * @category Unit
 */
class TransportTimeClass extends TimeClass {
    constructor() {
        super(...arguments);
        this.name = "TransportTime";
    }
    /**
     * Return the current time in whichever context is relevant
     */
    _now() {
        return this.context.transport.seconds;
    }
}

/**
 * The Base class for all nodes that have an AudioContext.
 */
class ToneWithContext extends Tone {
    constructor() {
        super();
        const options = optionsFromArguments(ToneWithContext.getDefaults(), arguments, ["context"]);
        if (this.defaultContext) {
            this.context = this.defaultContext;
        }
        else {
            this.context = options.context;
        }
    }
    static getDefaults() {
        return {
            context: getContext(),
        };
    }
    /**
     * Return the current time of the Context clock plus the lookAhead.
     * @example
     * setInterval(() => {
     * 	console.log(Tone.now());
     * }, 100);
     */
    now() {
        return this.context.currentTime + this.context.lookAhead;
    }
    /**
     * Return the current time of the Context clock without any lookAhead.
     * @example
     * setInterval(() => {
     * 	console.log(Tone.immediate());
     * }, 100);
     */
    immediate() {
        return this.context.currentTime;
    }
    /**
     * The duration in seconds of one sample.
     * @example
     * console.log(Tone.Transport.sampleTime);
     */
    get sampleTime() {
        return 1 / this.context.sampleRate;
    }
    /**
     * The number of seconds of 1 processing block (128 samples)
     * @example
     * console.log(Tone.Destination.blockTime);
     */
    get blockTime() {
        return 128 / this.context.sampleRate;
    }
    /**
     * Convert the incoming time to seconds.
     * This is calculated against the current [[Tone.Transport]] bpm
     * @example
     * const gain = new Tone.Gain();
     * setInterval(() => console.log(gain.toSeconds("4n")), 100);
     * // ramp the tempo to 60 bpm over 30 seconds
     * Tone.getTransport().bpm.rampTo(60, 30);
     */
    toSeconds(time) {
        return new TimeClass(this.context, time).toSeconds();
    }
    /**
     * Convert the input to a frequency number
     * @example
     * const gain = new Tone.Gain();
     * console.log(gain.toFrequency("4n"));
     */
    toFrequency(freq) {
        return new FrequencyClass(this.context, freq).toFrequency();
    }
    /**
     * Convert the input time into ticks
     * @example
     * const gain = new Tone.Gain();
     * console.log(gain.toTicks("4n"));
     */
    toTicks(time) {
        return new TransportTimeClass(this.context, time).toTicks();
    }
    //-------------------------------------
    // 	GET/SET
    //-------------------------------------
    /**
     * Get a subset of the properties which are in the partial props
     */
    _getPartialProperties(props) {
        const options = this.get();
        // remove attributes from the prop that are not in the partial
        Object.keys(options).forEach(name => {
            if (isUndef(props[name])) {
                delete options[name];
            }
        });
        return options;
    }
    /**
     * Get the object's attributes.
     * @example
     * const osc = new Tone.Oscillator();
     * console.log(osc.get());
     */
    get() {
        const defaults = getDefaultsFromInstance(this);
        Object.keys(defaults).forEach(attribute => {
            if (Reflect.has(this, attribute)) {
                const member = this[attribute];
                if (isDefined(member) && isDefined(member.value) && isDefined(member.setValueAtTime)) {
                    defaults[attribute] = member.value;
                }
                else if (member instanceof ToneWithContext) {
                    defaults[attribute] = member._getPartialProperties(defaults[attribute]);
                    // otherwise make sure it's a serializable type
                }
                else if (isArray(member) || isNumber(member) || isString(member) || isBoolean(member)) {
                    defaults[attribute] = member;
                }
                else {
                    // remove all undefined and unserializable attributes
                    delete defaults[attribute];
                }
            }
        });
        return defaults;
    }
    /**
     * Set multiple properties at once with an object.
     * @example
     * const filter = new Tone.Filter().toDestination();
     * // set values using an object
     * filter.set({
     * 	frequency: "C6",
     * 	type: "highpass"
     * });
     * const player = new Tone.Player("https://tonejs.github.io/audio/berklee/Analogsynth_octaves_highmid.mp3").connect(filter);
     * player.autostart = true;
     */
    set(props) {
        Object.keys(props).forEach(attribute => {
            if (Reflect.has(this, attribute) && isDefined(this[attribute])) {
                if (this[attribute] && isDefined(this[attribute].value) && isDefined(this[attribute].setValueAtTime)) {
                    // small optimization
                    if (this[attribute].value !== props[attribute]) {
                        this[attribute].value = props[attribute];
                    }
                }
                else if (this[attribute] instanceof ToneWithContext) {
                    this[attribute].set(props[attribute]);
                }
                else {
                    this[attribute] = props[attribute];
                }
            }
        });
        return this;
    }
}

/**
 * A Timeline State. Provides the methods: `setStateAtTime("state", time)` and `getValueAtTime(time)`
 * @param initial The initial state of the StateTimeline.  Defaults to `undefined`
 */
class StateTimeline extends Timeline {
    constructor(initial = "stopped") {
        super();
        this.name = "StateTimeline";
        this._initial = initial;
        this.setStateAtTime(this._initial, 0);
    }
    /**
     * Returns the scheduled state scheduled before or at
     * the given time.
     * @param  time  The time to query.
     * @return  The name of the state input in setStateAtTime.
     */
    getValueAtTime(time) {
        const event = this.get(time);
        if (event !== null) {
            return event.state;
        }
        else {
            return this._initial;
        }
    }
    /**
     * Add a state to the timeline.
     * @param  state The name of the state to set.
     * @param  time  The time to query.
     * @param options Any additional options that are needed in the timeline.
     */
    setStateAtTime(state, time, options) {
        assertRange(time, 0);
        this.add(Object.assign({}, options, {
            state,
            time,
        }));
        return this;
    }
    /**
     * Return the event before the time with the given state
     * @param  state The state to look for
     * @param  time  When to check before
     * @return  The event with the given state before the time
     */
    getLastState(state, time) {
        // time = this.toSeconds(time);
        const index = this._search(time);
        for (let i = index; i >= 0; i--) {
            const event = this._timeline[i];
            if (event.state === state) {
                return event;
            }
        }
    }
    /**
     * Return the event after the time with the given state
     * @param  state The state to look for
     * @param  time  When to check from
     * @return  The event with the given state after the time
     */
    getNextState(state, time) {
        // time = this.toSeconds(time);
        const index = this._search(time);
        if (index !== -1) {
            for (let i = index; i < this._timeline.length; i++) {
                const event = this._timeline[i];
                if (event.state === state) {
                    return event;
                }
            }
        }
    }
}

/**
 * Param wraps the native Web Audio's AudioParam to provide
 * additional unit conversion functionality. It also
 * serves as a base-class for classes which have a single,
 * automatable parameter.
 * @category Core
 */
class Param extends ToneWithContext {
    constructor() {
        super(optionsFromArguments(Param.getDefaults(), arguments, ["param", "units", "convert"]));
        this.name = "Param";
        this.overridden = false;
        /**
         * The minimum output value
         */
        this._minOutput = 1e-7;
        const options = optionsFromArguments(Param.getDefaults(), arguments, ["param", "units", "convert"]);
        assert(isDefined(options.param) &&
            (isAudioParam(options.param) || options.param instanceof Param), "param must be an AudioParam");
        while (!isAudioParam(options.param)) {
            options.param = options.param._param;
        }
        this._swappable = isDefined(options.swappable) ? options.swappable : false;
        if (this._swappable) {
            this.input = this.context.createGain();
            // initialize
            this._param = options.param;
            this.input.connect(this._param);
        }
        else {
            this._param = this.input = options.param;
        }
        this._events = new Timeline(1000);
        this._initialValue = this._param.defaultValue;
        this.units = options.units;
        this.convert = options.convert;
        this._minValue = options.minValue;
        this._maxValue = options.maxValue;
        // if the value is defined, set it immediately
        if (isDefined(options.value) && options.value !== this._toType(this._initialValue)) {
            this.setValueAtTime(options.value, 0);
        }
    }
    static getDefaults() {
        return Object.assign(ToneWithContext.getDefaults(), {
            convert: true,
            units: "number",
        });
    }
    get value() {
        const now = this.now();
        return this.getValueAtTime(now);
    }
    set value(value) {
        this.cancelScheduledValues(this.now());
        this.setValueAtTime(value, this.now());
    }
    get minValue() {
        // if it's not the default minValue, return it
        if (isDefined(this._minValue)) {
            return this._minValue;
        }
        else if (this.units === "time" || this.units === "frequency" ||
            this.units === "normalRange" || this.units === "positive" ||
            this.units === "transportTime" || this.units === "ticks" ||
            this.units === "bpm" || this.units === "hertz" || this.units === "samples") {
            return 0;
        }
        else if (this.units === "audioRange") {
            return -1;
        }
        else if (this.units === "decibels") {
            return -Infinity;
        }
        else {
            return this._param.minValue;
        }
    }
    get maxValue() {
        if (isDefined(this._maxValue)) {
            return this._maxValue;
        }
        else if (this.units === "normalRange" ||
            this.units === "audioRange") {
            return 1;
        }
        else {
            return this._param.maxValue;
        }
    }
    /**
     * Type guard based on the unit name
     */
    _is(arg, type) {
        return this.units === type;
    }
    /**
     * Make sure the value is always in the defined range
     */
    _assertRange(value) {
        if (isDefined(this.maxValue) && isDefined(this.minValue)) {
            assertRange(value, this._fromType(this.minValue), this._fromType(this.maxValue));
        }
        return value;
    }
    /**
     * Convert the given value from the type specified by Param.units
     * into the destination value (such as Gain or Frequency).
     */
    _fromType(val) {
        if (this.convert && !this.overridden) {
            if (this._is(val, "time")) {
                return this.toSeconds(val);
            }
            else if (this._is(val, "decibels")) {
                return dbToGain(val);
            }
            else if (this._is(val, "frequency")) {
                return this.toFrequency(val);
            }
            else {
                return val;
            }
        }
        else if (this.overridden) {
            // if it's overridden, should only schedule 0s
            return 0;
        }
        else {
            return val;
        }
    }
    /**
     * Convert the parameters value into the units specified by Param.units.
     */
    _toType(val) {
        if (this.convert && this.units === "decibels") {
            return gainToDb(val);
        }
        else {
            return val;
        }
    }
    //-------------------------------------
    // ABSTRACT PARAM INTERFACE
    // all docs are generated from ParamInterface.ts
    //-------------------------------------
    setValueAtTime(value, time) {
        const computedTime = this.toSeconds(time);
        const numericValue = this._fromType(value);
        assert(isFinite(numericValue) && isFinite(computedTime), `Invalid argument(s) to setValueAtTime: ${JSON.stringify(value)}, ${JSON.stringify(time)}`);
        this._assertRange(numericValue);
        this.log(this.units, "setValueAtTime", value, computedTime);
        this._events.add({
            time: computedTime,
            type: "setValueAtTime",
            value: numericValue,
        });
        this._param.setValueAtTime(numericValue, computedTime);
        return this;
    }
    getValueAtTime(time) {
        const computedTime = Math.max(this.toSeconds(time), 0);
        const after = this._events.getAfter(computedTime);
        const before = this._events.get(computedTime);
        let value = this._initialValue;
        // if it was set by
        if (before === null) {
            value = this._initialValue;
        }
        else if (before.type === "setTargetAtTime" && (after === null || after.type === "setValueAtTime")) {
            const previous = this._events.getBefore(before.time);
            let previousVal;
            if (previous === null) {
                previousVal = this._initialValue;
            }
            else {
                previousVal = previous.value;
            }
            if (before.type === "setTargetAtTime") {
                value = this._exponentialApproach(before.time, previousVal, before.value, before.constant, computedTime);
            }
        }
        else if (after === null) {
            value = before.value;
        }
        else if (after.type === "linearRampToValueAtTime" || after.type === "exponentialRampToValueAtTime") {
            let beforeValue = before.value;
            if (before.type === "setTargetAtTime") {
                const previous = this._events.getBefore(before.time);
                if (previous === null) {
                    beforeValue = this._initialValue;
                }
                else {
                    beforeValue = previous.value;
                }
            }
            if (after.type === "linearRampToValueAtTime") {
                value = this._linearInterpolate(before.time, beforeValue, after.time, after.value, computedTime);
            }
            else {
                value = this._exponentialInterpolate(before.time, beforeValue, after.time, after.value, computedTime);
            }
        }
        else {
            value = before.value;
        }
        return this._toType(value);
    }
    setRampPoint(time) {
        time = this.toSeconds(time);
        let currentVal = this.getValueAtTime(time);
        this.cancelAndHoldAtTime(time);
        if (this._fromType(currentVal) === 0) {
            currentVal = this._toType(this._minOutput);
        }
        this.setValueAtTime(currentVal, time);
        return this;
    }
    linearRampToValueAtTime(value, endTime) {
        const numericValue = this._fromType(value);
        const computedTime = this.toSeconds(endTime);
        assert(isFinite(numericValue) && isFinite(computedTime), `Invalid argument(s) to linearRampToValueAtTime: ${JSON.stringify(value)}, ${JSON.stringify(endTime)}`);
        this._assertRange(numericValue);
        this._events.add({
            time: computedTime,
            type: "linearRampToValueAtTime",
            value: numericValue,
        });
        this.log(this.units, "linearRampToValueAtTime", value, computedTime);
        this._param.linearRampToValueAtTime(numericValue, computedTime);
        return this;
    }
    exponentialRampToValueAtTime(value, endTime) {
        let numericValue = this._fromType(value);
        // the value can't be 0
        numericValue = EQ(numericValue, 0) ? this._minOutput : numericValue;
        this._assertRange(numericValue);
        const computedTime = this.toSeconds(endTime);
        assert(isFinite(numericValue) && isFinite(computedTime), `Invalid argument(s) to exponentialRampToValueAtTime: ${JSON.stringify(value)}, ${JSON.stringify(endTime)}`);
        // store the event
        this._events.add({
            time: computedTime,
            type: "exponentialRampToValueAtTime",
            value: numericValue,
        });
        this.log(this.units, "exponentialRampToValueAtTime", value, computedTime);
        this._param.exponentialRampToValueAtTime(numericValue, computedTime);
        return this;
    }
    exponentialRampTo(value, rampTime, startTime) {
        startTime = this.toSeconds(startTime);
        this.setRampPoint(startTime);
        this.exponentialRampToValueAtTime(value, startTime + this.toSeconds(rampTime));
        return this;
    }
    linearRampTo(value, rampTime, startTime) {
        startTime = this.toSeconds(startTime);
        this.setRampPoint(startTime);
        this.linearRampToValueAtTime(value, startTime + this.toSeconds(rampTime));
        return this;
    }
    targetRampTo(value, rampTime, startTime) {
        startTime = this.toSeconds(startTime);
        this.setRampPoint(startTime);
        this.exponentialApproachValueAtTime(value, startTime, rampTime);
        return this;
    }
    exponentialApproachValueAtTime(value, time, rampTime) {
        time = this.toSeconds(time);
        rampTime = this.toSeconds(rampTime);
        const timeConstant = Math.log(rampTime + 1) / Math.log(200);
        this.setTargetAtTime(value, time, timeConstant);
        // at 90% start a linear ramp to the final value
        this.cancelAndHoldAtTime(time + rampTime * 0.9);
        this.linearRampToValueAtTime(value, time + rampTime);
        return this;
    }
    setTargetAtTime(value, startTime, timeConstant) {
        const numericValue = this._fromType(value);
        // The value will never be able to approach without timeConstant > 0.
        assert(isFinite(timeConstant) && timeConstant > 0, "timeConstant must be a number greater than 0");
        const computedTime = this.toSeconds(startTime);
        this._assertRange(numericValue);
        assert(isFinite(numericValue) && isFinite(computedTime), `Invalid argument(s) to setTargetAtTime: ${JSON.stringify(value)}, ${JSON.stringify(startTime)}`);
        this._events.add({
            constant: timeConstant,
            time: computedTime,
            type: "setTargetAtTime",
            value: numericValue,
        });
        this.log(this.units, "setTargetAtTime", value, computedTime, timeConstant);
        this._param.setTargetAtTime(numericValue, computedTime, timeConstant);
        return this;
    }
    setValueCurveAtTime(values, startTime, duration, scaling = 1) {
        duration = this.toSeconds(duration);
        startTime = this.toSeconds(startTime);
        const startingValue = this._fromType(values[0]) * scaling;
        this.setValueAtTime(this._toType(startingValue), startTime);
        const segTime = duration / (values.length - 1);
        for (let i = 1; i < values.length; i++) {
            const numericValue = this._fromType(values[i]) * scaling;
            this.linearRampToValueAtTime(this._toType(numericValue), startTime + i * segTime);
        }
        return this;
    }
    cancelScheduledValues(time) {
        const computedTime = this.toSeconds(time);
        assert(isFinite(computedTime), `Invalid argument to cancelScheduledValues: ${JSON.stringify(time)}`);
        this._events.cancel(computedTime);
        this._param.cancelScheduledValues(computedTime);
        this.log(this.units, "cancelScheduledValues", computedTime);
        return this;
    }
    cancelAndHoldAtTime(time) {
        const computedTime = this.toSeconds(time);
        const valueAtTime = this._fromType(this.getValueAtTime(computedTime));
        // remove the schedule events
        assert(isFinite(computedTime), `Invalid argument to cancelAndHoldAtTime: ${JSON.stringify(time)}`);
        this.log(this.units, "cancelAndHoldAtTime", computedTime, "value=" + valueAtTime);
        // if there is an event at the given computedTime
        // and that even is not a "set"
        const before = this._events.get(computedTime);
        const after = this._events.getAfter(computedTime);
        if (before && EQ(before.time, computedTime)) {
            // remove everything after
            if (after) {
                this._param.cancelScheduledValues(after.time);
                this._events.cancel(after.time);
            }
            else {
                this._param.cancelAndHoldAtTime(computedTime);
                this._events.cancel(computedTime + this.sampleTime);
            }
        }
        else if (after) {
            this._param.cancelScheduledValues(after.time);
            // cancel the next event(s)
            this._events.cancel(after.time);
            if (after.type === "linearRampToValueAtTime") {
                this.linearRampToValueAtTime(this._toType(valueAtTime), computedTime);
            }
            else if (after.type === "exponentialRampToValueAtTime") {
                this.exponentialRampToValueAtTime(this._toType(valueAtTime), computedTime);
            }
        }
        // set the value at the given time
        this._events.add({
            time: computedTime,
            type: "setValueAtTime",
            value: valueAtTime,
        });
        this._param.setValueAtTime(valueAtTime, computedTime);
        return this;
    }
    rampTo(value, rampTime = 0.1, startTime) {
        if (this.units === "frequency" || this.units === "bpm" || this.units === "decibels") {
            this.exponentialRampTo(value, rampTime, startTime);
        }
        else {
            this.linearRampTo(value, rampTime, startTime);
        }
        return this;
    }
    /**
     * Apply all of the previously scheduled events to the passed in Param or AudioParam.
     * The applied values will start at the context's current time and schedule
     * all of the events which are scheduled on this Param onto the passed in param.
     */
    apply(param) {
        const now = this.context.currentTime;
        // set the param's value at the current time and schedule everything else
        param.setValueAtTime(this.getValueAtTime(now), now);
        // if the previous event was a curve, then set the rest of it
        const previousEvent = this._events.get(now);
        if (previousEvent && previousEvent.type === "setTargetAtTime") {
            // approx it until the next event with linear ramps
            const nextEvent = this._events.getAfter(previousEvent.time);
            // or for 2 seconds if there is no event
            const endTime = nextEvent ? nextEvent.time : now + 2;
            const subdivisions = (endTime - now) / 10;
            for (let i = now; i < endTime; i += subdivisions) {
                param.linearRampToValueAtTime(this.getValueAtTime(i), i);
            }
        }
        this._events.forEachAfter(this.context.currentTime, event => {
            if (event.type === "cancelScheduledValues") {
                param.cancelScheduledValues(event.time);
            }
            else if (event.type === "setTargetAtTime") {
                param.setTargetAtTime(event.value, event.time, event.constant);
            }
            else {
                param[event.type](event.value, event.time);
            }
        });
        return this;
    }
    /**
     * Replace the Param's internal AudioParam. Will apply scheduled curves
     * onto the parameter and replace the connections.
     */
    setParam(param) {
        assert(this._swappable, "The Param must be assigned as 'swappable' in the constructor");
        const input = this.input;
        input.disconnect(this._param);
        this.apply(param);
        this._param = param;
        input.connect(this._param);
        return this;
    }
    dispose() {
        super.dispose();
        this._events.dispose();
        return this;
    }
    get defaultValue() {
        return this._toType(this._param.defaultValue);
    }
    //-------------------------------------
    // 	AUTOMATION CURVE CALCULATIONS
    // 	MIT License, copyright (c) 2014 Jordan Santell
    //-------------------------------------
    // Calculates the the value along the curve produced by setTargetAtTime
    _exponentialApproach(t0, v0, v1, timeConstant, t) {
        return v1 + (v0 - v1) * Math.exp(-(t - t0) / timeConstant);
    }
    // Calculates the the value along the curve produced by linearRampToValueAtTime
    _linearInterpolate(t0, v0, t1, v1, t) {
        return v0 + (v1 - v0) * ((t - t0) / (t1 - t0));
    }
    // Calculates the the value along the curve produced by exponentialRampToValueAtTime
    _exponentialInterpolate(t0, v0, t1, v1, t) {
        return v0 * Math.pow(v1 / v0, (t - t0) / (t1 - t0));
    }
}

/**
 * ToneAudioNode is the base class for classes which process audio.
 */
class ToneAudioNode extends ToneWithContext {
    constructor() {
        super(...arguments);
        /**
         * The name of the class
         */
        this.name = "ToneAudioNode";
        /**
         * List all of the node that must be set to match the ChannelProperties
         */
        this._internalChannels = [];
    }
    /**
     * The number of inputs feeding into the AudioNode.
     * For source nodes, this will be 0.
     * @example
     * const node = new Tone.Gain();
     * console.log(node.numberOfInputs);
     */
    get numberOfInputs() {
        if (isDefined(this.input)) {
            if (isAudioParam(this.input) || this.input instanceof Param) {
                return 1;
            }
            else {
                return this.input.numberOfInputs;
            }
        }
        else {
            return 0;
        }
    }
    /**
     * The number of outputs of the AudioNode.
     * @example
     * const node = new Tone.Gain();
     * console.log(node.numberOfOutputs);
     */
    get numberOfOutputs() {
        if (isDefined(this.output)) {
            return this.output.numberOfOutputs;
        }
        else {
            return 0;
        }
    }
    //-------------------------------------
    // AUDIO PROPERTIES
    //-------------------------------------
    /**
     * Used to decide which nodes to get/set properties on
     */
    _isAudioNode(node) {
        return isDefined(node) && (node instanceof ToneAudioNode || isAudioNode(node));
    }
    /**
     * Get all of the audio nodes (either internal or input/output) which together
     * make up how the class node responds to channel input/output
     */
    _getInternalNodes() {
        const nodeList = this._internalChannels.slice(0);
        if (this._isAudioNode(this.input)) {
            nodeList.push(this.input);
        }
        if (this._isAudioNode(this.output)) {
            if (this.input !== this.output) {
                nodeList.push(this.output);
            }
        }
        return nodeList;
    }
    /**
     * Set the audio options for this node such as channelInterpretation
     * channelCount, etc.
     * @param options
     */
    _setChannelProperties(options) {
        const nodeList = this._getInternalNodes();
        nodeList.forEach(node => {
            node.channelCount = options.channelCount;
            node.channelCountMode = options.channelCountMode;
            node.channelInterpretation = options.channelInterpretation;
        });
    }
    /**
     * Get the current audio options for this node such as channelInterpretation
     * channelCount, etc.
     */
    _getChannelProperties() {
        const nodeList = this._getInternalNodes();
        assert(nodeList.length > 0, "ToneAudioNode does not have any internal nodes");
        // use the first node to get properties
        // they should all be the same
        const node = nodeList[0];
        return {
            channelCount: node.channelCount,
            channelCountMode: node.channelCountMode,
            channelInterpretation: node.channelInterpretation,
        };
    }
    /**
     * channelCount is the number of channels used when up-mixing and down-mixing
     * connections to any inputs to the node. The default value is 2 except for
     * specific nodes where its value is specially determined.
     */
    get channelCount() {
        return this._getChannelProperties().channelCount;
    }
    set channelCount(channelCount) {
        const props = this._getChannelProperties();
        // merge it with the other properties
        this._setChannelProperties(Object.assign(props, { channelCount }));
    }
    /**
     * channelCountMode determines how channels will be counted when up-mixing and
     * down-mixing connections to any inputs to the node.
     * The default value is "max". This attribute has no effect for nodes with no inputs.
     * * "max" - computedNumberOfChannels is the maximum of the number of channels of all connections to an input. In this mode channelCount is ignored.
     * * "clamped-max" - computedNumberOfChannels is determined as for "max" and then clamped to a maximum value of the given channelCount.
     * * "explicit" - computedNumberOfChannels is the exact value as specified by the channelCount.
     */
    get channelCountMode() {
        return this._getChannelProperties().channelCountMode;
    }
    set channelCountMode(channelCountMode) {
        const props = this._getChannelProperties();
        // merge it with the other properties
        this._setChannelProperties(Object.assign(props, { channelCountMode }));
    }
    /**
     * channelInterpretation determines how individual channels will be treated
     * when up-mixing and down-mixing connections to any inputs to the node.
     * The default value is "speakers".
     */
    get channelInterpretation() {
        return this._getChannelProperties().channelInterpretation;
    }
    set channelInterpretation(channelInterpretation) {
        const props = this._getChannelProperties();
        // merge it with the other properties
        this._setChannelProperties(Object.assign(props, { channelInterpretation }));
    }
    //-------------------------------------
    // CONNECTIONS
    //-------------------------------------
    /**
     * connect the output of a ToneAudioNode to an AudioParam, AudioNode, or ToneAudioNode
     * @param destination The output to connect to
     * @param outputNum The output to connect from
     * @param inputNum The input to connect to
     */
    connect(destination, outputNum = 0, inputNum = 0) {
        connect(this, destination, outputNum, inputNum);
        return this;
    }
    /**
     * Connect the output to the context's destination node.
     * @example
     * const osc = new Tone.Oscillator("C2").start();
     * osc.toDestination();
     */
    toDestination() {
        this.connect(this.context.destination);
        return this;
    }
    /**
     * Connect the output to the context's destination node.
     * See [[toDestination]]
     * @deprecated
     */
    toMaster() {
        warn("toMaster() has been renamed toDestination()");
        return this.toDestination();
    }
    /**
     * disconnect the output
     */
    disconnect(destination, outputNum = 0, inputNum = 0) {
        disconnect(this, destination, outputNum, inputNum);
        return this;
    }
    /**
     * Connect the output of this node to the rest of the nodes in series.
     * @example
     * const player = new Tone.Player("https://tonejs.github.io/audio/drum-samples/handdrum-loop.mp3");
     * player.autostart = true;
     * const filter = new Tone.AutoFilter(4).start();
     * const distortion = new Tone.Distortion(0.5);
     * // connect the player to the filter, distortion and then to the master output
     * player.chain(filter, distortion, Tone.Destination);
     */
    chain(...nodes) {
        connectSeries(this, ...nodes);
        return this;
    }
    /**
     * connect the output of this node to the rest of the nodes in parallel.
     * @example
     * const player = new Tone.Player("https://tonejs.github.io/audio/drum-samples/conga-rhythm.mp3");
     * player.autostart = true;
     * const pitchShift = new Tone.PitchShift(4).toDestination();
     * const filter = new Tone.Filter("G5").toDestination();
     * // connect a node to the pitch shift and filter in parallel
     * player.fan(pitchShift, filter);
     */
    fan(...nodes) {
        nodes.forEach(node => this.connect(node));
        return this;
    }
    /**
     * Dispose and disconnect
     */
    dispose() {
        super.dispose();
        if (isDefined(this.input)) {
            if (this.input instanceof ToneAudioNode) {
                this.input.dispose();
            }
            else if (isAudioNode(this.input)) {
                this.input.disconnect();
            }
        }
        if (isDefined(this.output)) {
            if (this.output instanceof ToneAudioNode) {
                this.output.dispose();
            }
            else if (isAudioNode(this.output)) {
                this.output.disconnect();
            }
        }
        this._internalChannels = [];
        return this;
    }
}
//-------------------------------------
// CONNECTIONS
//-------------------------------------
/**
 * connect together all of the arguments in series
 * @param nodes
 */
function connectSeries(...nodes) {
    const first = nodes.shift();
    nodes.reduce((prev, current) => {
        if (prev instanceof ToneAudioNode) {
            prev.connect(current);
        }
        else if (isAudioNode(prev)) {
            connect(prev, current);
        }
        return current;
    }, first);
}
/**
 * Connect two nodes together so that signal flows from the
 * first node to the second. Optionally specify the input and output channels.
 * @param srcNode The source node
 * @param dstNode The destination node
 * @param outputNumber The output channel of the srcNode
 * @param inputNumber The input channel of the dstNode
 */
function connect(srcNode, dstNode, outputNumber = 0, inputNumber = 0) {
    assert(isDefined(srcNode), "Cannot connect from undefined node");
    assert(isDefined(dstNode), "Cannot connect to undefined node");
    if (dstNode instanceof ToneAudioNode || isAudioNode(dstNode)) {
        assert(dstNode.numberOfInputs > 0, "Cannot connect to node with no inputs");
    }
    assert(srcNode.numberOfOutputs > 0, "Cannot connect from node with no outputs");
    // resolve the input of the dstNode
    while ((dstNode instanceof ToneAudioNode || dstNode instanceof Param)) {
        if (isDefined(dstNode.input)) {
            dstNode = dstNode.input;
        }
    }
    while (srcNode instanceof ToneAudioNode) {
        if (isDefined(srcNode.output)) {
            srcNode = srcNode.output;
        }
    }
    // make the connection
    if (isAudioParam(dstNode)) {
        srcNode.connect(dstNode, outputNumber);
    }
    else {
        srcNode.connect(dstNode, outputNumber, inputNumber);
    }
}
/**
 * Disconnect a node from all nodes or optionally include a destination node and input/output channels.
 * @param srcNode The source node
 * @param dstNode The destination node
 * @param outputNumber The output channel of the srcNode
 * @param inputNumber The input channel of the dstNode
 */
function disconnect(srcNode, dstNode, outputNumber = 0, inputNumber = 0) {
    // resolve the destination node
    if (isDefined(dstNode)) {
        while (dstNode instanceof ToneAudioNode) {
            dstNode = dstNode.input;
        }
    }
    // resolve the src node
    while (!(isAudioNode(srcNode))) {
        if (isDefined(srcNode.output)) {
            srcNode = srcNode.output;
        }
    }
    if (isAudioParam(dstNode)) {
        srcNode.disconnect(dstNode, outputNumber);
    }
    else if (isAudioNode(dstNode)) {
        srcNode.disconnect(dstNode, outputNumber, inputNumber);
    }
    else {
        srcNode.disconnect();
    }
}

/**
 * A thin wrapper around the Native Web Audio GainNode.
 * The GainNode is a basic building block of the Web Audio
 * API and is useful for routing audio and adjusting gains.
 * @category Core
 * @example
 * return Tone.Offline(() => {
 * 	const gainNode = new Tone.Gain(0).toDestination();
 * 	const osc = new Tone.Oscillator(30).connect(gainNode).start();
 * 	gainNode.gain.rampTo(1, 0.1);
 * 	gainNode.gain.rampTo(0, 0.4, 0.2);
 * }, 0.7, 1);
 */
class Gain extends ToneAudioNode {
    constructor() {
        super(optionsFromArguments(Gain.getDefaults(), arguments, ["gain", "units"]));
        this.name = "Gain";
        /**
         * The wrapped GainNode.
         */
        this._gainNode = this.context.createGain();
        // input = output
        this.input = this._gainNode;
        this.output = this._gainNode;
        const options = optionsFromArguments(Gain.getDefaults(), arguments, ["gain", "units"]);
        this.gain = new Param({
            context: this.context,
            convert: options.convert,
            param: this._gainNode.gain,
            units: options.units,
            value: options.gain,
            minValue: options.minValue,
            maxValue: options.maxValue,
        });
        readOnly(this, "gain");
    }
    static getDefaults() {
        return Object.assign(ToneAudioNode.getDefaults(), {
            convert: true,
            gain: 1,
            units: "gain",
        });
    }
    /**
     * Clean up.
     */
    dispose() {
        super.dispose();
        this._gainNode.disconnect();
        this.gain.dispose();
        return this;
    }
}

/**
 * Base class for fire-and-forget nodes
 */
class OneShotSource extends ToneAudioNode {
    constructor(options) {
        super(options);
        /**
         * The callback to invoke after the
         * source is done playing.
         */
        this.onended = noOp;
        /**
         * The start time
         */
        this._startTime = -1;
        /**
         * The stop time
         */
        this._stopTime = -1;
        /**
         * The id of the timeout
         */
        this._timeout = -1;
        /**
         * The public output node
         */
        this.output = new Gain({
            context: this.context,
            gain: 0,
        });
        /**
         * The output gain node.
         */
        this._gainNode = this.output;
        /**
         * Get the playback state at the given time
         */
        this.getStateAtTime = function (time) {
            const computedTime = this.toSeconds(time);
            if (this._startTime !== -1 &&
                computedTime >= this._startTime &&
                (this._stopTime === -1 || computedTime <= this._stopTime)) {
                return "started";
            }
            else {
                return "stopped";
            }
        };
        this._fadeIn = options.fadeIn;
        this._fadeOut = options.fadeOut;
        this._curve = options.curve;
        this.onended = options.onended;
    }
    static getDefaults() {
        return Object.assign(ToneAudioNode.getDefaults(), {
            curve: "linear",
            fadeIn: 0,
            fadeOut: 0,
            onended: noOp,
        });
    }
    /**
     * Start the source at the given time
     * @param  time When to start the source
     */
    _startGain(time, gain = 1) {
        assert(this._startTime === -1, "Source cannot be started more than once");
        // apply a fade in envelope
        const fadeInTime = this.toSeconds(this._fadeIn);
        // record the start time
        this._startTime = time + fadeInTime;
        this._startTime = Math.max(this._startTime, this.context.currentTime);
        // schedule the envelope
        if (fadeInTime > 0) {
            this._gainNode.gain.setValueAtTime(0, time);
            if (this._curve === "linear") {
                this._gainNode.gain.linearRampToValueAtTime(gain, time + fadeInTime);
            }
            else {
                this._gainNode.gain.exponentialApproachValueAtTime(gain, time, fadeInTime);
            }
        }
        else {
            this._gainNode.gain.setValueAtTime(gain, time);
        }
        return this;
    }
    /**
     * Stop the source node at the given time.
     * @param time When to stop the source
     */
    stop(time) {
        this.log("stop", time);
        this._stopGain(this.toSeconds(time));
        return this;
    }
    /**
     * Stop the source at the given time
     * @param  time When to stop the source
     */
    _stopGain(time) {
        assert(this._startTime !== -1, "'start' must be called before 'stop'");
        // cancel the previous stop
        this.cancelStop();
        // the fadeOut time
        const fadeOutTime = this.toSeconds(this._fadeOut);
        // schedule the stop callback
        this._stopTime = this.toSeconds(time) + fadeOutTime;
        this._stopTime = Math.max(this._stopTime, this.context.currentTime);
        if (fadeOutTime > 0) {
            // start the fade out curve at the given time
            if (this._curve === "linear") {
                this._gainNode.gain.linearRampTo(0, fadeOutTime, time);
            }
            else {
                this._gainNode.gain.targetRampTo(0, fadeOutTime, time);
            }
        }
        else {
            // stop any ongoing ramps, and set the value to 0
            this._gainNode.gain.cancelAndHoldAtTime(time);
            this._gainNode.gain.setValueAtTime(0, time);
        }
        this.context.clearTimeout(this._timeout);
        this._timeout = this.context.setTimeout(() => {
            // allow additional time for the exponential curve to fully decay
            const additionalTail = this._curve === "exponential" ? fadeOutTime * 2 : 0;
            this._stopSource(this.now() + additionalTail);
            this._onended();
        }, this._stopTime - this.context.currentTime);
        return this;
    }
    /**
     * Invoke the onended callback
     */
    _onended() {
        if (this.onended !== noOp) {
            this.onended(this);
            // overwrite onended to make sure it only is called once
            this.onended = noOp;
            // dispose when it's ended to free up for garbage collection only in the online context
            if (!this.context.isOffline) {
                const disposeCallback = () => this.dispose();
                // @ts-ignore
                if (typeof window.requestIdleCallback !== "undefined") {
                    // @ts-ignore
                    window.requestIdleCallback(disposeCallback);
                }
                else {
                    setTimeout(disposeCallback, 1000);
                }
            }
        }
    }
    /**
     * Get the playback state at the current time
     */
    get state() {
        return this.getStateAtTime(this.now());
    }
    /**
     * Cancel a scheduled stop event
     */
    cancelStop() {
        this.log("cancelStop");
        assert(this._startTime !== -1, "Source is not started");
        // cancel the stop envelope
        this._gainNode.gain.cancelScheduledValues(this._startTime + this.sampleTime);
        this.context.clearTimeout(this._timeout);
        this._stopTime = -1;
        return this;
    }
    dispose() {
        super.dispose();
        this._gainNode.disconnect();
        return this;
    }
}

/**
 * Wrapper around the native fire-and-forget ConstantSource.
 * Adds the ability to reschedule the stop method.
 * @category Signal
 */
class ToneConstantSource extends OneShotSource {
    constructor() {
        super(optionsFromArguments(ToneConstantSource.getDefaults(), arguments, ["offset"]));
        this.name = "ToneConstantSource";
        /**
         * The signal generator
         */
        this._source = this.context.createConstantSource();
        const options = optionsFromArguments(ToneConstantSource.getDefaults(), arguments, ["offset"]);
        connect(this._source, this._gainNode);
        this.offset = new Param({
            context: this.context,
            convert: options.convert,
            param: this._source.offset,
            units: options.units,
            value: options.offset,
            minValue: options.minValue,
            maxValue: options.maxValue,
        });
    }
    static getDefaults() {
        return Object.assign(OneShotSource.getDefaults(), {
            convert: true,
            offset: 1,
            units: "number",
        });
    }
    /**
     * Start the source node at the given time
     * @param  time When to start the source
     */
    start(time) {
        const computedTime = this.toSeconds(time);
        this.log("start", computedTime);
        this._startGain(computedTime);
        this._source.start(computedTime);
        return this;
    }
    _stopSource(time) {
        this._source.stop(time);
    }
    dispose() {
        super.dispose();
        if (this.state === "started") {
            this.stop();
        }
        this._source.disconnect();
        this.offset.dispose();
        return this;
    }
}

/**
 * A signal is an audio-rate value. Tone.Signal is a core component of the library.
 * Unlike a number, Signals can be scheduled with sample-level accuracy. Tone.Signal
 * has all of the methods available to native Web Audio
 * [AudioParam](http://webaudio.github.io/web-audio-api/#the-audioparam-interface)
 * as well as additional conveniences. Read more about working with signals
 * [here](https://github.com/Tonejs/Tone.js/wiki/Signals).
 *
 * @example
 * const osc = new Tone.Oscillator().toDestination().start();
 * // a scheduleable signal which can be connected to control an AudioParam or another Signal
 * const signal = new Tone.Signal({
 * 	value: "C4",
 * 	units: "frequency"
 * }).connect(osc.frequency);
 * // the scheduled ramp controls the connected signal
 * signal.rampTo("C2", 4, "+0.5");
 * @category Signal
 */
class Signal extends ToneAudioNode {
    constructor() {
        super(optionsFromArguments(Signal.getDefaults(), arguments, ["value", "units"]));
        this.name = "Signal";
        /**
         * Indicates if the value should be overridden on connection.
         */
        this.override = true;
        const options = optionsFromArguments(Signal.getDefaults(), arguments, ["value", "units"]);
        this.output = this._constantSource = new ToneConstantSource({
            context: this.context,
            convert: options.convert,
            offset: options.value,
            units: options.units,
            minValue: options.minValue,
            maxValue: options.maxValue,
        });
        this._constantSource.start(0);
        this.input = this._param = this._constantSource.offset;
    }
    static getDefaults() {
        return Object.assign(ToneAudioNode.getDefaults(), {
            convert: true,
            units: "number",
            value: 0,
        });
    }
    connect(destination, outputNum = 0, inputNum = 0) {
        // start it only when connected to something
        connectSignal(this, destination, outputNum, inputNum);
        return this;
    }
    dispose() {
        super.dispose();
        this._param.dispose();
        this._constantSource.dispose();
        return this;
    }
    //-------------------------------------
    // ABSTRACT PARAM INTERFACE
    // just a proxy for the ConstantSourceNode's offset AudioParam
    // all docs are generated from AbstractParam.ts
    //-------------------------------------
    setValueAtTime(value, time) {
        this._param.setValueAtTime(value, time);
        return this;
    }
    getValueAtTime(time) {
        return this._param.getValueAtTime(time);
    }
    setRampPoint(time) {
        this._param.setRampPoint(time);
        return this;
    }
    linearRampToValueAtTime(value, time) {
        this._param.linearRampToValueAtTime(value, time);
        return this;
    }
    exponentialRampToValueAtTime(value, time) {
        this._param.exponentialRampToValueAtTime(value, time);
        return this;
    }
    exponentialRampTo(value, rampTime, startTime) {
        this._param.exponentialRampTo(value, rampTime, startTime);
        return this;
    }
    linearRampTo(value, rampTime, startTime) {
        this._param.linearRampTo(value, rampTime, startTime);
        return this;
    }
    targetRampTo(value, rampTime, startTime) {
        this._param.targetRampTo(value, rampTime, startTime);
        return this;
    }
    exponentialApproachValueAtTime(value, time, rampTime) {
        this._param.exponentialApproachValueAtTime(value, time, rampTime);
        return this;
    }
    setTargetAtTime(value, startTime, timeConstant) {
        this._param.setTargetAtTime(value, startTime, timeConstant);
        return this;
    }
    setValueCurveAtTime(values, startTime, duration, scaling) {
        this._param.setValueCurveAtTime(values, startTime, duration, scaling);
        return this;
    }
    cancelScheduledValues(time) {
        this._param.cancelScheduledValues(time);
        return this;
    }
    cancelAndHoldAtTime(time) {
        this._param.cancelAndHoldAtTime(time);
        return this;
    }
    rampTo(value, rampTime, startTime) {
        this._param.rampTo(value, rampTime, startTime);
        return this;
    }
    get value() {
        return this._param.value;
    }
    set value(value) {
        this._param.value = value;
    }
    get convert() {
        return this._param.convert;
    }
    set convert(convert) {
        this._param.convert = convert;
    }
    get units() {
        return this._param.units;
    }
    get overridden() {
        return this._param.overridden;
    }
    set overridden(overridden) {
        this._param.overridden = overridden;
    }
    get maxValue() {
        return this._param.maxValue;
    }
    get minValue() {
        return this._param.minValue;
    }
    /**
     * See [[Param.apply]].
     */
    apply(param) {
        this._param.apply(param);
        return this;
    }
}
/**
 * When connecting from a signal, it's necessary to zero out the node destination
 * node if that node is also a signal. If the destination is not 0, then the values
 * will be summed. This method insures that the output of the destination signal will
 * be the same as the source signal, making the destination signal a pass through node.
 * @param signal The output signal to connect from
 * @param destination the destination to connect to
 * @param outputNum the optional output number
 * @param inputNum the input number
 */
function connectSignal(signal, destination, outputNum, inputNum) {
    if (destination instanceof Param || isAudioParam(destination) ||
        (destination instanceof Signal && destination.override)) {
        // cancel changes
        destination.cancelScheduledValues(0);
        // reset the value
        destination.setValueAtTime(0, 0);
        // mark the value as overridden
        if (destination instanceof Signal) {
            destination.overridden = true;
        }
    }
    connect(signal, destination, outputNum, inputNum);
}

/**
 * A Param class just for computing ticks. Similar to the [[Param]] class,
 * but offers conversion to BPM values as well as ability to compute tick
 * duration and elapsed ticks
 */
class TickParam extends Param {
    constructor() {
        super(optionsFromArguments(TickParam.getDefaults(), arguments, ["value"]));
        this.name = "TickParam";
        /**
         * The timeline which tracks all of the automations.
         */
        this._events = new Timeline(Infinity);
        /**
         * The internal holder for the multiplier value
         */
        this._multiplier = 1;
        const options = optionsFromArguments(TickParam.getDefaults(), arguments, ["value"]);
        // set the multiplier
        this._multiplier = options.multiplier;
        // clear the ticks from the beginning
        this._events.cancel(0);
        // set an initial event
        this._events.add({
            ticks: 0,
            time: 0,
            type: "setValueAtTime",
            value: this._fromType(options.value),
        });
        this.setValueAtTime(options.value, 0);
    }
    static getDefaults() {
        return Object.assign(Param.getDefaults(), {
            multiplier: 1,
            units: "hertz",
            value: 1,
        });
    }
    setTargetAtTime(value, time, constant) {
        // approximate it with multiple linear ramps
        time = this.toSeconds(time);
        this.setRampPoint(time);
        const computedValue = this._fromType(value);
        // start from previously scheduled value
        const prevEvent = this._events.get(time);
        const segments = Math.round(Math.max(1 / constant, 1));
        for (let i = 0; i <= segments; i++) {
            const segTime = constant * i + time;
            const rampVal = this._exponentialApproach(prevEvent.time, prevEvent.value, computedValue, constant, segTime);
            this.linearRampToValueAtTime(this._toType(rampVal), segTime);
        }
        return this;
    }
    setValueAtTime(value, time) {
        const computedTime = this.toSeconds(time);
        super.setValueAtTime(value, time);
        const event = this._events.get(computedTime);
        const previousEvent = this._events.previousEvent(event);
        const ticksUntilTime = this._getTicksUntilEvent(previousEvent, computedTime);
        event.ticks = Math.max(ticksUntilTime, 0);
        return this;
    }
    linearRampToValueAtTime(value, time) {
        const computedTime = this.toSeconds(time);
        super.linearRampToValueAtTime(value, time);
        const event = this._events.get(computedTime);
        const previousEvent = this._events.previousEvent(event);
        const ticksUntilTime = this._getTicksUntilEvent(previousEvent, computedTime);
        event.ticks = Math.max(ticksUntilTime, 0);
        return this;
    }
    exponentialRampToValueAtTime(value, time) {
        // aproximate it with multiple linear ramps
        time = this.toSeconds(time);
        const computedVal = this._fromType(value);
        // start from previously scheduled value
        const prevEvent = this._events.get(time);
        // approx 10 segments per second
        const segments = Math.round(Math.max((time - prevEvent.time) * 10, 1));
        const segmentDur = ((time - prevEvent.time) / segments);
        for (let i = 0; i <= segments; i++) {
            const segTime = segmentDur * i + prevEvent.time;
            const rampVal = this._exponentialInterpolate(prevEvent.time, prevEvent.value, time, computedVal, segTime);
            this.linearRampToValueAtTime(this._toType(rampVal), segTime);
        }
        return this;
    }
    /**
     * Returns the tick value at the time. Takes into account
     * any automation curves scheduled on the signal.
     * @param  event The time to get the tick count at
     * @return The number of ticks which have elapsed at the time given any automations.
     */
    _getTicksUntilEvent(event, time) {
        if (event === null) {
            event = {
                ticks: 0,
                time: 0,
                type: "setValueAtTime",
                value: 0,
            };
        }
        else if (isUndef(event.ticks)) {
            const previousEvent = this._events.previousEvent(event);
            event.ticks = this._getTicksUntilEvent(previousEvent, event.time);
        }
        const val0 = this._fromType(this.getValueAtTime(event.time));
        let val1 = this._fromType(this.getValueAtTime(time));
        // if it's right on the line, take the previous value
        const onTheLineEvent = this._events.get(time);
        if (onTheLineEvent && onTheLineEvent.time === time && onTheLineEvent.type === "setValueAtTime") {
            val1 = this._fromType(this.getValueAtTime(time - this.sampleTime));
        }
        return 0.5 * (time - event.time) * (val0 + val1) + event.ticks;
    }
    /**
     * Returns the tick value at the time. Takes into account
     * any automation curves scheduled on the signal.
     * @param  time The time to get the tick count at
     * @return The number of ticks which have elapsed at the time given any automations.
     */
    getTicksAtTime(time) {
        const computedTime = this.toSeconds(time);
        const event = this._events.get(computedTime);
        return Math.max(this._getTicksUntilEvent(event, computedTime), 0);
    }
    /**
     * Return the elapsed time of the number of ticks from the given time
     * @param ticks The number of ticks to calculate
     * @param  time The time to get the next tick from
     * @return The duration of the number of ticks from the given time in seconds
     */
    getDurationOfTicks(ticks, time) {
        const computedTime = this.toSeconds(time);
        const currentTick = this.getTicksAtTime(time);
        return this.getTimeOfTick(currentTick + ticks) - computedTime;
    }
    /**
     * Given a tick, returns the time that tick occurs at.
     * @return The time that the tick occurs.
     */
    getTimeOfTick(tick) {
        const before = this._events.get(tick, "ticks");
        const after = this._events.getAfter(tick, "ticks");
        if (before && before.ticks === tick) {
            return before.time;
        }
        else if (before && after &&
            after.type === "linearRampToValueAtTime" &&
            before.value !== after.value) {
            const val0 = this._fromType(this.getValueAtTime(before.time));
            const val1 = this._fromType(this.getValueAtTime(after.time));
            const delta = (val1 - val0) / (after.time - before.time);
            const k = Math.sqrt(Math.pow(val0, 2) - 2 * delta * (before.ticks - tick));
            const sol1 = (-val0 + k) / delta;
            const sol2 = (-val0 - k) / delta;
            return (sol1 > 0 ? sol1 : sol2) + before.time;
        }
        else if (before) {
            if (before.value === 0) {
                return Infinity;
            }
            else {
                return before.time + (tick - before.ticks) / before.value;
            }
        }
        else {
            return tick / this._initialValue;
        }
    }
    /**
     * Convert some number of ticks their the duration in seconds accounting
     * for any automation curves starting at the given time.
     * @param  ticks The number of ticks to convert to seconds.
     * @param  when  When along the automation timeline to convert the ticks.
     * @return The duration in seconds of the ticks.
     */
    ticksToTime(ticks, when) {
        return this.getDurationOfTicks(ticks, when);
    }
    /**
     * The inverse of [[ticksToTime]]. Convert a duration in
     * seconds to the corresponding number of ticks accounting for any
     * automation curves starting at the given time.
     * @param  duration The time interval to convert to ticks.
     * @param  when When along the automation timeline to convert the ticks.
     * @return The duration in ticks.
     */
    timeToTicks(duration, when) {
        const computedTime = this.toSeconds(when);
        const computedDuration = this.toSeconds(duration);
        const startTicks = this.getTicksAtTime(computedTime);
        const endTicks = this.getTicksAtTime(computedTime + computedDuration);
        return endTicks - startTicks;
    }
    /**
     * Convert from the type when the unit value is BPM
     */
    _fromType(val) {
        if (this.units === "bpm" && this.multiplier) {
            return 1 / (60 / val / this.multiplier);
        }
        else {
            return super._fromType(val);
        }
    }
    /**
     * Special case of type conversion where the units === "bpm"
     */
    _toType(val) {
        if (this.units === "bpm" && this.multiplier) {
            return (val / this.multiplier) * 60;
        }
        else {
            return super._toType(val);
        }
    }
    /**
     * A multiplier on the bpm value. Useful for setting a PPQ relative to the base frequency value.
     */
    get multiplier() {
        return this._multiplier;
    }
    set multiplier(m) {
        // get and reset the current value with the new multiplier
        // might be necessary to clear all the previous values
        const currentVal = this.value;
        this._multiplier = m;
        this.cancelScheduledValues(0);
        this.setValueAtTime(currentVal, 0);
    }
}

/**
 * TickSignal extends Tone.Signal, but adds the capability
 * to calculate the number of elapsed ticks. exponential and target curves
 * are approximated with multiple linear ramps.
 *
 * Thank you Bruno Dias, H. Sofia Pinto, and David M. Matos,
 * for your [WAC paper](https://smartech.gatech.edu/bitstream/handle/1853/54588/WAC2016-49.pdf)
 * describing integrating timing functions for tempo calculations.
 */
class TickSignal extends Signal {
    constructor() {
        super(optionsFromArguments(TickSignal.getDefaults(), arguments, ["value"]));
        this.name = "TickSignal";
        const options = optionsFromArguments(TickSignal.getDefaults(), arguments, ["value"]);
        this.input = this._param = new TickParam({
            context: this.context,
            convert: options.convert,
            multiplier: options.multiplier,
            param: this._constantSource.offset,
            units: options.units,
            value: options.value,
        });
    }
    static getDefaults() {
        return Object.assign(Signal.getDefaults(), {
            multiplier: 1,
            units: "hertz",
            value: 1,
        });
    }
    ticksToTime(ticks, when) {
        return this._param.ticksToTime(ticks, when);
    }
    timeToTicks(duration, when) {
        return this._param.timeToTicks(duration, when);
    }
    getTimeOfTick(tick) {
        return this._param.getTimeOfTick(tick);
    }
    getDurationOfTicks(ticks, time) {
        return this._param.getDurationOfTicks(ticks, time);
    }
    getTicksAtTime(time) {
        return this._param.getTicksAtTime(time);
    }
    /**
     * A multiplier on the bpm value. Useful for setting a PPQ relative to the base frequency value.
     */
    get multiplier() {
        return this._param.multiplier;
    }
    set multiplier(m) {
        this._param.multiplier = m;
    }
    dispose() {
        super.dispose();
        this._param.dispose();
        return this;
    }
}

/**
 * Uses [TickSignal](TickSignal) to track elapsed ticks with complex automation curves.
 */
class TickSource extends ToneWithContext {
    constructor() {
        super(optionsFromArguments(TickSource.getDefaults(), arguments, ["frequency"]));
        this.name = "TickSource";
        /**
         * The state timeline
         */
        this._state = new StateTimeline();
        /**
         * The offset values of the ticks
         */
        this._tickOffset = new Timeline();
        const options = optionsFromArguments(TickSource.getDefaults(), arguments, ["frequency"]);
        this.frequency = new TickSignal({
            context: this.context,
            units: options.units,
            value: options.frequency,
        });
        readOnly(this, "frequency");
        // set the initial state
        this._state.setStateAtTime("stopped", 0);
        // add the first event
        this.setTicksAtTime(0, 0);
    }
    static getDefaults() {
        return Object.assign({
            frequency: 1,
            units: "hertz",
        }, ToneWithContext.getDefaults());
    }
    /**
     * Returns the playback state of the source, either "started", "stopped" or "paused".
     */
    get state() {
        return this.getStateAtTime(this.now());
    }
    /**
     * Start the clock at the given time. Optionally pass in an offset
     * of where to start the tick counter from.
     * @param  time    The time the clock should start
     * @param offset The number of ticks to start the source at
     */
    start(time, offset) {
        const computedTime = this.toSeconds(time);
        if (this._state.getValueAtTime(computedTime) !== "started") {
            this._state.setStateAtTime("started", computedTime);
            if (isDefined(offset)) {
                this.setTicksAtTime(offset, computedTime);
            }
        }
        return this;
    }
    /**
     * Stop the clock. Stopping the clock resets the tick counter to 0.
     * @param time The time when the clock should stop.
     */
    stop(time) {
        const computedTime = this.toSeconds(time);
        // cancel the previous stop
        if (this._state.getValueAtTime(computedTime) === "stopped") {
            const event = this._state.get(computedTime);
            if (event && event.time > 0) {
                this._tickOffset.cancel(event.time);
                this._state.cancel(event.time);
            }
        }
        this._state.cancel(computedTime);
        this._state.setStateAtTime("stopped", computedTime);
        this.setTicksAtTime(0, computedTime);
        return this;
    }
    /**
     * Pause the clock. Pausing does not reset the tick counter.
     * @param time The time when the clock should stop.
     */
    pause(time) {
        const computedTime = this.toSeconds(time);
        if (this._state.getValueAtTime(computedTime) === "started") {
            this._state.setStateAtTime("paused", computedTime);
        }
        return this;
    }
    /**
     * Cancel start/stop/pause and setTickAtTime events scheduled after the given time.
     * @param time When to clear the events after
     */
    cancel(time) {
        time = this.toSeconds(time);
        this._state.cancel(time);
        this._tickOffset.cancel(time);
        return this;
    }
    /**
     * Get the elapsed ticks at the given time
     * @param  time  When to get the tick value
     * @return The number of ticks
     */
    getTicksAtTime(time) {
        const computedTime = this.toSeconds(time);
        const stopEvent = this._state.getLastState("stopped", computedTime);
        // this event allows forEachBetween to iterate until the current time
        const tmpEvent = { state: "paused", time: computedTime };
        this._state.add(tmpEvent);
        // keep track of the previous offset event
        let lastState = stopEvent;
        let elapsedTicks = 0;
        // iterate through all the events since the last stop
        this._state.forEachBetween(stopEvent.time, computedTime + this.sampleTime, e => {
            let periodStartTime = lastState.time;
            // if there is an offset event in this period use that
            const offsetEvent = this._tickOffset.get(e.time);
            if (offsetEvent && offsetEvent.time >= lastState.time) {
                elapsedTicks = offsetEvent.ticks;
                periodStartTime = offsetEvent.time;
            }
            if (lastState.state === "started" && e.state !== "started") {
                elapsedTicks += this.frequency.getTicksAtTime(e.time) - this.frequency.getTicksAtTime(periodStartTime);
            }
            lastState = e;
        });
        // remove the temporary event
        this._state.remove(tmpEvent);
        // return the ticks
        return elapsedTicks;
    }
    /**
     * The number of times the callback was invoked. Starts counting at 0
     * and increments after the callback was invoked. Returns -1 when stopped.
     */
    get ticks() {
        return this.getTicksAtTime(this.now());
    }
    set ticks(t) {
        this.setTicksAtTime(t, this.now());
    }
    /**
     * The time since ticks=0 that the TickSource has been running. Accounts
     * for tempo curves
     */
    get seconds() {
        return this.getSecondsAtTime(this.now());
    }
    set seconds(s) {
        const now = this.now();
        const ticks = this.frequency.timeToTicks(s, now);
        this.setTicksAtTime(ticks, now);
    }
    /**
     * Return the elapsed seconds at the given time.
     * @param  time  When to get the elapsed seconds
     * @return  The number of elapsed seconds
     */
    getSecondsAtTime(time) {
        time = this.toSeconds(time);
        const stopEvent = this._state.getLastState("stopped", time);
        // this event allows forEachBetween to iterate until the current time
        const tmpEvent = { state: "paused", time };
        this._state.add(tmpEvent);
        // keep track of the previous offset event
        let lastState = stopEvent;
        let elapsedSeconds = 0;
        // iterate through all the events since the last stop
        this._state.forEachBetween(stopEvent.time, time + this.sampleTime, e => {
            let periodStartTime = lastState.time;
            // if there is an offset event in this period use that
            const offsetEvent = this._tickOffset.get(e.time);
            if (offsetEvent && offsetEvent.time >= lastState.time) {
                elapsedSeconds = offsetEvent.seconds;
                periodStartTime = offsetEvent.time;
            }
            if (lastState.state === "started" && e.state !== "started") {
                elapsedSeconds += e.time - periodStartTime;
            }
            lastState = e;
        });
        // remove the temporary event
        this._state.remove(tmpEvent);
        // return the ticks
        return elapsedSeconds;
    }
    /**
     * Set the clock's ticks at the given time.
     * @param  ticks The tick value to set
     * @param  time  When to set the tick value
     */
    setTicksAtTime(ticks, time) {
        time = this.toSeconds(time);
        this._tickOffset.cancel(time);
        this._tickOffset.add({
            seconds: this.frequency.getDurationOfTicks(ticks, time),
            ticks,
            time,
        });
        return this;
    }
    /**
     * Returns the scheduled state at the given time.
     * @param  time  The time to query.
     */
    getStateAtTime(time) {
        time = this.toSeconds(time);
        return this._state.getValueAtTime(time);
    }
    /**
     * Get the time of the given tick. The second argument
     * is when to test before. Since ticks can be set (with setTicksAtTime)
     * there may be multiple times for a given tick value.
     * @param  tick The tick number.
     * @param  before When to measure the tick value from.
     * @return The time of the tick
     */
    getTimeOfTick(tick, before = this.now()) {
        const offset = this._tickOffset.get(before);
        const event = this._state.get(before);
        const startTime = Math.max(offset.time, event.time);
        const absoluteTicks = this.frequency.getTicksAtTime(startTime) + tick - offset.ticks;
        return this.frequency.getTimeOfTick(absoluteTicks);
    }
    /**
     * Invoke the callback event at all scheduled ticks between the
     * start time and the end time
     * @param  startTime  The beginning of the search range
     * @param  endTime    The end of the search range
     * @param  callback   The callback to invoke with each tick
     */
    forEachTickBetween(startTime, endTime, callback) {
        // only iterate through the sections where it is "started"
        let lastStateEvent = this._state.get(startTime);
        this._state.forEachBetween(startTime, endTime, event => {
            if (lastStateEvent && lastStateEvent.state === "started" && event.state !== "started") {
                this.forEachTickBetween(Math.max(lastStateEvent.time, startTime), event.time - this.sampleTime, callback);
            }
            lastStateEvent = event;
        });
        let error = null;
        if (lastStateEvent && lastStateEvent.state === "started") {
            const maxStartTime = Math.max(lastStateEvent.time, startTime);
            // figure out the difference between the frequency ticks and the
            const startTicks = this.frequency.getTicksAtTime(maxStartTime);
            const ticksAtStart = this.frequency.getTicksAtTime(lastStateEvent.time);
            const diff = startTicks - ticksAtStart;
            let offset = Math.ceil(diff) - diff;
            // guard against floating point issues
            offset = EQ(offset, 1) ? 0 : offset;
            let nextTickTime = this.frequency.getTimeOfTick(startTicks + offset);
            while (nextTickTime < endTime) {
                try {
                    callback(nextTickTime, Math.round(this.getTicksAtTime(nextTickTime)));
                }
                catch (e) {
                    error = e;
                    break;
                }
                nextTickTime += this.frequency.getDurationOfTicks(1, nextTickTime);
            }
        }
        if (error) {
            throw error;
        }
        return this;
    }
    /**
     * Clean up
     */
    dispose() {
        super.dispose();
        this._state.dispose();
        this._tickOffset.dispose();
        this.frequency.dispose();
        return this;
    }
}

/**
 * A sample accurate clock which provides a callback at the given rate.
 * While the callback is not sample-accurate (it is still susceptible to
 * loose JS timing), the time passed in as the argument to the callback
 * is precise. For most applications, it is better to use Tone.Transport
 * instead of the Clock by itself since you can synchronize multiple callbacks.
 * @example
 * // the callback will be invoked approximately once a second
 * // and will print the time exactly once a second apart.
 * const clock = new Tone.Clock(time => {
 * 	console.log(time);
 * }, 1);
 * clock.start();
 * @category Core
 */
class Clock extends ToneWithContext {
    constructor() {
        super(optionsFromArguments(Clock.getDefaults(), arguments, ["callback", "frequency"]));
        this.name = "Clock";
        /**
         * The callback function to invoke at the scheduled tick.
         */
        this.callback = noOp;
        /**
         * The last time the loop callback was invoked
         */
        this._lastUpdate = 0;
        /**
         * Keep track of the playback state
         */
        this._state = new StateTimeline("stopped");
        /**
         * Context bound reference to the _loop method
         * This is necessary to remove the event in the end.
         */
        this._boundLoop = this._loop.bind(this);
        const options = optionsFromArguments(Clock.getDefaults(), arguments, ["callback", "frequency"]);
        this.callback = options.callback;
        this._tickSource = new TickSource({
            context: this.context,
            frequency: options.frequency,
            units: options.units,
        });
        this._lastUpdate = 0;
        this.frequency = this._tickSource.frequency;
        readOnly(this, "frequency");
        // add an initial state
        this._state.setStateAtTime("stopped", 0);
        // bind a callback to the worker thread
        this.context.on("tick", this._boundLoop);
    }
    static getDefaults() {
        return Object.assign(ToneWithContext.getDefaults(), {
            callback: noOp,
            frequency: 1,
            units: "hertz",
        });
    }
    /**
     * Returns the playback state of the source, either "started", "stopped" or "paused".
     */
    get state() {
        return this._state.getValueAtTime(this.now());
    }
    /**
     * Start the clock at the given time. Optionally pass in an offset
     * of where to start the tick counter from.
     * @param  time    The time the clock should start
     * @param offset  Where the tick counter starts counting from.
     */
    start(time, offset) {
        // make sure the context is running
        assertContextRunning(this.context);
        // start the loop
        const computedTime = this.toSeconds(time);
        this.log("start", computedTime);
        if (this._state.getValueAtTime(computedTime) !== "started") {
            this._state.setStateAtTime("started", computedTime);
            this._tickSource.start(computedTime, offset);
            if (computedTime < this._lastUpdate) {
                this.emit("start", computedTime, offset);
            }
        }
        return this;
    }
    /**
     * Stop the clock. Stopping the clock resets the tick counter to 0.
     * @param time The time when the clock should stop.
     * @example
     * const clock = new Tone.Clock(time => {
     * 	console.log(time);
     * }, 1);
     * clock.start();
     * // stop the clock after 10 seconds
     * clock.stop("+10");
     */
    stop(time) {
        const computedTime = this.toSeconds(time);
        this.log("stop", computedTime);
        this._state.cancel(computedTime);
        this._state.setStateAtTime("stopped", computedTime);
        this._tickSource.stop(computedTime);
        if (computedTime < this._lastUpdate) {
            this.emit("stop", computedTime);
        }
        return this;
    }
    /**
     * Pause the clock. Pausing does not reset the tick counter.
     * @param time The time when the clock should stop.
     */
    pause(time) {
        const computedTime = this.toSeconds(time);
        if (this._state.getValueAtTime(computedTime) === "started") {
            this._state.setStateAtTime("paused", computedTime);
            this._tickSource.pause(computedTime);
            if (computedTime < this._lastUpdate) {
                this.emit("pause", computedTime);
            }
        }
        return this;
    }
    /**
     * The number of times the callback was invoked. Starts counting at 0
     * and increments after the callback was invoked.
     */
    get ticks() {
        return Math.ceil(this.getTicksAtTime(this.now()));
    }
    set ticks(t) {
        this._tickSource.ticks = t;
    }
    /**
     * The time since ticks=0 that the Clock has been running. Accounts for tempo curves
     */
    get seconds() {
        return this._tickSource.seconds;
    }
    set seconds(s) {
        this._tickSource.seconds = s;
    }
    /**
     * Return the elapsed seconds at the given time.
     * @param  time  When to get the elapsed seconds
     * @return  The number of elapsed seconds
     */
    getSecondsAtTime(time) {
        return this._tickSource.getSecondsAtTime(time);
    }
    /**
     * Set the clock's ticks at the given time.
     * @param  ticks The tick value to set
     * @param  time  When to set the tick value
     */
    setTicksAtTime(ticks, time) {
        this._tickSource.setTicksAtTime(ticks, time);
        return this;
    }
    /**
     * Get the time of the given tick. The second argument
     * is when to test before. Since ticks can be set (with setTicksAtTime)
     * there may be multiple times for a given tick value.
     * @param  tick The tick number.
     * @param  before When to measure the tick value from.
     * @return The time of the tick
     */
    getTimeOfTick(tick, before = this.now()) {
        return this._tickSource.getTimeOfTick(tick, before);
    }
    /**
     * Get the clock's ticks at the given time.
     * @param  time  When to get the tick value
     * @return The tick value at the given time.
     */
    getTicksAtTime(time) {
        return this._tickSource.getTicksAtTime(time);
    }
    /**
     * Get the time of the next tick
     * @param  offset The tick number.
     */
    nextTickTime(offset, when) {
        const computedTime = this.toSeconds(when);
        const currentTick = this.getTicksAtTime(computedTime);
        return this._tickSource.getTimeOfTick(currentTick + offset, computedTime);
    }
    /**
     * The scheduling loop.
     */
    _loop() {
        const startTime = this._lastUpdate;
        const endTime = this.now();
        this._lastUpdate = endTime;
        this.log("loop", startTime, endTime);
        if (startTime !== endTime) {
            // the state change events
            this._state.forEachBetween(startTime, endTime, e => {
                switch (e.state) {
                    case "started":
                        const offset = this._tickSource.getTicksAtTime(e.time);
                        this.emit("start", e.time, offset);
                        break;
                    case "stopped":
                        if (e.time !== 0) {
                            this.emit("stop", e.time);
                        }
                        break;
                    case "paused":
                        this.emit("pause", e.time);
                        break;
                }
            });
            // the tick callbacks
            this._tickSource.forEachTickBetween(startTime, endTime, (time, ticks) => {
                this.callback(time, ticks);
            });
        }
    }
    /**
     * Returns the scheduled state at the given time.
     * @param  time  The time to query.
     * @return  The name of the state input in setStateAtTime.
     * @example
     * const clock = new Tone.Clock();
     * clock.start("+0.1");
     * clock.getStateAtTime("+0.1"); // returns "started"
     */
    getStateAtTime(time) {
        const computedTime = this.toSeconds(time);
        return this._state.getValueAtTime(computedTime);
    }
    /**
     * Clean up
     */
    dispose() {
        super.dispose();
        this.context.off("tick", this._boundLoop);
        this._tickSource.dispose();
        this._state.dispose();
        return this;
    }
}
Emitter.mixin(Clock);

/**
 * A data structure for holding multiple buffers in a Map-like datastructure.
 *
 * @example
 * const pianoSamples = new Tone.ToneAudioBuffers({
 * 	A1: "https://tonejs.github.io/audio/casio/A1.mp3",
 * 	A2: "https://tonejs.github.io/audio/casio/A2.mp3",
 * }, () => {
 * 	const player = new Tone.Player().toDestination();
 * 	// play one of the samples when they all load
 * 	player.buffer = pianoSamples.get("A2");
 * 	player.start();
 * });
 * @example
 * // To pass in additional parameters in the second parameter
 * const buffers = new Tone.ToneAudioBuffers({
 * 	 urls: {
 * 		 A1: "A1.mp3",
 * 		 A2: "A2.mp3",
 * 	 },
 * 	 onload: () => console.log("loaded"),
 * 	 baseUrl: "https://tonejs.github.io/audio/casio/"
 * });
 * @category Core
 */
class ToneAudioBuffers extends Tone {
    constructor() {
        super();
        this.name = "ToneAudioBuffers";
        /**
         * All of the buffers
         */
        this._buffers = new Map();
        /**
         * Keep track of the number of loaded buffers
         */
        this._loadingCount = 0;
        const options = optionsFromArguments(ToneAudioBuffers.getDefaults(), arguments, ["urls", "onload", "baseUrl"], "urls");
        this.baseUrl = options.baseUrl;
        // add each one
        Object.keys(options.urls).forEach(name => {
            this._loadingCount++;
            const url = options.urls[name];
            this.add(name, url, this._bufferLoaded.bind(this, options.onload), options.onerror);
        });
    }
    static getDefaults() {
        return {
            baseUrl: "",
            onerror: noOp,
            onload: noOp,
            urls: {},
        };
    }
    /**
     * True if the buffers object has a buffer by that name.
     * @param  name  The key or index of the buffer.
     */
    has(name) {
        return this._buffers.has(name.toString());
    }
    /**
     * Get a buffer by name. If an array was loaded,
     * then use the array index.
     * @param  name  The key or index of the buffer.
     */
    get(name) {
        assert(this.has(name), `ToneAudioBuffers has no buffer named: ${name}`);
        return this._buffers.get(name.toString());
    }
    /**
     * A buffer was loaded. decrement the counter.
     */
    _bufferLoaded(callback) {
        this._loadingCount--;
        if (this._loadingCount === 0 && callback) {
            callback();
        }
    }
    /**
     * If the buffers are loaded or not
     */
    get loaded() {
        return Array.from(this._buffers).every(([_, buffer]) => buffer.loaded);
    }
    /**
     * Add a buffer by name and url to the Buffers
     * @param  name      A unique name to give the buffer
     * @param  url  Either the url of the bufer, or a buffer which will be added with the given name.
     * @param  callback  The callback to invoke when the url is loaded.
     * @param  onerror  Invoked if the buffer can't be loaded
     */
    add(name, url, callback = noOp, onerror = noOp) {
        if (isString(url)) {
            this._buffers.set(name.toString(), new ToneAudioBuffer(this.baseUrl + url, callback, onerror));
        }
        else {
            this._buffers.set(name.toString(), new ToneAudioBuffer(url, callback, onerror));
        }
        return this;
    }
    dispose() {
        super.dispose();
        this._buffers.forEach(buffer => buffer.dispose());
        this._buffers.clear();
        return this;
    }
}

/**
 * Ticks is a primitive type for encoding Time values.
 * Ticks can be constructed with or without the `new` keyword. Ticks can be passed
 * into the parameter of any method which takes time as an argument.
 * @example
 * const t = Tone.Ticks("4n"); // a quarter note as ticks
 * @category Unit
 */
class TicksClass extends TransportTimeClass {
    constructor() {
        super(...arguments);
        this.name = "Ticks";
        this.defaultUnits = "i";
    }
    /**
     * Get the current time in the given units
     */
    _now() {
        return this.context.transport.ticks;
    }
    /**
     * Return the value of the beats in the current units
     */
    _beatsToUnits(beats) {
        return this._getPPQ() * beats;
    }
    /**
     * Returns the value of a second in the current units
     */
    _secondsToUnits(seconds) {
        return Math.floor(seconds / (60 / this._getBpm()) * this._getPPQ());
    }
    /**
     * Returns the value of a tick in the current time units
     */
    _ticksToUnits(ticks) {
        return ticks;
    }
    /**
     * Return the time in ticks
     */
    toTicks() {
        return this.valueOf();
    }
    /**
     * Return the time in seconds
     */
    toSeconds() {
        return (this.valueOf() / this._getPPQ()) * (60 / this._getBpm());
    }
}

/**
 * Draw is useful for synchronizing visuals and audio events.
 * Callbacks from Tone.Transport or any of the Tone.Event classes
 * always happen _before_ the scheduled time and are not synchronized
 * to the animation frame so they are not good for triggering tightly
 * synchronized visuals and sound. Draw makes it easy to schedule
 * callbacks using the AudioContext time and uses requestAnimationFrame.
 * @example
 * Tone.Transport.schedule((time) => {
 * 	// use the time argument to schedule a callback with Draw
 * 	Tone.Draw.schedule(() => {
 * 		// do drawing or DOM manipulation here
 * 		console.log(time);
 * 	}, time);
 * }, "+0.5");
 * Tone.Transport.start();
 * @category Core
 */
class Draw extends ToneWithContext {
    constructor() {
        super(...arguments);
        this.name = "Draw";
        /**
         * The duration after which events are not invoked.
         */
        this.expiration = 0.25;
        /**
         * The amount of time before the scheduled time
         * that the callback can be invoked. Default is
         * half the time of an animation frame (0.008 seconds).
         */
        this.anticipation = 0.008;
        /**
         * All of the events.
         */
        this._events = new Timeline();
        /**
         * The draw loop
         */
        this._boundDrawLoop = this._drawLoop.bind(this);
        /**
         * The animation frame id
         */
        this._animationFrame = -1;
    }
    /**
     * Schedule a function at the given time to be invoked
     * on the nearest animation frame.
     * @param  callback  Callback is invoked at the given time.
     * @param  time      The time relative to the AudioContext time to invoke the callback.
     * @example
     * Tone.Transport.scheduleRepeat(time => {
     * 	Tone.Draw.schedule(() => console.log(time), time);
     * }, 1);
     * Tone.Transport.start();
     */
    schedule(callback, time) {
        this._events.add({
            callback,
            time: this.toSeconds(time),
        });
        // start the draw loop on the first event
        if (this._events.length === 1) {
            this._animationFrame = requestAnimationFrame(this._boundDrawLoop);
        }
        return this;
    }
    /**
     * Cancel events scheduled after the given time
     * @param  after  Time after which scheduled events will be removed from the scheduling timeline.
     */
    cancel(after) {
        this._events.cancel(this.toSeconds(after));
        return this;
    }
    /**
     * The draw loop
     */
    _drawLoop() {
        const now = this.context.currentTime;
        while (this._events.length && this._events.peek().time - this.anticipation <= now) {
            const event = this._events.shift();
            if (event && now - event.time <= this.expiration) {
                event.callback();
            }
        }
        if (this._events.length > 0) {
            this._animationFrame = requestAnimationFrame(this._boundDrawLoop);
        }
    }
    dispose() {
        super.dispose();
        this._events.dispose();
        cancelAnimationFrame(this._animationFrame);
        return this;
    }
}
//-------------------------------------
// 	INITIALIZATION
//-------------------------------------
onContextInit(context => {
    context.draw = new Draw({ context });
});
onContextClose(context => {
    context.draw.dispose();
});

/**
 * Similar to Tone.Timeline, but all events represent
 * intervals with both "time" and "duration" times. The
 * events are placed in a tree structure optimized
 * for querying an intersection point with the timeline
 * events. Internally uses an [Interval Tree](https://en.wikipedia.org/wiki/Interval_tree)
 * to represent the data.
 */
class IntervalTimeline extends Tone {
    constructor() {
        super(...arguments);
        this.name = "IntervalTimeline";
        /**
         * The root node of the inteval tree
         */
        this._root = null;
        /**
         * Keep track of the length of the timeline.
         */
        this._length = 0;
    }
    /**
     * The event to add to the timeline. All events must
     * have a time and duration value
     * @param  event  The event to add to the timeline
     */
    add(event) {
        assert(isDefined(event.time), "Events must have a time property");
        assert(isDefined(event.duration), "Events must have a duration parameter");
        event.time = event.time.valueOf();
        let node = new IntervalNode(event.time, event.time + event.duration, event);
        if (this._root === null) {
            this._root = node;
        }
        else {
            this._root.insert(node);
        }
        this._length++;
        // Restructure tree to be balanced
        while (node !== null) {
            node.updateHeight();
            node.updateMax();
            this._rebalance(node);
            node = node.parent;
        }
        return this;
    }
    /**
     * Remove an event from the timeline.
     * @param  event  The event to remove from the timeline
     */
    remove(event) {
        if (this._root !== null) {
            const results = [];
            this._root.search(event.time, results);
            for (const node of results) {
                if (node.event === event) {
                    this._removeNode(node);
                    this._length--;
                    break;
                }
            }
        }
        return this;
    }
    /**
     * The number of items in the timeline.
     * @readOnly
     */
    get length() {
        return this._length;
    }
    /**
     * Remove events whose time time is after the given time
     * @param  after  The time to query.
     */
    cancel(after) {
        this.forEachFrom(after, event => this.remove(event));
        return this;
    }
    /**
     * Set the root node as the given node
     */
    _setRoot(node) {
        this._root = node;
        if (this._root !== null) {
            this._root.parent = null;
        }
    }
    /**
     * Replace the references to the node in the node's parent
     * with the replacement node.
     */
    _replaceNodeInParent(node, replacement) {
        if (node.parent !== null) {
            if (node.isLeftChild()) {
                node.parent.left = replacement;
            }
            else {
                node.parent.right = replacement;
            }
            this._rebalance(node.parent);
        }
        else {
            this._setRoot(replacement);
        }
    }
    /**
     * Remove the node from the tree and replace it with
     * a successor which follows the schema.
     */
    _removeNode(node) {
        if (node.left === null && node.right === null) {
            this._replaceNodeInParent(node, null);
        }
        else if (node.right === null) {
            this._replaceNodeInParent(node, node.left);
        }
        else if (node.left === null) {
            this._replaceNodeInParent(node, node.right);
        }
        else {
            const balance = node.getBalance();
            let replacement;
            let temp = null;
            if (balance > 0) {
                if (node.left.right === null) {
                    replacement = node.left;
                    replacement.right = node.right;
                    temp = replacement;
                }
                else {
                    replacement = node.left.right;
                    while (replacement.right !== null) {
                        replacement = replacement.right;
                    }
                    if (replacement.parent) {
                        replacement.parent.right = replacement.left;
                        temp = replacement.parent;
                        replacement.left = node.left;
                        replacement.right = node.right;
                    }
                }
            }
            else if (node.right.left === null) {
                replacement = node.right;
                replacement.left = node.left;
                temp = replacement;
            }
            else {
                replacement = node.right.left;
                while (replacement.left !== null) {
                    replacement = replacement.left;
                }
                if (replacement.parent) {
                    replacement.parent.left = replacement.right;
                    temp = replacement.parent;
                    replacement.left = node.left;
                    replacement.right = node.right;
                }
            }
            if (node.parent !== null) {
                if (node.isLeftChild()) {
                    node.parent.left = replacement;
                }
                else {
                    node.parent.right = replacement;
                }
            }
            else {
                this._setRoot(replacement);
            }
            if (temp) {
                this._rebalance(temp);
            }
        }
        node.dispose();
    }
    /**
     * Rotate the tree to the left
     */
    _rotateLeft(node) {
        const parent = node.parent;
        const isLeftChild = node.isLeftChild();
        // Make node.right the new root of this sub tree (instead of node)
        const pivotNode = node.right;
        if (pivotNode) {
            node.right = pivotNode.left;
            pivotNode.left = node;
        }
        if (parent !== null) {
            if (isLeftChild) {
                parent.left = pivotNode;
            }
            else {
                parent.right = pivotNode;
            }
        }
        else {
            this._setRoot(pivotNode);
        }
    }
    /**
     * Rotate the tree to the right
     */
    _rotateRight(node) {
        const parent = node.parent;
        const isLeftChild = node.isLeftChild();
        // Make node.left the new root of this sub tree (instead of node)
        const pivotNode = node.left;
        if (pivotNode) {
            node.left = pivotNode.right;
            pivotNode.right = node;
        }
        if (parent !== null) {
            if (isLeftChild) {
                parent.left = pivotNode;
            }
            else {
                parent.right = pivotNode;
            }
        }
        else {
            this._setRoot(pivotNode);
        }
    }
    /**
     * Balance the BST
     */
    _rebalance(node) {
        const balance = node.getBalance();
        if (balance > 1 && node.left) {
            if (node.left.getBalance() < 0) {
                this._rotateLeft(node.left);
            }
            else {
                this._rotateRight(node);
            }
        }
        else if (balance < -1 && node.right) {
            if (node.right.getBalance() > 0) {
                this._rotateRight(node.right);
            }
            else {
                this._rotateLeft(node);
            }
        }
    }
    /**
     * Get an event whose time and duration span the give time. Will
     * return the match whose "time" value is closest to the given time.
     * @return  The event which spans the desired time
     */
    get(time) {
        if (this._root !== null) {
            const results = [];
            this._root.search(time, results);
            if (results.length > 0) {
                let max = results[0];
                for (let i = 1; i < results.length; i++) {
                    if (results[i].low > max.low) {
                        max = results[i];
                    }
                }
                return max.event;
            }
        }
        return null;
    }
    /**
     * Iterate over everything in the timeline.
     * @param  callback The callback to invoke with every item
     */
    forEach(callback) {
        if (this._root !== null) {
            const allNodes = [];
            this._root.traverse(node => allNodes.push(node));
            allNodes.forEach(node => {
                if (node.event) {
                    callback(node.event);
                }
            });
        }
        return this;
    }
    /**
     * Iterate over everything in the array in which the given time
     * overlaps with the time and duration time of the event.
     * @param  time The time to check if items are overlapping
     * @param  callback The callback to invoke with every item
     */
    forEachAtTime(time, callback) {
        if (this._root !== null) {
            const results = [];
            this._root.search(time, results);
            results.forEach(node => {
                if (node.event) {
                    callback(node.event);
                }
            });
        }
        return this;
    }
    /**
     * Iterate over everything in the array in which the time is greater
     * than or equal to the given time.
     * @param  time The time to check if items are before
     * @param  callback The callback to invoke with every item
     */
    forEachFrom(time, callback) {
        if (this._root !== null) {
            const results = [];
            this._root.searchAfter(time, results);
            results.forEach(node => {
                if (node.event) {
                    callback(node.event);
                }
            });
        }
        return this;
    }
    /**
     * Clean up
     */
    dispose() {
        super.dispose();
        if (this._root !== null) {
            this._root.traverse(node => node.dispose());
        }
        this._root = null;
        return this;
    }
}
//-------------------------------------
// 	INTERVAL NODE HELPER
//-------------------------------------
/**
 * Represents a node in the binary search tree, with the addition
 * of a "high" value which keeps track of the highest value of
 * its children.
 * References:
 * https://brooknovak.wordpress.com/2013/12/07/augmented-interval-tree-in-c/
 * http://www.mif.vu.lt/~valdas/ALGORITMAI/LITERATURA/Cormen/Cormen.pdf
 * @param low
 * @param high
 */
class IntervalNode {
    constructor(low, high, event) {
        // the nodes to the left
        this._left = null;
        // the nodes to the right
        this._right = null;
        // the parent node
        this.parent = null;
        // the number of child nodes
        this.height = 0;
        this.event = event;
        // the low value
        this.low = low;
        // the high value
        this.high = high;
        // the high value for this and all child nodes
        this.max = this.high;
    }
    /**
     * Insert a node into the correct spot in the tree
     */
    insert(node) {
        if (node.low <= this.low) {
            if (this.left === null) {
                this.left = node;
            }
            else {
                this.left.insert(node);
            }
        }
        else if (this.right === null) {
            this.right = node;
        }
        else {
            this.right.insert(node);
        }
    }
    /**
     * Search the tree for nodes which overlap
     * with the given point
     * @param  point  The point to query
     * @param  results  The array to put the results
     */
    search(point, results) {
        // If p is to the right of the rightmost point of any interval
        // in this node and all children, there won't be any matches.
        if (point > this.max) {
            return;
        }
        // Search left children
        if (this.left !== null) {
            this.left.search(point, results);
        }
        // Check this node
        if (this.low <= point && this.high > point) {
            results.push(this);
        }
        // If p is to the left of the time of this interval,
        // then it can't be in any child to the right.
        if (this.low > point) {
            return;
        }
        // Search right children
        if (this.right !== null) {
            this.right.search(point, results);
        }
    }
    /**
     * Search the tree for nodes which are less
     * than the given point
     * @param  point  The point to query
     * @param  results  The array to put the results
     */
    searchAfter(point, results) {
        // Check this node
        if (this.low >= point) {
            results.push(this);
            if (this.left !== null) {
                this.left.searchAfter(point, results);
            }
        }
        // search the right side
        if (this.right !== null) {
            this.right.searchAfter(point, results);
        }
    }
    /**
     * Invoke the callback on this element and both it's branches
     * @param  {Function}  callback
     */
    traverse(callback) {
        callback(this);
        if (this.left !== null) {
            this.left.traverse(callback);
        }
        if (this.right !== null) {
            this.right.traverse(callback);
        }
    }
    /**
     * Update the height of the node
     */
    updateHeight() {
        if (this.left !== null && this.right !== null) {
            this.height = Math.max(this.left.height, this.right.height) + 1;
        }
        else if (this.right !== null) {
            this.height = this.right.height + 1;
        }
        else if (this.left !== null) {
            this.height = this.left.height + 1;
        }
        else {
            this.height = 0;
        }
    }
    /**
     * Update the height of the node
     */
    updateMax() {
        this.max = this.high;
        if (this.left !== null) {
            this.max = Math.max(this.max, this.left.max);
        }
        if (this.right !== null) {
            this.max = Math.max(this.max, this.right.max);
        }
    }
    /**
     * The balance is how the leafs are distributed on the node
     * @return  Negative numbers are balanced to the right
     */
    getBalance() {
        let balance = 0;
        if (this.left !== null && this.right !== null) {
            balance = this.left.height - this.right.height;
        }
        else if (this.left !== null) {
            balance = this.left.height + 1;
        }
        else if (this.right !== null) {
            balance = -(this.right.height + 1);
        }
        return balance;
    }
    /**
     * @returns true if this node is the left child of its parent
     */
    isLeftChild() {
        return this.parent !== null && this.parent.left === this;
    }
    /**
     * get/set the left node
     */
    get left() {
        return this._left;
    }
    set left(node) {
        this._left = node;
        if (node !== null) {
            node.parent = this;
        }
        this.updateHeight();
        this.updateMax();
    }
    /**
     * get/set the right node
     */
    get right() {
        return this._right;
    }
    set right(node) {
        this._right = node;
        if (node !== null) {
            node.parent = this;
        }
        this.updateHeight();
        this.updateMax();
    }
    /**
     * null out references.
     */
    dispose() {
        this.parent = null;
        this._left = null;
        this._right = null;
        this.event = null;
    }
}

/**
 * Volume is a simple volume node, useful for creating a volume fader.
 *
 * @example
 * const vol = new Tone.Volume(-12).toDestination();
 * const osc = new Tone.Oscillator().connect(vol).start();
 * @category Component
 */
class Volume extends ToneAudioNode {
    constructor() {
        super(optionsFromArguments(Volume.getDefaults(), arguments, ["volume"]));
        this.name = "Volume";
        const options = optionsFromArguments(Volume.getDefaults(), arguments, ["volume"]);
        this.input = this.output = new Gain({
            context: this.context,
            gain: options.volume,
            units: "decibels",
        });
        this.volume = this.output.gain;
        readOnly(this, "volume");
        this._unmutedVolume = options.volume;
        // set the mute initially
        this.mute = options.mute;
    }
    static getDefaults() {
        return Object.assign(ToneAudioNode.getDefaults(), {
            mute: false,
            volume: 0,
        });
    }
    /**
     * Mute the output.
     * @example
     * const vol = new Tone.Volume(-12).toDestination();
     * const osc = new Tone.Oscillator().connect(vol).start();
     * // mute the output
     * vol.mute = true;
     */
    get mute() {
        return this.volume.value === -Infinity;
    }
    set mute(mute) {
        if (!this.mute && mute) {
            this._unmutedVolume = this.volume.value;
            // maybe it should ramp here?
            this.volume.value = -Infinity;
        }
        else if (this.mute && !mute) {
            this.volume.value = this._unmutedVolume;
        }
    }
    /**
     * clean up
     */
    dispose() {
        super.dispose();
        this.input.dispose();
        this.volume.dispose();
        return this;
    }
}

/**
 * A single master output which is connected to the
 * AudioDestinationNode (aka your speakers).
 * It provides useful conveniences such as the ability
 * to set the volume and mute the entire application.
 * It also gives you the ability to apply master effects to your application.
 *
 * @example
 * const oscillator = new Tone.Oscillator().start();
 * // the audio will go from the oscillator to the speakers
 * oscillator.connect(Tone.getDestination());
 * // a convenience for connecting to the master output is also provided:
 * oscillator.toDestination();
 * @category Core
 */
class Destination extends ToneAudioNode {
    constructor() {
        super(optionsFromArguments(Destination.getDefaults(), arguments));
        this.name = "Destination";
        this.input = new Volume({ context: this.context });
        this.output = new Gain({ context: this.context });
        /**
         * The volume of the master output in decibels. -Infinity is silent, and 0 is no change.
         * @example
         * const osc = new Tone.Oscillator().toDestination();
         * osc.start();
         * // ramp the volume down to silent over 10 seconds
         * Tone.getDestination().volume.rampTo(-Infinity, 10);
         */
        this.volume = this.input.volume;
        const options = optionsFromArguments(Destination.getDefaults(), arguments);
        connectSeries(this.input, this.output, this.context.rawContext.destination);
        this.mute = options.mute;
        this._internalChannels = [this.input, this.context.rawContext.destination, this.output];
    }
    static getDefaults() {
        return Object.assign(ToneAudioNode.getDefaults(), {
            mute: false,
            volume: 0,
        });
    }
    /**
     * Mute the output.
     * @example
     * const oscillator = new Tone.Oscillator().start().toDestination();
     * setTimeout(() => {
     * 	// mute the output
     * 	Tone.Destination.mute = true;
     * }, 1000);
     */
    get mute() {
        return this.input.mute;
    }
    set mute(mute) {
        this.input.mute = mute;
    }
    /**
     * Add a master effects chain. NOTE: this will disconnect any nodes which were previously
     * chained in the master effects chain.
     * @param args All arguments will be connected in a row and the Master will be routed through it.
     * @example
     * // route all audio through a filter and compressor
     * const lowpass = new Tone.Filter(800, "lowpass");
     * const compressor = new Tone.Compressor(-18);
     * Tone.Destination.chain(lowpass, compressor);
     */
    chain(...args) {
        this.input.disconnect();
        args.unshift(this.input);
        args.push(this.output);
        connectSeries(...args);
        return this;
    }
    /**
     * The maximum number of channels the system can output
     * @example
     * console.log(Tone.Destination.maxChannelCount);
     */
    get maxChannelCount() {
        return this.context.rawContext.destination.maxChannelCount;
    }
    /**
     * Clean up
     */
    dispose() {
        super.dispose();
        this.volume.dispose();
        return this;
    }
}
//-------------------------------------
// 	INITIALIZATION
//-------------------------------------
onContextInit(context => {
    context.destination = new Destination({ context });
});
onContextClose(context => {
    context.destination.dispose();
});

/**
 * Represents a single value which is gettable and settable in a timed way
 */
class TimelineValue extends Tone {
    /**
     * @param initialValue The value to return if there is no scheduled values
     */
    constructor(initialValue) {
        super();
        this.name = "TimelineValue";
        /**
         * The timeline which stores the values
         */
        this._timeline = new Timeline({ memory: 10 });
        this._initialValue = initialValue;
    }
    /**
     * Set the value at the given time
     */
    set(value, time) {
        this._timeline.add({
            value, time
        });
        return this;
    }
    /**
     * Get the value at the given time
     */
    get(time) {
        const event = this._timeline.get(time);
        if (event) {
            return event.value;
        }
        else {
            return this._initialValue;
        }
    }
}

/**
 * TransportEvent is an internal class used by [[Transport]]
 * to schedule events. Do no invoke this class directly, it is
 * handled from within Tone.Transport.
 */
class TransportEvent {
    /**
     * @param transport The transport object which the event belongs to
     */
    constructor(transport, opts) {
        /**
         * The unique id of the event
         */
        this.id = TransportEvent._eventId++;
        const options = Object.assign(TransportEvent.getDefaults(), opts);
        this.transport = transport;
        this.callback = options.callback;
        this._once = options.once;
        this.time = options.time;
    }
    static getDefaults() {
        return {
            callback: noOp,
            once: false,
            time: 0,
        };
    }
    /**
     * Invoke the event callback.
     * @param  time  The AudioContext time in seconds of the event
     */
    invoke(time) {
        if (this.callback) {
            this.callback(time);
            if (this._once) {
                this.transport.clear(this.id);
            }
        }
    }
    /**
     * Clean up
     */
    dispose() {
        this.callback = undefined;
        return this;
    }
}
/**
 * Current ID counter
 */
TransportEvent._eventId = 0;

/**
 * TransportRepeatEvent is an internal class used by Tone.Transport
 * to schedule repeat events. This class should not be instantiated directly.
 */
class TransportRepeatEvent extends TransportEvent {
    /**
     * @param transport The transport object which the event belongs to
     */
    constructor(transport, opts) {
        super(transport, opts);
        /**
         * The ID of the current timeline event
         */
        this._currentId = -1;
        /**
         * The ID of the next timeline event
         */
        this._nextId = -1;
        /**
         * The time of the next event
         */
        this._nextTick = this.time;
        /**
         * a reference to the bound start method
         */
        this._boundRestart = this._restart.bind(this);
        const options = Object.assign(TransportRepeatEvent.getDefaults(), opts);
        this.duration = new TicksClass(transport.context, options.duration).valueOf();
        this._interval = new TicksClass(transport.context, options.interval).valueOf();
        this._nextTick = options.time;
        this.transport.on("start", this._boundRestart);
        this.transport.on("loopStart", this._boundRestart);
        this.context = this.transport.context;
        this._restart();
    }
    static getDefaults() {
        return Object.assign({}, TransportEvent.getDefaults(), {
            duration: Infinity,
            interval: 1,
            once: false,
        });
    }
    /**
     * Invoke the callback. Returns the tick time which
     * the next event should be scheduled at.
     * @param  time  The AudioContext time in seconds of the event
     */
    invoke(time) {
        // create more events if necessary
        this._createEvents(time);
        // call the super class
        super.invoke(time);
    }
    /**
     * Push more events onto the timeline to keep up with the position of the timeline
     */
    _createEvents(time) {
        // schedule the next event
        const ticks = this.transport.getTicksAtTime(time);
        if (ticks >= this.time && ticks >= this._nextTick && this._nextTick + this._interval < this.time + this.duration) {
            this._nextTick += this._interval;
            this._currentId = this._nextId;
            this._nextId = this.transport.scheduleOnce(this.invoke.bind(this), new TicksClass(this.context, this._nextTick).toSeconds());
        }
    }
    /**
     * Push more events onto the timeline to keep up with the position of the timeline
     */
    _restart(time) {
        this.transport.clear(this._currentId);
        this.transport.clear(this._nextId);
        this._nextTick = this.time;
        const ticks = this.transport.getTicksAtTime(time);
        if (ticks > this.time) {
            this._nextTick = this.time + Math.ceil((ticks - this.time) / this._interval) * this._interval;
        }
        this._currentId = this.transport.scheduleOnce(this.invoke.bind(this), new TicksClass(this.context, this._nextTick).toSeconds());
        this._nextTick += this._interval;
        this._nextId = this.transport.scheduleOnce(this.invoke.bind(this), new TicksClass(this.context, this._nextTick).toSeconds());
    }
    /**
     * Clean up
     */
    dispose() {
        super.dispose();
        this.transport.clear(this._currentId);
        this.transport.clear(this._nextId);
        this.transport.off("start", this._boundRestart);
        this.transport.off("loopStart", this._boundRestart);
        return this;
    }
}

/**
 * Transport for timing musical events.
 * Supports tempo curves and time changes. Unlike browser-based timing (setInterval, requestAnimationFrame)
 * Transport timing events pass in the exact time of the scheduled event
 * in the argument of the callback function. Pass that time value to the object
 * you're scheduling. <br><br>
 * A single transport is created for you when the library is initialized.
 * <br><br>
 * The transport emits the events: "start", "stop", "pause", and "loop" which are
 * called with the time of that event as the argument.
 *
 * @example
 * const osc = new Tone.Oscillator().toDestination();
 * // repeated event every 8th note
 * Tone.Transport.scheduleRepeat((time) => {
 * 	// use the callback time to schedule events
 * 	osc.start(time).stop(time + 0.1);
 * }, "8n");
 * // transport must be started before it starts invoking events
 * Tone.Transport.start();
 * @category Core
 */
class Transport extends ToneWithContext {
    constructor() {
        super(optionsFromArguments(Transport.getDefaults(), arguments));
        this.name = "Transport";
        //-------------------------------------
        // 	LOOPING
        //-------------------------------------
        /**
         * If the transport loops or not.
         */
        this._loop = new TimelineValue(false);
        /**
         * The loop start position in ticks
         */
        this._loopStart = 0;
        /**
         * The loop end position in ticks
         */
        this._loopEnd = 0;
        //-------------------------------------
        // 	TIMELINE EVENTS
        //-------------------------------------
        /**
         * All the events in an object to keep track by ID
         */
        this._scheduledEvents = {};
        /**
         * The scheduled events.
         */
        this._timeline = new Timeline();
        /**
         * Repeated events
         */
        this._repeatedEvents = new IntervalTimeline();
        /**
         * All of the synced Signals
         */
        this._syncedSignals = [];
        /**
         * The swing amount
         */
        this._swingAmount = 0;
        const options = optionsFromArguments(Transport.getDefaults(), arguments);
        // CLOCK/TEMPO
        this._ppq = options.ppq;
        this._clock = new Clock({
            callback: this._processTick.bind(this),
            context: this.context,
            frequency: 0,
            units: "bpm",
        });
        this._bindClockEvents();
        this.bpm = this._clock.frequency;
        this._clock.frequency.multiplier = options.ppq;
        this.bpm.setValueAtTime(options.bpm, 0);
        readOnly(this, "bpm");
        this._timeSignature = options.timeSignature;
        // SWING
        this._swingTicks = options.ppq / 2; // 8n
    }
    static getDefaults() {
        return Object.assign(ToneWithContext.getDefaults(), {
            bpm: 120,
            loopEnd: "4m",
            loopStart: 0,
            ppq: 192,
            swing: 0,
            swingSubdivision: "8n",
            timeSignature: 4,
        });
    }
    //-------------------------------------
    // 	TICKS
    //-------------------------------------
    /**
     * called on every tick
     * @param  tickTime clock relative tick time
     */
    _processTick(tickTime, ticks) {
        // do the loop test
        if (this._loop.get(tickTime)) {
            if (ticks >= this._loopEnd) {
                this.emit("loopEnd", tickTime);
                this._clock.setTicksAtTime(this._loopStart, tickTime);
                ticks = this._loopStart;
                this.emit("loopStart", tickTime, this._clock.getSecondsAtTime(tickTime));
                this.emit("loop", tickTime);
            }
        }
        // handle swing
        if (this._swingAmount > 0 &&
            ticks % this._ppq !== 0 && // not on a downbeat
            ticks % (this._swingTicks * 2) !== 0) {
            // add some swing
            const progress = (ticks % (this._swingTicks * 2)) / (this._swingTicks * 2);
            const amount = Math.sin((progress) * Math.PI) * this._swingAmount;
            tickTime += new TicksClass(this.context, this._swingTicks * 2 / 3).toSeconds() * amount;
        }
        // invoke the timeline events scheduled on this tick
        this._timeline.forEachAtTime(ticks, event => event.invoke(tickTime));
    }
    //-------------------------------------
    // 	SCHEDULABLE EVENTS
    //-------------------------------------
    /**
     * Schedule an event along the timeline.
     * @param callback The callback to be invoked at the time.
     * @param time The time to invoke the callback at.
     * @return The id of the event which can be used for canceling the event.
     * @example
     * // schedule an event on the 16th measure
     * Tone.Transport.schedule((time) => {
     * 	// invoked on measure 16
     * 	console.log("measure 16!");
     * }, "16:0:0");
     */
    schedule(callback, time) {
        const event = new TransportEvent(this, {
            callback,
            time: new TransportTimeClass(this.context, time).toTicks(),
        });
        return this._addEvent(event, this._timeline);
    }
    /**
     * Schedule a repeated event along the timeline. The event will fire
     * at the `interval` starting at the `startTime` and for the specified
     * `duration`.
     * @param  callback   The callback to invoke.
     * @param  interval   The duration between successive callbacks. Must be a positive number.
     * @param  startTime  When along the timeline the events should start being invoked.
     * @param  duration How long the event should repeat.
     * @return  The ID of the scheduled event. Use this to cancel the event.
     * @example
     * const osc = new Tone.Oscillator().toDestination().start();
     * // a callback invoked every eighth note after the first measure
     * Tone.Transport.scheduleRepeat((time) => {
     * 	osc.start(time).stop(time + 0.1);
     * }, "8n", "1m");
     */
    scheduleRepeat(callback, interval, startTime, duration = Infinity) {
        const event = new TransportRepeatEvent(this, {
            callback,
            duration: new TimeClass(this.context, duration).toTicks(),
            interval: new TimeClass(this.context, interval).toTicks(),
            time: new TransportTimeClass(this.context, startTime).toTicks(),
        });
        // kick it off if the Transport is started
        // @ts-ignore
        return this._addEvent(event, this._repeatedEvents);
    }
    /**
     * Schedule an event that will be removed after it is invoked.
     * @param callback The callback to invoke once.
     * @param time The time the callback should be invoked.
     * @returns The ID of the scheduled event.
     */
    scheduleOnce(callback, time) {
        const event = new TransportEvent(this, {
            callback,
            once: true,
            time: new TransportTimeClass(this.context, time).toTicks(),
        });
        return this._addEvent(event, this._timeline);
    }
    /**
     * Clear the passed in event id from the timeline
     * @param eventId The id of the event.
     */
    clear(eventId) {
        if (this._scheduledEvents.hasOwnProperty(eventId)) {
            const item = this._scheduledEvents[eventId.toString()];
            item.timeline.remove(item.event);
            item.event.dispose();
            delete this._scheduledEvents[eventId.toString()];
        }
        return this;
    }
    /**
     * Add an event to the correct timeline. Keep track of the
     * timeline it was added to.
     * @returns the event id which was just added
     */
    _addEvent(event, timeline) {
        this._scheduledEvents[event.id.toString()] = {
            event,
            timeline,
        };
        timeline.add(event);
        return event.id;
    }
    /**
     * Remove scheduled events from the timeline after
     * the given time. Repeated events will be removed
     * if their startTime is after the given time
     * @param after Clear all events after this time.
     */
    cancel(after = 0) {
        const computedAfter = this.toTicks(after);
        this._timeline.forEachFrom(computedAfter, event => this.clear(event.id));
        this._repeatedEvents.forEachFrom(computedAfter, event => this.clear(event.id));
        return this;
    }
    //-------------------------------------
    // 	START/STOP/PAUSE
    //-------------------------------------
    /**
     * Bind start/stop/pause events from the clock and emit them.
     */
    _bindClockEvents() {
        this._clock.on("start", (time, offset) => {
            offset = new TicksClass(this.context, offset).toSeconds();
            this.emit("start", time, offset);
        });
        this._clock.on("stop", (time) => {
            this.emit("stop", time);
        });
        this._clock.on("pause", (time) => {
            this.emit("pause", time);
        });
    }
    /**
     * Returns the playback state of the source, either "started", "stopped", or "paused"
     */
    get state() {
        return this._clock.getStateAtTime(this.now());
    }
    /**
     * Start the transport and all sources synced to the transport.
     * @param  time The time when the transport should start.
     * @param  offset The timeline offset to start the transport.
     * @example
     * // start the transport in one second starting at beginning of the 5th measure.
     * Tone.Transport.start("+1", "4:0:0");
     */
    start(time, offset) {
        let offsetTicks;
        if (isDefined(offset)) {
            offsetTicks = this.toTicks(offset);
        }
        // start the clock
        this._clock.start(time, offsetTicks);
        return this;
    }
    /**
     * Stop the transport and all sources synced to the transport.
     * @param time The time when the transport should stop.
     * @example
     * Tone.Transport.stop();
     */
    stop(time) {
        this._clock.stop(time);
        return this;
    }
    /**
     * Pause the transport and all sources synced to the transport.
     */
    pause(time) {
        this._clock.pause(time);
        return this;
    }
    /**
     * Toggle the current state of the transport. If it is
     * started, it will stop it, otherwise it will start the Transport.
     * @param  time The time of the event
     */
    toggle(time) {
        time = this.toSeconds(time);
        if (this._clock.getStateAtTime(time) !== "started") {
            this.start(time);
        }
        else {
            this.stop(time);
        }
        return this;
    }
    //-------------------------------------
    // 	SETTERS/GETTERS
    //-------------------------------------
    /**
     * The time signature as just the numerator over 4.
     * For example 4/4 would be just 4 and 6/8 would be 3.
     * @example
     * // common time
     * Tone.Transport.timeSignature = 4;
     * // 7/8
     * Tone.Transport.timeSignature = [7, 8];
     * // this will be reduced to a single number
     * Tone.Transport.timeSignature; // returns 3.5
     */
    get timeSignature() {
        return this._timeSignature;
    }
    set timeSignature(timeSig) {
        if (isArray(timeSig)) {
            timeSig = (timeSig[0] / timeSig[1]) * 4;
        }
        this._timeSignature = timeSig;
    }
    /**
     * When the Transport.loop = true, this is the starting position of the loop.
     */
    get loopStart() {
        return new TimeClass(this.context, this._loopStart, "i").toSeconds();
    }
    set loopStart(startPosition) {
        this._loopStart = this.toTicks(startPosition);
    }
    /**
     * When the Transport.loop = true, this is the ending position of the loop.
     */
    get loopEnd() {
        return new TimeClass(this.context, this._loopEnd, "i").toSeconds();
    }
    set loopEnd(endPosition) {
        this._loopEnd = this.toTicks(endPosition);
    }
    /**
     * If the transport loops or not.
     */
    get loop() {
        return this._loop.get(this.now());
    }
    set loop(loop) {
        this._loop.set(loop, this.now());
    }
    /**
     * Set the loop start and stop at the same time.
     * @example
     * // loop over the first measure
     * Tone.Transport.setLoopPoints(0, "1m");
     * Tone.Transport.loop = true;
     */
    setLoopPoints(startPosition, endPosition) {
        this.loopStart = startPosition;
        this.loopEnd = endPosition;
        return this;
    }
    /**
     * The swing value. Between 0-1 where 1 equal to the note + half the subdivision.
     */
    get swing() {
        return this._swingAmount;
    }
    set swing(amount) {
        // scale the values to a normal range
        this._swingAmount = amount;
    }
    /**
     * Set the subdivision which the swing will be applied to.
     * The default value is an 8th note. Value must be less
     * than a quarter note.
     */
    get swingSubdivision() {
        return new TicksClass(this.context, this._swingTicks).toNotation();
    }
    set swingSubdivision(subdivision) {
        this._swingTicks = this.toTicks(subdivision);
    }
    /**
     * The Transport's position in Bars:Beats:Sixteenths.
     * Setting the value will jump to that position right away.
     */
    get position() {
        const now = this.now();
        const ticks = this._clock.getTicksAtTime(now);
        return new TicksClass(this.context, ticks).toBarsBeatsSixteenths();
    }
    set position(progress) {
        const ticks = this.toTicks(progress);
        this.ticks = ticks;
    }
    /**
     * The Transport's position in seconds
     * Setting the value will jump to that position right away.
     */
    get seconds() {
        return this._clock.seconds;
    }
    set seconds(s) {
        const now = this.now();
        const ticks = this._clock.frequency.timeToTicks(s, now);
        this.ticks = ticks;
    }
    /**
     * The Transport's loop position as a normalized value. Always
     * returns 0 if the transport if loop is not true.
     */
    get progress() {
        if (this.loop) {
            const now = this.now();
            const ticks = this._clock.getTicksAtTime(now);
            return (ticks - this._loopStart) / (this._loopEnd - this._loopStart);
        }
        else {
            return 0;
        }
    }
    /**
     * The transports current tick position.
     */
    get ticks() {
        return this._clock.ticks;
    }
    set ticks(t) {
        if (this._clock.ticks !== t) {
            const now = this.now();
            // stop everything synced to the transport
            if (this.state === "started") {
                const ticks = this._clock.getTicksAtTime(now);
                // schedule to start on the next tick, #573
                const remainingTick = this._clock.frequency.getDurationOfTicks(Math.ceil(ticks) - ticks, now);
                const time = now + remainingTick;
                this.emit("stop", time);
                this._clock.setTicksAtTime(t, time);
                // restart it with the new time
                this.emit("start", time, this._clock.getSecondsAtTime(time));
            }
            else {
                this._clock.setTicksAtTime(t, now);
            }
        }
    }
    /**
     * Get the clock's ticks at the given time.
     * @param  time  When to get the tick value
     * @return The tick value at the given time.
     */
    getTicksAtTime(time) {
        return Math.round(this._clock.getTicksAtTime(time));
    }
    /**
     * Return the elapsed seconds at the given time.
     * @param  time  When to get the elapsed seconds
     * @return  The number of elapsed seconds
     */
    getSecondsAtTime(time) {
        return this._clock.getSecondsAtTime(time);
    }
    /**
     * Pulses Per Quarter note. This is the smallest resolution
     * the Transport timing supports. This should be set once
     * on initialization and not set again. Changing this value
     * after other objects have been created can cause problems.
     */
    get PPQ() {
        return this._clock.frequency.multiplier;
    }
    set PPQ(ppq) {
        this._clock.frequency.multiplier = ppq;
    }
    //-------------------------------------
    // 	SYNCING
    //-------------------------------------
    /**
     * Returns the time aligned to the next subdivision
     * of the Transport. If the Transport is not started,
     * it will return 0.
     * Note: this will not work precisely during tempo ramps.
     * @param  subdivision  The subdivision to quantize to
     * @return  The context time of the next subdivision.
     * @example
     * // the transport must be started, otherwise returns 0
     * Tone.Transport.start();
     * Tone.Transport.nextSubdivision("4n");
     */
    nextSubdivision(subdivision) {
        subdivision = this.toTicks(subdivision);
        if (this.state !== "started") {
            // if the transport's not started, return 0
            return 0;
        }
        else {
            const now = this.now();
            // the remainder of the current ticks and the subdivision
            const transportPos = this.getTicksAtTime(now);
            const remainingTicks = subdivision - transportPos % subdivision;
            return this._clock.nextTickTime(remainingTicks, now);
        }
    }
    /**
     * Attaches the signal to the tempo control signal so that
     * any changes in the tempo will change the signal in the same
     * ratio.
     *
     * @param signal
     * @param ratio Optionally pass in the ratio between the two signals.
     * 			Otherwise it will be computed based on their current values.
     */
    syncSignal(signal, ratio) {
        if (!ratio) {
            // get the sync ratio
            const now = this.now();
            if (signal.getValueAtTime(now) !== 0) {
                const bpm = this.bpm.getValueAtTime(now);
                const computedFreq = 1 / (60 / bpm / this.PPQ);
                ratio = signal.getValueAtTime(now) / computedFreq;
            }
            else {
                ratio = 0;
            }
        }
        const ratioSignal = new Gain(ratio);
        // @ts-ignore
        this.bpm.connect(ratioSignal);
        // @ts-ignore
        ratioSignal.connect(signal._param);
        this._syncedSignals.push({
            initial: signal.value,
            ratio: ratioSignal,
            signal,
        });
        signal.value = 0;
        return this;
    }
    /**
     * Unsyncs a previously synced signal from the transport's control.
     * See Transport.syncSignal.
     */
    unsyncSignal(signal) {
        for (let i = this._syncedSignals.length - 1; i >= 0; i--) {
            const syncedSignal = this._syncedSignals[i];
            if (syncedSignal.signal === signal) {
                syncedSignal.ratio.dispose();
                syncedSignal.signal.value = syncedSignal.initial;
                this._syncedSignals.splice(i, 1);
            }
        }
        return this;
    }
    /**
     * Clean up.
     */
    dispose() {
        super.dispose();
        this._clock.dispose();
        writable(this, "bpm");
        this._timeline.dispose();
        this._repeatedEvents.dispose();
        return this;
    }
}
Emitter.mixin(Transport);
//-------------------------------------
// 	INITIALIZATION
//-------------------------------------
onContextInit(context => {
    context.transport = new Transport({ context });
});
onContextClose(context => {
    context.transport.dispose();
});

/**
 * Base class for sources.
 * start/stop of this.context.transport.
 *
 * ```
 * // Multiple state change events can be chained together,
 * // but must be set in the correct order and with ascending times
 * // OK
 * state.start().stop("+0.2");
 * // OK
 * state.start().stop("+0.2").start("+0.4").stop("+0.7")
 * // BAD
 * state.stop("+0.2").start();
 * // BAD
 * state.start("+0.3").stop("+0.2");
 * ```
 */
class Source extends ToneAudioNode {
    constructor(options) {
        super(options);
        /**
         * Sources have no inputs
         */
        this.input = undefined;
        /**
         * Keep track of the scheduled state.
         */
        this._state = new StateTimeline("stopped");
        /**
         * The synced `start` callback function from the transport
         */
        this._synced = false;
        /**
         * Keep track of all of the scheduled event ids
         */
        this._scheduled = [];
        /**
         * Placeholder functions for syncing/unsyncing to transport
         */
        this._syncedStart = noOp;
        this._syncedStop = noOp;
        this._state.memory = 100;
        this._state.increasing = true;
        this._volume = this.output = new Volume({
            context: this.context,
            mute: options.mute,
            volume: options.volume,
        });
        this.volume = this._volume.volume;
        readOnly(this, "volume");
        this.onstop = options.onstop;
    }
    static getDefaults() {
        return Object.assign(ToneAudioNode.getDefaults(), {
            mute: false,
            onstop: noOp,
            volume: 0,
        });
    }
    /**
     * Returns the playback state of the source, either "started" or "stopped".
     * @example
     * const player = new Tone.Player("https://tonejs.github.io/audio/berklee/ahntone_c3.mp3", () => {
     * 	player.start();
     * 	console.log(player.state);
     * }).toDestination();
     */
    get state() {
        if (this._synced) {
            if (this.context.transport.state === "started") {
                return this._state.getValueAtTime(this.context.transport.seconds);
            }
            else {
                return "stopped";
            }
        }
        else {
            return this._state.getValueAtTime(this.now());
        }
    }
    /**
     * Mute the output.
     * @example
     * const osc = new Tone.Oscillator().toDestination().start();
     * // mute the output
     * osc.mute = true;
     */
    get mute() {
        return this._volume.mute;
    }
    set mute(mute) {
        this._volume.mute = mute;
    }
    /**
     * Ensure that the scheduled time is not before the current time.
     * Should only be used when scheduled unsynced.
     */
    _clampToCurrentTime(time) {
        if (this._synced) {
            return time;
        }
        else {
            return Math.max(time, this.context.currentTime);
        }
    }
    /**
     * Start the source at the specified time. If no time is given,
     * start the source now.
     * @param  time When the source should be started.
     * @example
     * const source = new Tone.Oscillator().toDestination();
     * source.start("+0.5"); // starts the source 0.5 seconds from now
     */
    start(time, offset, duration) {
        let computedTime = isUndef(time) && this._synced ? this.context.transport.seconds : this.toSeconds(time);
        computedTime = this._clampToCurrentTime(computedTime);
        // if it's started, stop it and restart it
        if (!this._synced && this._state.getValueAtTime(computedTime) === "started") {
            // time should be strictly greater than the previous start time
            assert(GT(computedTime, this._state.get(computedTime).time), "Start time must be strictly greater than previous start time");
            this._state.cancel(computedTime);
            this._state.setStateAtTime("started", computedTime);
            this.log("restart", computedTime);
            this.restart(computedTime, offset, duration);
        }
        else {
            this.log("start", computedTime);
            this._state.setStateAtTime("started", computedTime);
            if (this._synced) {
                // add the offset time to the event
                const event = this._state.get(computedTime);
                if (event) {
                    event.offset = this.toSeconds(defaultArg(offset, 0));
                    event.duration = duration ? this.toSeconds(duration) : undefined;
                }
                const sched = this.context.transport.schedule(t => {
                    this._start(t, offset, duration);
                }, computedTime);
                this._scheduled.push(sched);
                // if the transport is already started
                // and the time is greater than where the transport is
                if (this.context.transport.state === "started" &&
                    this.context.transport.getSecondsAtTime(this.immediate()) > computedTime) {
                    this._syncedStart(this.now(), this.context.transport.seconds);
                }
            }
            else {
                assertContextRunning(this.context);
                this._start(computedTime, offset, duration);
            }
        }
        return this;
    }
    /**
     * Stop the source at the specified time. If no time is given,
     * stop the source now.
     * @param  time When the source should be stopped.
     * @example
     * const source = new Tone.Oscillator().toDestination();
     * source.start();
     * source.stop("+0.5"); // stops the source 0.5 seconds from now
     */
    stop(time) {
        let computedTime = isUndef(time) && this._synced ? this.context.transport.seconds : this.toSeconds(time);
        computedTime = this._clampToCurrentTime(computedTime);
        if (this._state.getValueAtTime(computedTime) === "started" || isDefined(this._state.getNextState("started", computedTime))) {
            this.log("stop", computedTime);
            if (!this._synced) {
                this._stop(computedTime);
            }
            else {
                const sched = this.context.transport.schedule(this._stop.bind(this), computedTime);
                this._scheduled.push(sched);
            }
            this._state.cancel(computedTime);
            this._state.setStateAtTime("stopped", computedTime);
        }
        return this;
    }
    /**
     * Restart the source.
     */
    restart(time, offset, duration) {
        time = this.toSeconds(time);
        if (this._state.getValueAtTime(time) === "started") {
            this._state.cancel(time);
            this._restart(time, offset, duration);
        }
        return this;
    }
    /**
     * Sync the source to the Transport so that all subsequent
     * calls to `start` and `stop` are synced to the TransportTime
     * instead of the AudioContext time.
     *
     * @example
     * const osc = new Tone.Oscillator().toDestination();
     * // sync the source so that it plays between 0 and 0.3 on the Transport's timeline
     * osc.sync().start(0).stop(0.3);
     * // start the transport.
     * Tone.Transport.start();
     * // set it to loop once a second
     * Tone.Transport.loop = true;
     * Tone.Transport.loopEnd = 1;
     */
    sync() {
        if (!this._synced) {
            this._synced = true;
            this._syncedStart = (time, offset) => {
                if (offset > 0) {
                    // get the playback state at that time
                    const stateEvent = this._state.get(offset);
                    // listen for start events which may occur in the middle of the sync'ed time
                    if (stateEvent && stateEvent.state === "started" && stateEvent.time !== offset) {
                        // get the offset
                        const startOffset = offset - this.toSeconds(stateEvent.time);
                        let duration;
                        if (stateEvent.duration) {
                            duration = this.toSeconds(stateEvent.duration) - startOffset;
                        }
                        this._start(time, this.toSeconds(stateEvent.offset) + startOffset, duration);
                    }
                }
            };
            this._syncedStop = time => {
                const seconds = this.context.transport.getSecondsAtTime(Math.max(time - this.sampleTime, 0));
                if (this._state.getValueAtTime(seconds) === "started") {
                    this._stop(time);
                }
            };
            this.context.transport.on("start", this._syncedStart);
            this.context.transport.on("loopStart", this._syncedStart);
            this.context.transport.on("stop", this._syncedStop);
            this.context.transport.on("pause", this._syncedStop);
            this.context.transport.on("loopEnd", this._syncedStop);
        }
        return this;
    }
    /**
     * Unsync the source to the Transport. See Source.sync
     */
    unsync() {
        if (this._synced) {
            this.context.transport.off("stop", this._syncedStop);
            this.context.transport.off("pause", this._syncedStop);
            this.context.transport.off("loopEnd", this._syncedStop);
            this.context.transport.off("start", this._syncedStart);
            this.context.transport.off("loopStart", this._syncedStart);
        }
        this._synced = false;
        // clear all of the scheduled ids
        this._scheduled.forEach(id => this.context.transport.clear(id));
        this._scheduled = [];
        this._state.cancel(0);
        // stop it also
        this._stop(0);
        return this;
    }
    /**
     * Clean up.
     */
    dispose() {
        super.dispose();
        this.onstop = noOp;
        this.unsync();
        this._volume.dispose();
        this._state.dispose();
        return this;
    }
}

/**
 * Wrapper around the native BufferSourceNode.
 * @category Source
 */
class ToneBufferSource extends OneShotSource {
    constructor() {
        super(optionsFromArguments(ToneBufferSource.getDefaults(), arguments, ["url", "onload"]));
        this.name = "ToneBufferSource";
        /**
         * The oscillator
         */
        this._source = this.context.createBufferSource();
        this._internalChannels = [this._source];
        /**
         * indicators if the source has started/stopped
         */
        this._sourceStarted = false;
        this._sourceStopped = false;
        const options = optionsFromArguments(ToneBufferSource.getDefaults(), arguments, ["url", "onload"]);
        connect(this._source, this._gainNode);
        this._source.onended = () => this._stopSource();
        /**
         * The playbackRate of the buffer
         */
        this.playbackRate = new Param({
            context: this.context,
            param: this._source.playbackRate,
            units: "positive",
            value: options.playbackRate,
        });
        // set some values initially
        this.loop = options.loop;
        this.loopStart = options.loopStart;
        this.loopEnd = options.loopEnd;
        this._buffer = new ToneAudioBuffer(options.url, options.onload, options.onerror);
        this._internalChannels.push(this._source);
    }
    static getDefaults() {
        return Object.assign(OneShotSource.getDefaults(), {
            url: new ToneAudioBuffer(),
            loop: false,
            loopEnd: 0,
            loopStart: 0,
            onload: noOp,
            onerror: noOp,
            playbackRate: 1,
        });
    }
    /**
     * The fadeIn time of the amplitude envelope.
     */
    get fadeIn() {
        return this._fadeIn;
    }
    set fadeIn(t) {
        this._fadeIn = t;
    }
    /**
     * The fadeOut time of the amplitude envelope.
     */
    get fadeOut() {
        return this._fadeOut;
    }
    set fadeOut(t) {
        this._fadeOut = t;
    }
    /**
     * The curve applied to the fades, either "linear" or "exponential"
     */
    get curve() {
        return this._curve;
    }
    set curve(t) {
        this._curve = t;
    }
    /**
     * Start the buffer
     * @param  time When the player should start.
     * @param  offset The offset from the beginning of the sample to start at.
     * @param  duration How long the sample should play. If no duration is given, it will default to the full length of the sample (minus any offset)
     * @param  gain  The gain to play the buffer back at.
     */
    start(time, offset, duration, gain = 1) {
        assert(this.buffer.loaded, "buffer is either not set or not loaded");
        const computedTime = this.toSeconds(time);
        // apply the gain envelope
        this._startGain(computedTime, gain);
        // if it's a loop the default offset is the loopstart point
        if (this.loop) {
            offset = defaultArg(offset, this.loopStart);
        }
        else {
            // otherwise the default offset is 0
            offset = defaultArg(offset, 0);
        }
        // make sure the offset is not less than 0
        let computedOffset = Math.max(this.toSeconds(offset), 0);
        // start the buffer source
        if (this.loop) {
            // modify the offset if it's greater than the loop time
            const loopEnd = this.toSeconds(this.loopEnd) || this.buffer.duration;
            const loopStart = this.toSeconds(this.loopStart);
            const loopDuration = loopEnd - loopStart;
            // move the offset back
            if (GTE(computedOffset, loopEnd)) {
                computedOffset = ((computedOffset - loopStart) % loopDuration) + loopStart;
            }
            // when the offset is very close to the duration, set it to 0
            if (EQ(computedOffset, this.buffer.duration)) {
                computedOffset = 0;
            }
        }
        // this.buffer.loaded would have return false if the AudioBuffer was undefined
        this._source.buffer = this.buffer.get();
        this._source.loopEnd = this.toSeconds(this.loopEnd) || this.buffer.duration;
        if (LT(computedOffset, this.buffer.duration)) {
            this._sourceStarted = true;
            this._source.start(computedTime, computedOffset);
        }
        // if a duration is given, schedule a stop
        if (isDefined(duration)) {
            let computedDur = this.toSeconds(duration);
            // make sure it's never negative
            computedDur = Math.max(computedDur, 0);
            this.stop(computedTime + computedDur);
        }
        return this;
    }
    _stopSource(time) {
        if (!this._sourceStopped && this._sourceStarted) {
            this._sourceStopped = true;
            this._source.stop(this.toSeconds(time));
            this._onended();
        }
    }
    /**
     * If loop is true, the loop will start at this position.
     */
    get loopStart() {
        return this._source.loopStart;
    }
    set loopStart(loopStart) {
        this._source.loopStart = this.toSeconds(loopStart);
    }
    /**
     * If loop is true, the loop will end at this position.
     */
    get loopEnd() {
        return this._source.loopEnd;
    }
    set loopEnd(loopEnd) {
        this._source.loopEnd = this.toSeconds(loopEnd);
    }
    /**
     * The audio buffer belonging to the player.
     */
    get buffer() {
        return this._buffer;
    }
    set buffer(buffer) {
        this._buffer.set(buffer);
    }
    /**
     * If the buffer should loop once it's over.
     */
    get loop() {
        return this._source.loop;
    }
    set loop(loop) {
        this._source.loop = loop;
        if (this._sourceStarted) {
            this.cancelStop();
        }
    }
    /**
     * Clean up.
     */
    dispose() {
        super.dispose();
        this._source.onended = null;
        this._source.disconnect();
        this._buffer.dispose();
        this.playbackRate.dispose();
        return this;
    }
}

/**
 * Render a segment of the oscillator to an offline context and return the results as an array
 */
function generateWaveform(instance, length) {
    return __awaiter(this, void 0, void 0, function* () {
        const duration = length / instance.context.sampleRate;
        const context = new OfflineContext(1, duration, instance.context.sampleRate);
        const clone = new instance.constructor(Object.assign(instance.get(), {
            // should do 2 iterations
            frequency: 2 / duration,
            // zero out the detune
            detune: 0,
            context
        })).toDestination();
        clone.start(0);
        const buffer = yield context.render();
        return buffer.getChannelData(0);
    });
}

/**
 * Wrapper around the native fire-and-forget OscillatorNode.
 * Adds the ability to reschedule the stop method.
 * ***[[Oscillator]] is better for most use-cases***
 * @category Source
 */
class ToneOscillatorNode extends OneShotSource {
    constructor() {
        super(optionsFromArguments(ToneOscillatorNode.getDefaults(), arguments, ["frequency", "type"]));
        this.name = "ToneOscillatorNode";
        /**
         * The oscillator
         */
        this._oscillator = this.context.createOscillator();
        this._internalChannels = [this._oscillator];
        const options = optionsFromArguments(ToneOscillatorNode.getDefaults(), arguments, ["frequency", "type"]);
        connect(this._oscillator, this._gainNode);
        this.type = options.type;
        this.frequency = new Param({
            context: this.context,
            param: this._oscillator.frequency,
            units: "frequency",
            value: options.frequency,
        });
        this.detune = new Param({
            context: this.context,
            param: this._oscillator.detune,
            units: "cents",
            value: options.detune,
        });
        readOnly(this, ["frequency", "detune"]);
    }
    static getDefaults() {
        return Object.assign(OneShotSource.getDefaults(), {
            detune: 0,
            frequency: 440,
            type: "sine",
        });
    }
    /**
     * Start the oscillator node at the given time
     * @param  time When to start the oscillator
     */
    start(time) {
        const computedTime = this.toSeconds(time);
        this.log("start", computedTime);
        this._startGain(computedTime);
        this._oscillator.start(computedTime);
        return this;
    }
    _stopSource(time) {
        this._oscillator.stop(time);
    }
    /**
     * Sets an arbitrary custom periodic waveform given a PeriodicWave.
     * @param  periodicWave PeriodicWave should be created with context.createPeriodicWave
     */
    setPeriodicWave(periodicWave) {
        this._oscillator.setPeriodicWave(periodicWave);
        return this;
    }
    /**
     * The oscillator type. Either 'sine', 'sawtooth', 'square', or 'triangle'
     */
    get type() {
        return this._oscillator.type;
    }
    set type(type) {
        this._oscillator.type = type;
    }
    /**
     * Clean up.
     */
    dispose() {
        super.dispose();
        if (this.state === "started") {
            this.stop();
        }
        this._oscillator.disconnect();
        this.frequency.dispose();
        this.detune.dispose();
        return this;
    }
}

/**
 * Oscillator supports a number of features including
 * phase rotation, multiple oscillator types (see Oscillator.type),
 * and Transport syncing (see Oscillator.syncFrequency).
 *
 * @example
 * // make and start a 440hz sine tone
 * const osc = new Tone.Oscillator(440, "sine").toDestination().start();
 * @category Source
 */
class Oscillator extends Source {
    constructor() {
        super(optionsFromArguments(Oscillator.getDefaults(), arguments, ["frequency", "type"]));
        this.name = "Oscillator";
        /**
         * the main oscillator
         */
        this._oscillator = null;
        const options = optionsFromArguments(Oscillator.getDefaults(), arguments, ["frequency", "type"]);
        this.frequency = new Signal({
            context: this.context,
            units: "frequency",
            value: options.frequency,
        });
        readOnly(this, "frequency");
        this.detune = new Signal({
            context: this.context,
            units: "cents",
            value: options.detune,
        });
        readOnly(this, "detune");
        this._partials = options.partials;
        this._partialCount = options.partialCount;
        this._type = options.type;
        if (options.partialCount && options.type !== "custom") {
            this._type = this.baseType + options.partialCount.toString();
        }
        this.phase = options.phase;
    }
    static getDefaults() {
        return Object.assign(Source.getDefaults(), {
            detune: 0,
            frequency: 440,
            partialCount: 0,
            partials: [],
            phase: 0,
            type: "sine",
        });
    }
    /**
     * start the oscillator
     */
    _start(time) {
        const computedTime = this.toSeconds(time);
        // new oscillator with previous values
        const oscillator = new ToneOscillatorNode({
            context: this.context,
            onended: () => this.onstop(this),
        });
        this._oscillator = oscillator;
        if (this._wave) {
            this._oscillator.setPeriodicWave(this._wave);
        }
        else {
            this._oscillator.type = this._type;
        }
        // connect the control signal to the oscillator frequency & detune
        this._oscillator.connect(this.output);
        this.frequency.connect(this._oscillator.frequency);
        this.detune.connect(this._oscillator.detune);
        // start the oscillator
        this._oscillator.start(computedTime);
    }
    /**
     * stop the oscillator
     */
    _stop(time) {
        const computedTime = this.toSeconds(time);
        if (this._oscillator) {
            this._oscillator.stop(computedTime);
        }
    }
    /**
     * Restart the oscillator. Does not stop the oscillator, but instead
     * just cancels any scheduled 'stop' from being invoked.
     */
    _restart(time) {
        const computedTime = this.toSeconds(time);
        this.log("restart", computedTime);
        if (this._oscillator) {
            this._oscillator.cancelStop();
        }
        this._state.cancel(computedTime);
        return this;
    }
    /**
     * Sync the signal to the Transport's bpm. Any changes to the transports bpm,
     * will also affect the oscillators frequency.
     * @example
     * const osc = new Tone.Oscillator().toDestination().start();
     * osc.frequency.value = 440;
     * // the ratio between the bpm and the frequency will be maintained
     * osc.syncFrequency();
     * // double the tempo
     * Tone.Transport.bpm.value *= 2;
     * // the frequency of the oscillator is doubled to 880
     */
    syncFrequency() {
        this.context.transport.syncSignal(this.frequency);
        return this;
    }
    /**
     * Unsync the oscillator's frequency from the Transport.
     * See Oscillator.syncFrequency
     */
    unsyncFrequency() {
        this.context.transport.unsyncSignal(this.frequency);
        return this;
    }
    /**
     * Get a cached periodic wave. Avoids having to recompute
     * the oscillator values when they have already been computed
     * with the same values.
     */
    _getCachedPeriodicWave() {
        if (this._type === "custom") {
            const oscProps = Oscillator._periodicWaveCache.find(description => {
                return description.phase === this._phase &&
                    deepEquals(description.partials, this._partials);
            });
            return oscProps;
        }
        else {
            const oscProps = Oscillator._periodicWaveCache.find(description => {
                return description.type === this._type &&
                    description.phase === this._phase;
            });
            this._partialCount = oscProps ? oscProps.partialCount : this._partialCount;
            return oscProps;
        }
    }
    get type() {
        return this._type;
    }
    set type(type) {
        this._type = type;
        const isBasicType = ["sine", "square", "sawtooth", "triangle"].indexOf(type) !== -1;
        if (this._phase === 0 && isBasicType) {
            this._wave = undefined;
            this._partialCount = 0;
            // just go with the basic approach
            if (this._oscillator !== null) {
                // already tested that it's a basic type
                this._oscillator.type = type;
            }
        }
        else {
            // first check if the value is cached
            const cache = this._getCachedPeriodicWave();
            if (isDefined(cache)) {
                const { partials, wave } = cache;
                this._wave = wave;
                this._partials = partials;
                if (this._oscillator !== null) {
                    this._oscillator.setPeriodicWave(this._wave);
                }
            }
            else {
                const [real, imag] = this._getRealImaginary(type, this._phase);
                const periodicWave = this.context.createPeriodicWave(real, imag);
                this._wave = periodicWave;
                if (this._oscillator !== null) {
                    this._oscillator.setPeriodicWave(this._wave);
                }
                // set the cache
                Oscillator._periodicWaveCache.push({
                    imag,
                    partialCount: this._partialCount,
                    partials: this._partials,
                    phase: this._phase,
                    real,
                    type: this._type,
                    wave: this._wave,
                });
                if (Oscillator._periodicWaveCache.length > 100) {
                    Oscillator._periodicWaveCache.shift();
                }
            }
        }
    }
    get baseType() {
        return this._type.replace(this.partialCount.toString(), "");
    }
    set baseType(baseType) {
        if (this.partialCount && this._type !== "custom" && baseType !== "custom") {
            this.type = baseType + this.partialCount;
        }
        else {
            this.type = baseType;
        }
    }
    get partialCount() {
        return this._partialCount;
    }
    set partialCount(p) {
        assertRange(p, 0);
        let type = this._type;
        const partial = /^(sine|triangle|square|sawtooth)(\d+)$/.exec(this._type);
        if (partial) {
            type = partial[1];
        }
        if (this._type !== "custom") {
            if (p === 0) {
                this.type = type;
            }
            else {
                this.type = type + p.toString();
            }
        }
        else {
            // extend or shorten the partials array
            const fullPartials = new Float32Array(p);
            // copy over the partials array
            this._partials.forEach((v, i) => fullPartials[i] = v);
            this._partials = Array.from(fullPartials);
            this.type = this._type;
        }
    }
    /**
     * Returns the real and imaginary components based
     * on the oscillator type.
     * @returns [real: Float32Array, imaginary: Float32Array]
     */
    _getRealImaginary(type, phase) {
        const fftSize = 4096;
        let periodicWaveSize = fftSize / 2;
        const real = new Float32Array(periodicWaveSize);
        const imag = new Float32Array(periodicWaveSize);
        let partialCount = 1;
        if (type === "custom") {
            partialCount = this._partials.length + 1;
            this._partialCount = this._partials.length;
            periodicWaveSize = partialCount;
            // if the partial count is 0, don't bother doing any computation
            if (this._partials.length === 0) {
                return [real, imag];
            }
        }
        else {
            const partial = /^(sine|triangle|square|sawtooth)(\d+)$/.exec(type);
            if (partial) {
                partialCount = parseInt(partial[2], 10) + 1;
                this._partialCount = parseInt(partial[2], 10);
                type = partial[1];
                partialCount = Math.max(partialCount, 2);
                periodicWaveSize = partialCount;
            }
            else {
                this._partialCount = 0;
            }
            this._partials = [];
        }
        for (let n = 1; n < periodicWaveSize; ++n) {
            const piFactor = 2 / (n * Math.PI);
            let b;
            switch (type) {
                case "sine":
                    b = (n <= partialCount) ? 1 : 0;
                    this._partials[n - 1] = b;
                    break;
                case "square":
                    b = (n & 1) ? 2 * piFactor : 0;
                    this._partials[n - 1] = b;
                    break;
                case "sawtooth":
                    b = piFactor * ((n & 1) ? 1 : -1);
                    this._partials[n - 1] = b;
                    break;
                case "triangle":
                    if (n & 1) {
                        b = 2 * (piFactor * piFactor) * ((((n - 1) >> 1) & 1) ? -1 : 1);
                    }
                    else {
                        b = 0;
                    }
                    this._partials[n - 1] = b;
                    break;
                case "custom":
                    b = this._partials[n - 1];
                    break;
                default:
                    throw new TypeError("Oscillator: invalid type: " + type);
            }
            if (b !== 0) {
                real[n] = -b * Math.sin(phase * n);
                imag[n] = b * Math.cos(phase * n);
            }
            else {
                real[n] = 0;
                imag[n] = 0;
            }
        }
        return [real, imag];
    }
    /**
     * Compute the inverse FFT for a given phase.
     */
    _inverseFFT(real, imag, phase) {
        let sum = 0;
        const len = real.length;
        for (let i = 0; i < len; i++) {
            sum += real[i] * Math.cos(i * phase) + imag[i] * Math.sin(i * phase);
        }
        return sum;
    }
    /**
     * Returns the initial value of the oscillator when stopped.
     * E.g. a "sine" oscillator with phase = 90 would return an initial value of -1.
     */
    getInitialValue() {
        const [real, imag] = this._getRealImaginary(this._type, 0);
        let maxValue = 0;
        const twoPi = Math.PI * 2;
        const testPositions = 32;
        // check for peaks in 16 places
        for (let i = 0; i < testPositions; i++) {
            maxValue = Math.max(this._inverseFFT(real, imag, (i / testPositions) * twoPi), maxValue);
        }
        return clamp(-this._inverseFFT(real, imag, this._phase) / maxValue, -1, 1);
    }
    get partials() {
        return this._partials.slice(0, this.partialCount);
    }
    set partials(partials) {
        this._partials = partials;
        this._partialCount = this._partials.length;
        if (partials.length) {
            this.type = "custom";
        }
    }
    get phase() {
        return this._phase * (180 / Math.PI);
    }
    set phase(phase) {
        this._phase = phase * Math.PI / 180;
        // reset the type
        this.type = this._type;
    }
    asArray(length = 1024) {
        return __awaiter(this, void 0, void 0, function* () {
            return generateWaveform(this, length);
        });
    }
    dispose() {
        super.dispose();
        if (this._oscillator !== null) {
            this._oscillator.dispose();
        }
        this._wave = undefined;
        this.frequency.dispose();
        this.detune.dispose();
        return this;
    }
}
/**
 * Cache the periodic waves to avoid having to redo computations
 */
Oscillator._periodicWaveCache = [];

/**
 * A signal operator has an input and output and modifies the signal.
 */
class SignalOperator extends ToneAudioNode {
    constructor() {
        super(Object.assign(optionsFromArguments(SignalOperator.getDefaults(), arguments, ["context"])));
    }
    connect(destination, outputNum = 0, inputNum = 0) {
        connectSignal(this, destination, outputNum, inputNum);
        return this;
    }
}

/**
 * Wraps the native Web Audio API
 * [WaveShaperNode](http://webaudio.github.io/web-audio-api/#the-waveshapernode-interface).
 *
 * @example
 * const osc = new Tone.Oscillator().toDestination().start();
 * // multiply the output of the signal by 2 using the waveshaper's function
 * const timesTwo = new Tone.WaveShaper((val) => val * 2, 2048).connect(osc.frequency);
 * const signal = new Tone.Signal(440).connect(timesTwo);
 * @category Signal
 */
class WaveShaper extends SignalOperator {
    constructor() {
        super(Object.assign(optionsFromArguments(WaveShaper.getDefaults(), arguments, ["mapping", "length"])));
        this.name = "WaveShaper";
        /**
         * the waveshaper node
         */
        this._shaper = this.context.createWaveShaper();
        /**
         * The input to the waveshaper node.
         */
        this.input = this._shaper;
        /**
         * The output from the waveshaper node
         */
        this.output = this._shaper;
        const options = optionsFromArguments(WaveShaper.getDefaults(), arguments, ["mapping", "length"]);
        if (isArray(options.mapping) || options.mapping instanceof Float32Array) {
            this.curve = Float32Array.from(options.mapping);
        }
        else if (isFunction(options.mapping)) {
            this.setMap(options.mapping, options.length);
        }
    }
    static getDefaults() {
        return Object.assign(Signal.getDefaults(), {
            length: 1024,
        });
    }
    /**
     * Uses a mapping function to set the value of the curve.
     * @param mapping The function used to define the values.
     *                The mapping function take two arguments:
     *                the first is the value at the current position
     *                which goes from -1 to 1 over the number of elements
     *                in the curve array. The second argument is the array position.
     * @example
     * const shaper = new Tone.WaveShaper();
     * // map the input signal from [-1, 1] to [0, 10]
     * shaper.setMap((val, index) => (val + 1) * 5);
     */
    setMap(mapping, length = 1024) {
        const array = new Float32Array(length);
        for (let i = 0, len = length; i < len; i++) {
            const normalized = (i / (len - 1)) * 2 - 1;
            array[i] = mapping(normalized, i);
        }
        this.curve = array;
        return this;
    }
    /**
     * The array to set as the waveshaper curve. For linear curves
     * array length does not make much difference, but for complex curves
     * longer arrays will provide smoother interpolation.
     */
    get curve() {
        return this._shaper.curve;
    }
    set curve(mapping) {
        this._shaper.curve = mapping;
    }
    /**
     * Specifies what type of oversampling (if any) should be used when
     * applying the shaping curve. Can either be "none", "2x" or "4x".
     */
    get oversample() {
        return this._shaper.oversample;
    }
    set oversample(oversampling) {
        const isOverSampleType = ["none", "2x", "4x"].some(str => str.includes(oversampling));
        assert(isOverSampleType, "oversampling must be either 'none', '2x', or '4x'");
        this._shaper.oversample = oversampling;
    }
    /**
     * Clean up.
     */
    dispose() {
        super.dispose();
        this._shaper.disconnect();
        return this;
    }
}

/**
 * AudioToGain converts an input in AudioRange [-1,1] to NormalRange [0,1].
 * See [[GainToAudio]].
 * @category Signal
 */
class AudioToGain extends SignalOperator {
    constructor() {
        super(...arguments);
        this.name = "AudioToGain";
        /**
         * The node which converts the audio ranges
         */
        this._norm = new WaveShaper({
            context: this.context,
            mapping: x => (x + 1) / 2,
        });
        /**
         * The AudioRange input [-1, 1]
         */
        this.input = this._norm;
        /**
         * The GainRange output [0, 1]
         */
        this.output = this._norm;
    }
    /**
     * clean up
     */
    dispose() {
        super.dispose();
        this._norm.dispose();
        return this;
    }
}

/**
 * Multiply two incoming signals. Or, if a number is given in the constructor,
 * multiplies the incoming signal by that value.
 *
 * @example
 * // multiply two signals
 * const mult = new Tone.Multiply();
 * const sigA = new Tone.Signal(3);
 * const sigB = new Tone.Signal(4);
 * sigA.connect(mult);
 * sigB.connect(mult.factor);
 * // output of mult is 12.
 * @example
 * // multiply a signal and a number
 * const mult = new Tone.Multiply(10);
 * const sig = new Tone.Signal(2).connect(mult);
 * // the output of mult is 20.
 * @category Signal
 */
class Multiply extends Signal {
    constructor() {
        super(Object.assign(optionsFromArguments(Multiply.getDefaults(), arguments, ["value"])));
        this.name = "Multiply";
        /**
         * Indicates if the value should be overridden on connection
         */
        this.override = false;
        const options = optionsFromArguments(Multiply.getDefaults(), arguments, ["value"]);
        this._mult = this.input = this.output = new Gain({
            context: this.context,
            minValue: options.minValue,
            maxValue: options.maxValue,
        });
        this.factor = this._param = this._mult.gain;
        this.factor.setValueAtTime(options.value, 0);
    }
    static getDefaults() {
        return Object.assign(Signal.getDefaults(), {
            value: 0,
        });
    }
    dispose() {
        super.dispose();
        this._mult.dispose();
        return this;
    }
}

/**
 * An amplitude modulated oscillator node. It is implemented with
 * two oscillators, one which modulators the other's amplitude
 * through a gain node.
 * ```
 *    +-------------+       +----------+
 *    | Carrier Osc +>------> GainNode |
 *    +-------------+       |          +--->Output
 *                      +---> gain     |
 * +---------------+    |   +----------+
 * | Modulator Osc +>---+
 * +---------------+
 * ```
 * @example
 * return Tone.Offline(() => {
 * 	const amOsc = new Tone.AMOscillator(30, "sine", "square").toDestination().start();
 * }, 0.2, 1);
 * @category Source
 */
class AMOscillator extends Source {
    constructor() {
        super(optionsFromArguments(AMOscillator.getDefaults(), arguments, ["frequency", "type", "modulationType"]));
        this.name = "AMOscillator";
        /**
         * convert the -1,1 output to 0,1
         */
        this._modulationScale = new AudioToGain({ context: this.context });
        /**
         * the node where the modulation happens
         */
        this._modulationNode = new Gain({
            context: this.context,
        });
        const options = optionsFromArguments(AMOscillator.getDefaults(), arguments, ["frequency", "type", "modulationType"]);
        this._carrier = new Oscillator({
            context: this.context,
            detune: options.detune,
            frequency: options.frequency,
            onstop: () => this.onstop(this),
            phase: options.phase,
            type: options.type,
        });
        this.frequency = this._carrier.frequency,
            this.detune = this._carrier.detune;
        this._modulator = new Oscillator({
            context: this.context,
            phase: options.phase,
            type: options.modulationType,
        });
        this.harmonicity = new Multiply({
            context: this.context,
            units: "positive",
            value: options.harmonicity,
        });
        // connections
        this.frequency.chain(this.harmonicity, this._modulator.frequency);
        this._modulator.chain(this._modulationScale, this._modulationNode.gain);
        this._carrier.chain(this._modulationNode, this.output);
        readOnly(this, ["frequency", "detune", "harmonicity"]);
    }
    static getDefaults() {
        return Object.assign(Oscillator.getDefaults(), {
            harmonicity: 1,
            modulationType: "square",
        });
    }
    /**
     * start the oscillator
     */
    _start(time) {
        this._modulator.start(time);
        this._carrier.start(time);
    }
    /**
     * stop the oscillator
     */
    _stop(time) {
        this._modulator.stop(time);
        this._carrier.stop(time);
    }
    _restart(time) {
        this._modulator.restart(time);
        this._carrier.restart(time);
    }
    /**
     * The type of the carrier oscillator
     */
    get type() {
        return this._carrier.type;
    }
    set type(type) {
        this._carrier.type = type;
    }
    get baseType() {
        return this._carrier.baseType;
    }
    set baseType(baseType) {
        this._carrier.baseType = baseType;
    }
    get partialCount() {
        return this._carrier.partialCount;
    }
    set partialCount(partialCount) {
        this._carrier.partialCount = partialCount;
    }
    /**
     * The type of the modulator oscillator
     */
    get modulationType() {
        return this._modulator.type;
    }
    set modulationType(type) {
        this._modulator.type = type;
    }
    get phase() {
        return this._carrier.phase;
    }
    set phase(phase) {
        this._carrier.phase = phase;
        this._modulator.phase = phase;
    }
    get partials() {
        return this._carrier.partials;
    }
    set partials(partials) {
        this._carrier.partials = partials;
    }
    asArray(length = 1024) {
        return __awaiter(this, void 0, void 0, function* () {
            return generateWaveform(this, length);
        });
    }
    /**
     * Clean up.
     */
    dispose() {
        super.dispose();
        this.frequency.dispose();
        this.detune.dispose();
        this.harmonicity.dispose();
        this._carrier.dispose();
        this._modulator.dispose();
        this._modulationNode.dispose();
        this._modulationScale.dispose();
        return this;
    }
}

/**
 * FMOscillator implements a frequency modulation synthesis
 * ```
 *                                              +-------------+
 * +---------------+        +-------------+     | Carrier Osc |
 * | Modulator Osc +>-------> GainNode    |     |             +--->Output
 * +---------------+        |             +>----> frequency   |
 *                       +--> gain        |     +-------------+
 *                       |  +-------------+
 * +-----------------+   |
 * | modulationIndex +>--+
 * +-----------------+
 * ```
 *
 * @example
 * return Tone.Offline(() => {
 * 	const fmOsc = new Tone.FMOscillator({
 * 		frequency: 200,
 * 		type: "square",
 * 		modulationType: "triangle",
 * 		harmonicity: 0.2,
 * 		modulationIndex: 3
 * 	}).toDestination().start();
 * }, 0.1, 1);
 * @category Source
 */
class FMOscillator extends Source {
    constructor() {
        super(optionsFromArguments(FMOscillator.getDefaults(), arguments, ["frequency", "type", "modulationType"]));
        this.name = "FMOscillator";
        /**
         * the node where the modulation happens
         */
        this._modulationNode = new Gain({
            context: this.context,
            gain: 0,
        });
        const options = optionsFromArguments(FMOscillator.getDefaults(), arguments, ["frequency", "type", "modulationType"]);
        this._carrier = new Oscillator({
            context: this.context,
            detune: options.detune,
            frequency: 0,
            onstop: () => this.onstop(this),
            phase: options.phase,
            type: options.type,
        });
        this.detune = this._carrier.detune;
        this.frequency = new Signal({
            context: this.context,
            units: "frequency",
            value: options.frequency,
        });
        this._modulator = new Oscillator({
            context: this.context,
            phase: options.phase,
            type: options.modulationType,
        });
        this.harmonicity = new Multiply({
            context: this.context,
            units: "positive",
            value: options.harmonicity,
        });
        this.modulationIndex = new Multiply({
            context: this.context,
            units: "positive",
            value: options.modulationIndex,
        });
        // connections
        this.frequency.connect(this._carrier.frequency);
        this.frequency.chain(this.harmonicity, this._modulator.frequency);
        this.frequency.chain(this.modulationIndex, this._modulationNode);
        this._modulator.connect(this._modulationNode.gain);
        this._modulationNode.connect(this._carrier.frequency);
        this._carrier.connect(this.output);
        this.detune.connect(this._modulator.detune);
        readOnly(this, ["modulationIndex", "frequency", "detune", "harmonicity"]);
    }
    static getDefaults() {
        return Object.assign(Oscillator.getDefaults(), {
            harmonicity: 1,
            modulationIndex: 2,
            modulationType: "square",
        });
    }
    /**
     * start the oscillator
     */
    _start(time) {
        this._modulator.start(time);
        this._carrier.start(time);
    }
    /**
     * stop the oscillator
     */
    _stop(time) {
        this._modulator.stop(time);
        this._carrier.stop(time);
    }
    _restart(time) {
        this._modulator.restart(time);
        this._carrier.restart(time);
        return this;
    }
    get type() {
        return this._carrier.type;
    }
    set type(type) {
        this._carrier.type = type;
    }
    get baseType() {
        return this._carrier.baseType;
    }
    set baseType(baseType) {
        this._carrier.baseType = baseType;
    }
    get partialCount() {
        return this._carrier.partialCount;
    }
    set partialCount(partialCount) {
        this._carrier.partialCount = partialCount;
    }
    /**
     * The type of the modulator oscillator
     */
    get modulationType() {
        return this._modulator.type;
    }
    set modulationType(type) {
        this._modulator.type = type;
    }
    get phase() {
        return this._carrier.phase;
    }
    set phase(phase) {
        this._carrier.phase = phase;
        this._modulator.phase = phase;
    }
    get partials() {
        return this._carrier.partials;
    }
    set partials(partials) {
        this._carrier.partials = partials;
    }
    asArray(length = 1024) {
        return __awaiter(this, void 0, void 0, function* () {
            return generateWaveform(this, length);
        });
    }
    /**
     * Clean up.
     */
    dispose() {
        super.dispose();
        this.frequency.dispose();
        this.harmonicity.dispose();
        this._carrier.dispose();
        this._modulator.dispose();
        this._modulationNode.dispose();
        this.modulationIndex.dispose();
        return this;
    }
}

/**
 * PulseOscillator is an oscillator with control over pulse width,
 * also known as the duty cycle. At 50% duty cycle (width = 0) the wave is
 * a square wave.
 * [Read more](https://wigglewave.wordpress.com/2014/08/16/pulse-waveforms-and-harmonics/).
 * ```
 *    width = -0.25        width = 0.0          width = 0.25
 *
 *   +-----+            +-------+       +    +-------+     +-+
 *   |     |            |       |       |            |     |
 *   |     |            |       |       |            |     |
 * +-+     +-------+    +       +-------+            +-----+
 *
 *
 *    width = -0.5                              width = 0.5
 *
 *     +---+                                 +-------+   +---+
 *     |   |                                         |   |
 *     |   |                                         |   |
 * +---+   +-------+                                 +---+
 *
 *
 *    width = -0.75                             width = 0.75
 *
 *       +-+                                 +-------+ +-----+
 *       | |                                         | |
 *       | |                                         | |
 * +-----+ +-------+                                 +-+
 * ```
 * @example
 * return Tone.Offline(() => {
 * 	const pulse = new Tone.PulseOscillator(50, 0.4).toDestination().start();
 * }, 0.1, 1);
 * @category Source
 */
class PulseOscillator extends Source {
    constructor() {
        super(optionsFromArguments(PulseOscillator.getDefaults(), arguments, ["frequency", "width"]));
        this.name = "PulseOscillator";
        /**
         * gate the width amount
         */
        this._widthGate = new Gain({
            context: this.context,
            gain: 0,
        });
        /**
         * Threshold the signal to turn it into a square
         */
        this._thresh = new WaveShaper({
            context: this.context,
            mapping: val => val <= 0 ? -1 : 1,
        });
        const options = optionsFromArguments(PulseOscillator.getDefaults(), arguments, ["frequency", "width"]);
        this.width = new Signal({
            context: this.context,
            units: "audioRange",
            value: options.width,
        });
        this._triangle = new Oscillator({
            context: this.context,
            detune: options.detune,
            frequency: options.frequency,
            onstop: () => this.onstop(this),
            phase: options.phase,
            type: "triangle",
        });
        this.frequency = this._triangle.frequency;
        this.detune = this._triangle.detune;
        // connections
        this._triangle.chain(this._thresh, this.output);
        this.width.chain(this._widthGate, this._thresh);
        readOnly(this, ["width", "frequency", "detune"]);
    }
    static getDefaults() {
        return Object.assign(Source.getDefaults(), {
            detune: 0,
            frequency: 440,
            phase: 0,
            type: "pulse",
            width: 0.2,
        });
    }
    /**
     * start the oscillator
     */
    _start(time) {
        time = this.toSeconds(time);
        this._triangle.start(time);
        this._widthGate.gain.setValueAtTime(1, time);
    }
    /**
     * stop the oscillator
     */
    _stop(time) {
        time = this.toSeconds(time);
        this._triangle.stop(time);
        // the width is still connected to the output.
        // that needs to be stopped also
        this._widthGate.gain.cancelScheduledValues(time);
        this._widthGate.gain.setValueAtTime(0, time);
    }
    _restart(time) {
        this._triangle.restart(time);
        this._widthGate.gain.cancelScheduledValues(time);
        this._widthGate.gain.setValueAtTime(1, time);
    }
    /**
     * The phase of the oscillator in degrees.
     */
    get phase() {
        return this._triangle.phase;
    }
    set phase(phase) {
        this._triangle.phase = phase;
    }
    /**
     * The type of the oscillator. Always returns "pulse".
     */
    get type() {
        return "pulse";
    }
    /**
     * The baseType of the oscillator. Always returns "pulse".
     */
    get baseType() {
        return "pulse";
    }
    /**
     * The partials of the waveform. Cannot set partials for this waveform type
     */
    get partials() {
        return [];
    }
    /**
     * No partials for this waveform type.
     */
    get partialCount() {
        return 0;
    }
    /**
     * *Internal use* The carrier oscillator type is fed through the
     * waveshaper node to create the pulse. Using different carrier oscillators
     * changes oscillator's behavior.
     */
    set carrierType(type) {
        this._triangle.type = type;
    }
    asArray(length = 1024) {
        return __awaiter(this, void 0, void 0, function* () {
            return generateWaveform(this, length);
        });
    }
    /**
     * Clean up method.
     */
    dispose() {
        super.dispose();
        this._triangle.dispose();
        this.width.dispose();
        this._widthGate.dispose();
        this._thresh.dispose();
        return this;
    }
}

/**
 * FatOscillator is an array of oscillators with detune spread between the oscillators
 * @example
 * const fatOsc = new Tone.FatOscillator("Ab3", "sawtooth", 40).toDestination().start();
 * @category Source
 */
class FatOscillator extends Source {
    constructor() {
        super(optionsFromArguments(FatOscillator.getDefaults(), arguments, ["frequency", "type", "spread"]));
        this.name = "FatOscillator";
        /**
         * The array of oscillators
         */
        this._oscillators = [];
        const options = optionsFromArguments(FatOscillator.getDefaults(), arguments, ["frequency", "type", "spread"]);
        this.frequency = new Signal({
            context: this.context,
            units: "frequency",
            value: options.frequency,
        });
        this.detune = new Signal({
            context: this.context,
            units: "cents",
            value: options.detune,
        });
        this._spread = options.spread;
        this._type = options.type;
        this._phase = options.phase;
        this._partials = options.partials;
        this._partialCount = options.partialCount;
        // set the count initially
        this.count = options.count;
        readOnly(this, ["frequency", "detune"]);
    }
    static getDefaults() {
        return Object.assign(Oscillator.getDefaults(), {
            count: 3,
            spread: 20,
            type: "sawtooth",
        });
    }
    /**
     * start the oscillator
     */
    _start(time) {
        time = this.toSeconds(time);
        this._forEach(osc => osc.start(time));
    }
    /**
     * stop the oscillator
     */
    _stop(time) {
        time = this.toSeconds(time);
        this._forEach(osc => osc.stop(time));
    }
    _restart(time) {
        this._forEach(osc => osc.restart(time));
    }
    /**
     * Iterate over all of the oscillators
     */
    _forEach(iterator) {
        for (let i = 0; i < this._oscillators.length; i++) {
            iterator(this._oscillators[i], i);
        }
    }
    /**
     * The type of the oscillator
     */
    get type() {
        return this._type;
    }
    set type(type) {
        this._type = type;
        this._forEach(osc => osc.type = type);
    }
    /**
     * The detune spread between the oscillators. If "count" is
     * set to 3 oscillators and the "spread" is set to 40,
     * the three oscillators would be detuned like this: [-20, 0, 20]
     * for a total detune spread of 40 cents.
     * @example
     * const fatOsc = new Tone.FatOscillator().toDestination().start();
     * fatOsc.spread = 70;
     */
    get spread() {
        return this._spread;
    }
    set spread(spread) {
        this._spread = spread;
        if (this._oscillators.length > 1) {
            const start = -spread / 2;
            const step = spread / (this._oscillators.length - 1);
            this._forEach((osc, i) => osc.detune.value = start + step * i);
        }
    }
    /**
     * The number of detuned oscillators. Must be an integer greater than 1.
     * @example
     * const fatOsc = new Tone.FatOscillator("C#3", "sawtooth").toDestination().start();
     * // use 4 sawtooth oscillators
     * fatOsc.count = 4;
     */
    get count() {
        return this._oscillators.length;
    }
    set count(count) {
        assertRange(count, 1);
        if (this._oscillators.length !== count) {
            // dispose the previous oscillators
            this._forEach(osc => osc.dispose());
            this._oscillators = [];
            for (let i = 0; i < count; i++) {
                const osc = new Oscillator({
                    context: this.context,
                    volume: -6 - count * 1.1,
                    type: this._type,
                    phase: this._phase + (i / count) * 360,
                    partialCount: this._partialCount,
                    onstop: i === 0 ? () => this.onstop(this) : noOp,
                });
                if (this.type === "custom") {
                    osc.partials = this._partials;
                }
                this.frequency.connect(osc.frequency);
                this.detune.connect(osc.detune);
                osc.detune.overridden = false;
                osc.connect(this.output);
                this._oscillators[i] = osc;
            }
            // set the spread
            this.spread = this._spread;
            if (this.state === "started") {
                this._forEach(osc => osc.start());
            }
        }
    }
    get phase() {
        return this._phase;
    }
    set phase(phase) {
        this._phase = phase;
        this._forEach((osc, i) => osc.phase = this._phase + (i / this.count) * 360);
    }
    get baseType() {
        return this._oscillators[0].baseType;
    }
    set baseType(baseType) {
        this._forEach(osc => osc.baseType = baseType);
        this._type = this._oscillators[0].type;
    }
    get partials() {
        return this._oscillators[0].partials;
    }
    set partials(partials) {
        this._partials = partials;
        this._partialCount = this._partials.length;
        if (partials.length) {
            this._type = "custom";
            this._forEach(osc => osc.partials = partials);
        }
    }
    get partialCount() {
        return this._oscillators[0].partialCount;
    }
    set partialCount(partialCount) {
        this._partialCount = partialCount;
        this._forEach(osc => osc.partialCount = partialCount);
        this._type = this._oscillators[0].type;
    }
    asArray(length = 1024) {
        return __awaiter(this, void 0, void 0, function* () {
            return generateWaveform(this, length);
        });
    }
    /**
     * Clean up.
     */
    dispose() {
        super.dispose();
        this.frequency.dispose();
        this.detune.dispose();
        this._forEach(osc => osc.dispose());
        return this;
    }
}

/**
 * PWMOscillator modulates the width of a Tone.PulseOscillator
 * at the modulationFrequency. This has the effect of continuously
 * changing the timbre of the oscillator by altering the harmonics
 * generated.
 * @example
 * return Tone.Offline(() => {
 * 	const pwm = new Tone.PWMOscillator(60, 0.3).toDestination().start();
 * }, 0.1, 1);
 * @category Source
 */
class PWMOscillator extends Source {
    constructor() {
        super(optionsFromArguments(PWMOscillator.getDefaults(), arguments, ["frequency", "modulationFrequency"]));
        this.name = "PWMOscillator";
        this.sourceType = "pwm";
        /**
         * Scale the oscillator so it doesn't go silent
         * at the extreme values.
         */
        this._scale = new Multiply({
            context: this.context,
            value: 2,
        });
        const options = optionsFromArguments(PWMOscillator.getDefaults(), arguments, ["frequency", "modulationFrequency"]);
        this._pulse = new PulseOscillator({
            context: this.context,
            frequency: options.modulationFrequency,
        });
        // change the pulse oscillator type
        this._pulse.carrierType = "sine";
        this.modulationFrequency = this._pulse.frequency;
        this._modulator = new Oscillator({
            context: this.context,
            detune: options.detune,
            frequency: options.frequency,
            onstop: () => this.onstop(this),
            phase: options.phase,
        });
        this.frequency = this._modulator.frequency;
        this.detune = this._modulator.detune;
        // connections
        this._modulator.chain(this._scale, this._pulse.width);
        this._pulse.connect(this.output);
        readOnly(this, ["modulationFrequency", "frequency", "detune"]);
    }
    static getDefaults() {
        return Object.assign(Source.getDefaults(), {
            detune: 0,
            frequency: 440,
            modulationFrequency: 0.4,
            phase: 0,
            type: "pwm",
        });
    }
    /**
     * start the oscillator
     */
    _start(time) {
        time = this.toSeconds(time);
        this._modulator.start(time);
        this._pulse.start(time);
    }
    /**
     * stop the oscillator
     */
    _stop(time) {
        time = this.toSeconds(time);
        this._modulator.stop(time);
        this._pulse.stop(time);
    }
    /**
     * restart the oscillator
     */
    _restart(time) {
        this._modulator.restart(time);
        this._pulse.restart(time);
    }
    /**
     * The type of the oscillator. Always returns "pwm".
     */
    get type() {
        return "pwm";
    }
    /**
     * The baseType of the oscillator. Always returns "pwm".
     */
    get baseType() {
        return "pwm";
    }
    /**
     * The partials of the waveform. Cannot set partials for this waveform type
     */
    get partials() {
        return [];
    }
    /**
     * No partials for this waveform type.
     */
    get partialCount() {
        return 0;
    }
    /**
     * The phase of the oscillator in degrees.
     */
    get phase() {
        return this._modulator.phase;
    }
    set phase(phase) {
        this._modulator.phase = phase;
    }
    asArray(length = 1024) {
        return __awaiter(this, void 0, void 0, function* () {
            return generateWaveform(this, length);
        });
    }
    /**
     * Clean up.
     */
    dispose() {
        super.dispose();
        this._pulse.dispose();
        this._scale.dispose();
        this._modulator.dispose();
        return this;
    }
}

const OmniOscillatorSourceMap = {
    am: AMOscillator,
    fat: FatOscillator,
    fm: FMOscillator,
    oscillator: Oscillator,
    pulse: PulseOscillator,
    pwm: PWMOscillator,
};
/**
 * OmniOscillator aggregates all of the oscillator types into one.
 * @example
 * return Tone.Offline(() => {
 * 	const omniOsc = new Tone.OmniOscillator("C#4", "pwm").toDestination().start();
 * }, 0.1, 1);
 * @category Source
 */
class OmniOscillator extends Source {
    constructor() {
        super(optionsFromArguments(OmniOscillator.getDefaults(), arguments, ["frequency", "type"]));
        this.name = "OmniOscillator";
        const options = optionsFromArguments(OmniOscillator.getDefaults(), arguments, ["frequency", "type"]);
        this.frequency = new Signal({
            context: this.context,
            units: "frequency",
            value: options.frequency,
        });
        this.detune = new Signal({
            context: this.context,
            units: "cents",
            value: options.detune,
        });
        readOnly(this, ["frequency", "detune"]);
        // set the options
        this.set(options);
    }
    static getDefaults() {
        return Object.assign(Oscillator.getDefaults(), FMOscillator.getDefaults(), AMOscillator.getDefaults(), FatOscillator.getDefaults(), PulseOscillator.getDefaults(), PWMOscillator.getDefaults());
    }
    /**
     * start the oscillator
     */
    _start(time) {
        this._oscillator.start(time);
    }
    /**
     * start the oscillator
     */
    _stop(time) {
        this._oscillator.stop(time);
    }
    _restart(time) {
        this._oscillator.restart(time);
        return this;
    }
    /**
     * The type of the oscillator. Can be any of the basic types: sine, square, triangle, sawtooth. Or
     * prefix the basic types with "fm", "am", or "fat" to use the FMOscillator, AMOscillator or FatOscillator
     * types. The oscillator could also be set to "pwm" or "pulse". All of the parameters of the
     * oscillator's class are accessible when the oscillator is set to that type, but throws an error
     * when it's not.
     * @example
     * const omniOsc = new Tone.OmniOscillator().toDestination().start();
     * omniOsc.type = "pwm";
     * // modulationFrequency is parameter which is available
     * // only when the type is "pwm".
     * omniOsc.modulationFrequency.value = 0.5;
     */
    get type() {
        let prefix = "";
        if (["am", "fm", "fat"].some(p => this._sourceType === p)) {
            prefix = this._sourceType;
        }
        return prefix + this._oscillator.type;
    }
    set type(type) {
        if (type.substr(0, 2) === "fm") {
            this._createNewOscillator("fm");
            this._oscillator = this._oscillator;
            this._oscillator.type = type.substr(2);
        }
        else if (type.substr(0, 2) === "am") {
            this._createNewOscillator("am");
            this._oscillator = this._oscillator;
            this._oscillator.type = type.substr(2);
        }
        else if (type.substr(0, 3) === "fat") {
            this._createNewOscillator("fat");
            this._oscillator = this._oscillator;
            this._oscillator.type = type.substr(3);
        }
        else if (type === "pwm") {
            this._createNewOscillator("pwm");
            this._oscillator = this._oscillator;
        }
        else if (type === "pulse") {
            this._createNewOscillator("pulse");
        }
        else {
            this._createNewOscillator("oscillator");
            this._oscillator = this._oscillator;
            this._oscillator.type = type;
        }
    }
    /**
     * The value is an empty array when the type is not "custom".
     * This is not available on "pwm" and "pulse" oscillator types.
     * See [[Oscillator.partials]]
     */
    get partials() {
        return this._oscillator.partials;
    }
    set partials(partials) {
        if (!this._getOscType(this._oscillator, "pulse") && !this._getOscType(this._oscillator, "pwm")) {
            this._oscillator.partials = partials;
        }
    }
    get partialCount() {
        return this._oscillator.partialCount;
    }
    set partialCount(partialCount) {
        if (!this._getOscType(this._oscillator, "pulse") && !this._getOscType(this._oscillator, "pwm")) {
            this._oscillator.partialCount = partialCount;
        }
    }
    set(props) {
        // make sure the type is set first
        if (Reflect.has(props, "type") && props.type) {
            this.type = props.type;
        }
        // then set the rest
        super.set(props);
        return this;
    }
    /**
     * connect the oscillator to the frequency and detune signals
     */
    _createNewOscillator(oscType) {
        if (oscType !== this._sourceType) {
            this._sourceType = oscType;
            const OscConstructor = OmniOscillatorSourceMap[oscType];
            // short delay to avoid clicks on the change
            const now = this.now();
            if (this._oscillator) {
                const oldOsc = this._oscillator;
                oldOsc.stop(now);
                // dispose the old one
                this.context.setTimeout(() => oldOsc.dispose(), this.blockTime);
            }
            this._oscillator = new OscConstructor({
                context: this.context,
            });
            this.frequency.connect(this._oscillator.frequency);
            this.detune.connect(this._oscillator.detune);
            this._oscillator.connect(this.output);
            this._oscillator.onstop = () => this.onstop(this);
            if (this.state === "started") {
                this._oscillator.start(now);
            }
        }
    }
    get phase() {
        return this._oscillator.phase;
    }
    set phase(phase) {
        this._oscillator.phase = phase;
    }
    /**
     * The source type of the oscillator.
     * @example
     * const omniOsc = new Tone.OmniOscillator(440, "fmsquare");
     * console.log(omniOsc.sourceType); // 'fm'
     */
    get sourceType() {
        return this._sourceType;
    }
    set sourceType(sType) {
        // the basetype defaults to sine
        let baseType = "sine";
        if (this._oscillator.type !== "pwm" && this._oscillator.type !== "pulse") {
            baseType = this._oscillator.type;
        }
        // set the type
        if (sType === "fm") {
            this.type = "fm" + baseType;
        }
        else if (sType === "am") {
            this.type = "am" + baseType;
        }
        else if (sType === "fat") {
            this.type = "fat" + baseType;
        }
        else if (sType === "oscillator") {
            this.type = baseType;
        }
        else if (sType === "pulse") {
            this.type = "pulse";
        }
        else if (sType === "pwm") {
            this.type = "pwm";
        }
    }
    _getOscType(osc, sourceType) {
        return osc instanceof OmniOscillatorSourceMap[sourceType];
    }
    /**
     * The base type of the oscillator. See [[Oscillator.baseType]]
     * @example
     * const omniOsc = new Tone.OmniOscillator(440, "fmsquare4");
     * console.log(omniOsc.sourceType, omniOsc.baseType, omniOsc.partialCount);
     */
    get baseType() {
        return this._oscillator.baseType;
    }
    set baseType(baseType) {
        if (!this._getOscType(this._oscillator, "pulse") &&
            !this._getOscType(this._oscillator, "pwm") &&
            baseType !== "pulse" && baseType !== "pwm") {
            this._oscillator.baseType = baseType;
        }
    }
    /**
     * The width of the oscillator when sourceType === "pulse".
     * See [[PWMOscillator.width]]
     */
    get width() {
        if (this._getOscType(this._oscillator, "pulse")) {
            return this._oscillator.width;
        }
        else {
            return undefined;
        }
    }
    /**
     * The number of detuned oscillators when sourceType === "fat".
     * See [[FatOscillator.count]]
     */
    get count() {
        if (this._getOscType(this._oscillator, "fat")) {
            return this._oscillator.count;
        }
        else {
            return undefined;
        }
    }
    set count(count) {
        if (this._getOscType(this._oscillator, "fat") && isNumber(count)) {
            this._oscillator.count = count;
        }
    }
    /**
     * The detune spread between the oscillators when sourceType === "fat".
     * See [[FatOscillator.count]]
     */
    get spread() {
        if (this._getOscType(this._oscillator, "fat")) {
            return this._oscillator.spread;
        }
        else {
            return undefined;
        }
    }
    set spread(spread) {
        if (this._getOscType(this._oscillator, "fat") && isNumber(spread)) {
            this._oscillator.spread = spread;
        }
    }
    /**
     * The type of the modulator oscillator. Only if the oscillator is set to "am" or "fm" types.
     * See [[AMOscillator]] or [[FMOscillator]]
     */
    get modulationType() {
        if (this._getOscType(this._oscillator, "fm") || this._getOscType(this._oscillator, "am")) {
            return this._oscillator.modulationType;
        }
        else {
            return undefined;
        }
    }
    set modulationType(mType) {
        if ((this._getOscType(this._oscillator, "fm") || this._getOscType(this._oscillator, "am")) && isString(mType)) {
            this._oscillator.modulationType = mType;
        }
    }
    /**
     * The modulation index when the sourceType === "fm"
     * See [[FMOscillator]].
     */
    get modulationIndex() {
        if (this._getOscType(this._oscillator, "fm")) {
            return this._oscillator.modulationIndex;
        }
        else {
            return undefined;
        }
    }
    /**
     * Harmonicity is the frequency ratio between the carrier and the modulator oscillators.
     * See [[AMOscillator]] or [[FMOscillator]]
     */
    get harmonicity() {
        if (this._getOscType(this._oscillator, "fm") || this._getOscType(this._oscillator, "am")) {
            return this._oscillator.harmonicity;
        }
        else {
            return undefined;
        }
    }
    /**
     * The modulationFrequency Signal of the oscillator when sourceType === "pwm"
     * see [[PWMOscillator]]
     * @min 0.1
     * @max 5
     */
    get modulationFrequency() {
        if (this._getOscType(this._oscillator, "pwm")) {
            return this._oscillator.modulationFrequency;
        }
        else {
            return undefined;
        }
    }
    asArray(length = 1024) {
        return __awaiter(this, void 0, void 0, function* () {
            return generateWaveform(this, length);
        });
    }
    dispose() {
        super.dispose();
        this.detune.dispose();
        this.frequency.dispose();
        this._oscillator.dispose();
        return this;
    }
}

/**
 * Assert that the number is in the given range.
 */
function range(min, max = Infinity) {
    const valueMap = new WeakMap();
    return function (target, propertyKey) {
        Reflect.defineProperty(target, propertyKey, {
            configurable: true,
            enumerable: true,
            get: function () {
                return valueMap.get(this);
            },
            set: function (newValue) {
                assertRange(newValue, min, max);
                valueMap.set(this, newValue);
            }
        });
    };
}
/**
 * Convert the time to seconds and assert that the time is in between the two
 * values when being set.
 */
function timeRange(min, max = Infinity) {
    const valueMap = new WeakMap();
    return function (target, propertyKey) {
        Reflect.defineProperty(target, propertyKey, {
            configurable: true,
            enumerable: true,
            get: function () {
                return valueMap.get(this);
            },
            set: function (newValue) {
                assertRange(this.toSeconds(newValue), min, max);
                valueMap.set(this, newValue);
            }
        });
    };
}

/**
 * Player is an audio file player with start, loop, and stop functions.
 * @example
 * const player = new Tone.Player("https://tonejs.github.io/audio/berklee/gong_1.mp3").toDestination();
 * // play as soon as the buffer is loaded
 * player.autostart = true;
 * @category Source
 */
class Player extends Source {
    constructor() {
        super(optionsFromArguments(Player.getDefaults(), arguments, ["url", "onload"]));
        this.name = "Player";
        /**
         * All of the active buffer source nodes
         */
        this._activeSources = new Set();
        const options = optionsFromArguments(Player.getDefaults(), arguments, ["url", "onload"]);
        this._buffer = new ToneAudioBuffer({
            onload: this._onload.bind(this, options.onload),
            onerror: options.onerror,
            reverse: options.reverse,
            url: options.url,
        });
        this.autostart = options.autostart;
        this._loop = options.loop;
        this._loopStart = options.loopStart;
        this._loopEnd = options.loopEnd;
        this._playbackRate = options.playbackRate;
        this.fadeIn = options.fadeIn;
        this.fadeOut = options.fadeOut;
    }
    static getDefaults() {
        return Object.assign(Source.getDefaults(), {
            autostart: false,
            fadeIn: 0,
            fadeOut: 0,
            loop: false,
            loopEnd: 0,
            loopStart: 0,
            onload: noOp,
            onerror: noOp,
            playbackRate: 1,
            reverse: false,
        });
    }
    /**
     * Load the audio file as an audio buffer.
     * Decodes the audio asynchronously and invokes
     * the callback once the audio buffer loads.
     * Note: this does not need to be called if a url
     * was passed in to the constructor. Only use this
     * if you want to manually load a new url.
     * @param url The url of the buffer to load. Filetype support depends on the browser.
     */
    load(url) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._buffer.load(url);
            this._onload();
            return this;
        });
    }
    /**
     * Internal callback when the buffer is loaded.
     */
    _onload(callback = noOp) {
        callback();
        if (this.autostart) {
            this.start();
        }
    }
    /**
     * Internal callback when the buffer is done playing.
     */
    _onSourceEnd(source) {
        // invoke the onstop function
        this.onstop(this);
        // delete the source from the active sources
        this._activeSources.delete(source);
        if (this._activeSources.size === 0 && !this._synced &&
            this._state.getValueAtTime(this.now()) === "started") {
            // remove the 'implicitEnd' event and replace with an explicit end
            this._state.cancel(this.now());
            this._state.setStateAtTime("stopped", this.now());
        }
    }
    /**
     * Play the buffer at the given startTime. Optionally add an offset
     * and/or duration which will play the buffer from a position
     * within the buffer for the given duration.
     *
     * @param  time When the player should start.
     * @param  offset The offset from the beginning of the sample to start at.
     * @param  duration How long the sample should play. If no duration is given, it will default to the full length of the sample (minus any offset)
     */
    start(time, offset, duration) {
        super.start(time, offset, duration);
        return this;
    }
    /**
     * Internal start method
     */
    _start(startTime, offset, duration) {
        // if it's a loop the default offset is the loopStart point
        if (this._loop) {
            offset = defaultArg(offset, this._loopStart);
        }
        else {
            // otherwise the default offset is 0
            offset = defaultArg(offset, 0);
        }
        // compute the values in seconds
        const computedOffset = this.toSeconds(offset);
        // compute the duration which is either the passed in duration of the buffer.duration - offset
        const origDuration = duration;
        duration = defaultArg(duration, Math.max(this._buffer.duration - computedOffset, 0));
        let computedDuration = this.toSeconds(duration);
        // scale it by the playback rate
        computedDuration = computedDuration / this._playbackRate;
        // get the start time
        startTime = this.toSeconds(startTime);
        // make the source
        const source = new ToneBufferSource({
            url: this._buffer,
            context: this.context,
            fadeIn: this.fadeIn,
            fadeOut: this.fadeOut,
            loop: this._loop,
            loopEnd: this._loopEnd,
            loopStart: this._loopStart,
            onended: this._onSourceEnd.bind(this),
            playbackRate: this._playbackRate,
        }).connect(this.output);
        // set the looping properties
        if (!this._loop && !this._synced) {
            // cancel the previous stop
            this._state.cancel(startTime + computedDuration);
            // if it's not looping, set the state change at the end of the sample
            this._state.setStateAtTime("stopped", startTime + computedDuration, {
                implicitEnd: true,
            });
        }
        // add it to the array of active sources
        this._activeSources.add(source);
        // start it
        if (this._loop && isUndef(origDuration)) {
            source.start(startTime, computedOffset);
        }
        else {
            // subtract the fade out time
            source.start(startTime, computedOffset, computedDuration - this.toSeconds(this.fadeOut));
        }
    }
    /**
     * Stop playback.
     */
    _stop(time) {
        const computedTime = this.toSeconds(time);
        this._activeSources.forEach(source => source.stop(computedTime));
    }
    /**
     * Stop and then restart the player from the beginning (or offset)
     * @param  time When the player should start.
     * @param  offset The offset from the beginning of the sample to start at.
     * @param  duration How long the sample should play. If no duration is given,
     * 					it will default to the full length of the sample (minus any offset)
     */
    restart(time, offset, duration) {
        super.restart(time, offset, duration);
        return this;
    }
    _restart(time, offset, duration) {
        this._stop(time);
        this._start(time, offset, duration);
    }
    /**
     * Seek to a specific time in the player's buffer. If the
     * source is no longer playing at that time, it will stop.
     * @param offset The time to seek to.
     * @param when The time for the seek event to occur.
     * @example
     * const player = new Tone.Player("https://tonejs.github.io/audio/berklee/gurgling_theremin_1.mp3", () => {
     * 	player.start();
     * 	// seek to the offset in 1 second from now
     * 	player.seek(0.4, "+1");
     * }).toDestination();
     */
    seek(offset, when) {
        const computedTime = this.toSeconds(when);
        if (this._state.getValueAtTime(computedTime) === "started") {
            const computedOffset = this.toSeconds(offset);
            // if it's currently playing, stop it
            this._stop(computedTime);
            // restart it at the given time
            this._start(computedTime, computedOffset);
        }
        return this;
    }
    /**
     * Set the loop start and end. Will only loop if loop is set to true.
     * @param loopStart The loop start time
     * @param loopEnd The loop end time
     * @example
     * const player = new Tone.Player("https://tonejs.github.io/audio/berklee/malevoices_aa2_F3.mp3").toDestination();
     * // loop between the given points
     * player.setLoopPoints(0.2, 0.3);
     * player.loop = true;
     * player.autostart = true;
     */
    setLoopPoints(loopStart, loopEnd) {
        this.loopStart = loopStart;
        this.loopEnd = loopEnd;
        return this;
    }
    /**
     * If loop is true, the loop will start at this position.
     */
    get loopStart() {
        return this._loopStart;
    }
    set loopStart(loopStart) {
        this._loopStart = loopStart;
        if (this.buffer.loaded) {
            assertRange(this.toSeconds(loopStart), 0, this.buffer.duration);
        }
        // get the current source
        this._activeSources.forEach(source => {
            source.loopStart = loopStart;
        });
    }
    /**
     * If loop is true, the loop will end at this position.
     */
    get loopEnd() {
        return this._loopEnd;
    }
    set loopEnd(loopEnd) {
        this._loopEnd = loopEnd;
        if (this.buffer.loaded) {
            assertRange(this.toSeconds(loopEnd), 0, this.buffer.duration);
        }
        // get the current source
        this._activeSources.forEach(source => {
            source.loopEnd = loopEnd;
        });
    }
    /**
     * The audio buffer belonging to the player.
     */
    get buffer() {
        return this._buffer;
    }
    set buffer(buffer) {
        this._buffer.set(buffer);
    }
    /**
     * If the buffer should loop once it's over.
     * @example
     * const player = new Tone.Player("https://tonejs.github.io/audio/drum-samples/breakbeat.mp3").toDestination();
     * player.loop = true;
     * player.autostart = true;
     */
    get loop() {
        return this._loop;
    }
    set loop(loop) {
        // if no change, do nothing
        if (this._loop === loop) {
            return;
        }
        this._loop = loop;
        // set the loop of all of the sources
        this._activeSources.forEach(source => {
            source.loop = loop;
        });
        if (loop) {
            // remove the next stopEvent
            const stopEvent = this._state.getNextState("stopped", this.now());
            if (stopEvent) {
                this._state.cancel(stopEvent.time);
            }
        }
    }
    /**
     * Normal speed is 1. The pitch will change with the playback rate.
     * @example
     * const player = new Tone.Player("https://tonejs.github.io/audio/berklee/femalevoices_aa2_A5.mp3").toDestination();
     * // play at 1/4 speed
     * player.playbackRate = 0.25;
     * // play as soon as the buffer is loaded
     * player.autostart = true;
     */
    get playbackRate() {
        return this._playbackRate;
    }
    set playbackRate(rate) {
        this._playbackRate = rate;
        const now = this.now();
        // cancel the stop event since it's at a different time now
        const stopEvent = this._state.getNextState("stopped", now);
        if (stopEvent && stopEvent.implicitEnd) {
            this._state.cancel(stopEvent.time);
            this._activeSources.forEach(source => source.cancelStop());
        }
        // set all the sources
        this._activeSources.forEach(source => {
            source.playbackRate.setValueAtTime(rate, now);
        });
    }
    /**
     * If the buffer should be reversed
     * @example
     * const player = new Tone.Player("https://tonejs.github.io/audio/berklee/chime_1.mp3").toDestination();
     * player.autostart = true;
     * player.reverse = true;
     */
    get reverse() {
        return this._buffer.reverse;
    }
    set reverse(rev) {
        this._buffer.reverse = rev;
    }
    /**
     * If the buffer is loaded
     */
    get loaded() {
        return this._buffer.loaded;
    }
    dispose() {
        super.dispose();
        // disconnect all of the players
        this._activeSources.forEach(source => source.dispose());
        this._activeSources.clear();
        this._buffer.dispose();
        return this;
    }
}
__decorate([
    timeRange(0)
], Player.prototype, "fadeIn", void 0);
__decorate([
    timeRange(0)
], Player.prototype, "fadeOut", void 0);

/**
 * GrainPlayer implements [granular synthesis](https://en.wikipedia.org/wiki/Granular_synthesis).
 * Granular Synthesis enables you to adjust pitch and playback rate independently. The grainSize is the
 * amount of time each small chunk of audio is played for and the overlap is the
 * amount of crossfading transition time between successive grains.
 * @category Source
 */
class GrainPlayer extends Source {
    constructor() {
        super(optionsFromArguments(GrainPlayer.getDefaults(), arguments, ["url", "onload"]));
        this.name = "GrainPlayer";
        /**
         * Internal loopStart value
         */
        this._loopStart = 0;
        /**
         * Internal loopStart value
         */
        this._loopEnd = 0;
        /**
         * All of the currently playing BufferSources
         */
        this._activeSources = [];
        const options = optionsFromArguments(GrainPlayer.getDefaults(), arguments, ["url", "onload"]);
        this.buffer = new ToneAudioBuffer({
            onload: options.onload,
            onerror: options.onerror,
            reverse: options.reverse,
            url: options.url,
        });
        this._clock = new Clock({
            context: this.context,
            callback: this._tick.bind(this),
            frequency: 1 / options.grainSize
        });
        this._playbackRate = options.playbackRate;
        this._grainSize = options.grainSize;
        this._overlap = options.overlap;
        this.detune = options.detune;
        // setup
        this.overlap = options.overlap;
        this.loop = options.loop;
        this.playbackRate = options.playbackRate;
        this.grainSize = options.grainSize;
        this.loopStart = options.loopStart;
        this.loopEnd = options.loopEnd;
        this.reverse = options.reverse;
        this._clock.on("stop", this._onstop.bind(this));
    }
    static getDefaults() {
        return Object.assign(Source.getDefaults(), {
            onload: noOp,
            onerror: noOp,
            overlap: 0.1,
            grainSize: 0.2,
            playbackRate: 1,
            detune: 0,
            loop: false,
            loopStart: 0,
            loopEnd: 0,
            reverse: false
        });
    }
    /**
     * Internal start method
     */
    _start(time, offset, duration) {
        offset = defaultArg(offset, 0);
        offset = this.toSeconds(offset);
        time = this.toSeconds(time);
        const grainSize = 1 / this._clock.frequency.getValueAtTime(time);
        this._clock.start(time, offset / grainSize);
        if (duration) {
            this.stop(time + this.toSeconds(duration));
        }
    }
    /**
     * Stop and then restart the player from the beginning (or offset)
     * @param  time When the player should start.
     * @param  offset The offset from the beginning of the sample to start at.
     * @param  duration How long the sample should play. If no duration is given,
     * 					it will default to the full length of the sample (minus any offset)
     */
    restart(time, offset, duration) {
        super.restart(time, offset, duration);
        return this;
    }
    _restart(time, offset, duration) {
        this._stop(time);
        this._start(time, offset, duration);
    }
    /**
     * Internal stop method
     */
    _stop(time) {
        this._clock.stop(time);
    }
    /**
     * Invoked when the clock is stopped
     */
    _onstop(time) {
        // stop the players
        this._activeSources.forEach((source) => {
            source.fadeOut = 0;
            source.stop(time);
        });
        this.onstop(this);
    }
    /**
     * Invoked on each clock tick. scheduled a new grain at this time.
     */
    _tick(time) {
        // check if it should stop looping
        const ticks = this._clock.getTicksAtTime(time);
        const offset = ticks * this._grainSize;
        this.log("offset", offset);
        if (!this.loop && offset > this.buffer.duration) {
            this.stop(time);
            return;
        }
        // at the beginning of the file, the fade in should be 0
        const fadeIn = offset < this._overlap ? 0 : this._overlap;
        // create a buffer source
        const source = new ToneBufferSource({
            context: this.context,
            url: this.buffer,
            fadeIn: fadeIn,
            fadeOut: this._overlap,
            loop: this.loop,
            loopStart: this._loopStart,
            loopEnd: this._loopEnd,
            // compute the playbackRate based on the detune
            playbackRate: intervalToFrequencyRatio(this.detune / 100)
        }).connect(this.output);
        source.start(time, this._grainSize * ticks);
        source.stop(time + this._grainSize / this.playbackRate);
        // add it to the active sources
        this._activeSources.push(source);
        // remove it when it's done
        source.onended = () => {
            const index = this._activeSources.indexOf(source);
            if (index !== -1) {
                this._activeSources.splice(index, 1);
            }
        };
    }
    /**
     * The playback rate of the sample
     */
    get playbackRate() {
        return this._playbackRate;
    }
    set playbackRate(rate) {
        assertRange(rate, 0.001);
        this._playbackRate = rate;
        this.grainSize = this._grainSize;
    }
    /**
     * The loop start time.
     */
    get loopStart() {
        return this._loopStart;
    }
    set loopStart(time) {
        if (this.buffer.loaded) {
            assertRange(this.toSeconds(time), 0, this.buffer.duration);
        }
        this._loopStart = this.toSeconds(time);
    }
    /**
     * The loop end time.
     */
    get loopEnd() {
        return this._loopEnd;
    }
    set loopEnd(time) {
        if (this.buffer.loaded) {
            assertRange(this.toSeconds(time), 0, this.buffer.duration);
        }
        this._loopEnd = this.toSeconds(time);
    }
    /**
     * The direction the buffer should play in
     */
    get reverse() {
        return this.buffer.reverse;
    }
    set reverse(rev) {
        this.buffer.reverse = rev;
    }
    /**
     * The size of each chunk of audio that the
     * buffer is chopped into and played back at.
     */
    get grainSize() {
        return this._grainSize;
    }
    set grainSize(size) {
        this._grainSize = this.toSeconds(size);
        this._clock.frequency.setValueAtTime(this._playbackRate / this._grainSize, this.now());
    }
    /**
     * The duration of the cross-fade between successive grains.
     */
    get overlap() {
        return this._overlap;
    }
    set overlap(time) {
        const computedTime = this.toSeconds(time);
        assertRange(computedTime, 0);
        this._overlap = computedTime;
    }
    /**
     * If all the buffer is loaded
     */
    get loaded() {
        return this.buffer.loaded;
    }
    dispose() {
        super.dispose();
        this.buffer.dispose();
        this._clock.dispose();
        this._activeSources.forEach((source) => source.dispose());
        return this;
    }
}

/**
 * Envelope is an [ADSR](https://en.wikipedia.org/wiki/Synthesizer#ADSR_envelope)
 * envelope generator. Envelope outputs a signal which
 * can be connected to an AudioParam or Tone.Signal.
 * ```
 *           /\
 *          /  \
 *         /    \
 *        /      \
 *       /        \___________
 *      /                     \
 *     /                       \
 *    /                         \
 *   /                           \
 * ```
 * @example
 * return Tone.Offline(() => {
 * 	const env = new Tone.Envelope({
 * 		attack: 0.1,
 * 		decay: 0.2,
 * 		sustain: 0.5,
 * 		release: 0.8,
 * 	}).toDestination();
 * 	env.triggerAttackRelease(0.5);
 * }, 1.5, 1);
 * @category Component
 */
class Envelope extends ToneAudioNode {
    constructor() {
        super(optionsFromArguments(Envelope.getDefaults(), arguments, ["attack", "decay", "sustain", "release"]));
        this.name = "Envelope";
        /**
         * the signal which is output.
         */
        this._sig = new Signal({
            context: this.context,
            value: 0,
        });
        /**
         * The output signal of the envelope
         */
        this.output = this._sig;
        /**
         * Envelope has no input
         */
        this.input = undefined;
        const options = optionsFromArguments(Envelope.getDefaults(), arguments, ["attack", "decay", "sustain", "release"]);
        this.attack = options.attack;
        this.decay = options.decay;
        this.sustain = options.sustain;
        this.release = options.release;
        this.attackCurve = options.attackCurve;
        this.releaseCurve = options.releaseCurve;
        this.decayCurve = options.decayCurve;
    }
    static getDefaults() {
        return Object.assign(ToneAudioNode.getDefaults(), {
            attack: 0.01,
            attackCurve: "linear",
            decay: 0.1,
            decayCurve: "exponential",
            release: 1,
            releaseCurve: "exponential",
            sustain: 0.5,
        });
    }
    /**
     * Read the current value of the envelope. Useful for
     * synchronizing visual output to the envelope.
     */
    get value() {
        return this.getValueAtTime(this.now());
    }
    /**
     * Get the curve
     * @param  curve
     * @param  direction  In/Out
     * @return The curve name
     */
    _getCurve(curve, direction) {
        if (isString(curve)) {
            return curve;
        }
        else {
            // look up the name in the curves array
            let curveName;
            for (curveName in EnvelopeCurves) {
                if (EnvelopeCurves[curveName][direction] === curve) {
                    return curveName;
                }
            }
            // return the custom curve
            return curve;
        }
    }
    /**
     * Assign a the curve to the given name using the direction
     * @param  name
     * @param  direction In/Out
     * @param  curve
     */
    _setCurve(name, direction, curve) {
        // check if it's a valid type
        if (isString(curve) && Reflect.has(EnvelopeCurves, curve)) {
            const curveDef = EnvelopeCurves[curve];
            if (isObject(curveDef)) {
                if (name !== "_decayCurve") {
                    this[name] = curveDef[direction];
                }
            }
            else {
                this[name] = curveDef;
            }
        }
        else if (isArray(curve) && name !== "_decayCurve") {
            this[name] = curve;
        }
        else {
            throw new Error("Envelope: invalid curve: " + curve);
        }
    }
    /**
     * The shape of the attack.
     * Can be any of these strings:
     * * "linear"
     * * "exponential"
     * * "sine"
     * * "cosine"
     * * "bounce"
     * * "ripple"
     * * "step"
     *
     * Can also be an array which describes the curve. Values
     * in the array are evenly subdivided and linearly
     * interpolated over the duration of the attack.
     * @example
     * return Tone.Offline(() => {
     * 	const env = new Tone.Envelope(0.4).toDestination();
     * 	env.attackCurve = "linear";
     * 	env.triggerAttack();
     * }, 1, 1);
     */
    get attackCurve() {
        return this._getCurve(this._attackCurve, "In");
    }
    set attackCurve(curve) {
        this._setCurve("_attackCurve", "In", curve);
    }
    /**
     * The shape of the release. See the attack curve types.
     * @example
     * return Tone.Offline(() => {
     * 	const env = new Tone.Envelope({
     * 		release: 0.8
     * 	}).toDestination();
     * 	env.triggerAttack();
     * 	// release curve could also be defined by an array
     * 	env.releaseCurve = [1, 0.3, 0.4, 0.2, 0.7, 0];
     * 	env.triggerRelease(0.2);
     * }, 1, 1);
     */
    get releaseCurve() {
        return this._getCurve(this._releaseCurve, "Out");
    }
    set releaseCurve(curve) {
        this._setCurve("_releaseCurve", "Out", curve);
    }
    /**
     * The shape of the decay either "linear" or "exponential"
     * @example
     * return Tone.Offline(() => {
     * 	const env = new Tone.Envelope({
     * 		sustain: 0.1,
     * 		decay: 0.5
     * 	}).toDestination();
     * 	env.decayCurve = "linear";
     * 	env.triggerAttack();
     * }, 1, 1);
     */
    get decayCurve() {
        return this._decayCurve;
    }
    set decayCurve(curve) {
        assert(["linear", "exponential"].some(c => c === curve), `Invalid envelope curve: ${curve}`);
        this._decayCurve = curve;
    }
    /**
     * Trigger the attack/decay portion of the ADSR envelope.
     * @param  time When the attack should start.
     * @param velocity The velocity of the envelope scales the vales.
     *                             number between 0-1
     * @example
     * const env = new Tone.AmplitudeEnvelope().toDestination();
     * const osc = new Tone.Oscillator().connect(env).start();
     * // trigger the attack 0.5 seconds from now with a velocity of 0.2
     * env.triggerAttack("+0.5", 0.2);
     */
    triggerAttack(time, velocity = 1) {
        this.log("triggerAttack", time, velocity);
        time = this.toSeconds(time);
        const originalAttack = this.toSeconds(this.attack);
        let attack = originalAttack;
        const decay = this.toSeconds(this.decay);
        // check if it's not a complete attack
        const currentValue = this.getValueAtTime(time);
        if (currentValue > 0) {
            // subtract the current value from the attack time
            const attackRate = 1 / attack;
            const remainingDistance = 1 - currentValue;
            // the attack is now the remaining time
            attack = remainingDistance / attackRate;
        }
        // attack
        if (attack < this.sampleTime) {
            this._sig.cancelScheduledValues(time);
            // case where the attack time is 0 should set instantly
            this._sig.setValueAtTime(velocity, time);
        }
        else if (this._attackCurve === "linear") {
            this._sig.linearRampTo(velocity, attack, time);
        }
        else if (this._attackCurve === "exponential") {
            this._sig.targetRampTo(velocity, attack, time);
        }
        else {
            this._sig.cancelAndHoldAtTime(time);
            let curve = this._attackCurve;
            // find the starting position in the curve
            for (let i = 1; i < curve.length; i++) {
                // the starting index is between the two values
                if (curve[i - 1] <= currentValue && currentValue <= curve[i]) {
                    curve = this._attackCurve.slice(i);
                    // the first index is the current value
                    curve[0] = currentValue;
                    break;
                }
            }
            this._sig.setValueCurveAtTime(curve, time, attack, velocity);
        }
        // decay
        if (decay && this.sustain < 1) {
            const decayValue = velocity * this.sustain;
            const decayStart = time + attack;
            this.log("decay", decayStart);
            if (this._decayCurve === "linear") {
                this._sig.linearRampToValueAtTime(decayValue, decay + decayStart);
            }
            else {
                this._sig.exponentialApproachValueAtTime(decayValue, decayStart, decay);
            }
        }
        return this;
    }
    /**
     * Triggers the release of the envelope.
     * @param  time When the release portion of the envelope should start.
     * @example
     * const env = new Tone.AmplitudeEnvelope().toDestination();
     * const osc = new Tone.Oscillator({
     * 	type: "sawtooth"
     * }).connect(env).start();
     * env.triggerAttack();
     * // trigger the release half a second after the attack
     * env.triggerRelease("+0.5");
     */
    triggerRelease(time) {
        this.log("triggerRelease", time);
        time = this.toSeconds(time);
        const currentValue = this.getValueAtTime(time);
        if (currentValue > 0) {
            const release = this.toSeconds(this.release);
            if (release < this.sampleTime) {
                this._sig.setValueAtTime(0, time);
            }
            else if (this._releaseCurve === "linear") {
                this._sig.linearRampTo(0, release, time);
            }
            else if (this._releaseCurve === "exponential") {
                this._sig.targetRampTo(0, release, time);
            }
            else {
                assert(isArray(this._releaseCurve), "releaseCurve must be either 'linear', 'exponential' or an array");
                this._sig.cancelAndHoldAtTime(time);
                this._sig.setValueCurveAtTime(this._releaseCurve, time, release, currentValue);
            }
        }
        return this;
    }
    /**
     * Get the scheduled value at the given time. This will
     * return the unconverted (raw) value.
     * @example
     * const env = new Tone.Envelope(0.5, 1, 0.4, 2);
     * env.triggerAttackRelease(2);
     * setInterval(() => console.log(env.getValueAtTime(Tone.now())), 100);
     */
    getValueAtTime(time) {
        return this._sig.getValueAtTime(time);
    }
    /**
     * triggerAttackRelease is shorthand for triggerAttack, then waiting
     * some duration, then triggerRelease.
     * @param duration The duration of the sustain.
     * @param time When the attack should be triggered.
     * @param velocity The velocity of the envelope.
     * @example
     * const env = new Tone.AmplitudeEnvelope().toDestination();
     * const osc = new Tone.Oscillator().connect(env).start();
     * // trigger the release 0.5 seconds after the attack
     * env.triggerAttackRelease(0.5);
     */
    triggerAttackRelease(duration, time, velocity = 1) {
        time = this.toSeconds(time);
        this.triggerAttack(time, velocity);
        this.triggerRelease(time + this.toSeconds(duration));
        return this;
    }
    /**
     * Cancels all scheduled envelope changes after the given time.
     */
    cancel(after) {
        this._sig.cancelScheduledValues(this.toSeconds(after));
        return this;
    }
    /**
     * Connect the envelope to a destination node.
     */
    connect(destination, outputNumber = 0, inputNumber = 0) {
        connectSignal(this, destination, outputNumber, inputNumber);
        return this;
    }
    /**
     * Render the envelope curve to an array of the given length.
     * Good for visualizing the envelope curve. Rescales the duration of the
     * envelope to fit the length.
     */
    asArray(length = 1024) {
        return __awaiter(this, void 0, void 0, function* () {
            const duration = length / this.context.sampleRate;
            const context = new OfflineContext(1, duration, this.context.sampleRate);
            // normalize the ADSR for the given duration with 20% sustain time
            const attackPortion = this.toSeconds(this.attack) + this.toSeconds(this.decay);
            const envelopeDuration = attackPortion + this.toSeconds(this.release);
            const sustainTime = envelopeDuration * 0.1;
            const totalDuration = envelopeDuration + sustainTime;
            // @ts-ignore
            const clone = new this.constructor(Object.assign(this.get(), {
                attack: duration * this.toSeconds(this.attack) / totalDuration,
                decay: duration * this.toSeconds(this.decay) / totalDuration,
                release: duration * this.toSeconds(this.release) / totalDuration,
                context
            }));
            clone._sig.toDestination();
            clone.triggerAttackRelease(duration * (attackPortion + sustainTime) / totalDuration, 0);
            const buffer = yield context.render();
            return buffer.getChannelData(0);
        });
    }
    dispose() {
        super.dispose();
        this._sig.dispose();
        return this;
    }
}
__decorate([
    timeRange(0)
], Envelope.prototype, "attack", void 0);
__decorate([
    timeRange(0)
], Envelope.prototype, "decay", void 0);
__decorate([
    range(0, 1)
], Envelope.prototype, "sustain", void 0);
__decorate([
    timeRange(0)
], Envelope.prototype, "release", void 0);
/**
 * Generate some complex envelope curves.
 */
const EnvelopeCurves = (() => {
    const curveLen = 128;
    let i;
    let k;
    // cosine curve
    const cosineCurve = [];
    for (i = 0; i < curveLen; i++) {
        cosineCurve[i] = Math.sin((i / (curveLen - 1)) * (Math.PI / 2));
    }
    // ripple curve
    const rippleCurve = [];
    const rippleCurveFreq = 6.4;
    for (i = 0; i < curveLen - 1; i++) {
        k = (i / (curveLen - 1));
        const sineWave = Math.sin(k * (Math.PI * 2) * rippleCurveFreq - Math.PI / 2) + 1;
        rippleCurve[i] = sineWave / 10 + k * 0.83;
    }
    rippleCurve[curveLen - 1] = 1;
    // stairs curve
    const stairsCurve = [];
    const steps = 5;
    for (i = 0; i < curveLen; i++) {
        stairsCurve[i] = Math.ceil((i / (curveLen - 1)) * steps) / steps;
    }
    // in-out easing curve
    const sineCurve = [];
    for (i = 0; i < curveLen; i++) {
        k = i / (curveLen - 1);
        sineCurve[i] = 0.5 * (1 - Math.cos(Math.PI * k));
    }
    // a bounce curve
    const bounceCurve = [];
    for (i = 0; i < curveLen; i++) {
        k = i / (curveLen - 1);
        const freq = Math.pow(k, 3) * 4 + 0.2;
        const val = Math.cos(freq * Math.PI * 2 * k);
        bounceCurve[i] = Math.abs(val * (1 - k));
    }
    /**
     * Invert a value curve to make it work for the release
     */
    function invertCurve(curve) {
        const out = new Array(curve.length);
        for (let j = 0; j < curve.length; j++) {
            out[j] = 1 - curve[j];
        }
        return out;
    }
    /**
     * reverse the curve
     */
    function reverseCurve(curve) {
        return curve.slice(0).reverse();
    }
    /**
     * attack and release curve arrays
     */
    return {
        bounce: {
            In: invertCurve(bounceCurve),
            Out: bounceCurve,
        },
        cosine: {
            In: cosineCurve,
            Out: reverseCurve(cosineCurve),
        },
        exponential: "exponential",
        linear: "linear",
        ripple: {
            In: rippleCurve,
            Out: invertCurve(rippleCurve),
        },
        sine: {
            In: sineCurve,
            Out: invertCurve(sineCurve),
        },
        step: {
            In: stairsCurve,
            Out: invertCurve(stairsCurve),
        },
    };
})();

/**
 * Base-class for all instruments
 */
class Instrument extends ToneAudioNode {
    constructor() {
        super(optionsFromArguments(Instrument.getDefaults(), arguments));
        /**
         * Keep track of all events scheduled to the transport
         * when the instrument is 'synced'
         */
        this._scheduledEvents = [];
        /**
         * If the instrument is currently synced
         */
        this._synced = false;
        this._original_triggerAttack = this.triggerAttack;
        this._original_triggerRelease = this.triggerRelease;
        const options = optionsFromArguments(Instrument.getDefaults(), arguments);
        this._volume = this.output = new Volume({
            context: this.context,
            volume: options.volume,
        });
        this.volume = this._volume.volume;
        readOnly(this, "volume");
    }
    static getDefaults() {
        return Object.assign(ToneAudioNode.getDefaults(), {
            volume: 0,
        });
    }
    /**
     * Sync the instrument to the Transport. All subsequent calls of
     * [[triggerAttack]] and [[triggerRelease]] will be scheduled along the transport.
     * @example
     * const fmSynth = new Tone.FMSynth().toDestination();
     * fmSynth.volume.value = -6;
     * fmSynth.sync();
     * // schedule 3 notes when the transport first starts
     * fmSynth.triggerAttackRelease("C4", "8n", 0);
     * fmSynth.triggerAttackRelease("E4", "8n", "8n");
     * fmSynth.triggerAttackRelease("G4", "8n", "4n");
     * // start the transport to hear the notes
     * Tone.Transport.start();
     */
    sync() {
        if (this._syncState()) {
            this._syncMethod("triggerAttack", 1);
            this._syncMethod("triggerRelease", 0);
        }
        return this;
    }
    /**
     * set _sync
     */
    _syncState() {
        let changed = false;
        if (!this._synced) {
            this._synced = true;
            changed = true;
        }
        return changed;
    }
    /**
     * Wrap the given method so that it can be synchronized
     * @param method Which method to wrap and sync
     * @param  timePosition What position the time argument appears in
     */
    _syncMethod(method, timePosition) {
        const originalMethod = this["_original_" + method] = this[method];
        this[method] = (...args) => {
            const time = args[timePosition];
            const id = this.context.transport.schedule((t) => {
                args[timePosition] = t;
                originalMethod.apply(this, args);
            }, time);
            this._scheduledEvents.push(id);
        };
    }
    /**
     * Unsync the instrument from the Transport
     */
    unsync() {
        this._scheduledEvents.forEach(id => this.context.transport.clear(id));
        this._scheduledEvents = [];
        if (this._synced) {
            this._synced = false;
            this.triggerAttack = this._original_triggerAttack;
            this.triggerRelease = this._original_triggerRelease;
        }
        return this;
    }
    /**
     * Trigger the attack and then the release after the duration.
     * @param  note     The note to trigger.
     * @param  duration How long the note should be held for before
     *                         triggering the release. This value must be greater than 0.
     * @param time  When the note should be triggered.
     * @param  velocity The velocity the note should be triggered at.
     * @example
     * const synth = new Tone.Synth().toDestination();
     * // trigger "C4" for the duration of an 8th note
     * synth.triggerAttackRelease("C4", "8n");
     */
    triggerAttackRelease(note, duration, time, velocity) {
        const computedTime = this.toSeconds(time);
        const computedDuration = this.toSeconds(duration);
        this.triggerAttack(note, computedTime, velocity);
        this.triggerRelease(computedTime + computedDuration);
        return this;
    }
    /**
     * clean up
     * @returns {Instrument} this
     */
    dispose() {
        super.dispose();
        this._volume.dispose();
        this.unsync();
        this._scheduledEvents = [];
        return this;
    }
}

/**
 * Abstract base class for other monophonic instruments to extend.
 */
class Monophonic extends Instrument {
    constructor() {
        super(optionsFromArguments(Monophonic.getDefaults(), arguments));
        const options = optionsFromArguments(Monophonic.getDefaults(), arguments);
        this.portamento = options.portamento;
        this.onsilence = options.onsilence;
    }
    static getDefaults() {
        return Object.assign(Instrument.getDefaults(), {
            detune: 0,
            onsilence: noOp,
            portamento: 0,
        });
    }
    /**
     * Trigger the attack of the note optionally with a given velocity.
     * @param  note The note to trigger.
     * @param  time When the note should start.
     * @param  velocity The velocity scaler determines how "loud" the note will be triggered.
     * @example
     * const synth = new Tone.Synth().toDestination();
     * // trigger the note a half second from now at half velocity
     * synth.triggerAttack("C4", "+0.5", 0.5);
     */
    triggerAttack(note, time, velocity = 1) {
        this.log("triggerAttack", note, time, velocity);
        const seconds = this.toSeconds(time);
        this._triggerEnvelopeAttack(seconds, velocity);
        this.setNote(note, seconds);
        return this;
    }
    /**
     * Trigger the release portion of the envelope
     * @param  time If no time is given, the release happens immediatly
     * @example
     * const synth = new Tone.Synth().toDestination();
     * synth.triggerAttack("C4");
     * // trigger the release a second from now
     * synth.triggerRelease("+1");
     */
    triggerRelease(time) {
        this.log("triggerRelease", time);
        const seconds = this.toSeconds(time);
        this._triggerEnvelopeRelease(seconds);
        return this;
    }
    /**
     * Set the note at the given time. If no time is given, the note
     * will set immediately.
     * @param note The note to change to.
     * @param  time The time when the note should be set.
     * @example
     * const synth = new Tone.Synth().toDestination();
     * synth.triggerAttack("C4");
     * // change to F#6 in one quarter note from now.
     * synth.setNote("F#6", "+4n");
     */
    setNote(note, time) {
        const computedTime = this.toSeconds(time);
        const computedFrequency = note instanceof FrequencyClass ? note.toFrequency() : note;
        if (this.portamento > 0 && this.getLevelAtTime(computedTime) > 0.05) {
            const portTime = this.toSeconds(this.portamento);
            this.frequency.exponentialRampTo(computedFrequency, portTime, computedTime);
        }
        else {
            this.frequency.setValueAtTime(computedFrequency, computedTime);
        }
        return this;
    }
}
__decorate([
    timeRange(0)
], Monophonic.prototype, "portamento", void 0);

/**
 * AmplitudeEnvelope is a Tone.Envelope connected to a gain node.
 * Unlike Tone.Envelope, which outputs the envelope's value, AmplitudeEnvelope accepts
 * an audio signal as the input and will apply the envelope to the amplitude
 * of the signal.
 * Read more about ADSR Envelopes on [Wikipedia](https://en.wikipedia.org/wiki/Synthesizer#ADSR_envelope).
 *
 * @example
 * return Tone.Offline(() => {
 * 	const ampEnv = new Tone.AmplitudeEnvelope({
 * 		attack: 0.1,
 * 		decay: 0.2,
 * 		sustain: 1.0,
 * 		release: 0.8
 * 	}).toDestination();
 * 	// create an oscillator and connect it
 * 	const osc = new Tone.Oscillator().connect(ampEnv).start();
 * 	// trigger the envelopes attack and release "8t" apart
 * 	ampEnv.triggerAttackRelease("8t");
 * }, 1.5, 1);
 * @category Component
 */
class AmplitudeEnvelope extends Envelope {
    constructor() {
        super(optionsFromArguments(AmplitudeEnvelope.getDefaults(), arguments, ["attack", "decay", "sustain", "release"]));
        this.name = "AmplitudeEnvelope";
        this._gainNode = new Gain({
            context: this.context,
            gain: 0,
        });
        this.output = this._gainNode;
        this.input = this._gainNode;
        this._sig.connect(this._gainNode.gain);
        this.output = this._gainNode;
        this.input = this._gainNode;
    }
    /**
     * Clean up
     */
    dispose() {
        super.dispose();
        this._gainNode.dispose();
        return this;
    }
}

/**
 * Synth is composed simply of a [[OmniOscillator]] routed through an [[AmplitudeEnvelope]].
 * ```
 * +----------------+   +-------------------+
 * | OmniOscillator +>--> AmplitudeEnvelope +>--> Output
 * +----------------+   +-------------------+
 * ```
 * @example
 * const synth = new Tone.Synth().toDestination();
 * synth.triggerAttackRelease("C4", "8n");
 * @category Instrument
 */
class Synth extends Monophonic {
    constructor() {
        super(optionsFromArguments(Synth.getDefaults(), arguments));
        this.name = "Synth";
        const options = optionsFromArguments(Synth.getDefaults(), arguments);
        this.oscillator = new OmniOscillator(Object.assign({
            context: this.context,
            detune: options.detune,
            onstop: () => this.onsilence(this),
        }, options.oscillator));
        this.frequency = this.oscillator.frequency;
        this.detune = this.oscillator.detune;
        this.envelope = new AmplitudeEnvelope(Object.assign({
            context: this.context,
        }, options.envelope));
        // connect the oscillators to the output
        this.oscillator.chain(this.envelope, this.output);
        readOnly(this, ["oscillator", "frequency", "detune", "envelope"]);
    }
    static getDefaults() {
        return Object.assign(Monophonic.getDefaults(), {
            envelope: Object.assign(omitFromObject(Envelope.getDefaults(), Object.keys(ToneAudioNode.getDefaults())), {
                attack: 0.005,
                decay: 0.1,
                release: 1,
                sustain: 0.3,
            }),
            oscillator: Object.assign(omitFromObject(OmniOscillator.getDefaults(), [...Object.keys(Source.getDefaults()), "frequency", "detune"]), {
                type: "triangle",
            }),
        });
    }
    /**
     * start the attack portion of the envelope
     * @param time the time the attack should start
     * @param velocity the velocity of the note (0-1)
     */
    _triggerEnvelopeAttack(time, velocity) {
        // the envelopes
        this.envelope.triggerAttack(time, velocity);
        this.oscillator.start(time);
        // if there is no release portion, stop the oscillator
        if (this.envelope.sustain === 0) {
            const computedAttack = this.toSeconds(this.envelope.attack);
            const computedDecay = this.toSeconds(this.envelope.decay);
            this.oscillator.stop(time + computedAttack + computedDecay);
        }
    }
    /**
     * start the release portion of the envelope
     * @param time the time the release should start
     */
    _triggerEnvelopeRelease(time) {
        this.envelope.triggerRelease(time);
        this.oscillator.stop(time + this.toSeconds(this.envelope.release));
    }
    getLevelAtTime(time) {
        time = this.toSeconds(time);
        return this.envelope.getValueAtTime(time);
    }
    /**
     * clean up
     */
    dispose() {
        super.dispose();
        this.oscillator.dispose();
        this.envelope.dispose();
        return this;
    }
}

/**
 * MembraneSynth makes kick and tom sounds using a single oscillator
 * with an amplitude envelope and frequency ramp. A Tone.OmniOscillator
 * is routed through a Tone.AmplitudeEnvelope to the output. The drum
 * quality of the sound comes from the frequency envelope applied
 * during MembraneSynth.triggerAttack(note). The frequency envelope
 * starts at <code>note * .octaves</code> and ramps to <code>note</code>
 * over the duration of <code>.pitchDecay</code>.
 * @example
 * const synth = new Tone.MembraneSynth().toDestination();
 * synth.triggerAttackRelease("C2", "8n");
 * @category Instrument
 */
class MembraneSynth extends Synth {
    constructor() {
        super(optionsFromArguments(MembraneSynth.getDefaults(), arguments));
        this.name = "MembraneSynth";
        /**
         * Portamento is ignored in this synth. use pitch decay instead.
         */
        this.portamento = 0;
        const options = optionsFromArguments(MembraneSynth.getDefaults(), arguments);
        this.pitchDecay = options.pitchDecay;
        this.octaves = options.octaves;
        readOnly(this, ["oscillator", "envelope"]);
    }
    static getDefaults() {
        return deepMerge(Monophonic.getDefaults(), Synth.getDefaults(), {
            envelope: {
                attack: 0.001,
                attackCurve: "exponential",
                decay: 0.4,
                release: 1.4,
                sustain: 0.01,
            },
            octaves: 10,
            oscillator: {
                type: "sine",
            },
            pitchDecay: 0.05,
        });
    }
    setNote(note, time) {
        const seconds = this.toSeconds(time);
        const hertz = this.toFrequency(note instanceof FrequencyClass ? note.toFrequency() : note);
        const maxNote = hertz * this.octaves;
        this.oscillator.frequency.setValueAtTime(maxNote, seconds);
        this.oscillator.frequency.exponentialRampToValueAtTime(hertz, seconds + this.toSeconds(this.pitchDecay));
        return this;
    }
    dispose() {
        super.dispose();
        return this;
    }
}
__decorate([
    range(0)
], MembraneSynth.prototype, "octaves", void 0);
__decorate([
    timeRange(0)
], MembraneSynth.prototype, "pitchDecay", void 0);

/**
 * All of the classes or functions which are loaded into the AudioWorkletGlobalScope
 */
const workletContext = new Set();
/**
 * Add a class to the AudioWorkletGlobalScope
 */
function addToWorklet(classOrFunction) {
    workletContext.add(classOrFunction);
}
/**
 * Register a processor in the AudioWorkletGlobalScope with the given name
 */
function registerProcessor(name, classDesc) {
    const processor = /* javascript */ `registerProcessor("${name}", ${classDesc})`;
    workletContext.add(processor);
}

const toneAudioWorkletProcessor = /* javascript */ `
	/**
	 * The base AudioWorkletProcessor for use in Tone.js. Works with the [[ToneAudioWorklet]]. 
	 */
	class ToneAudioWorkletProcessor extends AudioWorkletProcessor {

		constructor(options) {
			
			super(options);
			/**
			 * If the processor was disposed or not. Keep alive until it's disposed.
			 */
			this.disposed = false;
		   	/** 
			 * The number of samples in the processing block
			 */
			this.blockSize = 128;
			/**
			 * the sample rate
			 */
			this.sampleRate = sampleRate;

			this.port.onmessage = (event) => {
				// when it receives a dispose 
				if (event.data === "dispose") {
					this.disposed = true;
				}
			};
		}
	}
`;
addToWorklet(toneAudioWorkletProcessor);

const singleIOProcess = /* javascript */ `
	/**
	 * Abstract class for a single input/output processor. 
	 * has a 'generate' function which processes one sample at a time
	 */
	class SingleIOProcessor extends ToneAudioWorkletProcessor {

		constructor(options) {
			super(Object.assign(options, {
				numberOfInputs: 1,
				numberOfOutputs: 1
			}));
			/**
			 * Holds the name of the parameter and a single value of that
			 * parameter at the current sample
			 * @type { [name: string]: number }
			 */
			this.params = {}
		}

		/**
		 * Generate an output sample from the input sample and parameters
		 * @abstract
		 * @param input number
		 * @param channel number
		 * @param parameters { [name: string]: number }
		 * @returns number
		 */
		generate(){}

		/**
		 * Update the private params object with the 
		 * values of the parameters at the given index
		 * @param parameters { [name: string]: Float32Array },
		 * @param index number
		 */
		updateParams(parameters, index) {
			for (const paramName in parameters) {
				const param = parameters[paramName];
				if (param.length > 1) {
					this.params[paramName] = parameters[paramName][index];
				} else {
					this.params[paramName] = parameters[paramName][0];
				}
			}
		}

		/**
		 * Process a single frame of the audio
		 * @param inputs Float32Array[][]
		 * @param outputs Float32Array[][]
		 */
		process(inputs, outputs, parameters) {
			const input = inputs[0];
			const output = outputs[0];
			// get the parameter values
			const channelCount = Math.max(input && input.length || 0, output.length);
			for (let sample = 0; sample < this.blockSize; sample++) {
				this.updateParams(parameters, sample);
				for (let channel = 0; channel < channelCount; channel++) {
					const inputSample = input && input.length ? input[channel][sample] : 0;
					output[channel][sample] = this.generate(inputSample, channel, this.params);
				}
			}
			return !this.disposed;
		}
	};
`;
addToWorklet(singleIOProcess);

const delayLine = /* javascript */ `
	/**
	 * A multichannel buffer for use within an AudioWorkletProcessor as a delay line
	 */
	class DelayLine {
		
		constructor(size, channels) {
			this.buffer = [];
			this.writeHead = []
			this.size = size;

			// create the empty channels
			for (let i = 0; i < channels; i++) {
				this.buffer[i] = new Float32Array(this.size);
				this.writeHead[i] = 0;
			}
		}

		/**
		 * Push a value onto the end
		 * @param channel number
		 * @param value number
		 */
		push(channel, value) {
			this.writeHead[channel] += 1;
			if (this.writeHead[channel] > this.size) {
				this.writeHead[channel] = 0;
			}
			this.buffer[channel][this.writeHead[channel]] = value;
		}

		/**
		 * Get the recorded value of the channel given the delay
		 * @param channel number
		 * @param delay number delay samples
		 */
		get(channel, delay) {
			let readHead = this.writeHead[channel] - Math.floor(delay);
			if (readHead < 0) {
				readHead += this.size;
			}
			return this.buffer[channel][readHead];
		}
	}
`;
addToWorklet(delayLine);

const workletName = "feedback-comb-filter";
const feedbackCombFilter = /* javascript */ `
	class FeedbackCombFilterWorklet extends SingleIOProcessor {

		constructor(options) {
			super(options);
			this.delayLine = new DelayLine(this.sampleRate, options.channelCount || 2);
		}

		static get parameterDescriptors() {
			return [{
				name: "delayTime",
				defaultValue: 0.1,
				minValue: 0,
				maxValue: 1,
				automationRate: "k-rate"
			}, {
				name: "feedback",
				defaultValue: 0.5,
				minValue: 0,
				maxValue: 0.9999,
				automationRate: "k-rate"
			}];
		}

		generate(input, channel, parameters) {
			const delayedSample = this.delayLine.get(channel, parameters.delayTime * this.sampleRate);
			this.delayLine.push(channel, input + delayedSample * parameters.feedback);
			return delayedSample;
		}
	}
`;
registerProcessor(workletName, feedbackCombFilter);

/**
 * Pass in an object which maps the note's pitch or midi value to the url,
 * then you can trigger the attack and release of that note like other instruments.
 * By automatically repitching the samples, it is possible to play pitches which
 * were not explicitly included which can save loading time.
 *
 * For sample or buffer playback where repitching is not necessary,
 * use [[Player]].
 * @example
 * const sampler = new Tone.Sampler({
 * 	urls: {
 * 		A1: "A1.mp3",
 * 		A2: "A2.mp3",
 * 	},
 * 	baseUrl: "https://tonejs.github.io/audio/casio/",
 * 	onload: () => {
 * 		sampler.triggerAttackRelease(["C1", "E1", "G1", "B1"], 0.5);
 * 	}
 * }).toDestination();
 * @category Instrument
 */
class Sampler extends Instrument {
    constructor() {
        super(optionsFromArguments(Sampler.getDefaults(), arguments, ["urls", "onload", "baseUrl"], "urls"));
        this.name = "Sampler";
        /**
         * The object of all currently playing BufferSources
         */
        this._activeSources = new Map();
        const options = optionsFromArguments(Sampler.getDefaults(), arguments, ["urls", "onload", "baseUrl"], "urls");
        const urlMap = {};
        Object.keys(options.urls).forEach((note) => {
            const noteNumber = parseInt(note, 10);
            assert(isNote(note)
                || (isNumber(noteNumber) && isFinite(noteNumber)), `url key is neither a note or midi pitch: ${note}`);
            if (isNote(note)) {
                // convert the note name to MIDI
                const mid = new FrequencyClass(this.context, note).toMidi();
                urlMap[mid] = options.urls[note];
            }
            else if (isNumber(noteNumber) && isFinite(noteNumber)) {
                // otherwise if it's numbers assume it's midi
                urlMap[noteNumber] = options.urls[noteNumber];
            }
        });
        this._buffers = new ToneAudioBuffers({
            urls: urlMap,
            onload: options.onload,
            baseUrl: options.baseUrl,
            onerror: options.onerror,
        });
        this.attack = options.attack;
        this.release = options.release;
        this.curve = options.curve;
        // invoke the callback if it's already loaded
        if (this._buffers.loaded) {
            // invoke onload deferred
            Promise.resolve().then(options.onload);
        }
    }
    static getDefaults() {
        return Object.assign(Instrument.getDefaults(), {
            attack: 0,
            baseUrl: "",
            curve: "exponential",
            onload: noOp,
            onerror: noOp,
            release: 0.1,
            urls: {},
        });
    }
    /**
     * Returns the difference in steps between the given midi note at the closets sample.
     */
    _findClosest(midi) {
        // searches within 8 octaves of the given midi note
        const MAX_INTERVAL = 96;
        let interval = 0;
        while (interval < MAX_INTERVAL) {
            // check above and below
            if (this._buffers.has(midi + interval)) {
                return -interval;
            }
            else if (this._buffers.has(midi - interval)) {
                return interval;
            }
            interval++;
        }
        throw new Error(`No available buffers for note: ${midi}`);
    }
    /**
     * @param  notes	The note to play, or an array of notes.
     * @param  time     When to play the note
     * @param  velocity The velocity to play the sample back.
     */
    triggerAttack(notes, time, velocity = 1) {
        this.log("triggerAttack", notes, time, velocity);
        if (!Array.isArray(notes)) {
            notes = [notes];
        }
        notes.forEach(note => {
            const midiFloat = ftomf(new FrequencyClass(this.context, note).toFrequency());
            const midi = Math.round(midiFloat);
            const remainder = midiFloat - midi;
            // find the closest note pitch
            const difference = this._findClosest(midi);
            const closestNote = midi - difference;
            const buffer = this._buffers.get(closestNote);
            const playbackRate = intervalToFrequencyRatio(difference + remainder);
            // play that note
            const source = new ToneBufferSource({
                url: buffer,
                context: this.context,
                curve: this.curve,
                fadeIn: this.attack,
                fadeOut: this.release,
                playbackRate,
            }).connect(this.output);
            source.start(time, 0, buffer.duration / playbackRate, velocity);
            // add it to the active sources
            if (!isArray(this._activeSources.get(midi))) {
                this._activeSources.set(midi, []);
            }
            this._activeSources.get(midi).push(source);
            // remove it when it's done
            source.onended = () => {
                if (this._activeSources && this._activeSources.has(midi)) {
                    const sources = this._activeSources.get(midi);
                    const index = sources.indexOf(source);
                    if (index !== -1) {
                        sources.splice(index, 1);
                    }
                }
            };
        });
        return this;
    }
    /**
     * @param  notes	The note to release, or an array of notes.
     * @param  time     	When to release the note.
     */
    triggerRelease(notes, time) {
        this.log("triggerRelease", notes, time);
        if (!Array.isArray(notes)) {
            notes = [notes];
        }
        notes.forEach(note => {
            const midi = new FrequencyClass(this.context, note).toMidi();
            // find the note
            if (this._activeSources.has(midi) && this._activeSources.get(midi).length) {
                const sources = this._activeSources.get(midi);
                time = this.toSeconds(time);
                sources.forEach(source => {
                    source.stop(time);
                });
                this._activeSources.set(midi, []);
            }
        });
        return this;
    }
    /**
     * Release all currently active notes.
     * @param  time     	When to release the notes.
     */
    releaseAll(time) {
        const computedTime = this.toSeconds(time);
        this._activeSources.forEach(sources => {
            while (sources.length) {
                const source = sources.shift();
                source.stop(computedTime);
            }
        });
        return this;
    }
    sync() {
        if (this._syncState()) {
            this._syncMethod("triggerAttack", 1);
            this._syncMethod("triggerRelease", 1);
        }
        return this;
    }
    /**
     * Invoke the attack phase, then after the duration, invoke the release.
     * @param  notes	The note to play and release, or an array of notes.
     * @param  duration The time the note should be held
     * @param  time     When to start the attack
     * @param  velocity The velocity of the attack
     */
    triggerAttackRelease(notes, duration, time, velocity = 1) {
        const computedTime = this.toSeconds(time);
        this.triggerAttack(notes, computedTime, velocity);
        if (isArray(duration)) {
            assert(isArray(notes), "notes must be an array when duration is array");
            notes.forEach((note, index) => {
                const d = duration[Math.min(index, duration.length - 1)];
                this.triggerRelease(note, computedTime + this.toSeconds(d));
            });
        }
        else {
            this.triggerRelease(notes, computedTime + this.toSeconds(duration));
        }
        return this;
    }
    /**
     * Add a note to the sampler.
     * @param  note      The buffer's pitch.
     * @param  url  Either the url of the buffer, or a buffer which will be added with the given name.
     * @param  callback  The callback to invoke when the url is loaded.
     */
    add(note, url, callback) {
        assert(isNote(note) || isFinite(note), `note must be a pitch or midi: ${note}`);
        if (isNote(note)) {
            // convert the note name to MIDI
            const mid = new FrequencyClass(this.context, note).toMidi();
            this._buffers.add(mid, url, callback);
        }
        else {
            // otherwise if it's numbers assume it's midi
            this._buffers.add(note, url, callback);
        }
        return this;
    }
    /**
     * If the buffers are loaded or not
     */
    get loaded() {
        return this._buffers.loaded;
    }
    /**
     * Clean up
     */
    dispose() {
        super.dispose();
        this._buffers.dispose();
        this._activeSources.forEach(sources => {
            sources.forEach(source => source.dispose());
        });
        this._activeSources.clear();
        return this;
    }
}
__decorate([
    timeRange(0)
], Sampler.prototype, "attack", void 0);
__decorate([
    timeRange(0)
], Sampler.prototype, "release", void 0);

/**
 * Panner is an equal power Left/Right Panner. It is a wrapper around the StereoPannerNode.
 * @example
 * return Tone.Offline(() => {
 * // move the input signal from right to left
 * 	const panner = new Tone.Panner(1).toDestination();
 * 	panner.pan.rampTo(-1, 0.5);
 * 	const osc = new Tone.Oscillator(100).connect(panner).start();
 * }, 0.5, 2);
 * @category Component
 */
class Panner extends ToneAudioNode {
    constructor() {
        super(Object.assign(optionsFromArguments(Panner.getDefaults(), arguments, ["pan"])));
        this.name = "Panner";
        /**
         * the panner node
         */
        this._panner = this.context.createStereoPanner();
        this.input = this._panner;
        this.output = this._panner;
        const options = optionsFromArguments(Panner.getDefaults(), arguments, ["pan"]);
        this.pan = new Param({
            context: this.context,
            param: this._panner.pan,
            value: options.pan,
            minValue: -1,
            maxValue: 1,
        });
        // this is necessary for standardized-audio-context
        // doesn't make any difference for the native AudioContext
        // https://github.com/chrisguttandin/standardized-audio-context/issues/647
        this._panner.channelCount = options.channelCount;
        this._panner.channelCountMode = "explicit";
        // initial value
        readOnly(this, "pan");
    }
    static getDefaults() {
        return Object.assign(ToneAudioNode.getDefaults(), {
            pan: 0,
            channelCount: 1,
        });
    }
    dispose() {
        super.dispose();
        this._panner.disconnect();
        this.pan.dispose();
        return this;
    }
}

const workletName$1 = "bit-crusher";
const bitCrusherWorklet = /* javascript */ `
	class BitCrusherWorklet extends SingleIOProcessor {

		static get parameterDescriptors() {
			return [{
				name: "bits",
				defaultValue: 12,
				minValue: 1,
				maxValue: 16,
				automationRate: 'k-rate'
			}];
		}

		generate(input, _channel, parameters) {
			const step = Math.pow(0.5, parameters.bits - 1);
			const val = step * Math.floor(input / step + 0.5);
			return val;
		}
	}
`;
registerProcessor(workletName$1, bitCrusherWorklet);

/**
 * Tone.Listener is a thin wrapper around the AudioListener. Listener combined
 * with [[Panner3D]] makes up the Web Audio API's 3D panning system. Panner3D allows you
 * to place sounds in 3D and Listener allows you to navigate the 3D sound environment from
 * a first-person perspective. There is only one listener per audio context.
 */
class Listener extends ToneAudioNode {
    constructor() {
        super(...arguments);
        this.name = "Listener";
        this.positionX = new Param({
            context: this.context,
            param: this.context.rawContext.listener.positionX,
        });
        this.positionY = new Param({
            context: this.context,
            param: this.context.rawContext.listener.positionY,
        });
        this.positionZ = new Param({
            context: this.context,
            param: this.context.rawContext.listener.positionZ,
        });
        this.forwardX = new Param({
            context: this.context,
            param: this.context.rawContext.listener.forwardX,
        });
        this.forwardY = new Param({
            context: this.context,
            param: this.context.rawContext.listener.forwardY,
        });
        this.forwardZ = new Param({
            context: this.context,
            param: this.context.rawContext.listener.forwardZ,
        });
        this.upX = new Param({
            context: this.context,
            param: this.context.rawContext.listener.upX,
        });
        this.upY = new Param({
            context: this.context,
            param: this.context.rawContext.listener.upY,
        });
        this.upZ = new Param({
            context: this.context,
            param: this.context.rawContext.listener.upZ,
        });
    }
    static getDefaults() {
        return Object.assign(ToneAudioNode.getDefaults(), {
            positionX: 0,
            positionY: 0,
            positionZ: 0,
            forwardX: 0,
            forwardY: 0,
            forwardZ: -1,
            upX: 0,
            upY: 1,
            upZ: 0,
        });
    }
    dispose() {
        super.dispose();
        this.positionX.dispose();
        this.positionY.dispose();
        this.positionZ.dispose();
        this.forwardX.dispose();
        this.forwardY.dispose();
        this.forwardZ.dispose();
        this.upX.dispose();
        this.upY.dispose();
        this.upZ.dispose();
        return this;
    }
}
//-------------------------------------
// 	INITIALIZATION
//-------------------------------------
onContextInit(context => {
    context.listener = new Listener({ context });
});
onContextClose(context => {
    context.listener.dispose();
});

/**
 * The current audio context time of the global [[Context]].
 * See [[Context.now]]
 * @category Core
 */
function now() {
    return getContext().now();
}
/**
 * The Transport object belonging to the global Tone.js Context.
 * See [[Transport]]
 * @category Core
 */
const Transport$1 = getContext().transport;
/**
 * The Destination (output) belonging to the global Tone.js Context.
 * See [[Destination]]
 * @category Core
 */
const Destination$1 = getContext().destination;
/**
 * @deprecated Use [[Destination]]
 */
const Master = getContext().destination;
/**
 * The [[Listener]] belonging to the global Tone.js Context.
 * @category Core
 */
const Listener$1 = getContext().listener;
/**
 * Draw is used to synchronize the draw frame with the Transport's callbacks.
 * See [[Draw]]
 * @category Core
 */
const Draw$1 = getContext().draw;
/**
 * A reference to the global context
 * See [[Context]]
 */
const context = getContext();
const Buffer = ToneAudioBuffer;

export { Buffer, Gain, GrainPlayer, OmniOscillator, Panner, Signal, now };
