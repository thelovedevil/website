  

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
  
  

  
  
  
  
  });