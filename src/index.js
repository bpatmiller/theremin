import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";

let model;
let detector;
let rafID;
let AudioContext, audioCtx, osc1, osc2, osc3;
const VIDEO_WIDTH = 640;
const VIDEO_HEIGHT = 500;
let canvas, ctx;
let colors;

function generateHslaColors(saturation, lightness, alpha, amount) {
  let colors = [];
  let huedelta = Math.trunc(360 / amount);

  for (let i = 0; i < amount; i++) {
    let hue = i * huedelta;
    colors.push(`hsla(${hue},${saturation}%,${lightness}%,${alpha})`);
  }

  return colors;
}

async function setupCamera() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    throw new Error(
      "Browser API navigator.mediaDevices.getUserMedia not available"
    );
  }

  const video = document.getElementById("video");
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
  const video = await setupCamera();
  video.play();
  return video;
}

function onTransitionEnd(event) {
  event.target.remove();
}

async function main() {
  // setup handpose model
  await tf.setBackend("webgl");
  model = handPoseDetection.SupportedModels.MediaPipeHands;
  const detectorConfig = {
    runtime: "tfjs", // or 'tfjs'
    modelType: "lite",
  };
  detector = await handPoseDetection.createDetector(model, detectorConfig);

  let video;
  try {
    video = await loadVideo();
  } catch (e) {
    let info = document.getElementById("info");
    info.textContent = e.message;
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
  AudioContext = window.AudioContext || window.webkitAudioContext;
  audioCtx = new AudioContext();

  osc1 = audioCtx.createOscillator();
  osc1.type = "sine";
  osc1.frequency.value = 1;
  osc1.connect(audioCtx.destination);
  osc1.start();

  osc2 = audioCtx.createOscillator();
  osc2.type = "saw";
  osc2.frequency.value = 2;
  osc2.connect(audioCtx.destination);
  osc2.start();

  osc3 = audioCtx.createOscillator();
  osc3.type = "square";
  osc3.frequency.value = 4;
  osc3.connect(audioCtx.destination);
  osc3.start();

  // const loadingScreen = document.getElementById("loading-screen");
  // loadingScreen.classList.add("fade-out");
  // loadingScreen.addEventListener("transitionend", onTransitionEnd);

  colors = generateHslaColors(50, 100, 1.0, 4);
  // audioCtx.resume();
  landmarksRealTime(video);
}

const landmarksRealTime = async (video) => {
  async function frameLandmarks() {
    const predictions = await detector.estimateHands(video);
    if (predictions.length > 0) {
      document.body.style.background = "#200000";

      const result = predictions[0].keypoints;
      osc1.frequency.linearRampToValueAtTime(
        -result[4].x + VIDEO_WIDTH,
        audioCtx.currentTime + 0.08
      );
      osc2.frequency.linearRampToValueAtTime(
        (-result[8].x + VIDEO_WIDTH) * 1.5,
        audioCtx.currentTime + 0.08
      );
      osc3.frequency.linearRampToValueAtTime(
        (-result[20].x + VIDEO_WIDTH) * 2,
        audioCtx.currentTime + 0.08
      );

      // draw stuff
      ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let col = 0;
      for (const handId in predictions) {
        for (const i of Array(20).keys()) {
          ctx.strokeStyle = ["red", "white"][col++ % 3];
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
      document.body.style.background = "black";
      osc1.frequency.linearRampToValueAtTime(0, audioCtx.currentTime + 5.0);
      osc2.frequency.linearRampToValueAtTime(0, audioCtx.currentTime + 5.0);
      osc3.frequency.linearRampToValueAtTime(0, audioCtx.currentTime + 6.0);
    }
    rafID = requestAnimationFrame(frameLandmarks);
  }
  frameLandmarks();
};

main();
