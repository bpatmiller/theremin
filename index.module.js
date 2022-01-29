let camera, scene, renderer;
let model;
let videoWidth, videoHeight, rafID, aspectX, aspectY;
let stats;
let AudioContext, audioCtx, osc;
const VIDEO_WIDTH = 640;
const VIDEO_HEIGHT = 500;

import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";

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
  model = await handpose.load();
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
  let showRenderer = false;

  if (showRenderer) {
    // setup three js
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      500
    );

    camera.position.z = 1;
    camera.position.x = 0;
    camera.position.y = 0;

    const plane = new THREE.CircleBufferGeometry(2.0, 32);
    const planeMat = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const planeMesh = new THREE.Mesh(plane, planeMat);
    planeMesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), 0.5);
    planeMesh.position.z = 0;
    planeMesh.position.y = -1;
    // planeMesh.receiveShadow = true;

    // scene.add(planeMesh);

    const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const material = new THREE.MeshStandardMaterial({ color: 0xeeeeee });
    var cubes = [];

    const group = new THREE.Group();
    for (let i = 0; i < 21; i++) {
      const cube = new THREE.Mesh(geometry, material);
      // cube.receiveShadow = true;
      // cube.castShadow = true;
      group.add(cube);
      cubes.push(cube);
    }

    scene.add(group);

    const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    scene.add(hemisphereLight);

    const directionalLight = new THREE.DirectionalLight(0xfffefe, 0.5);
    directionalLight.position.set(-2.0, 4.0, 1.0);
    directionalLight.castShadow = true;

    directionalLight.shadow.mapSize.width = 512; // default
    directionalLight.shadow.mapSize.height = 512; // default
    directionalLight.shadow.camera.near = 0.5; // default
    directionalLight.shadow.camera.far = 500; // default

    scene.add(directionalLight);

    renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    renderer.domElement.style.width = 640 + "px";
    renderer.domElement.style.height = 500 + "px";
    document.body.appendChild(renderer.domElement);
  }
  // setup audio
  AudioContext = window.AudioContext || window.webkitAudioContext;
  audioCtx = new AudioContext();

  osc = audioCtx.createOscillator();
  osc.type = "sine";
  osc.frequency.value = 1;
  osc.connect(audioCtx.destination);
  osc.start();

  const loadingScreen = document.getElementById("loading-screen");
  loadingScreen.classList.add("fade-out");
  loadingScreen.addEventListener("transitionend", onTransitionEnd);

  // audioCtx.resume();
  landmarksRealTime(video, cubes);
}

const landmarksRealTime = async (video, cubes) => {
  async function frameLandmarks() {
    const predictions = await model.estimateHands(video);
    if (predictions.length > 0) {
      const result = predictions[0].landmarks;

      osc.frequency.linearRampToValueAtTime(
        -result[0][0] + VIDEO_WIDTH,
        audioCtx.currentTime + 0.08
      );

      // compute pinky-index rotation
      // indices 17, 5
      // pinky-index vector = pi
      // just get norm(pi).x

      // let pix = result[17][0] - result[5][0];
      // let piz = result[17][2] - result[5][2];
      // let yrot = pix / Math.sqrt(pix ** 2 + piz ** 2);

      // update 3d hand model
      if (false) {
        for (let i = 0; i < 21; i++) {
          cubes[i].position.x =
            (-result[i][0] + VIDEO_WIDTH * 0.5) / VIDEO_WIDTH;
          cubes[i].position.y =
            (-result[i][1] + VIDEO_HEIGHT * 0.5) / VIDEO_HEIGHT;
          cubes[i].position.z = result[i][2] * 0.005;
        }
      }
    } else {
      osc.frequency.linearRampToValueAtTime(0, audioCtx.currentTime + 4.0);
    }

    // renderer.render(scene, camera);
    rafID = requestAnimationFrame(frameLandmarks);
  }
  frameLandmarks();
};

main();
