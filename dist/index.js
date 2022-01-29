"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tf = __importStar(require("@tensorflow/tfjs-core"));
require("@tensorflow/tfjs-backend-webgl");
const handPoseDetection = __importStar(require("@tensorflow-models/hand-pose-detection"));
const tone_1 = require("tone");
const util_1 = require("@tensorflow/tfjs-core/dist/util");
const tone_2 = require("tone");
let rafID;
const VIDEO_WIDTH = 640;
const VIDEO_HEIGHT = 500;
let canvas, ctx;
let colors = ["red", "white"];
const readGain = (y) => {
    return (500.0 - y) / 500.0;
};
const pitchUpdate = (newVal, oldVal) => {
    return (oldVal + newVal) * 0.5;
};
const readPitch = (val) => {
    return Math.max((10000 * (VIDEO_WIDTH - val)) / VIDEO_WIDTH, 0) ** 0.5;
};
function setupCamera() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            throw new Error("Browser API navigator.mediaDevices.getUserMedia not available");
        }
        const video = document.getElementById("video");
        const stream = yield navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                facingMode: "user",
            },
        });
        video.srcObject = stream;
        return new Promise((resolve) => {
            video.onloadedmetadata = () => {
                resolve(video);
            };
        });
    });
}
function loadVideo() {
    return __awaiter(this, void 0, void 0, function* () {
        const video = yield setupCamera();
        video.play();
        return video;
    });
}
function onTransitionEnd(event) {
    event.target.remove();
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // setup handpose model
        yield tf.setBackend("webgl");
        let model = handPoseDetection.SupportedModels.MediaPipeHands;
        const detectorConfig = {
            runtime: "tfjs",
            modelType: "lite",
        };
        const detector = yield handPoseDetection.createDetector(model, detectorConfig);
        let video;
        try {
            video = yield loadVideo();
        }
        catch (e) {
            let info = document.getElementById("info");
            // info.textContent = e.message;
            info.style.display = "block";
            throw e;
        }
        video.width = video.videoWidth;
        video.height = video.videoHeight;
        // resize canvas
        canvas = document.getElementById("canvas");
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        ctx = canvas.getContext("2d");
        // setup audio
        const gains = Array(2);
        const synths = Array(2);
        const signals = Array(2);
        const panners = Array(2);
        let bc;
        for (const s of [0, 1]) {
            gains[s] = new tone_1.Gain(0).toDestination();
            panners[s] = new tone_1.Panner(0).connect(gains[s]);
            if (s === 1) {
                synths[s] = new tone_1.OmniOscillator().connect(panners[s]).start();
                signals[s] = new tone_1.Signal({ value: 440, units: "hertz" }).connect(synths[s].frequency);
            }
            else {
                const buffer = new tone_2.Buffer("https://raw.githubusercontent.com/bpatmiller/theremin/master/grain.wav", () => {
                    console.log("buffer loaded");
                    synths[s] = new tone_1.GrainPlayer(buffer);
                    synths[s].loop = true;
                    synths[s].loopEnd = 1;
                    synths[s].connect(panners[s]).start();
                    signals[s] = new tone_1.Signal({ value: 440, units: "hertz" });
                });
            }
        }
        landmarksRealTime(video, detector, gains, signals, panners, synths);
    });
}
const landmarksRealTime = (video, detector, gains, signals, panners, synths) => __awaiter(void 0, void 0, void 0, function* () {
    function frameLandmarks() {
        return __awaiter(this, void 0, void 0, function* () {
            const predictions = yield detector.estimateHands(video);
            // clear canvas
            ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // if hands detected
            if (predictions.length > 0) {
                const timeNow = (0, tone_1.now)();
                for (const handId in predictions) {
                    const hid = parseInt(handId);
                    const keypoints = predictions[hid].keypoints;
                    const x = keypoints[0].x;
                    const y = keypoints[0].y;
                    if (x && y) {
                        const newPan = (0, util_1.clamp)(-1, 2.0 * ((VIDEO_WIDTH - keypoints[0].x) / VIDEO_WIDTH) - 1.0, 1);
                        let newFreq = readPitch(x);
                        if (hid == 0) {
                            synths[hid].grainSize = (0, util_1.clamp)(0.05, (1.2 - newPan) * 0.3, 2.0);
                            synths[hid].detune = 120 * newPan;
                            synths[hid].playbackRate = (0, util_1.clamp)(0.5, 0.5 + 4 * (1.1 - newPan), 10);
                            gains[hid].gain.rampTo(readGain(keypoints[0].y) * 4, 0.1);
                        }
                        else {
                            signals[hid].rampTo(newFreq, 0.05);
                            gains[hid].gain.rampTo(readGain(keypoints[0].y) * 0.1, 0.1);
                        }
                        panners[hid].pan.rampTo(newPan);
                    }
                }
                for (const handId in predictions) {
                    for (const i of Array(20).keys()) {
                        ctx.strokeStyle = colors[parseInt(handId) % 2];
                        ctx.beginPath();
                        const el = predictions[handId].keypoints[i];
                        const nextEl = predictions[handId].keypoints[i + 1];
                        ctx.moveTo(el.x, el.y);
                        ctx.lineTo(nextEl.x, nextEl.y);
                        ctx.stroke();
                    }
                }
            }
            else {
                ctx = canvas.getContext("2d");
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                for (const g of gains) {
                    g === null || g === void 0 ? void 0 : g.gain.rampTo(0, 0.25);
                }
            }
            rafID = requestAnimationFrame(frameLandmarks);
        });
    }
    frameLandmarks();
});
main();
