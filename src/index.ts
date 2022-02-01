import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";
import { Hands } from "@mediapipe/hands";
import { now, GrainPlayer, Signal, Gain, Panner, OmniOscillator } from "tone";
import { clamp } from "@tensorflow/tfjs-core/dist/util";
import { Buffer } from "tone";
import { Distortion } from "tone";
import { BitCrusher, context } from "tone";
import { min } from "@tensorflow/tfjs-core";

let rafID;
let VIDEO_WIDTH = 640;
let VIDEO_HEIGHT = 500;
let canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D;
let colors = ["red", "white"];

const readGain = (y: number) => {
  return (VIDEO_HEIGHT - y) / VIDEO_HEIGHT;
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
  VIDEO_HEIGHT = video.width;
  VIDEO_WIDTH = video.height;

  // resize canvas
  document.getElementById("loading")?.style.setProperty("display", "none");
  canvas = document.getElementById("canvas") as HTMLCanvasElement;
  canvas.height = VIDEO_HEIGHT;
  canvas.width = VIDEO_WIDTH;
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
      const buffer = new Buffer(
        "https://raw.githubusercontent.com/bpatmiller/theremin/master/grain.wav",
        () => {
          console.log("buffer loaded");
          synths[s] = new GrainPlayer(buffer);
          synths[s].loop = true;
          synths[s].loopEnd = 1;
          synths[s].connect(panners[s]).start();
          signals[s] = new Signal({ value: 440, units: "hertz" });
        }
      );
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
    // if (context.state !== "running") {
    //   document
    //     .getElementById("audioCtxSusp")
    //     ?.setAttribute("display", "inline");
    // } else {
    //   document.getElementById("audioCtxSusp")?.setAttribute("display", "none");
    // }
    const predictions = await detector.estimateHands(video);
    // clear canvas
    ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // if hands detected

    if (predictions.length > 0) {
      let isRight = false;
      let isLeft = false;
      const timeNow = now();
      const kp = 16;
      for (const handId in predictions) {
        const hid = parseInt(handId);
        const keypoints = predictions[hid].keypoints;
        const x: number = keypoints[kp].x;
        const y: number = keypoints[kp].y;
        if (x && y) {
          const newPan = clamp(
            -1,
            2.0 * ((VIDEO_WIDTH - x) / VIDEO_WIDTH) - 1.0,
            1
          );
          let newFreq = readPitch(x);
          if (predictions[hid].handedness == "Left") {
            synths[0].grainSize = clamp(0.01, (1.2 - newPan) * 0.1, 2.0);
            synths[0].detune = 12 * 1 * newPan;
            synths[0].playbackRate = clamp(0.5, 0.5 + 8 * (1.1 - newPan), 40);
            gains[0].gain.rampTo(readGain(y) * 4, 0.1);
            isRight = true;
          } else {
            signals[1].rampTo(newFreq, 0.05);
            gains[1].gain.rampTo(readGain(y) * 0.1, 0.1);
            isLeft = true;
          }
          panners[hid].pan.rampTo(newPan);
        }
      }
      if (!isLeft) {
        gains[1].gain.rampTo(0, 0.25);
      }
      if (!isRight) {
        gains[0].gain.rampTo(0, 0.25);
      }
      for (const handId in predictions) {
        ctx.beginPath();
        ctx.strokeStyle =
          predictions[handId].handedness == "Left"
            ? "hsl(16, 40%, 10%)"
            : "hsl(160, 60%, 5%)";
        ctx.lineWidth = 6;
        ctx.lineJoin = "round";
        for (const i of Array(21).keys()) {
          const el = predictions[handId].keypoints[i];
          if (i == 0) {
            ctx.moveTo(el.x, el.y);
          } else {
            ctx.lineTo(el.x, el.y);
          }
        }
        ctx.stroke();
      }
    } else {
      // ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
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
