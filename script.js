//Global Constants
const cluePauseTime = 333; //how long to pause in between clues
const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence

//Global Variables
var pattern = [];
var progress = 0;
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.5;
var guessCounter = 0;
var clueHoldTime = 1000; //how long to hold each clue's light/sound
var numMistakes;
var roundEndTime;
var timeRemaining;
var countdownInterval;
const allScales = [
  [261.63, 293.66, 329.63, 349.23, 392, 440, 493.88, 523.25], // C
  [277.18, 311.13, 349.23, 369.99, 415.30, 466.16, 523.25, 554.37], // C#
  [293.66, 329.63, 369.99, 392, 440, 493.88, 554.37, 587.33], // D
  [311.13, 349.23, 392, 415.3, 466.16, 523.25, 587.33, 622.25], // Eb
  [329.63, 369.99, 415.30, 440, 493.88, 554.37, 622.25, 659.25], // E
  [349.23, 392, 440, 466.16, 523.25, 587.33, 659.25, 698.46], // F
  [369.99, 415.3, 466.16, 493.88, 554.37, 622.25, 698.46, 739.99], // F#
  [392, 440, 493.88, 523.25, 587.33, 659.25, 739.99, 783.99], // G
  [415.3, 466.16, 523.25, 554.37, 622.25, 698.46, 783.99, 830.61], // G#
  [220, 246.94, 277.18, 293.66, 329.63, 369.99, 415.3, 440], // A
  [233.08, 261.63, 293.66, 311.13, 349.23, 392, 440, 466.16], // Bb
  [246.94, 277.18, 311.13, 329.63, 369.99, 415.3, 466.16, 493.88]  // B
]
var freqMap = allScales[0];

function genPattern(length) {
  for (let i = 0; i < length; i++) {
    pattern[i] = Math.floor(Math.random() * 8) + 1;
  }
}

function startGame() {
  //initialize game variables
  progress = 0;
  gamePlaying = true;
  numMistakes = 0;
  var scale = Math.floor(Math.random() * 12);
  freqMap = allScales[scale]
  updateLetters(scale);
  //swap the START and STOP buttons
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  genPattern(8);
  playClueSequence(false);
}

function stopGame() {
  gamePlaying = false;
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
  clearInterval(countdownInterval);
  document.getElementById("time").innerHTML = "00:00";
}

function lightButton(btn) {
  document.getElementById("button" + btn).classList.add("lit");
}
function clearButton(btn) {
  document.getElementById("button" + btn).classList.remove("lit");
}

function playSingleClue(btn) {
  if (gamePlaying) {
    lightButton(btn);
    playTone(btn, clueHoldTime);
    setTimeout(clearButton, clueHoldTime, btn);
  }
}

function playClueSequence(isCounting) {
  guessCounter = 0;
  clueHoldTime = 1000 - 100 * progress;
  let delay = nextClueWaitTime; // set delay to initial wait time
  for (let i = 0; i <= progress; i++) {
    // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms");
    setTimeout(playSingleClue, delay, pattern[i]); // set a timeout to play that clue
    delay += clueHoldTime;
    delay += cluePauseTime;
  }
  if (!isCounting) {
    clearInterval(countdownInterval);
    roundEndTime = Date.now() + 31000;
    countdownInterval = setInterval(updateTime, 1000);
  }
}

function guess(btn) {
  console.log("user guessed: " + btn);
  if (!gamePlaying) {
    return;
  }
  if (btn != pattern[guessCounter]) {
    // if the guess was wrong
    numMistakes++;
    if (numMistakes == 3) {
      loseGame();
      return;
    } else {
      playClueSequence(true); // Plays same clue sequence again
    }
  } else {
    // if the guess was correct
    if (guessCounter < progress) {
      guessCounter++;
    } else {
      if (progress == pattern.length - 1) {
        winGame();
      } else {
        progress++;
        playClueSequence(false);
      }
    }
  }
}

function updateTime() {
  timeRemaining = Math.ceil((roundEndTime - Date.now()) / 1000);
  if (timeRemaining > 9) {
    document.getElementById("time").innerHTML = "00:" + timeRemaining;
  } else if (timeRemaining > 0) {
    document.getElementById("time").innerHTML = "00:0" + timeRemaining;
  } else {
    stopGame();
    alert("Game Over. Time Ran Out. You Lost.");
  }
}

