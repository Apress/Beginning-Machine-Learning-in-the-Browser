const config ={
      video:{ width: 640, height: 480, fps: 50}
    };

function drawPoint(ctx, x, y, radius, color)
{
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawLine(ctx,x1,y1,x2,y2,color)
{
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.stroke();
}

function draw(ctx,part,radius,color)
{
    let k=0;

    for(k=0; k<part.length-1; k++)
    {
        const[x1,y1,z1] = part[k];
        const[x2,y2,z2] = part[k+1];

        drawPoint(ctx,x1,y1, radius,color);
        drawLine(ctx,x1,y1,x2,y2,color); 
    }

    const[x1,y1,z1] = part[k];
    drawPoint(ctx,x1,y1, radius, 0, 2 * Math.PI);
}


async function estimateHands(video, model, ctx)
{
    ctx.clearRect(0, 0, config.video.width, config.video.height);
    const predictions = await model.estimateHands(video);
    
    if (predictions.length > 0) 
    {
      
      for(let i=0; i<predictions.length;i++)
      {
          const thumb_finger = predictions[i].annotations['thumb'];
          const index_finger = predictions[i].annotations['indexFinger'];
          const middle_finger = predictions[i].annotations['middleFinger'];
          const ring_finger = predictions[i].annotations['ringFinger'];
          const pinky_finger = predictions[i].annotations['pinky'];
          const palm = predictions[i].annotations['palmBase'];

          draw(ctx,thumb_finger,3,'red');
          draw(ctx,index_finger,3,'red');
          draw(ctx,middle_finger,3,'red');
          draw(ctx,ring_finger,3,'red');
          draw(ctx,pinky_finger,3,'red');

          let[x1,y1,z1] = palm[0];
          drawPoint(ctx,x1,y1, 3, 0, 2 * Math.PI);

          let[x2,y2,z2] = thumb_finger[0];
          drawLine(ctx,x1,y1,x2,y2,'red');

          [x2,y2,z2] = index_finger[0];
          drawLine(ctx,x1,y1,x2,y2,'red');

          [x2,y2,z2] = middle_finger[0];
          drawLine(ctx,x1,y1,x2,y2,'red');

          [x2,y2,z2] = ring_finger[0];
          drawLine(ctx,x1,y1,x2,y2,'red');

          [x2,y2,z2] = pinky_finger[0];
          drawLine(ctx,x1,y1,x2,y2,'red');

        } 
    }
    setTimeout(function(){
      estimateHands(video, model, ctx);
    }, 1000 / config.video.fps)
}

async function main()
{
    const video = document.getElementById("pose-video");
    const model = await handpose.load();
    const canvas =  document.getElementById("pose-canvas");
    const ctx = canvas.getContext("2d");
      estimateHands(video, model,ctx);
      console.log("Starting predictions")
}



async function init_camera()
{
    const constraints ={
      audio: false,
      video:{
      width: config.video.width,
      height: config.video.height,
      frameRate: { max: config.video.fps }
      }
    };

    const video = document.getElementById("pose-video");
    video.width = config.video.width;
    video.height= config.video.height;

navigator.mediaDevices.getUserMedia(constraints).then(stream => {
       video.srcObject = stream;
        main();
    });
}

function init_canvas()
{
      const canvas =  document.getElementById("pose-canvas");
      canvas.width = config.video.width;
      canvas.height = config.video.height;
      console.log("Canvas initialized");
}

document.addEventListener('DOMContentLoaded',function(){
  init_canvas();
  init_camera();
});
