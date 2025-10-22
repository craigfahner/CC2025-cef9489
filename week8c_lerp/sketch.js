let eye1;
let eye2;

let eye2x = 0;
let eye2y = 0;

let pX = 0; // previous positions
let pY = 0;

let targetX = 0; // destination positions
let targetY = 0;

let currentX = 0; // current positions to draw eye to
let currentY = 0;

let lerpAmount = 1; // how far into our lerp are we?
let speed = 0.05; // how quickly to increment

let prevS = 0; // store previous second for timer

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  colorMode(HSB);

  // to make the eyes look in the same direction
  // set r and t values to the same numbers
  // to have them look in different directions
  // set r and t to different values

  eye1 = new EyeBall(200, 200, 100, 150, 0, 100);
  eye2 = new EyeBall(eye2x, eye2y, 100, 150, 0, 100);

}

function draw() {
  background(0);
  // set current position according to lerp functions
  currentX = lerp(pX, targetX, lerpAmount);
  currentY = lerp(pY, targetY, lerpAmount);

  eye1.x = currentX;
  eye1.y = currentY;
  //eye1.display();

  eye2x = lerp(eye2x,targetX,0.01);
  eye2y = lerp(eye2y,targetY,0.01);

  eye2.x = eye2x;
  eye2.y = eye2y;
  eye2.display();

  // every frame, increment from 0 to 1 by speed
  lerpAmount = lerpAmount + speed;
  lerpAmount = constrain(lerpAmount, 0, 1);

  if (second() != prevS) {
    prevS = second(); // store current time in stopwatch
    pX = currentX;
    pY = currentY;
    targetX = random(width);
    targetY = random(height);
    lerpAmount = 0;
  }
}

function mousePressed() {
  pX = currentX;
  pY = currentY;
  targetX = mouseX;
  targetY = mouseY;
  lerpAmount = 0;
}

class EyeBall {
  constructor(x, y, w, h, r, t) {
    this.x = x;
    this.y = y;

    this.w = w; // width
    this.h = h; // height

    this.speed = 0.005;
    this.noiseR = r;
    this.noiseT = t;
  }

  display() {
    push();
    translate(this.x, this.y);

    fill(255); // set the fill to white
    ellipse(0, 0, this.w, this.h);

    let eyeTheta = noise(this.noiseT) * 360;
    let eyeXRadius = (noise(this.noiseR) * this.w) / 2;
    let eyeYRadius = (noise(this.noiseR) * this.h) / 2;

    let eyeX = cos(eyeTheta) * eyeXRadius;
    let eyeY = sin(eyeTheta) * eyeYRadius;

    fill(0); //set fill to black
    ellipse(eyeX, eyeY, this.w / 2, this.h / 2);

    this.noiseR = this.noiseR + this.speed;
    this.noiseT = this.noiseT + this.speed;
    pop();
  }
}
