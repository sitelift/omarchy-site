import * as lightbox from './site/lightbox.js';
import * as logo from './site/logo.js';
import * as qsbar from './site/qsbar.js';
import * as rails from './site/rails.js';
import * as reveal from './site/reveal.js';
import * as showcase from './site/showcase.js';
import * as video from './site/video.js';

document.addEventListener('DOMContentLoaded', () => {
  const modules = [qsbar, video, showcase, rails, reveal, logo, lightbox];

  for (const module of modules) {
    try {
      module.ready();
    } catch (error) {
      console.error(error);
    }
  }

});
