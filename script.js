const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// ✅ Play/Pause functionality
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// ✅ Update play/pause button icon
function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚❚';
}

// ✅ Update progress bar based on video playback
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

// ✅ Seek video by clicking on progress bar
function scrub(event) {
  const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// ✅ Skip/rewind video
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// ✅ Handle volume and playback speed adjustment
function handleRangeUpdate() {
  video[this.name] = this.value;
}

// ✅ Error handling for video load failure
function handleError() {
  alert("Error loading video. Please check the video source.");
}

// ✅ Event Listeners
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
video.addEventListener('error', handleError);

progress.addEventListener('click', scrub);
progress.addEventListener('mousedown', () => {
  progress.addEventListener('mousemove', scrub);
});
progress.addEventListener('mouseup', () => {
  progress.removeEventListener('mousemove', scrub);
});

skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => {
  range.addEventListener('change', handleRangeUpdate);
  range.addEventListener('mousemove', handleRangeUpdate);
});

