/* The Quickshell bar, on the web: a ticking center clock
   (centerAnchor = omarchy.clock), scrollspy workspaces, number keys 1-9
   jumping between sections like SUPER+1..9, and the transparent-at-rest
   panel that gains its background on scroll (bar.transparent = true). */

const KEYS = '123456789';

function wireClock(bar) {
  const day = bar.querySelector('.qsbar__clock-day');
  const time = bar.querySelector('.qsbar__clock-time');

  if (!day || !time) return;

  function tick() {
    const now = new Date();
    day.textContent = now.toLocaleDateString('en-US', { weekday: 'long' });
    time.textContent = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  }

  tick();
  setInterval(tick, 1000);
}

function wireScrollState(bar) {
  function onScroll() {
    bar.classList.toggle('is-scrolled', window.scrollY > 24);
  }

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function wireSpy(bar) {
  const sections = Array.from(document.querySelectorAll('[data-workspace]'));
  const links = new Map(
    Array.from(bar.querySelectorAll('[data-waybar-workspace]')).map((link) => [link.dataset.waybarWorkspace, link]),
  );

  if (sections.length === 0 || links.size === 0) return;

  function activate(id) {
    links.forEach((link) => link.classList.remove('is-active'));
    const link = links.get(id);
    if (link) link.classList.add('is-active');
  }

  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) activate(entry.target.dataset.workspace);
      }
    }, { rootMargin: '-35% 0px -60% 0px' });

    sections.forEach((section) => spy.observe(section));
  }

  // SUPER+1..9, minus the SUPER. Plain number keys jump to sections unless
  // the user is typing somewhere.
  document.addEventListener('keydown', (event) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return;

    const target = event.target;
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) return;

    const index = KEYS.indexOf(event.key);
    if (index === -1) return;

    const section = sections[index];
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  });
}

function ready() {
  const bar = document.querySelector('.qsbar');
  if (!bar) return;

  wireClock(bar);
  wireScrollState(bar);
  wireSpy(bar);
}

export { ready };
