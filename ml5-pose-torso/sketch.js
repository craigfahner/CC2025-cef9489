/*
 * 👋 Hello! This is an ml5.js example made and shared with ❤️.
 * Learn more about the ml5.js project: https://ml5js.org/
 * ml5.js license and Code of Conduct: https://github.com/ml5js/ml5-next-gen/blob/main/LICENSE.md
 *
 * This example demonstrates drawing skeletons on poses for the MoveNet model.
 */

let video;
let bodyPose;
let poses = [];
let connections;

let leftWrist;
let rightWrist;

function preload() {
  // Load the bodyPose model
  bodyPose = ml5.bodyPose();
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Create the video and hide it
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  // Start detecting poses in the webcam video
  bodyPose.detectStart(video, gotPoses);
  // Get the skeleton connection information
  connections = bodyPose.getSkeleton();
}

function draw() {
  background(0);
  // Draw the webcam video
  //image(video, 0, 0, width, height);
  let scaleFactor = windowWidth/640;
  scale(scaleFactor);


  // Draw all the tracked landmark points
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      // Only draw a circle if the keypoint's confidence is bigger than 0.1
      if (keypoint.confidence > 0.1) {
        fill(0, 255, 0);
        noStroke();
        textSize(20);
        //text(j, keypoint.x, keypoint.y);
      }
    }
  }

  if(poses.length>0){
    fill(255);
    // beginShape();
    // vertex(poses[0].keypoints[5].x,poses[0].keypoints[5].y);
    // vertex(poses[0].keypoints[6].x,poses[0].keypoints[6].y);
    // vertex(poses[0].keypoints[12].x,poses[0].keypoints[12].y);
    // vertex(poses[0].keypoints[11].x,poses[0].keypoints[11].y);
    // endShape();
    
    let centerX = lerp(poses[0].keypoints[5].x,poses[0].keypoints[12].x,0.5);
    let centerY = lerp(poses[0].keypoints[5].y,poses[0].keypoints[12].y,0.5);
    circle(centerX,centerY,100);
    }
  }





// Callback function for when bodyPose outputs data
function gotPoses(results) {
  // Save the output to the poses variable
  poses = results;
}
