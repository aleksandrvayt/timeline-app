window.addEventListener('DOMContentLoaded', () => {
  const progress = document.getElementById('progress');
  const timeline = document.getElementById('timeline');
  const events = Array.from(document.querySelectorAll('.timeline-event'));
  const markers = events.map(ev => ev.querySelector('.marker'));
  const blocks = events.map(ev => ev.querySelector('.content-block'));

    function update() {
      const scrollMiddle = window.scrollY + window.innerHeight / 2;
      const timelineRect = timeline.getBoundingClientRect();
      const lineTop = window.scrollY + timelineRect.top;
      const lineBottomMax = window.scrollY + timelineRect.bottom;
      const filledBottom = Math.min(Math.max(scrollMiddle, lineTop), lineBottomMax);
      progress.style.height = `${filledBottom - lineTop}px`;

      events.forEach((ev, idx) => {
        const marker = markers[idx];
        const block  = blocks[idx];

        const markerRect = marker.getBoundingClientRect();
        const center = markerRect.top + window.scrollY + markerRect.height / 2;
        const isActive = filledBottom >= center;

        ev.classList.toggle('active', isActive);

        if (!block.classList.contains('static')) {
          const evTop = ev.getBoundingClientRect().top + window.scrollY;
          const shouldShow = window.scrollY + window.innerHeight * 0.5 >= evTop;
          block.classList.toggle('visible', shouldShow);
        }
      });
    }


  window.addEventListener('scroll', update, { passive: true });
  update();
});