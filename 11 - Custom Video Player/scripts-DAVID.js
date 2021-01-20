const player = document.querySelector('.player');

const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

const togglePlay = () => {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
};

const updateButton = () => {
  const icon = video.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

const handleProgress = () => {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

const skip = (button) => {
  video.currentTime += parseFloat(button.dataset.skip);
}

const skipManual = (value) => {
  video.currentTime += parseFloat(value);
}

const handleRangeUpdate = (range) => {
  video[range.name] = range.value;
}

const scrub = (e) => {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', () => skip(button)));
ranges.forEach(range => range.addEventListener('change', () => handleRangeUpdate(range)));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

// SpaceBar Toggle Add
window.addEventListener('keydown', (e) => ((e.key === ' ' || e.key === 'k' || e.key === 'K')) && togglePlay());
window.addEventListener('keydown', (e) => (e.key === 'j' || e.key === 'J') && skipManual(-10));
window.addEventListener('keydown', (e) => (e.key === 'l' || e.key === 'L') && skipManual(+10));
