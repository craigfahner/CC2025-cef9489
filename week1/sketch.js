function setup() {
  createCanvas(windowWidth, windowHeight);
  
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(1);
  noFill();
    // Draw the curve.
  beginShape();
  vertex(20, 40);
  vertex(180,22); // regular vertex at beginning of rounded corner
  quadraticVertex(200,20,200,50); // quad vertex whose coordinate is 200,50, with a curve that pulls towards 200,20
  //vertex(200,20);
  vertex(190,150);
  vertex(50,195);
  quadraticVertex(30,200,25,180);
  //vertex(30,200);
  vertex(20,40);
  endShape();
  strokeWeight(5);
  stroke(255,0,0);
  point(200,20);
  point(30,200);
}
