let circleOsc = 0;
let pMillis = 0;
let interval = 4000;
let circleGrowRange = 50;
let circleBaseSize = 250;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
}

function draw() {
  background(255);
  let timer = millis()-pMillis;
  if(timer>interval){
    pMillis = millis(); //reset timer after interval
  }

  text(timer.toFixed(0),50,50);
  let timePercentage = timer/interval;
  text(timePercentage.toFixed(5),50,60);
  let timeAngle = map(timePercentage,0,1,0,2*PI);
  text(timeAngle.toFixed(5),50,70);

  circleOsc = (sin(timeAngle)*circleGrowRange);
  circle(width/2,height/2,circleOsc+circleBaseSize);
}
