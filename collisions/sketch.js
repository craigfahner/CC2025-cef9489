let car;
let items = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  car = new Car();

  for (let i = 0; i < 10; i++) {
    let newItem = new Item();
    items.push(newItem);
  }
}

function draw() {
  background(255);

  let collisionDetected = false;
  let powerUpDetected = false;
  for (let i = 0; i < items.length; i++) {
    if (dist(car.x, car.y, items[i].x, items[i].y) < car.r / 2) {
      if(items[i].type == 0){
        collisionDetected = true;
      } else{
        powerUpDetected = true;
      }
      
    }
    items[i].display();
  }

  if (collisionDetected == true) {
    car.colliding = true;
  } else {
    car.colliding = false;
  }

  if (powerUpDetected == true) {
    car.poweringUp = true;
  } else {
    car.poweringUp = false;
  }

  car.display();

  if (keyIsPressed) {
    if (key == "w") {
      car.y -= car.speed;
    } else if (key == "a") {
      car.x -= car.speed;
    } else if (key == "s") {
      car.y += car.speed;
    } else if (key == "d") {
      car.x += car.speed;
    }
  }
}

function keyPressed() {}

class Car {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.r = 30;
    this.speed = 10;
    this.colliding = false;
    this.poweringUp = false;
  }

  display() {
    if (this.colliding) {
      fill("red");
    } else if (this.poweringUp) {
      fill("pink");
    } else {
      fill(0);
    }

    circle(this.x, this.y, this.r);
  }
}

class Item {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.type = floor(random(2));
  }

  display() {
    if (this.type == 0) {
      fill("green");
    } else {
      fill("orange");
    }
    circle(this.x, this.y, 30);
  }
}
