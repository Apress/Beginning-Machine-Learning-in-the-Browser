let x = 100; let y = 100; let extraCanvas1;
function setup() {
  createCanvas(300, 300);
  extraCanvas1 = createGraphics(300, 300);
  extraCanvas1.clear();
 }
function draw() {
  background(255,204,0);
  x += random(-5, 5);
  y += random(-5, 5);
  if (mouseIsPressed) {
    extraCanvas1.fill(255, 150);
    extraCanvas1.noStroke();
    extraCanvas1.ellipse(mouseX, mouseY, 60, 60);
  }
  image(extraCanvas1, 0, 0);
  fill('blue');
  stroke(255);
  rectMode(CENTER);
  rect(x, y, 20, 20);
}