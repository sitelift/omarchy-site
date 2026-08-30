/* Horizontal rails: prev/next buttons page a scroll-snap track by roughly one
   card, and the buttons disable at either end. */

function wire(rail) {
  const track = rail.querySelector('[data-rail-track]');
  const prev = rail.querySelector('[data-rail-prev]');
  const next = rail.querySelector('[data-rail-next]');

  if (!track || !prev || !next) return;

  function page(direction) {
    const step = track.firstElementChild?.getBoundingClientRect().width || track.clientWidth;
    track.scrollBy({ behavior: 'smooth', left: direction * step });
  }

  function sync() {
    const max = track.scrollWidth - track.clientWidth;

    prev.disabled = track.scrollLeft <= 1;
    next.disabled = track.scrollLeft >= max - 1;
  }

  prev.addEventListener('click', () => page(-1));
  next.addEventListener('click', () => page(1));
  track.addEventListener('scroll', sync, { passive: true });
  window.addEventListener('resize', sync);

  sync();
}

function ready() {
  for (const rail of document.querySelectorAll('[data-rail]')) {
    wire(rail);
  }
}

export { ready };
