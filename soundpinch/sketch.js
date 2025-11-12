let kick;
let snare;

//ml5 vars
let handPose;
let video;
let hands = [];
// A variable to track a indexPinch between thumb and index
let indexPinch = 0;
let indexPinched = false;

let ringPinch = 0;
let ringPinched = false;

function preload() {
  kick = loadSound("kick.wav");
  snare = loadSound("snare.wav");
  handPose = ml5.handPose();
}

function setup() {
  createCanvas(640, 480);
  // Create the webcam video and hide it
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  // Start detecting hands from the webcam video
  handPose.detectStart(video, gotHands);
}

function draw() {
  // Draw the webcam video
  image(video, 0, 0, width, height);

  // If there is at least one hand
  if (hands.length > 0) {
    // Find the index finger tip and thumb tip
    let index = hands[0].index_finger_tip;
    let thumb = hands[0].thumb_tip;
    let ring = hands[0].ring_finger_tip;

    // Draw circles at finger positions
    let centerIndexX = (index.x + thumb.x) / 2;
    let centerIndexY = (index.y + thumb.y) / 2;
    let centerRingX = (ring.x + thumb.x) / 2;
    let centerRingY = (ring.y + thumb.y) / 2;
    // Calculate the indexPinch "distance" between finger and thumb
    let indexPinch = dist(index.x, index.y, thumb.x, thumb.y);

    let ringPinch = dist(ring.x, ring.y, thumb.x, thumb.y);

    if (indexPinch < 10) {
      fill(255, 0, 0, 100);
      if (!indexPinched) {
        kick.play();
        indexPinched = true;
      }
    } else {
      fill(0, 255, 0, 200);
      indexPinched = false;
    }

        // This circle's size is controlled by a "indexPinch" gesture
    stroke(0);
    strokeWeight(2);
    circle(centerIndexX, centerIndexY, indexPinch);

    if (ringPinch < 10) {
      fill(255, 0, 0, 100);
      if (!ringPinched) {
        snare.play();
        ringPinched = true;
      }
    } else {
      fill(0, 255, 0, 200);
      ringPinched = false;
    }
    // This circle's size is controlled by a "indexPinch" gesture
    stroke(0);
    strokeWeight(2);
    circle(centerRingX, centerRingY, ringPinch);

  }
}

// Callback function for when handPose outputs data
function gotHands(results) {
  // Save the output to the hands variable
  hands = results;
}
