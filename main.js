img="";
status1="";
objects=[];
function preload()
{
    img=loadImage("chriscaptaiamerica.jpeg");
}
function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="status:detecting objects";
}
function modelLoaded()
{
    console.log("model loaded");
    status1=true;
    objectDetector.detect(img,gotResult);
}
function draw()
{
    image(img,0,0,600,500);
    if(status1!=""){
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="status:objects detected"; 
            fill("black");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke("tan");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}
function gotResult(error,results)
{
    if(error)  
    {
        console.error(error);
    } 
    else{
        console.log(results);
        objects=results;
    }
}

