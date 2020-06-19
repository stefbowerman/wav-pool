import ScrollMonitor from 'scrollmonitor';
import BaseComponent from './base';
import isAutoplaySupported from '../helpers/isAutoplaySupported';

const classes = {
  
};

export default class GlobeComponent extends BaseComponent {
  constructor(container) {
    super(container, 'globe');
    this.globeArea = this.container.querySelector('.globe-area');
    this.video = this.container.querySelector('video');

    const watcher = ScrollMonitor.create(this.globeArea, -100);

    watcher.enterViewport(() => {
      this.globeArea.classList.add('is-visible');
    });

    watcher.exitViewport(() => {
      this.globeArea.classList.remove('is-visible');
    });

    isAutoplaySupported((support) => {
      if(!support) {
        this.swapVideoForFallback();
      }
    });
  }

  swapVideoForFallback() {
    const fallback = document.createElement('div');
          fallback.classList.add('globe-fallback');

    this.video.parentNode.replaceChild(fallback, this.video);

    this.video = undefined;
  }
}