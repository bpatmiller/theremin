import * as tf from "../_snowpack/pkg/@tensorflow/tfjs-core.js";
import "../_snowpack/pkg/@tensorflow/tfjs-backend-webgl.js";
import * as handPoseDetection from "../_snowpack/pkg/@tensorflow-models/hand-pose-detection.js";
import {now, GrainPlayer, Signal, Gain, Panner, OmniOscillator} from "../_snowpack/pkg/tone.js";
import {clamp} from "../_snowpack/pkg/@tensorflow/tfjs-core/dist/util.js";
import {Buffer} from "../_snowpack/pkg/tone.js";
let rafID;
const VIDEO_WIDTH = 640;
const VIDEO_HEIGHT = 500;
let canvas, ctx;
let colors = ["red", "white"];
const readGain = (y) => {
  return (500 - y) / 500;
};
const pitchUpdate = (newVal, oldVal) => {
  return (oldVal + newVal) * 0.5;
};
const readPitch = (val) => {
  return Math.max(1e4 * (VIDEO_WIDTH - val) / VIDEO_WIDTH, 0) ** 0.5;
};
async function setupCamera() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    throw new Error("Browser API navigator.mediaDevices.getUserMedia not available");
  }
  const video = document.getElementById("video");
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      facingMode: "user"
    }
  });
  video.srcObject = stream;
  return new Promise((resolve) => {
    video.onloadedmetadata = () => {
      resolve(video);
    };
  });
}
async function loadVideo() {
  const video = await setupCamera();
  video.play();
  return video;
}
function onTransitionEnd(event) {
  event.target.remove();
}
async function main() {
  await tf.setBackend("webgl");
  let model = handPoseDetection.SupportedModels.MediaPipeHands;
  const detectorConfig = {
    runtime: "tfjs",
    modelType: "lite"
  };
  const detector = await handPoseDetection.createDetector(model, detectorConfig);
  let video;
  try {
    video = await loadVideo();
  } catch (e) {
    let info = document.getElementById("info");
    info.style.display = "block";
    throw e;
  }
  video.width = video.videoWidth;
  video.height = video.videoHeight;
  canvas = document.getElementById("canvas");
  canvas.height = video.videoHeight;
  canvas.width = video.videoWidth;
  ctx = canvas.getContext("2d");
  const gains = Array(2);
  const synths = Array(2);
  const signals = Array(2);
  const panners = Array(2);
  let bc;
  for (const s of [0, 1]) {
    gains[s] = new Gain(0).toDestination();
    panners[s] = new Panner(0).connect(gains[s]);
    if (s === 1) {
      synths[s] = new OmniOscillator().connect(panners[s]).start();
      signals[s] = new Signal({value: 440, units: "hertz"}).connect(synths[s].frequency);
    } else {
      const buffer = new Buffer("https://raw.githubusercontent.com/bpatmiller/theremin/master/grain.wav", () => {
        console.log("buffer loaded");
        synths[s] = new GrainPlayer(buffer);
        synths[s].loop = true;
        synths[s].loopEnd = 1;
        synths[s].connect(panners[s]).start();
        signals[s] = new Signal({value: 440, units: "hertz"});
      });
    }
  }
  landmarksRealTime(video, detector, gains, signals, panners, synths);
}
const landmarksRealTime = async (video, detector, gains, signals, panners, synths) => {
  async function frameLandmarks() {
    const predictions = await detector.estimateHands(video);
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (predictions.length > 0) {
      const timeNow = now();
      for (const handId in predictions) {
        const hid = parseInt(handId);
        const keypoints = predictions[hid].keypoints;
        const x = keypoints[0].x;
        const y = keypoints[0].y;
        if (x && y) {
          const newPan = clamp(-1, 2 * ((VIDEO_WIDTH - keypoints[0].x) / VIDEO_WIDTH) - 1, 1);
          let newFreq = readPitch(x);
          if (hid == 0) {
            synths[hid].grainSize = clamp(0.05, (1.2 - newPan) * 0.3, 2);
            synths[hid].detune = 120 * newPan;
            synths[hid].playbackRate = clamp(0.5, 0.5 + 4 * (1.1 - newPan), 10);
            gains[hid].gain.rampTo(readGain(keypoints[0].y) * 4, 0.1);
          } else {
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
    } else {
      ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const g of gains) {
        g?.gain.rampTo(0, 0.25);
      }
    }
    rafID = requestAnimationFrame(frameLandmarks);
  }
  frameLandmarks();
};
main();
