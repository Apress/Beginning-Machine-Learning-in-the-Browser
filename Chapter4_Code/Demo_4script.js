let img;
let myposenet;
let poses = [];
let writer; // a global variable 
function setup() {
    createCanvas(640, 360);
   img= createImg('pics/DSC02254.jpg');
   img.size(width, height);
   myposenet = ml5.poseNet(img, function(){
    select('#userpic').html('Image Loaded');
    myposenet.singlePose(img);});
   myposenet.on('pose', function (results) {
       poses = results; });
     writer=createWriter('data_keypoints.json'); // writer is initialized with createWriter function
}

function draw() {
    if (poses.length > 0) {
        image(img, 0, 0, width, height);
         displayKeypoints(poses);
         displaySkeleton(poses);
         
     }
}

function displayKeypoints() {
    for (let i = 0; i < poses.length; i++) {
        let pose = poses[i].pose;
        for (let j = 0; j < pose.keypoints.length; j++) {
            let keypoint = pose.keypoints[j];
                fill(255);
                stroke(20);
                strokeWeight(4);
                ellipse(round(keypoint.position.x), round(keypoint.position.y), 8, 8);
                writer.print("keypoint: "+keypoint.part+" x:"+keypoint.position.x+" y:"+keypoint.position.y);
            }
    }
    }

function displaySkeleton() {
    for (let i = 0; i < poses.length; i++) {
        let skeleton = poses[i].skeleton;
        for (let j = 0; j < skeleton.length; j++) {
            let partA = skeleton[j][0];
            let partB = skeleton[j][1];
            stroke(255);
            strokeWeight(1);
            line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
         }
    }
    }
    function mouseClicked() {
        writer.close();
      }


