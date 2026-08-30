/* Theme showcase: a big screen plus a strip of theme thumbnails. Clicking a
   thumbnail swaps the screen, the name and the index. */

function wire(showcase) {
  const image = showcase.querySelector('[data-showcase-image]');
  const name = showcase.querySelector('[data-showcase-name]');
  const count = showcase.querySelector('[data-showcase-count]');
  const index = showcase.querySelector('[data-showcase-index]');
  const thumbs = Array.from(showcase.querySelectorAll('.showcase__thumb'));

  if (!image || thumbs.length === 0) return;

  function applyAccent(accent) {
    if (!accent) return;

    const match = accent.trim().match(/^#([0-9a-f]{6})$/i);
    if (!match) return;

    const value = parseInt(match[1], 16);
    const rgb = `${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255}`;
    const root = document.documentElement.style;

    root.setProperty('--color-terminal-blue', accent);
    root.setProperty('--rgb-terminal-blue', rgb);
  }

  function select(thumb) {
    thumbs.forEach((other) => other.setAttribute('aria-pressed', String(other === thumb)));

    applyAccent(thumb.dataset.accent);
    image.src = thumb.dataset.src;
    image.alt = `${thumb.dataset.name} theme`;

    if (name) name.textContent = thumb.dataset.name;
    if (index) index.textContent = thumb.dataset.index;
    if (count) count.textContent = String(thumbs.length).padStart(2, '0');
  }

  thumbs.forEach((thumb) => thumb.addEventListener('click', () => select(thumb)));
}

function ready() {
  for (const showcase of document.querySelectorAll('[data-showcase]')) {
    wire(showcase);
  }
}

export { ready };
