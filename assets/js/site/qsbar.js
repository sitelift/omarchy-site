/* Quickshell bar on the web: ticking clock. Menu open/close lives in menu.js. */

function wireClock(bar) {
  const day = bar.querySelector('.qsbar__clock-day');
  const time = bar.querySelector('.qsbar__clock-time');
  if (!day || !time) return;

  function tick() {
    const now = new Date();
    day.textContent = now.toLocaleDateString('en-US', { weekday: 'long' });
    time.textContent = now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  }

  tick();
  setInterval(tick, 1000);
}

function ready() {
  const bar = document.querySelector('.qsbar');
  if (!bar) return;
  wireClock(bar);
}

export { ready };
