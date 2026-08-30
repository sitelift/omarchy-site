/* Scroll reveals: elements tagged [data-reveal] fade up once as they enter the
   viewport. Skipped entirely when the user prefers reduced motion. */

function ready() {
  const targets = document.querySelectorAll('[data-reveal]');

  if (targets.length === 0) return;

  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    targets.forEach((target) => target.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

  targets.forEach((target) => observer.observe(target));
}

export { ready };
