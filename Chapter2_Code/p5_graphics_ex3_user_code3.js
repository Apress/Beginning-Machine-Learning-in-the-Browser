var circles = [100, 25, 46, 72];let square1;let square2;
function setup() {
  createCanvas(500, 400);
  square1 = new Square();
  square2 = new Square();
}
function draw() {
  background('red');
  for (var i = 0; i < 4; i++) {
    stroke(255);
    fill(51);
    ellipse(i * 100 + 100, 200, circles[i], circles[i]);
  }
  square1.move();
  square1.show();
  square2.move();
  square2.show();
}
class Square {
  constructor(x, y, r) {
    this.x = 200;
    this.y = 150;
  }
  move() {
    this.x = this.x + random(-5, 5);
    this.y = this.y + random(-5, 5);
  }
  show() {
    stroke(255);
    strokeWeight(4);
    noFill();
    square(this.x, this.y, 36, 6);
  }
}