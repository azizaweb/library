const quote = document.getElementById('quote');
const input = document.getElementById('input');
const timeEl = document.getElementById('time');
const wpmEl = document.getElementById('wpm');
const accuracyEl = document.getElementById('accuracy');
const restartBtn = document.getElementById('restart');

const quotes = [
  "JavaScript is a powerful language.",
  "Practice makes perfect.",
  "Keep coding and stay focused.",
  "Speed comes with accuracy.",
  "Never give up on learning."
];

let originalText = '';
let startTime = null;
let timerInterval = null;

function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function startTest() {
  originalText = getRandomQuote();
  quote.textContent = originalText;
  input.value = '';
  input.disabled = false;
  input.focus();

  startTime = dayjs();
  timerInterval = setInterval(updateTime, 1000);
}

function updateTime() {
  const now = dayjs();
  const secondsPassed = now.diff(startTime, 'second');
  timeEl.textContent = secondsPassed;
}

function endTest() {
  clearInterval(timerInterval);
  const now = dayjs();
  const totalTime = now.diff(startTime, 'second');

  const typedText = input.value.trim();
  const wordCount = typedText.split(/\s+/).length;
  const wpm = Math.round((wordCount / totalTime) * 60);
  wpmEl.textContent = wpm;

  const accuracy = calculateAccuracy(originalText, typedText);
  accuracyEl.textContent = accuracy;
}

function calculateAccuracy(original, typed) {
  let correct = 0;
  for (let i = 0; i < typed.length; i++) {
    if (typed[i] === original[i]) correct++;
  }
  return Math.round((correct / original.length) * 100);
}

input.addEventListener('input', () => {
  if (input.value.length === 1 && !startTime) {
    startTime = dayjs();
    timerInterval = setInterval(updateTime, 1000);
  }

  if (input.value.length >= originalText.length) {
    input.disabled = true;
    endTest();
  }
});

restartBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  timeEl.textContent = '0';
  wpmEl.textContent = '0';
  accuracyEl.textContent = '100';
  startTest();
});

// Start on load
startTest();