let swingStiff;
let swingStreched;
let propeller;
let polyConnectedA;
let polyConnectedB;
let polyConnectedC;
let magnet;


let ball;
let ground;
let mouse;


function setup() {
  const canvas = createCanvas(800, 600);

  // create an engine
  let engine = Matter.Engine.create();
  let world = engine.world;

  engine.gravity.y=-1;

  // add stiff global constraint
  swingStiff = new Polygon(world, {x: 300, y: 200, s: 5, r: 100, color: 'white'});
  swingStiff.constrainTo(null, {
    pointA: { x: -10, y: -20 }, length: 150
  });

  // add damped soft global constraint
  swingStreched = new Polygon(world, {x: 400, y: 100, s: 8, r: 50, color: 'white'});
  swingStreched.constrainTo(null, {
    pointA: { x: -10, y: -20 }, length: 150, stiffness: 0.001, damping: 0.05
  });

  // add revolute constraint
  propeller = new Block(world, { x: 600, y: 200, w: 300, h: 20, color: 'white' });
  propeller.constrainTo(null, { length: 0, stiffness: 1 });

  // add stiff multi-body constraint
  polyConnectedA = new Ball(world, {x: 100, y: height-50, s: 6, r: 20, color: 'white'},{isStatic: true});
  polyConnectedB = new Ball(world, {x: 200, y: 400, s: 6, r: 20, color: 'white'});
  polyConnectedC = new Ball(world, {x: 300, y: 400, s: 6, r: 20, color: 'white'});
  polyConnectedA.constrainTo(polyConnectedB, { length: 50, stiffness: 0.01 });
  polyConnectedB.constrainTo(polyConnectedC, { length: 50, stiffness: 0.01 });
  // add a ball3 to play with the constraint
  ball = new Ball(world, {x: 550, y:150, r:20, color: 'white'});



  // ground
  ground = new Block(world, {x:400, y: height-10, w: 810, h: 30, color: 'white'}, {isStatic: true});

  // setup mouse
  mouse = new Mouse(engine, canvas);

  // run the engine
  Matter.Runner.run(engine);
}

function draw() {
  background('black');

  // swingStiff.draw();
  // swingStiff.drawConstraints();

  // swingStreched.draw();
  // swingStreched.drawConstraints();
  polyConnectedA.draw();
  polyConnectedB.draw();
  polyConnectedC.draw();
  polyConnectedA.drawConstraints();
  polyConnectedB.drawConstraints();

  // propeller.draw();
  // propeller.drawConstraints();
  //ball.draw();
  ground.draw();
  mouse.draw();
}