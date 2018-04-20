/* Getting Elements*/
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.fullScreen');

/* build functions */
function togglePlay() {
    //es6
    const method = video.paused ? 'play' : 'pause';
    video[method]();   
}

function fullScreen() {
    const icon = this.fullscreen = 'test'
    if (fullscreen.requestFullscreen){
        fullscreen.requestFullscreen();
    }
    console.log('fullscreen')
}

function updateButton(){
    const icon = this.paused ? '►' : '❚ ❚'
    toggle.textContent = icon;
}
function skip(){
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub (e){
    const scrubTime = (e.pageX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}


/* set up event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
//listen for the time update event for video bar

video.addEventListener('timeupdate', handleProgress);


toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;

progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true)
progress.addEventListener('mouseup', () => mousedown = false)

fullscreen.addEventListener('click', fullScreen);