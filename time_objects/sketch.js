let secondBugs = []; // array to store second bugs
let minuteBugs = []; // array to store minute bugs

// an array is a variable that contains multiple variables
// each individual variable can be accessed using an 
// index number that is fed into the square brackets
// like so: bugs[5] would give me the 6th drunk in the list


function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  y = height/2;
  colorMode(HSB);

  for(let i = 0;i<60;i++){ // make 60 bugs for "seconds"
    let x = random(width); // place each bug in a random position
    let y = random(height);
    secondBugs[i] = new Bug(x,y,"bug1");
  }

    for(let i = 0;i<60;i++){ // make 60 bugs for "minutes"
    let x = random(width); // place each bug in a random position
    let y = random(height);
    minuteBugs[i] = new Bug(x,y,"bug2"); // use "bug2" type for minutes
  }
}

function draw() {
  background("lightgreen");

  for(let i = 0;i<second();i++){ // draw a bug1 type bug for each second that has passed
    secondBugs[i].move();
    secondBugs[i].display();
  }

  for(let i = 0;i<minute();i++){ // draw a bug2 type bug for each minute that has passed
    minuteBugs[i].move();
    minuteBugs[i].display();
  }

}

class Bug { // class declares a new type of object
  constructor(x,y,type){
    this.x = x;
    this.y = y;
    this.speed = 2; // make a speed variable so we can change this if we want to make the bugs move faster
    this.type = type; // pass a string (word in quotes) to set what type of bug to draw
  }

  move(){ // you can declare functions or "methods" like this
    if(mouseIsPressed){ // added conditional that makes them move faster when mouse is pressed
      this.speed = 5;
    } else{
      this.speed = 2;
    }
    this.x = this.x+random(-this.speed,this.speed);
    this.y = this.y+random(-this.speed,this.speed);
  }

  display(){
    push();
    translate(this.x,this.y);
    fill(0);
    if(this.type=="bug1"){ // this conditional looks for the type specified, and draws a certain bug for that type
      circle(0,0,20); // instead of drawing a circle here, draw an ant that is centered at 0,0
    } else if(this.type=="bug2") { // draw a different bug if type is "bug2"
      square(0,0,20);
    }
    pop();
  }
}