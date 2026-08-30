/* Theme showcase: a big screen plus a strip of theme thumbnails. Clicking a
   thumbnail swaps the screen, the name and the index. */

function wire(showcase) {
  const image = showcase.querySelector('[data-showcase-image]');
  const name = showcase.querySelector('[data-showcase-name]');
  const count = showcase.querySelector('[data-showcase-count]');
  const index = showcase.querySelector('[data-showcase-index]');
  const thumbs = Array.from(showcase.querySelectorAll('.showcase__thumb'));

  if (!image || thumbs.length === 0) return;

  function select(thumb) {
    thumbs.forEach((other) => other.setAttribute('aria-pressed', String(other === thumb)));

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
