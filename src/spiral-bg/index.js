/* globals SVG, saveAs */

const IDMColors = {
  indigo: '#0066b3',
  green: '#00a651',
  yellow: '#ffcb05',
  red: '#ed1c24',
  blue: '#00aeef',
  purple: '#7670b3',
  lgreen: '#a6ce39',
  fucsia: '#c657a0',
  orange: '#f58220',
};

// Poster size
const A3_WIDTH = 841.9;
const A3_HEIGHT = 1190.6;
const WIDTH = A3_WIDTH;
const HEIGHT = A3_HEIGHT;
// We leave a blank circle at the center of the spiral
const SPIRAL_CENTER_RADIUS = WIDTH / 4;
// Number of colored dots
const DOT_COUNT = 2600;
// The colored dots start small near the center and grow as they spiral out
const MIN_DOT_SIZE = 7;
const MAX_DOT_SIZE = MIN_DOT_SIZE * 4;

// The Golden Angle, in radians
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

// Return a random color from the list of IDM colors
function randomColor() {
  const keys = Object.keys(IDMColors);
  const index = Math.floor(Math.random() * keys.length);
  return IDMColors[keys[index]];
}

// Create the SVG element
const draw = SVG().addTo('.svg-container').size(WIDTH, HEIGHT).viewbox(0, 0, WIDTH, HEIGHT);

// Make a spiral of circles.
const spiral = draw.group();
// We place the circles in a spiral, one at a time, starting at the center.
for (let i = 0; i < DOT_COUNT; i += 1) {
  // To lay out the dots forming a spiral we use two variables:
  // - the distance from the center of the spiral to the current dot,
  // - the angle of the current dot
  // By increasing the distance and angle, we get a spiral.
  const radius = (SPIRAL_CENTER_RADIUS + i * 0.25);
  const angle = i * GOLDEN_ANGLE;
  // We need to convert the "polar coordinates" (distance, angle) to "cartesian coordinates" (x, y)
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);
  // The dots are small near the center and become larger as they spiral out
  const size = MIN_DOT_SIZE + ((MAX_DOT_SIZE - MIN_DOT_SIZE) / DOT_COUNT) * i;

  // Create the circle that represents the dot using the parameters we just calculated
  spiral
    .circle(size)
    .center(WIDTH / 2 + x, WIDTH / 2 + y)
    .attr({ fill: randomColor() });
}

// Add the download button handler
document.getElementById('download').addEventListener('click', () => {
  // Extract the SVG data and send it to the browser as a fake file download
  const svgData = document.getElementsByTagName('svg')[0].innerHTML;
  const fullSVG = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
\t viewBox="0 0 ${A3_WIDTH} ${A3_HEIGHT}">
${svgData}
</svg>`;
  const blob = new Blob([fullSVG], { type: 'image/svg+xml' });
  saveAs(blob, 'poster-background.svg');
});
