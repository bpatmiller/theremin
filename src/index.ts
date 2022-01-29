import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";
import * as Tone from "tone";
import { Hands } from "@mediapipe/hands";
import { OmniOscillator } from "tone";
import { PolySynth } from "tone";
import { FMSynth } from "tone";
import { Synth } from "tone";
import { Frequency } from "tone";

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
  return ((100 * (VIDEO_WIDTH - val)) / VIDEO_WIDTH) ** 1.5;
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

  let gains: Array<Tone.Gain> = Array(2);

  // const synth1 = new Tone.AMSynth(Tone.Synth).toDestination();
  // const synth2 = new Tone.FMSynth(Tone.Synth).toDestination();
  // synth2.portamento = 1.0;
  // const synths = [synth1, synth2];

  // const now = Tone.now();
  // synth1.triggerAttackRelease(440, 1, now);

  // synth2.triggerAttackRelease(440 * 0.5, 1, now);

  const synths = Array(2);
  const signals = Array(2);
  for (const s in [1, 2]) {
    gains[s] = new Tone.Gain(0).toDestination();
    synths[s] = new Tone.OmniOscillator().connect(gains[s]).start();
    signals[s] = new Tone.Signal({ value: 440, units: "hertz" }).connect(
      synths[s].frequency
    );
  }
  landmarksRealTime(video, detector, gains, signals, synths);
}

const landmarksRealTime = async (
  video: HTMLVideoElement,
  detector: handPoseDetection.HandDetector,
  gains: Array<Tone.Gain>,
  signals: Array<Tone.Signal>,
  synths: Array<Synth>
) => {
  async function frameLandmarks() {
    const predictions = await detector.estimateHands(video);
    // clear canvas
    ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // if hands detected
    if (predictions.length > 0) {
      const now = Tone.now();
      for (const handId in predictions) {
        const hid = parseInt(handId);
        const keypoints = predictions[hid].keypoints;
        const newFreq = readPitch(keypoints[0].x);
        signals[hid].rampTo(newFreq, 0.05);
        gains[hid].gain.rampTo(readGain(keypoints[0].y), 0.1);
        console.log(gains[hid].gain.value);
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
        g.gain.rampTo(0, 0.25);
      }
    }
    rafID = requestAnimationFrame(frameLandmarks);
  }
  frameLandmarks();
};

main();
