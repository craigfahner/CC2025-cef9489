/*
// this code expands on an example I found on youtube:
----- Coding Tutorial by Patt Vira ----- 
Name: Intro to matter.js (with p5.js)
Video Tutorial: https://youtu.be/cLXNxn5N-2Y

Connect with Patt: @pattvira
https://www.pattvira.com/
----------------------------------------
*/

const { Engine, Body, Bodies, Composite } = Matter;

let engine;
let bubbles = [];
let ground;

function setup() {
  createCanvas(400, 400);
  engine = Engine.create();

  ground = new Ground(200, 5, 400, 10); // since gravity is backwards in this example, the ground is the ceiling!
  engine.gravity.x = 0;
  engine.gravity.y = -0.25;

  Matter.Events.on(engine, "collisionStart", handleCollisions);
}

function draw() {
  background("lightblue");
  Engine.update(engine); // updating the physics world
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].display();
  }
  ground.display();
}

function mousePressed() {
  bubbles.push(new Bubble(mouseX, mouseY, 20));
}

function handleCollisions(event) {
  let pairs = event.pairs[0];
  let bodyA = pairs.bodyA;
  let bodyB = pairs.bodyB;
  if (bodyA.isStatic || bodyB.isStatic) {
    // since the ceiling is the only thing that is static
    console.log("hit!");
    if (!bodyA.isStatic) {
      bodyA.plugin.particle.hit = true;
    } else if (!bodyB.isStatic) {
      bodyB.plugin.particle.hit = true;
    }
  }
}

class Bubble {
  constructor(x, y, r) {
    this.r = r;

    this.body = Bodies.circle(x, y, this.r);
    this.body.plugin.particle = this; // register this bubble object as a property of the matter.js bodies array
    Body.setAngularVelocity(this.body, 0.2);
    Composite.add(engine.world, this.body);
    this.hit = false;
  }

  display() {
    push();
    rectMode(CENTER);
    let x = this.body.position.x;
    let y = this.body.position.y;
    let angle = this.body.angle;
    translate(x, y);
    rotate(angle);
    if (this.hit) {
      fill(255, 100);
      this.hit = false;
    } else {
      fill(255, 50);
    }

    circle(0, 0, this.r * 2);
    pop();
  }
}

class Ground {
  constructor(x, y, w, h) {
    this.w = w;
    this.h = h;

    this.body = Bodies.rectangle(x, y, this.w, this.h, { isStatic: true });
    Composite.add(engine.world, this.body);
  }

  display() {
    push();
    rectMode(CENTER);
    let x = this.body.position.x;
    let y = this.body.position.y;
    translate(x, y);
    //rect(0, 0, this.w, this.h); // uncomment to draw ceiling
    pop();
  }
}
