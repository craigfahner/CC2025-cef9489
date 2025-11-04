let json;
let parsedData;

let nycBox = {
  minLong: -74.2,
  maxLong: -73.8,
  minLat: 40.88,
  maxLat: 40.69,
};

function preload() {
  json = loadJSON("shapeData.json", parseJSON);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //noLoop();
}

function draw() {
  //console.log(parsedData.length);
  for (let j = 0; j < parsedData.length; j++) {
    let feature = parsedData[j].geometry.coordinates;
    if (parsedData[j].properties.Feat_Type == "Mapped_St") {
      beginShape();
      for (let i = 0; i < feature.length; i++) {
        strokeWeight(1);
        let coord = latlong2coord(feature[i][0], feature[i][1]);
        vertex(coord.x, coord.y);
      }
      endShape();
    }
  }
}

function parseJSON() {
  //parsedData = json.features[0].geometry.coordinates;
  parsedData = json.features;
  //console.log(parsedData);
}

function latlong2coord(long, lat) {
  let x = map(long, nycBox.minLong, nycBox.maxLong, 0, width);
  let y = map(lat, nycBox.minLat, nycBox.maxLat, 0, height);
  return { x, y };
}