function updateLetters(scale) {
  switch(scale) {
    case 0:
      document.getElementById("letter1").innerHTML = "C";
      document.getElementById("letter2").innerHTML = "D";
      document.getElementById("letter3").innerHTML = "E";
      document.getElementById("letter4").innerHTML = "F";
      document.getElementById("letter5").innerHTML = "G";
      document.getElementById("letter6").innerHTML = "A";
      document.getElementById("letter7").innerHTML = "B";
      document.getElementById("letter8").innerHTML = "C";
      break;
    case 1:
      document.getElementById("letter1").innerHTML = "C#";
      document.getElementById("letter2").innerHTML = "D#";
      document.getElementById("letter3").innerHTML = "F";
      document.getElementById("letter4").innerHTML = "F#";
      document.getElementById("letter5").innerHTML = "G#";
      document.getElementById("letter6").innerHTML = "A#";
      document.getElementById("letter7").innerHTML = "C";
      document.getElementById("letter8").innerHTML = "C#";
      break;
    case 2:
      document.getElementById("letter1").innerHTML = "D";
      document.getElementById("letter2").innerHTML = "E";
      document.getElementById("letter3").innerHTML = "F#";
      document.getElementById("letter4").innerHTML = "G";
      document.getElementById("letter5").innerHTML = "A";
      document.getElementById("letter6").innerHTML = "B";
      document.getElementById("letter7").innerHTML = "C#";
      document.getElementById("letter8").innerHTML = "D";
      break;
    case 3:
      document.getElementById("letter1").innerHTML = "Eb";
      document.getElementById("letter2").innerHTML = "F";
      document.getElementById("letter3").innerHTML = "G";
      document.getElementById("letter4").innerHTML = "Ab";
      document.getElementById("letter5").innerHTML = "Bb";
      document.getElementById("letter6").innerHTML = "C";
      document.getElementById("letter7").innerHTML = "D";
      document.getElementById("letter8").innerHTML = "Eb";
      break;
    case 4:
      document.getElementById("letter1").innerHTML = "E";
      document.getElementById("letter2").innerHTML = "F#";
      document.getElementById("letter3").innerHTML = "G#";
      document.getElementById("letter4").innerHTML = "A";
      document.getElementById("letter5").innerHTML = "B";
      document.getElementById("letter6").innerHTML = "C#";
      document.getElementById("letter7").innerHTML = "D#";
      document.getElementById("letter8").innerHTML = "E";
      break;
    case 5:
      document.getElementById("letter1").innerHTML = "F";
      document.getElementById("letter2").innerHTML = "G";
      document.getElementById("letter3").innerHTML = "A";
      document.getElementById("letter4").innerHTML = "Bb";
      document.getElementById("letter5").innerHTML = "C";
      document.getElementById("letter6").innerHTML = "D";
      document.getElementById("letter7").innerHTML = "E";
      document.getElementById("letter8").innerHTML = "F";
      break;
    case 6:
      document.getElementById("letter1").innerHTML = "F#";
      document.getElementById("letter2").innerHTML = "G#";
      document.getElementById("letter3").innerHTML = "A#";
      document.getElementById("letter4").innerHTML = "B";
      document.getElementById("letter5").innerHTML = "C#";
      document.getElementById("letter6").innerHTML = "D#";
      document.getElementById("letter7").innerHTML = "F";
      document.getElementById("letter8").innerHTML = "F#";
      break;
    case 7:
      document.getElementById("letter1").innerHTML = "G";
      document.getElementById("letter2").innerHTML = "A";
      document.getElementById("letter3").innerHTML = "B";
      document.getElementById("letter4").innerHTML = "C";
      document.getElementById("letter5").innerHTML = "D";
      document.getElementById("letter6").innerHTML = "E";
      document.getElementById("letter7").innerHTML = "F#";
      document.getElementById("letter8").innerHTML = "G";
      break;
    case 8:
      document.getElementById("letter1").innerHTML = "Ab";
      document.getElementById("letter2").innerHTML = "Bb";
      document.getElementById("letter3").innerHTML = "C";
      document.getElementById("letter4").innerHTML = "Db";
      document.getElementById("letter5").innerHTML = "Eb";
      document.getElementById("letter6").innerHTML = "F";
      document.getElementById("letter7").innerHTML = "G";
      document.getElementById("letter8").innerHTML = "Ab";
      break;
    case 9:
      document.getElementById("letter1").innerHTML = "A";
      document.getElementById("letter2").innerHTML = "B";
      document.getElementById("letter3").innerHTML = "C#";
      document.getElementById("letter4").innerHTML = "D";
      document.getElementById("letter5").innerHTML = "E";
      document.getElementById("letter6").innerHTML = "F#";
      document.getElementById("letter7").innerHTML = "G#";
      document.getElementById("letter8").innerHTML = "A";
      break;
    case 10:
      document.getElementById("letter1").innerHTML = "Bb";
      document.getElementById("letter2").innerHTML = "C";
      document.getElementById("letter3").innerHTML = "D";
      document.getElementById("letter4").innerHTML = "Eb";
      document.getElementById("letter5").innerHTML = "F";
      document.getElementById("letter6").innerHTML = "G";
      document.getElementById("letter7").innerHTML = "A";
      document.getElementById("letter8").innerHTML = "Bb";
      break;
    case 11:
      document.getElementById("letter1").innerHTML = "B";
      document.getElementById("letter2").innerHTML = "C#";
      document.getElementById("letter3").innerHTML = "D#";
      document.getElementById("letter4").innerHTML = "E";
      document.getElementById("letter5").innerHTML = "F#";
      document.getElementById("letter6").innerHTML = "G#";
      document.getElementById("letter7").innerHTML = "A#";
      document.getElementById("letter8").innerHTML = "B";
  }
}

function loseGame() {
  stopGame();
  alert("Game Over. Strike Three. You Lost.");
}

function winGame() {
  stopGame();
  alert("Congratulations!! You Won!!");
}

// Sound Synthesis Functions

function playTone(btn, len) {
  o.frequency.value = freqMap[btn - 1];
  g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
  context.resume();
  tonePlaying = true;
  setTimeout(function () {
    stopTone();
  }, len);
}
function startTone(btn) {
  if (!tonePlaying) {
    context.resume();
    o.frequency.value = freqMap[btn - 1];
    g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
    context.resume();
    tonePlaying = true;
  }
}
function stopTone() {
  g.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
  tonePlaying = false;
}

// Page Initialization
// Init Sound Synthesizer
var AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var o = context.createOscillator();
var g = context.createGain();
g.connect(context.destination);
g.gain.setValueAtTime(0, context.currentTime);
o.connect(g);
o.start(0);
