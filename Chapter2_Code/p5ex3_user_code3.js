var bgcolor,button;
function setup() {
  canvas = createCanvas(200, 200);
  bgcolor = color(200);
  button = createButton('Click this Button to change the color');
  button.position(250,150);
  button.mousePressed(changeColor);
}
function changeColor() {
  bgcolor = color(random(255));
}
function draw() {
  background(bgcolor);
 }