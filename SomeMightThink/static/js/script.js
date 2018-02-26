var mic, recorder, soundFile, file;
var sliderVol, sliderRate ;
var state = 0; // mousePress will increment from Record, to Stop, to Play
var buttonPlay, buttonRec, jumbButton;
var amp;
var h1_wating;


function setup() {
    // create an audio in
    mic = new p5.AudioIn();

    // users must manually enable their browser microphone for recording to work properly!
    mic.start();

    // create a sound recorder
    recorder = new p5.SoundRecorder();

    // connect the mic to the recorder
    recorder.setInput(mic);

    // create an empty sound file that we will use to playback the recording
    soundFile = new p5.SoundFile();

    // loading and playing
    //file = loadSound('ran', loaded);
    sliderVol = createSlider(0, 1, 0.5, 0.01);
    //sliderRate = createSlider(0, 3, 1, 0.01); First video
    file.setVolume(sliderVol.value());
    // file.rate(sliderRate.value());

    buttonRec = createButton('Rec');

    buttonRec = mousePressed(toogleRecording);


    //timing,jums an cues
    jumbButton = createButton('Jump');
    jumbButton.mousePressed(jumpFile);
    file.addCue(2, changeBackground, color(0,0,255));

    //Amplitude
    amp = new p5.Amplitude();
    console.log(amp);

    // create element
    h1_wating = createElement('h1', 'waiting..');
    h1_wating.style('color', 'red');

    //get element with id...but should be global
    //var elemnt = select('#unicorn');

    //for selecting all f.eks. p . Do this
    // var paragraphs = selectAll('p'); //but should be global
    // for (var i = 0; 1 < paragraphs i++){
    //     paragraphs[i].style('color', 'white');
    // }


}

function changeBackground(col) {
    //for random
    // background(random(255), random(255), random(255));
    background(col);
}


//jum into soundFile. duration is time
function jumpFile() {

    var len = file.duration();
    var jumpTime = len / 2;
    console.log(jumpTime);
    file.jump(jumpTime);

}

function tooglePlaying() {

    if (!file.isPlaying()){
        file.play();
        buttonPlay.html('Stop');
    }else{
        file.stop();
        buttonPlay.html('Play');
    }
}

function Record() {

    var vol = mic.getLevel();

    //Responding to level
    //ellipse(100, 100, 200, vol * 200);
    console.log(vol);
}

function toogleRecording() {

    if (!file.isRecording()){
        //file.play();
        buttonRec.html('Stop');
    }else{
        //file.stop();
        buttonRec.html('Rec');
    }
}


function loaded() {
    console.log('loaded')
    buttonPlay = createButton('play');
    buttonPlay = mousePressed(tooglePlaying);
}

function Ampi() {

    var vol = amp.getLevel();

    var diam = map(vol, 0, 0.3, 10, 200);

    fill(255, 0, 255);
    ellipse(width / 2, height / 2, diam, vol);

}

// Playing with volume. do this with micInput
function draw() {

 console.log('writing somthing');


}

function mousePressed() {

    h1_wating.html('now runnning');
    // use the '.enabled' boolean to make sure user enabled the mic (otherwise we'd record silence)

    if (state === 0 && mic.enabled) {

        // Tell recorder to record to a p5.SoundFile which we will use for playback
        recorder.record(soundFile);

        background(255,0,0);
        text('Recording now! Click to stop.', 20, 20);
        state++;
    }

    else if (state === 1) {
        recorder.stop(); // stop recorder, and send the result to soundFile

        background(0,255,0);
        text('Recording stopped. Click to play & save', 20, 20);
        state++;
    }

    else if (state === 2) {
        soundFile.play(); // play the result!
        saveSound(soundFile, 'mySound.wav'); // save file
        state++;
    }

}

//Create list with loop using parent
// var happy = ['rain', 'rainbow', 'shomming'];
//
// function setup() {
//     // put setup code here
//     var canvas = createCanvas(200, 200);
//     canvas.parent('#canvasp')
//
//
//     var button = select('#button')
//     button.mousePressed(addItem);
//
// }
//
// function addItem() {
//     var r = floor(random(0, happy.length));
//     var li = createElement('li', happy[r]);
//     li.parent('happyList');
// }
//
// function draw() {
//     background(0);
//     ellipse(200, 200, random(100), random(100));
//     fill(200);
//
//     // put drawing code here
// }