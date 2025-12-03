let interval = 1000; // generally how often do the pendulum balls swing 
let radius = 100; // how long are the strings
let speed = 5; // how fast do they swing? set below by mousex
let count = 0; // keeps track of incrementation according to speed

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

function draw() {
  
  speed = map(mouseX,0,width,1,30);
  radius = map(mouseY,0,height,50,200);
  background(255);
  let timer = count;

  text(timer.toFixed(0) + "/" + interval.toFixed(0),50,50);
  let timePercentage = timer/interval;
  text(timePercentage.toFixed(5),50,60);
  let timeAngle = map(timePercentage,0,1,0,360);
  text(timeAngle.toFixed(5)+"/360",50,70);
  let timeSin = sin(timeAngle);
  text(timeSin.toFixed(5),50,90);
  let easedAngle = map(timeSin,-1,1,0,180);
  

  let x = (cos(easedAngle)*radius)+width/2;
  let y = (sin(easedAngle)*radius);

  line(width/2,0,x,y);
  circle(x,y,10);


  timePercentage = (timer/interval)-0.05; // change this number to change its "angle" in relation to pendulum phase
  timeAngle = map(timePercentage,0,1,0,360);
  timeSin = sin(timeAngle);
  easedAngle = map(timeSin,-1,1,0,180);

  x = (cos(easedAngle)*radius)+width/2;
  y = (sin(easedAngle)*radius);

  line(width/2,0,x,y);
  circle(x,y,10);

  timePercentage = (timer/interval)-0.025; // change this number to change its "angle" in relation to pendulum phase
  timeAngle = map(timePercentage,0,1,0,360);
  timeSin = sin(timeAngle);
  easedAngle = map(timeSin,-1,1,0,180);

  x = (cos(easedAngle)*radius)+width/2;
  y = (sin(easedAngle)*radius);

  line(width/2,0,x,y);
  circle(x,y,10);

    count+=speed;

}
