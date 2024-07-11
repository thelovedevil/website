  

function createRain() {
    const rainContainer = document.getElementById('rain-container');
    const promptTwoContainer = document.getElementById('prompt-two-container');
    const panelRect = promptTwoContainer.getBoundingClientRect();
  
    function createRaindrop() {
        const raindrop = document.createElement('div');
        raindrop.classList.add('raindrop');
        raindrop.style.left = `${Math.random() * panelRect.width + panelRect.left}px`;
        raindrop.style.animationDuration = `${Math.random() * .5 + 0.1}s`;
        rainContainer.appendChild(raindrop);
  
        setTimeout(() => {
            raindrop.remove();
        }, 2000);
    }
  
    setInterval(createRaindrop, 50);
  }
  
  document.addEventListener('DOMContentLoaded', function() {
  createRain();
  });
  
  $(document).ready(function () {
  let currentLine = 0;
  const lines = $('.line');
  const typingSpeed = 50;
  
  function typeWriter(element, text, i, cb) {
    if (i < text.length) {
      $(element).append(text.charAt(i));
      i++
      setTimeout(function () {
        typeWriter(element, text, i, cb);
      }, typingSpeed);
    } else {
      cb();
    }
  }
  
  function revealNextLine() {
    if (currentLine < lines.length) {
      const lineContent = $(lines[currentLine]).find('.hidden').text();
      $(lines[currentLine]).find('.hidden').text('').removeClass('hidden');
  
      // Remove the cursor from the previous line
      $('.cursor').remove();
  
      // Add the cursor to the current line
      $(lines[currentLine]).append('<span class="cursor">█</span>');
  
      typeWriter($(lines[currentLine]), lineContent, 0, function () {
        currentLine++;
        // Wait for user input before revealing the next line
        $(document).one('keypress', revealNextLine);
      });
    } else {
      $(lines[lines.length - 1]).append('<span class="cursor"></span>');
    }
  }
  
  // Start revealing lines on first keypress
  $(document).one('keypress', revealNextLine);
  
  
  
  
  /*const frames = [
  '|    ',
  ' /   ',
  '  -  ',
  '   \\ ',
  '    |',
  '   / ',
  '  -  ',
  ' \\   '
  ];*/
  //let currentFrame = 0;
  
  //function animate() {
  // container.textContent = frames[currentFrame];
  // currentFrame = (currentFrame + 1) % frames.length;
  //}
  
  //  setInterval(animate, 50);
  
  
  const container = document.querySelector(".container"),
  mainVideo = container.querySelector("video"),
  videoTimeline = container.querySelector(".video-timeline"),
  progressBar = container.querySelector(".progress-bar"),
  volumeBtn = container.querySelector(".volume i"),
  volumeSlider = container.querySelector(".left input");
  currentVidTime = container.querySelector(".current-time"),
  videoDuration = container.querySelector(".video-duration"),
  skipBackward = container.querySelector(".skip-backward i"),
  skipForward = container.querySelector(".skip-forward i"),
  playPauseBtn = container.querySelector(".play-pause i"),
  speedBtn = container.querySelector(".playback-speed span"),
  speedOptions = container.querySelector(".speed-options"),
  pipBtn = container.querySelector(".pic-in-pic span"),
  fullScreenBtn = container.querySelector(".fullscreen i");
  let timer;
  const hideControls = () => {
    if(mainVideo.paused) return;
    timer = setTimeout(() => {
        container.classList.remove("show-controls");
    }, 3000);
  }
  hideControls();
  container.addEventListener("mousemove", () => {
    container.classList.add("show-controls");
    clearTimeout(timer);
    hideControls();   
  });
  const formatTime = time => {
    let seconds = Math.floor(time % 60),
    minutes = Math.floor(time / 60) % 60,
    hours = Math.floor(time / 3600);
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    hours = hours < 10 ? `0${hours}` : hours;
    if(hours == 0) {
        return `${minutes}:${seconds}`
    }
    return `${hours}:${minutes}:${seconds}`;
  }
  videoTimeline.addEventListener("mousemove", e => {
    let timelineWidth = videoTimeline.clientWidth;
    let offsetX = e.offsetX;
    let percent = Math.floor((offsetX / timelineWidth) * mainVideo.duration);
    const progressTime = videoTimeline.querySelector("span");
    offsetX = offsetX < 20 ? 20 : (offsetX > timelineWidth - 20) ? timelineWidth - 20 : offsetX;
    progressTime.style.left = `${offsetX}px`;
    progressTime.innerText = formatTime(percent);
  });
  videoTimeline.addEventListener("click", e => {
    let timelineWidth = videoTimeline.clientWidth;
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
  });
  mainVideo.addEventListener("timeupdate", e => {
    let {currentTime, duration} = e.target;
    let percent = (currentTime / duration) * 100;
    progressBar.style.width = `${percent}%`;
    currentVidTime.innerText = formatTime(currentTime);
  });
  mainVideo.addEventListener("loadeddata", () => {
    videoDuration.innerText = formatTime(mainVideo.duration);
  });
  const draggableProgressBar = e => {
    let timelineWidth = videoTimeline.clientWidth;
    progressBar.style.width = `${e.offsetX}px`;
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
    currentVidTime.innerText = formatTime(mainVideo.currentTime);
  }
  volumeBtn.addEventListener("click", () => {
    if(!volumeBtn.classList.contains("fa-volume-high")) {
        mainVideo.volume = 0.5;
        volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
    } else {
        mainVideo.volume = 0.0;
        volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
    }
    volumeSlider.value = mainVideo.volume;
  });
  volumeSlider.addEventListener("input", e => {
    mainVideo.volume = e.target.value;
    if(e.target.value == 0) {
        return volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
    }
    volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
  });
  speedOptions.querySelectorAll("li").forEach(option => {
    option.addEventListener("click", () => {
        mainVideo.playbackRate = option.dataset.speed;
        speedOptions.querySelector(".active").classList.remove("active");
        option.classList.add("active");
    });
  });
  document.addEventListener("click", e => {
    if(e.target.tagName !== "SPAN" || e.target.className !== "material-symbols-rounded") {
        speedOptions.classList.remove("show");
    }
  });
  fullScreenBtn.addEventListener("click", () => {
    container.classList.toggle("fullscreen");
    if(document.fullscreenElement) {
        fullScreenBtn.classList.replace("fa-compress", "fa-expand");
        return document.exitFullscreen();
    }
    fullScreenBtn.classList.replace("fa-expand", "fa-compress");
    container.requestFullscreen();
  });
  speedBtn.addEventListener("click", () => speedOptions.classList.toggle("show"));
  pipBtn.addEventListener("click", () => mainVideo.requestPictureInPicture());
  skipBackward.addEventListener("click", () => mainVideo.currentTime -= 5);
  skipForward.addEventListener("click", () => mainVideo.currentTime += 5);
  mainVideo.addEventListener("play", () => playPauseBtn.classList.replace("fa-play", "fa-pause"));
  mainVideo.addEventListener("pause", () => playPauseBtn.classList.replace("fa-pause", "fa-play"));
  playPauseBtn.addEventListener("click", () => mainVideo.paused ? mainVideo.play() : mainVideo.pause());
  videoTimeline.addEventListener("mousedown", () => videoTimeline.addEventListener("mousemove", draggableProgressBar));
  document.addEventListener("mouseup", () => videoTimeline.removeEventListener("mousemove", draggableProgressBar));
  
  
  
  
  });