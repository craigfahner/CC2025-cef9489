

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
}

function draw() {

  // this for loop increments y from 0 to the height of the canvas
  // it draws a line every 5 pixels, and changes the hue of the stroke color
  // to create a gradient effect
  for(let y = 0;y<height;y+=5){
    let hue = map(y,0,height,0,60);
    stroke(hue,100,100);
    strokeWeight(5);
    line(0,y,width,y);
  }
}

function mousePressed() {
	// this code runs ONCE when the mouse button goes down
	console.log("mouse button goes down");
}

function mouseReleased() {
	// this code runs ONCE when the mouse button goes up
	console.log("mouse button goes up");
}