var mic;
var video;

// strokeWeight
var sw = 1;

var step = 25;

function setup() {
  createCanvas(windowWidth, windowHeight);
  mic = new p5.AudioIn();
  mic.start();

  video = createCapture(VIDEO);
  video.size(width / step, height / step);
}

function draw() {
  background(0, 10);

  // () level smoothing
  micLevel = mic.getLevel();

  video.loadPixels();
  for (var y = 0; y <= video.height; y++) {
    for (var x = 0; x <= video.width; x++) {
      var index = (video.width - x + 1 + (y * video.width)) * 4;
      var r = video.pixels[index + 0];
      var g = video.pixels[index + 1];
      var b = video.pixels[index + 2];

      var bright = (r + g + b) / 3;

      var w = map(bright, 0, 255, 1, step / 5);

      noStroke();
      fill(255);
      ellipse(x * step + step / 2, y * step + step / 2, w, w);
    }
  }

  var m = map(micLevel, 0, 1, height / 10, height * 5);
  var shade = constrain(micLevel * 500, 0, 255);

  noFill();
  stroke(0);
  strokeWeight(map(micLevel, 0, 1, sw, sw * 100));
  ellipse(width / 2, height / 2, m, m);

  stroke(shade);
  strokeWeight(sw);

  for (y = 0; y <= height * 1.5; y += step) {
    y2 = map(micLevel, 0, 1, y, y * micLevel);
    beginShape();
    vertex(0, y);
    vertex(width, y2);
    endShape();
  }

  for (y = 0; y <= height * 1.5; y += step) {
    y2 = map(micLevel, 0, 1, y, y * micLevel);
    beginShape();
    vertex(0, y2);
    vertex(width, y);
    endShape();
  }

  for (x = 0; x <= width; x += step) {
    beginShape();
    vertex(x, 0);
    vertex(x, height);
    endShape();
  }
}
