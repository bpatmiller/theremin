import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";
import * as Tone from "tone";
import { Hands } from "@mediapipe/hands";

let rafID;
const VIDEO_WIDTH = 640;
const VIDEO_HEIGHT = 500;
let canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D;
let colors = ["red", "white"];

const gainUpdate = (gain: number) => {
  return gain * 0.5;
};

const pitchUpdate = (newVal: number, oldVal: number) => {
  return (oldVal + newVal) * 0.5;
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
  const canvasContainer = document.getElementById("canvas") as HTMLElement;
  canvasContainer.height = video.videoHeight;
  canvasContainer.width = video.videoWidth;
  ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  // setup audio
  const synth = new Tone.Synth().toDestination();

  let gains: Array<number> = Array(2).fill(0);
  let pitches: Array<number> = Array(2).fill(0);

  landmarksRealTime(video, detector, gains, pitches);
}

const landmarksRealTime = async (
  video: HTMLVideoElement,
  detector: handPoseDetection.HandDetector,
  gains: Array<number>,
  pitches: Array<number>
) => {
  async function frameLandmarks() {
    const predictions = await detector.estimateHands(video);
    // clear canvas
    ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // if hands detected
    if (predictions.length > 0) {
      for (const handId in predictions) {
        const keypoints = predictions[handId].keypoints;
        pitches[handId] = pitchUpdate(pitches[handId], keypoints[0].x);
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
      // gainUpdate(gains);
    }
    rafID = requestAnimationFrame(frameLandmarks);
  }
  frameLandmarks();
};

main();
