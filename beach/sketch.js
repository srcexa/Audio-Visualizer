let cols, rows;
let scl = 25;
let w = 900;
let h = 500;

let terrain = [];

let flying = 2;

let song, fft;

function preload() {
  song = loadSound('./sounds/winter.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  cols = w / scl;
  rows = h / scl;

  for (let x = 0; x < cols; x++) {
    terrain[x] = new Float64Array(rows);
  }

  fft = new p5.FFT();
  fft.setInput(song);
  song.play();
}

function draw() {
  background(234,182,118);
  stroke(12, 37, 181);
  noFill();

  rotateX(PI / 3);

  translate(-w / 2, -h / 2);

  // Analyze frequency spectrum
  let spectrum = fft.analyze();
  let avg = fft.getEnergy("bass", "lowMid", "mid", "highMid", "treble");

  // Generate new terrain
  let yoff = flying;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let amp = map(spectrum[Math.floor(xoff * 10)], 0, 255, 0, 50);
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -amp, amp);
      xoff += 0.2;
    }
    yoff += 0.2;
  }

  // Render terrain
  for (let y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }

  flying -= avg / 200; // Animate terrain by incrementing the flying variable
}
