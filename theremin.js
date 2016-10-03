let audioContext = new AudioContext();
console.log(audioContext);

let oscillator = audioContext.createOscillator();
let gain = audioContext.createGain();
oscillator.connect(gain);
gain.connect(audioContext.destination);
oscillator.start();
oscillator.suspend();

let play = true;

document.addEventListener('click', function(event) {
  if (play) {
    oscillator.resume();
  } else {
    oscillator.suspend();
  }
  play = !play;
});

document.addEventListener('mousemove', function(event) {
  oscillator.frequency.value = event.clientX;
  gain.gain.value = event.clientY / 1000;
});
