/* Video facades: a poster standing in for the embed until someone clicks, so
   nothing is fetched from YouTube on page load. Clicking swaps in a
   youtube-nocookie iframe that autoplays. */

function activate(facade) {
  const iframe = document.createElement('iframe');

  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  iframe.allowFullscreen = true;
  iframe.className = 'video-embed';
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(facade.dataset.video)}?autoplay=1&rel=0`;
  iframe.title = facade.dataset.title || 'Video';

  facade.replaceWith(iframe);
}

function ready() {
  for (const facade of document.querySelectorAll('[data-video]')) {
    facade.addEventListener('click', () => activate(facade), { once: true });
  }
}

export { ready };
