let webcam_output;
let myposenet;
let poses=[];

function setup() {
	createCanvas(640,480);
	webcam_output=createCapture(VIDEO);
	webcam_output.size=(width,height);
	myposenet=ml5.poseNet(webcam_output,function(){
	select('#uservideo').html('User Video Loaded')});
	myposenet.on('pose',function(results) {
	poses=results; });
	webcam_output.hide();
}

function draw() {
	image(webcam_output,0,0,width,height);
	displayKeypoints();
}

function displayKeypoints() {
	for(let i=0;i<poses.length;i++) {
		let pose=poses[i].pose;
		for(let j=0;j<pose.keypoints.length;j++) {
			let point=pose.keypoints[j];
				fill(0,0,255);
				noStroke();
				ellipse (point.position.x,point.position.y,10,10);
		}
	}
}
				
	