/* Lightbox for full-size theme screenshots on the themes page. Thumbnails open
   a <dialog>; clicking anywhere or pressing Escape closes it. */

function ready() {
  const lightbox = document.querySelector('[data-lightbox]');

  if (!lightbox) return;

  const frame = lightbox.querySelector('[data-lightbox-image]');
  const caption = lightbox.querySelector('[data-lightbox-caption]');

  document.querySelectorAll('[data-lightbox-open]').forEach((thumb) => {
    thumb.addEventListener('click', () => {
      if (frame) {
        frame.src = thumb.dataset.image;
        frame.alt = thumb.dataset.caption;
      }

      if (caption) caption.textContent = thumb.dataset.caption;

      lightbox.showModal();
    });
  });

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) lightbox.close();
  });
}

export { ready };
