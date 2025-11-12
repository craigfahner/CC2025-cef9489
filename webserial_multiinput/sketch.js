// graphs sensor data from an analog 
// sensor on A0 to the window

let port; // object to hold serial port
let c; // button
let potentiometer = 0;
let photoCell = 0;
let pushButton = 1; // default value is 1

function setup() {
  createCanvas(windowWidth, windowHeight);
  //colors
  colorMode(HSB);
  background(220, 100, 50);
  // create instance of the lib
  port = createSerial();

  // ports can be opened via a dialog after
  // user interaction (see connectBtnClick below)
  c = createButton('Connect to Arduino');
  c.position(10, 10);
  c.mousePressed(connectBtnClick);
}

function draw() {
  background(200,100,50);
  // read serial bufffer
  let str = port.readUntil("\n");
  // split space delimited string into array of strings
  let sensorValues = str.split(" ");
  // if there's valid data
  if (str.length > 0) {
    potentiometer = sensorValues[0]; // extract potentiometer value
    photoCell = sensorValues[1]; // extract photoCell value
    pushButton = sensorValues[2]; // extract button state (0 or 1)
  }

  let circleD = map(potentiometer,0,1023,0,width);
  let brightness = map(photoCell,200,500,0,100);
  if(pushButton == 0){
    strokeWeight(10);
    stroke("white");
  } else {
    noStroke();
  }
  fill(20,100,brightness);
  circle(width/2,height/2,circleD);

  // changes button label based on connection status
  if (!port.opened()) {
    c.html('Connect to Arduino');
  } else {
    c.html('Disconnect');
  }
}
// if the connect button is clicked and there's
// no connection, look for something named
// "Arduino"
function connectBtnClick() {
  if (!port.opened()) {
    port.open('Arduino', 9600);
    
  } else {
    port.close();
  }
}