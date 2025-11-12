/*
 * p5.mapper
 * https://github.com/jdeboi/p5.mapper
 *
 * Jenna deBoisblanc
 * jdeboi.com
 *
 */

let pMapper; // stores the pMapper instance
let quadLeft, quadRight; // my quad surfaces
let craigQuadOne;

let craigTheta = 0;
let craigSpeed = 0.01;

let cindyTheta = 0;
let cindySpeed = 0.05;


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  // create mapper object
  pMapper = createProjectionMapper(this);
  pMapper.load("map.json");

  // create "quads" for each surface of your projection
  quadLeft = pMapper.createQuadMap(400, 400);
  quadRight = pMapper.createQuadMap(400, 400);
  craigQuadOne = pMapper.createQuadMap(400,400);
}

function draw() {
  background(0); 

  // display each of the projection surfaces in draw
  //quadLeft.displaySketch(mySketch);
  //quadRight.displaySketch(myOtherSketch);
  quadLeft.displaySketch(mySketch);
  quadRight.displaySketch(cindySketch); 
  craigQuadOne.display("pink");
}

function mySketch(pg){ // "pg" refers to each canvas "instance"
  pg.clear();
  pg.push();
  // your sketch goes between push and pop. remember to use the 'pg.' prefix for all p5 functions
  pg.colorMode(HSB);
  let hue = map(sin(craigTheta),-1,1,0,50);
  pg.background(hue,100,100);
  craigTheta = craigTheta + craigSpeed;
  // ends here
  pg.pop();
}

function cindySketch(pg){ // "pg" refers to each canvas "instance"
  pg.clear();
  pg.push();
  // your sketch goes between push and pop. remember to use the 'pg.' prefix for all p5 functions
  pg.colorMode(HSB);
  let hue = map(cos(cindyTheta),-1,1,100,180);
  pg.background(hue,100,100);
  cindyTheta = cindyTheta + cindySpeed;
  // ends here
  pg.pop();
}

function myOtherSketch(pg){
  pg.clear();
  pg.push();
  // your mini sketch goes here!
  
  pg.background(255,0,0);
  
  pg.rectMode(CORNERS);  
  // and ends here!
  pg.pop();
}

function keyPressed() { // keypressed toggles different modes
  switch (key) {
    case "c":
      pMapper.toggleCalibration();
      break;
    case "f":
      let fs = fullscreen();
      fullscreen(!fs);
      break;
    case "l":
      pMapper.load("map.json");
      break;

    case "s":
      pMapper.save("map.json");
      break;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}