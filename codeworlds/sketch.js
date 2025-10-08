
let outerCircleDiam;
let midCircleDiam;
let innerCircleDiam;
let outerFill = "lightgreen";
let midFill = "lightgreen";
let innerFill = "lightgreen";


function setup() {
  createCanvas(windowWidth, windowHeight);
  outerCircleDiam = width;
  midCircleDiam = (width/4)*2;
  innerCircleDiam = (width/4);
}

function draw() {
  background("rgba(242, 188, 203, 1)");

  if(dist(mouseX,mouseY,width/2,height/2)<innerCircleDiam/2){
    innerFill = "orange";
  } else {
    innerFill = "lightgreen";
  }

  if(dist(mouseX,mouseY,width/2,height/2)<midCircleDiam/2 && dist(mouseX,mouseY,width/2,height/2)>innerCircleDiam/2){
    midFill = "orange";
  } else {
    midFill = "lightgreen";
  } 

  if(dist(mouseX,mouseY,width/2,height/2)<outerCircleDiam/2 && dist(mouseX,mouseY,width/2,height/2)>midCircleDiam/2){
    outerFill = "orange";
  } else {
    outerFill = "lightgreen";
  } 


  fill(outerFill);
  circle(width/2,height/2,outerCircleDiam);
  fill(midFill);
  circle(width/2,height/2,midCircleDiam);
  fill(innerFill);
  circle(width/2,height/2,innerCircleDiam);
  textAlign(CENTER);
  rectMode(CENTER);
  textSize(24)
  fill(0);
  text("Things we've learned in this class (lectures and course CC2025 course materials)",width/2,height/2,width/4,100);
  text("Official p5.js documentation (reference, p5.js website)",width/2,height/2-width/6,width/4,100);
  text("Everything else online related to programming",width/2,height/2-width/3,width/4,100);

}
