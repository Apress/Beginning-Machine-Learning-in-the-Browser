const canvas =  document.getElementById("pose-canvas");
const ctx = canvas.getContext("2d");
const video = document.getElementById("pose-video");

var dflag=false, kflag=false, strideflag=false, rsflag=false, lsflag=false;
var lr_step_threshold=0, height_px=0, height_cm;
var  n1=0, n2=0, start_point=0,cnfThreshold=0.10;
var pose;

const config ={
    video:{ width: 480, height: 640, fps: 30}
};

async function initializeParameters(button)
{
    let eyeL = pose.pose.leftEye
    let eyeR = pose.pose.rightEye
    let ankleL = pose.pose.leftAnkle
    let ankleR = pose.pose.rightAnkle
    let count =0;
    let timeFrame = 1000
    let start = new Date().getTime();
    let end = start;
    
    while(end - start < timeFrame)
    {
        if(eyeL.confidence >= cnfThreshold && eyeR.confidence >= cnfThreshold && ankleL.confidence >= cnfThreshold && ankleR.confidence>=cnfThreshold)
        {
            height_px = height_px+ (distance(0, eyeL.y, 0, ankleL.y) + distance(0, eyeR.y, 0, ankleR.y))/2
            start_point = start_point+ (ankleL.y +ankleR.y)/2
            lr_step_threshold = lr_step_threshold + distance(0, ankleL.y, 0, ankleR.y)
            count = count +1;
            button.innerHTML = "Initializing ...."
        }

        end = new Date().getTime();
    }
        
    height_cm = document.getElementById("height").value;
    height_px  = (height_px / count).toFixed(2);
    lr_step_threshold = ((lr_step_threshold/count) * (height_cm / height_px)).toFixed(2)
    start_point = (start_point / count).toFixed(2)

    button.innerHTML = "Done"
}

function toggleDistance(button)
{
    if (dflag)
    {
        dflag = false;
        button.innerHTML= "Start"; 
    } 
    else 
    {
        dflag = true;
        timer()
        button.innerHTML= "Stop";
        
    }
}

function timer()
{
    let sec=0,min=0;

    var time = setInterval(function(){
    	
        if (!dflag) {
            clearInterval(time);
        }
        
    	document.getElementById('time').innerHTML=min+":"+sec;
        sec++;

        if(sec == 60)
        {
            sec=0;
            min++;
        }
        
    }, 1000);
}

function toggleKnee(button)
{
    if (kflag)
    {
        kflag = false;
        button.innerHTML= "Detect"; 
    } 
    else 
    {
        
        kflag = true;
        button.innerHTML= "Pause";
    }
}

function toggleStrideLength(button)
{
    if (strideflag) 
    {
        strideflag = false;
        button.innerHTML= "Detect"; 
    } 
    else {

        if(!rsflag){
            document.getElementById("stride").innerHTML= "Activate Right Step Length"
        }
        else if(!lsflag){
            document.getElementById("stride").innerHTML = "Activate Left Step Length"
        }
        else{
            strideflag = true;
            button.innerHTML= "Pause";
        }   
    }
}

function toggleRightStep(button)
{
    if (rsflag) 
    {
        rsflag = false;
        button.innerHTML= "Detect";
    } 
    else 
    {
        rsflag = true;
        button.innerHTML= "Pause";
    }
}

function toggleLeftStep(button)
{
    if (lsflag) 
    {
        lsflag = false;
        button.innerHTML= "Detect";
    } 
    else 
    {
        lsflag = true;
        button.innerHTML= "Pause";
    }
}

function distance(x1,y1,x2,y2)
{
    let a = x2-x1;
    let b = y2-y1;
    let result = Math.sqrt( a*a + b*b);
    return result;
}

