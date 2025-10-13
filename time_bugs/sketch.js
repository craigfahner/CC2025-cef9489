let bugs = [];// square brackets means i'm making an array
let bugAmount = 60; // make 60 bugs, one for each second


function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  y = height/2;
  colorMode(HSB);

  for(let i = 0;i<bugAmount;i++){
    let x = random(width); // place each bug in a random position
    let y = random(height);
    bugs[i] = new Bug(x,y);
  }
}

function draw() {
  background("lightgreen");

  // the for loop below draws a "bug" over and over again
  // it uses the "second()" function to set how many bugs are drawn
  // so if there are 30 seconds on the clock, it will draw 30 bugs  
  for(let i = 0;i<second();i++){
    bugs[i].move();
    bugs[i].display();
  }
}

class Bug { // class declares a new type of object
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.speed = 2; // make a speed variable so we can change this if we want to make the bugs move faster
  }

  move(){ // you can declare functions or "methods" like this
    this.x = this.x+random(-this.speed,this.speed);
    this.y = this.y+random(-this.speed,this.speed);
  }

  display(){
    push();
    translate(this.x,this.y);
    fill(0);
    circle(0,0,20); // instead of drawing a circle here, draw an ant that is centered at 0,0
    pop();
  }
}


