/*
 * 👋 Hello! This is an ml5.js example made and shared with ❤️.
 * Learn more about the ml5.js project: https://ml5js.org/
 * ml5.js license and Code of Conduct: https://github.com/ml5js/ml5-next-gen/blob/main/LICENSE.md
 *
 * This example demonstrates hand tracking on live video through ml5.handPose.
 */

let handPose; // variable to store the model
let video; // variable to store video frames
let hands = []; // array to store hand poses (up to 2)
let pinch = 10000;
let pinched = false; // variable to remember pinched state

let stars = [];


function preload() {
  // Load the handPose model
  handPose = ml5.handPose();
}

function setup() {
  createCanvas(640, 480);
  // Create the webcam video and hide it
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  // start detecting hands from the webcam video
  handPose.detectStart(video, gotHands);
  //background(0);
}

function draw() {
  // Draw the webcam video
  image(video, 0, 0, width, height);

  if(hands.length>0){ // are there hands currently being tracked?
    let indexTip = hands[0].keypoints[8]; // store the index finger tip
    let thumbTip = hands[0].keypoints[4];
    let centerX = lerp(indexTip.x,thumbTip.x,0.5);
    let centerY = lerp(indexTip.y,thumbTip.y,0.5);
    pinch = dist(indexTip.x,indexTip.y,thumbTip.x,thumbTip.y);
    if(pinch<10){ // this threshold should be scaled to 
      //accomodate different depths
      strokeWeight(10);
    if(pinched == false){
        let coord = createVector(centerX,centerY);
        stars.push(coord);
        pinched = true;
      }
   } else {
      strokeWeight(1);
      pinched = false;
    }
    circle(centerX,centerY,pinch);
    WebMidi.outputs[0].channels[3].sendControlChange(
				21,
				map(pinch, 0, 100, 0, 127,true).toFixed(0)
			);


  }  

    for(i = 0; i<stars.length;i++){
     // circle(stars[i].x,stars[i].y,10);
    }


}

// Callback function for when handPose outputs data
function gotHands(results) {
  // save the output to the hands variable
  hands = results;
}
