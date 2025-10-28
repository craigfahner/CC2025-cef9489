/*
 * p5.mapper
 * https://github.com/jdeboi/p5.mapper
 *
 * Jenna deBoisblanc
 * jdeboi.com
 *
 */

let pMapper;
let quadLeft, quadRight; // my quad surfaces

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  // create mapper object
  pMapper = createProjectionMapper(this);
  pMapper.load("map.json");

  quadLeft = pMapper.createQuadMap(400, 400);
  quadRight = pMapper.createQuadMap(400, 400);

}

function draw() {
  background(0);


  quadLeft.displaySketch(mySketch);
  quadRight.displaySketch(myOtherSketch);
}

function mySketch(pg){
  pg.clear();
  pg.push();
  // your sketch goes between push and pop. remember to use the 'pg.' prefix for all p5 functions
  pg.background(color('white'));
  pg.textAlign(CENTER,CENTER);
  pg.textSize(70);
  pg.fill(color('black'));
  pg.text('hello world',200,175);
  // ends here
  pg.pop();
}

function myOtherSketch(pg){
  pg.clear();
  pg.push();
  // your mini sketch goes here!
  
  pg.background(255);
  
  pg.rectMode(CORNERS);
  
  currentDataPoint = lerp(currentDataPoint, seaData.rows[seaDataIndex].obj.sealevel, 0.1);
  
  
  let h = map(currentDataPoint,0,12,0,400);
  pg.fill(0,0,255);
  pg.rect(0,400,400,(400-h));
  pg.fill(255);
  pg.textSize(25);
  pg.textAlign(CENTER,CENTER);
  pg.text(currentDataPoint.toFixed(2)+" inches",200,(400-h)+25);
  
  // and ends here!
  pg.pop();
}

function keyPressed() {
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