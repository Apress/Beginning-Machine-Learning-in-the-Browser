var mybgcolor,mybutton,myslider1,myinput1,myname;
function setup() {
  mycanvas = createCanvas(200, 200);
  mybgcolor = color(200);
  myname = createP('Your name!');
  mybutton = createButton('Click to resize the circle');
  mybutton.mousePressed(changeColor);
  myslider1 = createSlider(10, 100, 86);
  myinput1 = createInput('Enter your name::');
}
function changeColor() {
  mybgcolor = color(random(255));
}
function draw() {
  background(mybgcolor);
  fill(255, 0, 175);
  ellipse(100, 100, myslider1.value(), myslider1.value());
  myname.html(myinput1.value());
  text(myinput1.value(), 10, 20);
}