var mycanvas,myh1;
function setup() {
  mycanvas = createCanvas(150, 150);
  mycanvas.position(200, 250);
  myh1 = createElement('h1', 'h1-New DOM Object .');
  myh1.position(100, 150);
  createP("****This is a new Paragraph*****");
}

function draw() {
  background(150, 150);
  fill(255, 0, 0);
 }