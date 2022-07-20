let video;
let posenet;
let pose;
let line_connecting_points;
function setup(){
	createCanvas(640,480);
	video=createCapture(VIDEO);
	video.hide();
	posenet=ml5.poseNet(video,modelready);
	posenet.on('pose',showPoses);
	}
function showPoses(numberofposes){
console.log(numberofposes);	
if(numberofposes.length>0)
{
	pose=numberofposes[0].pose;
	line_connecting_points=numberofposes[0].skeleton;
}
}
function modelready() {
	console.log('posenet model is ready');
}
function draw() {
	image(video,0,0);
	for (var x = 0; x < width; x += width / 10) {
		for (var y = 0; y < height; y += height / 10) {
			stroke(0);
			strokeWeight(1);
			line(x, 0, x, height);
			line(0, y, width, y);
		}
	}
	if(pose){
	fill(255,0,0);
	ellipse(pose.nose.x,pose.nose.y,32);
	fill(255,255,0);
	ellipse(pose.leftEar.x,pose.leftEar.y,32);
	ellipse(pose.rightEar.x,pose.rightEar.y,32);
	let lEye=pose.leftEye;
	let rEye=pose.rightEye;
	let d;
	d=dist(rEye.x,rEye.y,lEye.x,lEye.y);
	print(d);
	for (let i=0;i<pose.keypoints.length;i++) {
		let x=pose.keypoints[i].position.x;
		let y=pose.keypoints[i].position.y;
		fill(0,250,0);
		ellipse(x,y,20,20);
	}
	for(let i=0;i<line_connecting_points.length;i++){
		let m=line_connecting_points[i][0];
		let n=line_connecting_points[i][1];
		strokeWeight(2);
		stroke(250);
	line(m.position.x,m.position.y,n.position.x,n.position.y);
	}
  }
}