import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";
import { Hands } from "@mediapipe/hands";
import { now, GrainPlayer, Signal, Gain, Panner, OmniOscillator } from "tone";
import { clamp } from "@tensorflow/tfjs-core/dist/util";
import { Buffer } from "tone";
import { Distortion } from "tone";
import { BitCrusher } from "tone";
import { min } from "@tensorflow/tfjs-core";

let rafID;
const VIDEO_WIDTH = 640;
const VIDEO_HEIGHT = 500;
let canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D;
let colors = ["red", "white"];

const readGain = (y: number) => {
  return (500.0 - y) / 500.0;
};

const pitchUpdate = (newVal: number, oldVal: number) => {
  return (oldVal + newVal) * 0.5;
};

const readPitch = (val: number) => {
  return Math.max((10000 * (VIDEO_WIDTH - val)) / VIDEO_WIDTH, 0) ** 0.5;
};

async function setupCamera(): Promise<HTMLVideoElement> {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    throw new Error(
      "Browser API navigator.mediaDevices.getUserMedia not available"
    );
  }

  const video: HTMLVideoElement = document.getElementById(
    "video"
  ) as HTMLVideoElement;
  const stream = await navigator.mediaDevices.getUserMedia({
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
}

async function loadVideo() {
  const video: HTMLVideoElement = await setupCamera();
  video.play();
  return video;
}

function onTransitionEnd(event: any) {
  event.target.remove();
}

async function main() {
  // setup handpose model
  await tf.setBackend("webgl");
  let model = handPoseDetection.SupportedModels.MediaPipeHands;
  const detectorConfig: handPoseDetection.MediaPipeHandsTfjsModelConfig = {
    runtime: "tfjs",
    modelType: "lite",
  };

  const detector = await handPoseDetection.createDetector(
    model,
    detectorConfig
  );

  let video: HTMLVideoElement;
  try {
    video = await loadVideo();
  } catch (e) {
    let info = document.getElementById("info") as HTMLElement;
    // info.textContent = e.message;
    info.style.display = "block";
    throw e;
  }

  video.width = video.videoWidth;
  video.height = video.videoHeight;

  // resize canvas
  canvas = document.getElementById("canvas") as HTMLCanvasElement;
  canvas.height = video.videoHeight;
  canvas.width = video.videoWidth;
  ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  // setup audio
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
      signals[s] = new Signal({ value: 440, units: "hertz" }).connect(
        synths[s].frequency
      );
    } else {
      const buffer = new Buffer("../grain.wav", () => {
        console.log("buffer loaded");
        synths[s] = new GrainPlayer(buffer);
        synths[s].loop = true;
        synths[s].loopEnd = 1;
        synths[s].connect(panners[s]).start();
        signals[s] = new Signal({ value: 440, units: "hertz" });
      });
    }
  }
  landmarksRealTime(video, detector, gains, signals, panners, synths);
}

const landmarksRealTime = async (
  video: HTMLVideoElement,
  detector: handPoseDetection.HandDetector,
  gains: Array<Gain>,
  signals: Array<Signal>,
  panners: Array<Panner>,
  synths: Array<any>
) => {
  async function frameLandmarks() {
    const predictions = await detector.estimateHands(video);
    // clear canvas
    ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // if hands detected
    if (predictions.length > 0) {
      const timeNow = now();
      for (const handId in predictions) {
        const hid = parseInt(handId);
        const keypoints = predictions[hid].keypoints;
        const x: number = keypoints[0].x;
        const y: number = keypoints[0].y;
        if (x && y) {
          const newPan = clamp(
            -1,
            2.0 * ((VIDEO_WIDTH - keypoints[0].x) / VIDEO_WIDTH) - 1.0,
            1
          );
          let newFreq = readPitch(x);
          if (hid == 0) {
            synths[hid].grainSize = clamp(0.05, (1.2 - newPan) * 0.3, 2.0);
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
      ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
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
