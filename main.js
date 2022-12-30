img = "";
status = "";
objects = [];


function preload() {
    img = loadImage("mango.jpg");
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status - Detecting Objects";
}

function modelLoaded() {
    console.log("model loaded! :D");
    status = true;

}

function gotResult(error, results) {
    if (error) {
        console.log("there is an error in the system :(");
    } else {
        console.log(results);
        console.log("The results are here! :D");
        objects = results;
    }
}

function draw() {
    image(video, 0, 0, 380, 380);
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            r = random(255);
            g = random(255);
            b = random(255);
            document.getElementById("status").innerHTML = "Status: Object Detected :D";
            document.getElementById("Number_Of_objects").innerHTML = "Number Of Objects Detected Are: " + objects.length;
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y - 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }

    }
    // fill("#F97068");
    // text("dog",45,55);
    // noFill();
    // stroke("#F97068");
    // rect(30,60,450,350);

    // fill("#F97068");
    // text("Cat",320,120);
    // noFill();
    // stroke("#F97068");
    // rect(300, 90, 270, 320);
}