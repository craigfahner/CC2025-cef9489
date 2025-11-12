let points = []; // declaring array for coordinates
let lineStart = 0;
let lineEnd = 0;

let otherPoints = [
  {x:50,y:25},
  {x:25,y:10},
  {x:10,y:90} // these are object literals
  // they specify the keys (names of fields)
  // and values (values of fields) of different
  // child properties in an array or otherwise
];

function setup() {
  createCanvas(500, 500);

  points = [
    createVector(0,0),
    createVector(0,-100),
    createVector(85,50),
    createVector(-85,50),
    createVector(0,100),
    createVector(-85,-50),
    createVector(85,-50)
  ];
  
}

function draw() {
  noLoop();
  background(0);
  translate(width/2,height/2);
  stroke(255);
  strokeWeight(5);
  for(let i = 0;i<points.length;i++){
    point(points[i].x,points[i].y);
  }
  stroke(255,0,0);
  //line(points[lineStart].x,points[lineStart].y,
  //  points[lineEnd].x,points[lineEnd].y);
  console.log(random(1,9));
  console.log(floor(random(1,9)));
  let lineAmount = floor(random(1,9));
  for(let i = 0; i<lineAmount;i++){
    let start = floor(random(points.length));
    let end = floor(random(points.length));
    line(points[start].x,points[start].y,points[end].x,points[end].y);
  }
}

function mousePressed(){
  lineStart = floor(random(points.length));
  lineEnd = floor(random(points.length));
  // floor function will round a number
  // to whatever the lower whole integer is

}