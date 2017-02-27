const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const MIN_FREQ = 20.0;
const MAX_FREQ = 2000.0;

const FREQ_RATIO = MAX_FREQ / WIDTH;
const GAIN_RATIO = 1.0 / HEIGHT;

let audioContext = new (window.AudioContext || window.webkitAudioContext)();


let oscillator = audioContext.createOscillator();
let analyser = audioContext.createAnalyser();
let gain = audioContext.createGain();
oscillator.connect(analyser);
analyser.connect(gain);
gain.connect(audioContext.destination);
oscillator.start();

let play = false;

document.addEventListener('click', function() {
  if (play) {
    gain.connect(audioContext.destination);
  } else {
    gain.disconnect(audioContext.destination);
  }
  play = !play;
});

function changeSound(xpos, ypos) {
  oscillator.frequency.value = MIN_FREQ + xpos * FREQ_RATIO;
  gain.gain.value = ypos * GAIN_RATIO;
}

document.addEventListener('mousemove', function(event) {
  changeSound(event.clientX, event.clientY);
});

let canvas = document.querySelector('#oscilloscope');
var canvasContext = canvas.getContext('2d');
canvasContext.clearRect(0, 0, WIDTH, HEIGHT);
canvasContext.fillStyle = 'rgb(200, 200, 200)';
canvasContext.fillRect(0, 0, WIDTH, HEIGHT);
