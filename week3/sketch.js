// variable declaration:
// "let" is a keyword that allows you to declare a variable
// in the below example, a new variable is being created
// called "circleSize" which is storing a number (125)

// below are GLOBAL variables: they are accessible by any block of code
let circleSize; // variable to store circle size
let redColor = "rgba(186, 95, 95, 1)"; // variable for the red colour in the painting
function setup() { // runs once at startup
  createCanvas(400, 400); // set a 400px by 400px canvas
  circleSize = width*0.35; // sets circleSize variable in relation to width

}

function draw() {

  console.log(mouseX/width + " " + mouseY/height);

  // a grayscale color is denoted as a number 0-255
  // an rgb color is denoted as 3 numbers (red green blue)
  //background(127,54,200);
  // we can use the name of a color like "black" or "olive"
  //background("aqua");
  // we can also format rgb colors as strings:
  // background("rgb(0,0,0)"); 
  //background("rgba(231, 185, 132, 1)");
  background(redColor);
  noStroke();
  fill("#d9d192ff");

  rect(0,0,width/2,height/2); // a square in the top left corner

  rect(width/2,height/2,width,height);



  // stroke and fill change the color of drawn shapes
  stroke("rgba(156, 106, 212, 1)");
  fill("rgba(145, 235, 205, 1)");

  strokeWeight(5);
  //noStroke(); gets rid of the stroke completely
  //noFill(); // gets rid of the fill completely

  // circle takes 3 parameters: x, y and d:
  circle(200,100,circleSize);

  // setting a new fill for my rectangle
  fill("rgba(224, 175, 243, 1)");
  // rect takes 4 parameters:
  // x coord of top left, y coord of top left, width and height
  rect(100,80,100,15);
  // ellipse takes 4 parameters:
  // x coord of center, y coord of center, width and height
  ellipse(250,80,10,20);

  //line connects two coords: x1,y1,x2,y2
  line(250,130,260,130);

  //to draw complex polygons (more than 2 coords):
  // create a beginShape(); function and an endShape function
  // any vertex(x,y) functions you place inbetween beginShape and endShape
  // will be rendered as points in a complete polygon

  beginShape();
  vertex(100,120); // leftmost coordinate
  vertex(200,100); // top right coordinate
  vertex(200,150); // bottom-most coordinate
  endShape(CLOSE); // CLOSE parameter closes the polygon

  fill("#deb9b9ff"); // colors can also be denoted in hex format
  //circle(width/2,height*0.75,circleSize);

  //ellipse(mouseX,mouseY,mouseY*0.25,mouseX*0.25);

  // arcs are like ellipses, except they have two extra parameters:
  // START and END, which are provided in RADIANS format
  // you can convert degrees to radians using the radians() function
  //arc(width/2,height*0.75,100,100,radians(30),radians(330),PIE);


}
