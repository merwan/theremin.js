const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const MIN_FREQ = 20.0;
const MAX_FREQ = 2000.0;

const FREQ_RATIO = MAX_FREQ / WIDTH;
const GAIN_RATIO = 1.0 / HEIGHT;

let audioContext = new AudioContext();

let oscillator = audioContext.createOscillator();
let gain = audioContext.createGain();
oscillator.connect(gain);
gain.connect(audioContext.destination);
oscillator.start();

let play = false;

document.addEventListener('click', function(event) {
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
