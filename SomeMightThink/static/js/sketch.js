var mic, recorder, soundFile, vol, reverb, micFill;
var capture, stream, videoRecorder, blob;
var state = 0;
var myCanvas, myCanvasTwo, vid;
var flagStart = true;
var flagNext = false;
var flagNextToUse = false;
var flagUse = false;
var flagCanvas = true;
var soundIsPlayed = false;
var voiceDuration, duration;
var timeoutID, crossOver, timeoutBtn;
var chunks = [];


document.getElementById("reTake").addEventListener("click", backToVoc);
document.getElementById("rec").addEventListener("click", start);
document.getElementById("save").addEventListener("click", save);
document.getElementById("next").addEventListener("click", next);
document.getElementById("reDoBtn").addEventListener("click", reLoad);
document.getElementById("download").addEventListener("click", download);
document.getElementById("plyAll").addEventListener("click", playAllMedia);

function setup() {

    myCanvas = createCanvas(350, 300);
    myCanvas.parent('myContainer');

    myCanvasTwo = createCanvas(350, 300);
    myCanvasTwo.parent('myContainerTwo');

    background(0);

    mic = new p5.AudioIn();
    mic.start();
    recorder = new p5.SoundRecorder();
    recorder.setInput(mic);

    //reverb = new p5.Reverb();

    soundFile = new p5.SoundFile();

}

function start() {

    if (flagStart === true) {
        soundRecord();
        flagNext = true;
    }
    else if (soundIsPlayed === true) {
        soundIsPlayed = false;
        flagNext = false;
        togglePlay();
    }
}

function togglePlay() {

    if (soundFile.isLoaded()){
        soundFile.play();
        getTime();
        document.getElementById("duration").innerHTML = 'Happy or try again.'
        'You can also save for later';
        $('#rec').css('display', 'none');
        $('#reTake').css('display', 'block');
        $('#next').css('display', 'block');
        $('#save').css('display', 'block');
        soundIsPlayed = true;
    }else
    {
        document.getElementById("duration").innerHTML = 'Hmm no sound, try again';
    }
}

function next() {

    if (soundFile.isLoaded){
      flagCanvas = false;
    //  mic.stop()
      capture = createCapture(VIDEO);
      capture.size(350, 300);
      capture.hide();
      $('#myContainer').css('visibility', 'visible');
      $('#myContainer').css('border', 'solid #42DCA3 1px');
      $('#next').css('display', 'none');
      $('#save').css('display', 'none');
      $('#reTake').css('display', 'none');
      $('#vidRec').css('display', 'block');
      $('#openLoadVideo').css('display', 'block');

      flagNextToUse = true;
      document.getElementById("duration").innerHTML = 'Now record motion or choose file';
      console.log('Camera is on');

    }
    else {
      document.getElementById("duration").innerHTML = 'Easy tiger, your voice is not ready, just try again';
    }
}

function backToVoc(){

  $('#reTake').css('display', 'none');
  $('#rec').css('display', 'block');
  $('#next').css('display', 'none');
  $('#rec').html('Rec');
  console.log('rec is rec');
  $('#vidRec').css('display', 'none');
  document.getElementById("duration").innerHTML = 'Then try again';
  flagStart = true;
  state = 0;
}

function reLoad(){
  location.reload();
}

function getTime() {
    voiceDuration = soundFile.duration();
    duration = voiceDuration * 1000;
    console.log(duration);
}

function soundRecord() {
    console.log('rec is pressed');
    console.log('vidRec is rec');
    if (state === 0) {
        recorder.record(soundFile);
        state++;
        $('#rec').html('Stop');
        $('#openLoadSound').css('display', 'none');
        console.log('rec is stop');
        $('#myContainerTwo').css('border', 'solid red 1px');
    }
    else if (state === 1) {
        recorder.stop();
        state++;
        $('#rec').html('Play');
        console.log('rec is play');
        document.getElementById("duration").innerHTML = 'Now listen';
        $('#myContainerTwo').css('border', 'solid white 1px');
    }
    else if (state === 2) {
        state++;
        flagStart = false;
        togglePlay();
        $('#myContainerTwo').css('border', 'solid yellow 1px');
    }
}

function save(){saveSound(soundFile, 'mySound.wav');}

function loadSound(){
//  $('#uploadSound').click();
  alert('sss');
  console.log('sound loaded')
}


function delayedAlert() {
  videoRecord();
  timeoutID = window.setTimeout(myFunction, duration);
  countdown();
}

function countdown(){
  var downloadTimer = setInterval(function(){
  duration--;
  $('#vidRec').html(duration);
  if(duration <= 0)
      clearInterval(downloadTimer);
  },1);
}

function videoRecord() {
  $('#videoLoader').css('display', 'none');
    chunks.length = 0;
    let stream = document.querySelector('canvas').captureStream(25),
        videoRecorder = new MediaRecorder(stream);
    soundFile.play();
    console.log(videoRecorder.state);
    videoRecorder.ondataavailable = e => {
        if (e.data.size) {
            chunks.push(e.data);
        }
    };
    videoRecorder.onstop = exportVideo;
      myFunction = e => {
        videoRecorder.stop();
        $('#myContainer').css('border', 'solid #42DCA3 1px');
        document.getElementById("duration").innerHTML = 'Happy or try again';
    };
    videoRecorder.start();
}

function exportVideo(e) {
    blob = new Blob(chunks);
    vid = document.createElement('video');
    vid.id = 'recorded'
    //vid.controls = true;
    vid.src = URL.createObjectURL(blob);
    document.getElementById('myContainer').appendChild(vid);
    $('#myContainerTwo').css('display', 'none');
    $('#vidRec').css('display', 'none');
    crossfade();
}

//All nessisery??
function download() {
  var blob = new Blob(chunks, {type: 'video/mp4'});
  var url = window.URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'test.mp4';
  document.body.appendChild(a);
  a.click();
  setTimeout(function() {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 100);
}

function loadVideo(){
  $("#videoLoader").click();
  console.log('video loaded')
}

function crossfade(){
  document.getElementById("duration").innerHTML = 'Whait for it';
  $('canvas').animate({height: "toggle", opacity: "toggle"}, "slow");
  $('body').css('background-color', 'white');
  $('#myContainer').css('border', 'solid black 1px');
  crossOver = window.setTimeout(playAllMedia, 1500);
}

function playAllMedia() {
    $('body').css('background-color', 'black');
    $('#plyAll').css('display', 'block');
    $('#share').css('display', 'block');
    $('#reDoBtn').css('display', 'block');
    $('#download').css('display', 'block');
    $('#myContainer').css('border', 'solid #42DCA3 1px');
    document.getElementById("duration").innerHTML = 'Happy with your thoughts?';
    //reverb.process(soundFile, 2, 2);
    vid.play();
    soundFile.play();
}

function draw() {

    var vol = mic.getLevel();

    if (flagCanvas) {
        var size = map(vol, 1, 2, 0, 250);
        ellipse(width / 2, height / 2, size, size);
        micFill = fill('red');
        micFill.id = 'micFill'
    }
    else {

        image(capture, 0, 0, width, width * capture.height / capture.width);
        filter('GRAY');
        flagCanvas = false;
    }
}

