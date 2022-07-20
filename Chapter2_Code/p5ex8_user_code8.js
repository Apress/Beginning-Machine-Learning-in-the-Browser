var p;
function setup() {
  noCanvas();
  p = createP('This is a link to click for: ');
  p.style('background-color','#AAA');
  p.style('padding', '48px');
  var a = createA('#', 'flower');
  a.mousePressed(addpic);
  a.parent(p);
}
function addpic() {
  var img = createImg('flower1.jpg');
  img.size(100, 100);
  img.parent(p);
  }