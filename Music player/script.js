const playBtn = document.querySelector('#mainPlayBtn');
const audio = document.querySelector('#audio');
const btnPrev = document.querySelector('#btnPrev');
const btnNext = document.querySelector('#btnNext');
const trackTitle = document.querySelector('.track-title');
const artistName = document.querySelector('.artist-name');
const cover = document.querySelector('.cover');
const slider = document.querySelector('.slider');
const thumb = document.querySelector('.slider-thumb');
const progress = document.querySelector('.progress');
const time = document.querySelector('.time');
const fullTime = document.querySelector('.fulltime');
const volumeSlider = document.querySelector('.volume-slider .slider');
const volumeProgress = document.querySelector('.volume-slider .progress');
const volumeIcon = document.querySelector('.volume-icon span');

// Global variables
let trackPlaying = false;
let volumeMuted = false;
let trackId = 0;

// Track data
const tracks = ["Immortal", "No Talk", "Enough", "skylines", "Get Through", "Lofi Mallet", "Winning"];
const artists = ["NEFFEX", "VYEN", "NEFFEX", "Anno Domini Beats", "NEFFEX", "Kwon", "NEFFEX"];
const covers = ["cover1", "cover2", "cover3", "cover4", "cover5", "cover6", "cover7"];

// Event listeners
playBtn.addEventListener('click', togglePlay);
btnPrev.addEventListener('click', prevTrack);
btnNext.addEventListener('click', nextTrack);
audio.addEventListener('ended', nextTrack);
slider.addEventListener('input', seekTrack);
volumeSlider.addEventListener('input', adjustVolume);

// Load initial track
loadTrack();

// Function to toggle play/pause
function togglePlay() {
    if (trackPlaying) {
        audio.pause();
    } else {
        audio.play();
    }
    trackPlaying = !trackPlaying;
    updatePlayButton();
}

// Function to update play/pause button icon
function updatePlayButton() {
    playBtn.innerHTML = `<span class="material-symbols-outlined">
                            <i class="fa-solid ${trackPlaying ? 'fa-pause' : 'fa-play'}"></i>
                        </span>`;
}

// Function to load track
function loadTrack() {
    audio.src = `assets-20240330T131914Z-001/assets/tracks/${tracks[trackId]}.mp3`;
    trackTitle.textContent = tracks[trackId];
    artistName.textContent = artists[trackId];
    cover.src = `assets-20240330T131914Z-001/assets/covers/${covers[trackId]}.jpg`;
    fullTime.textContent = formatTime(audio.duration);
}

// Function to play next track
function nextTrack() {
    trackId = (trackId + 1) % tracks.length;
    loadTrack();
    audio.play();
    trackPlaying = true;
    updatePlayButton();
}

// Function to play previous track
function prevTrack() {
    trackId = (trackId - 1 + tracks.length) % tracks.length;
    loadTrack();
    audio.play();
    trackPlaying = true;
    updatePlayButton();
}

// Function to seek track
function seekTrack() {
    audio.currentTime = (slider.value / 100) * audio.duration;
    updateTime();
}

// Function to adjust volume
function adjustVolume() {
    audio.volume = volumeSlider.value / 100;
    updateVolumeIcon();
}

// Function to update volume icon
function updateVolumeIcon() {
    if (audio.volume === 0) {
        volumeIcon.innerHTML = `<i class="fa-solid fa-volume-mute"></i>`;
    } else if (audio.volume < 0.5) {
        volumeIcon.innerHTML = `<i class="fa-solid fa-volume-down"></i>`;
    } else {
        volumeIcon.innerHTML = `<i class="fa-solid fa-volume-up"></i>`;
    }
}

// Function to format time in MM:SS format
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Function to update time display
function updateTime() {
    time.textContent = formatTime(audio.currentTime);
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${progressPercent}%`;
    thumb.style.left = `${progressPercent}%`;
}

// Update time display and slider position
audio.addEventListener('timeupdate', updateTime);
