var emotions = ['happy', 'sad', 'neutral', 'angry'];
function setup() {
   var canvas1 = createCanvas(300, 300);
   canvas1.parent("canvaspara");
  var button1 = select('#button');
  button1.mousePressed(addItem1);
}
function addItem1() {
  var r = floor(random(0, emotions.length));
  var li = createElement('li', emotions[r]);
  li.parent('listofemotions');
}
function draw(){
	background(150);
}