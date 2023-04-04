let song, analyzer;

let barWidth = 10; // width of each bar in the visualizer
let barGap = 5; // gap between bars in the visualizer

let angle = 0; // angle of rotation for the visualizer

function preload() {
  song = loadSound("./sounds/winter.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Create the FFT object and set the audio input
  analyzer = new p5.FFT(0.8, 1024);
  analyzer.setInput(song);

  // Start playing the audio
  song.play();
}

function draw() {
  // Set the background color and stroke weight
  background(0);
  strokeWeight(2);

  // Get the frequency data from the audio file
  let spectrum = analyzer.analyze();

  // Draw the visualizer bars
  for (let i = 0; i < spectrum.length; i++) {
    let amplitude = spectrum[i];
    let barHeight = map(amplitude, 0, 255, 0, height);

    let x = i * (barWidth + barGap) + barGap / 2;
    let y = height - barHeight;

    // Set the color of the bar based on its position
    let r = map(x, 0, width, 0, 255);
    let g = map(y, 0, height, 0, 255);
    let b = map(amplitude, 0, 255, 255, 0);

    fill(r, g, b);

    // Rotate the bar based on its position and the angle
    translate(x + barWidth / 2, y + barHeight / 2);
    // rotate(angle);
    rect(-barWidth / 2, -barHeight / 2, barWidth, barHeight);
    // rotate(-angle);
    translate(-(x + barWidth / 2), -(y + barHeight / 2));
  }

  // Increment the angle of rotation
  // angle += 0.01;
}

function mousePressed() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}
