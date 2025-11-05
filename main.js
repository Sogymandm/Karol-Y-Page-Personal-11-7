// Pequeñas interacciones: tilt en la imagen hero y micro-animaciones
(function(){
  // Tilt effect for hero image
  const img = document.querySelector('.hero-image');
  if (img) {
    const bounds = {w:0,h:0,left:0,top:0};
    function updateBounds(){
      const r = img.getBoundingClientRect();
      bounds.w = r.width; bounds.h = r.height; bounds.left = r.left; bounds.top = r.top;
    }
    updateBounds();
    window.addEventListener('resize', updateBounds);

    img.addEventListener('mousemove', (e)=>{
      const x = (e.clientX - bounds.left) / bounds.w - 0.5;
      const y = (e.clientY - bounds.top) / bounds.h - 0.5;
      const rx = (y * 6).toFixed(2);
      const ry = (x * -6).toFixed(2);
      img.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
      img.style.transition = 'transform 0.08s linear';
    });
    img.addEventListener('mouseleave', ()=>{
      img.style.transform = '';
      img.style.transition = 'transform 0.4s cubic-bezier(.2,.9,.2,1)';
    });
  }

  // Small stagger reveal for elements with .reveal
  if ('IntersectionObserver' in window) {
    const items = Array.from(document.querySelectorAll('.reveal'));
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if (entry.isIntersecting){
          const el = entry.target;
          const index = items.indexOf(el);
          const delay = Math.min(index * 80, 300);
          el.style.transitionDelay = delay + 'ms';
          el.classList.add('is-visible');
          io.unobserve(el);
        }
      });
    },{threshold:0.12});
    items.forEach(i=>io.observe(i));
  }
  
  // Video play overlay handling: play on overlay click, hide overlay when playing
  const playButtons = Array.from(document.querySelectorAll('.video-play'));
  playButtons.forEach(btn=>{
    const targetId = btn.dataset.target;
    const video = document.getElementById(targetId);
    const frame = btn.closest('.video-frame');
    if (!video || !frame) return;

    // When overlay clicked, play video and set visual state
    btn.addEventListener('click', ()=>{
      if (video.paused) {
        video.play().catch(()=>{});
      } else {
        video.pause();
      }
    });

    // Update frame state based on playback
    video.addEventListener('play', ()=> frame.classList.add('playing'));
    video.addEventListener('pause', ()=> frame.classList.remove('playing'));
    video.addEventListener('ended', ()=> frame.classList.remove('playing'));
  });
})();

playButton.addEventListener("click", () => {
  videoOverlay.classList.add("hidden");
  video.play();
});
