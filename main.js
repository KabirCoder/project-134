var song= "";
//var object_detected= "";
var object=[]
var object_status= "";


function preload() {
    song =loadSound("halloween_1978_hd.mp3")
}


function setup(){
    canvas=createCanvas(380, 380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380)
    video.hide();
    object_detected=ml5.objectDetector("cocossd", modelloaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects"
    
}





function draw(){
image(video,0,0,380,380);



 if (object_status!="") {
    r=random(254);
    g=random(254);
    b=random(255);
     object_detected.detect(video, gotResults);
    for(var t= 0; t<object.length;t++)
    
        document.getElementById("status").innerHTML="Status:Objects Detected";
        //document.getElementById("baby_found").innerHTML="Baby Found";
        fill(r,g,b);
        percentage= floor(object[t].confidence*100);
        text(object[t].label+"  "+percentage+"%",object[t].x+15, object[t].y+15);
        noFill();
        stroke(r,g,b);
        rect(object[t].x, object[t].y, object[t].width, object[t].height);
        if (object[t].label=="person") {
            document.getElementById("baby_found").innerHTML="Baby Found";
            song.stop();

        }
        else{
            document.getElementById("baby_found").innerHTML="Baby Not Found";
            song.play();

 }
    if (object.length==0) {
        document.getElementById("baby_found").innerHTML="Baby Not Found";
        song.play();
}


}    

}

function modelloaded(){

    console.log("Model Loaded");
   object_status= true;


}

function gotResults(error,results){
    if (error) {
        console.error(error);
    } else {
        console.log(results)
        object= results;

    }
}

