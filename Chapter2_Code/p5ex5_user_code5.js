var bgcolor1,mybutton1,myslider1,mynameInput,mynamepar;
function setup() {
  mycanvas = createCanvas(200, 200);
  mycanvas.mouseOver(overpara);
  mycanvas.mouseOut(outpara);
  mycanvas.mousePressed(changeColor);
  bgcolor1 = color(200);
  mynamepar = createP('Dummy Text!');
  mybutton1 = createButton('Click');
  mybutton1.mousePressed(changeColor);
  myslider1 = createSlider(10, 100, 86);
  mynameInput = createInput('Enter your name::');
  mynamepar.mouseOver(overpara);
  mynamepar.mouseOut(outpara);
  mynameInput.changed(updateText);
  }
function updateText(){mynamepar.html(mynameInput.value()); }
function overpara()  {mynamepar.html('your mouse is over me');}
function outpara()   {mynamepar.html('your mouse is out');}
function changeColor(){bgcolor1 = color(random(255));}
function draw(){ background(bgcolor1); 
                 fill(255, 0, 175); 
		ellipse(100, 100, myslider1.value(), myslider1.value());
		         text(mynameInput.value(), 10, 20); 
				}