function drawPoint(x, y, radius, color)
{
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawLine(x1,y1,x2,y2,color)
{
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
}

function modelReady()
{
    console.log('Model Ready')
    video.play();
    draw();
}

async function main()
{
    const initializeBttn = document.getElementById("bttn3");
    const strideBttn = document.getElementById("bttn4");
    const rightStepBttn = document.getElementById("bttn5");
    const leftStepBttn = document.getElementById("bttn6");
    const kneeBttn = document.getElementById("bttn7")
    const distanceBttn = document.getElementById("bttn8");

    initializeBttn.onclick = function(){
        initializeParameters(initializeBttn)
    }

    strideBttn.onclick = function(){
        toggleStrideLength(strideBttn)
    }

    rightStepBttn.onclick = function(){
        toggleRightStep(rightStepBttn)
    }

    leftStepBttn.onclick = function(){
        toggleLeftStep(leftStepBttn)
    }

    kneeBttn.onclick = function(){
        toggleKnee(kneeBttn)
    }

    distanceBttn.onclick = function(){
        toggleDistance(distanceBttn)
    }

    const options = {
        imageScaleFactor: 0.3,
        outputStride: 16,
        flipHorizontal: false,
        minConfidence: 0.5,
        maxPoseDetections: 2,
        scoreThreshold: 0.5,
        nmsRadius: 20,
        detectionType: 'multiple',
        multiplier: 0.75,
    }
    
    video.src = "videos/video3.mp4";   // video File
    
    video.width = config.video.width;
    video.height= config.video.height;

    canvas.width = config.video.width;
    canvas.height = config.video.height;
    console.log("Canvas initialized");

    const poseNet = ml5.poseNet(video,options, modelReady);
    poseNet.on('pose',gotPoses);
}

function gotPoses(poses)
{
    if(poses.length > 0)
    {
        pose = poses[0]
    }
}


function draw()
{
    if (video.paused || video.ended) {
        return;
    }
    ctx.drawImage(video,0, 0, video.width, video.height)
    if(pose)
    {
        for(i=0;i< pose.pose.keypoints.length;i++)
        {
            let x = pose.pose.keypoints[i].position.x;
            let y = pose.pose.keypoints[i].position.y
            drawPoint(x,y,3,'red')
        } 

        let skeleton = pose.skeleton

        for(i=0;i<skeleton.length;i++)
        {
            let partA = skeleton[i][0];
            let partB = skeleton[i][1];
                
            drawLine(partA.position.x, partA.position.y, partB.position.x, partB.position.y,'red')
        }

        let ankleL = pose.pose.leftAnkle
        let ankleR = pose.pose.rightAnkle
        let kneeL = pose.pose.leftKnee
        let kneeR = pose.pose.rightKnee
    
        if(dflag)
        {
            let end_point = (ankleL.y+ankleR.y)/2
            let d = Math.abs(start_point - end_point)
            d = (height_cm / height_px) * d
            document.getElementById("distance").innerHTML = d.toFixed(2)
        }

        if(kflag == true)
        {
            let d = distance(kneeL.x, kneeL.y, kneeR.x, kneeR.y)
            d = (height_cm / height_px) * d
            document.getElementById("knee-d").innerHTML= d.toFixed(2);
        }

        if(rsflag == true)
        {
            let d = ankleR.y - ankleL.y
            d = (height_cm / height_px) * d

            if (d <= lr_step_threshold)
            {
                document.getElementById("rs-d").innerHTML = 0;
            }
            else
            {
                document.getElementById("rs-d").innerHTML = (d-lr_step_threshold).toFixed(2);
                n1=d;
            } 
        }

        if(lsflag == true)
        {
            let d = ankleL.y - ankleR.y
            d = (height_cm / height_px) * d

            if (d <= lr_step_threshold)
            {
                document.getElementById("ls-d").innerHTML = 0;
            }
            else
            {
                document.getElementById("ls-d").innerHTML = (d- lr_step_threshold).toFixed(2);
                n2=d;
            } 
        }

        if(strideflag == true)
        {
            if( n1 > 0 && n2 > 0 )
                document.getElementById("stride").innerHTML = (n1+n2).toFixed(2)
            else
                document.getElementById("stride").innerHTML = "Unable to detect feet";
        }

    }
    
    requestAnimationFrame(draw);
    
}


document.addEventListener("DOMContentLoaded",function(){
    main();
});
