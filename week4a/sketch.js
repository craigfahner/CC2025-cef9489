function setup() {
  createCanvas(windowWidth, windowHeight);

  // iteration operators:
  // i++ : adds 1 to i
  // i+=10 : adds 10 to i
  // i-- : subtracts 1 from i
  // i -=5 : subtracts 5 from i

  for (let i = 0; i < 10; i++) {
    console.log(i);
  }
}

function draw() {
  background("#eec869ff");
  //noLoop(); // prevents draw from looping
  for (let y = 50; y < height - 50; y += 100) {
    for (let x = 50; x < width - 50; x += 100) {
      push();
      translate(x, y);
      let rotation;
      rotation = map(y,50,height-50,0,PI);
      rotate(rotation);
      // everything within this push/pop block
      // will be centered, with 0,0 as the center
      //point
      let randomAmount = 0.075;
      let randomXDisp;
      let randomYDisp;

      randomXDisp = random(-y*randomAmount,y*randomAmount);
      randomYDisp = random(-y*randomAmount,y*randomAmount);
      if(mouseIsPressed == true){
        translate(randomXDisp,0);
      }
      

      strokeWeight(3);
      fill("#f0f321ff");

      circle(0, 0, 100);
      circle(-15, -10, 10);
      circle(15, -10, 10);
      let happiness;
      happiness = map(x, 0, width, -25, 25);
      noFill();
      arc(0, 0, 60, 60, radians(0 - happiness), radians(180 + happiness));
      pop();
    }
  }
}
