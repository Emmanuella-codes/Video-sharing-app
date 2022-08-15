import "./styles.css";

const videoElement = document.getElementById("video");
const startElement = document.getElementById("start");
const stopElement = document.getElementById("stop");

let displayMediaOptions = {
  video: {
    cursor: "always",
    height: 1000,
    width: 1200
  },
  audio: false
};

// set event listeners for the start and stop buttons
startElement.addEventListener(
  "click",
  function (event) {
    startCapture();
  },
  false
);

stopElement.addEventListener(
  "click",
  function (event) {
    stopCapture();
  },
  false
);

async function startCapture() {
  try {
    videoElement.srcObject = await navigator.mediaDevices.getDisplayMedia(
      displayMediaOptions
    );
    dumpOptionsInfo();
  } catch (err) {
    console.log(`Error: ${err}`);
  }
}

function stopCapture(event) {
  let tracks = videoElement.srcObject.getTracks();
  tracks.forEach((track) => track.stop());
  videoElement.srcObject = null;
}

function dumpOptionsInfo() {
  const videoTrack = videoElement.srcObject.getVideoTracks()[0];
  console.info("Track settings:");
  console.info(JSON.stringify(videoTrack.getSettings(), null, 2));
  console.info("Track constraints:");
  console.info(JSON.stringify(videoTrack.getConstraints(), null, 2));
}
