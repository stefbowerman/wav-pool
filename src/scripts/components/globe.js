import ScrollMonitor from 'scrollmonitor';
import BaseComponent from './base';

const classes = {
  
};

export default class GlobeComponent extends BaseComponent {
  constructor(container) {
    super(container, 'globe');
    this.globeArea = this.container.querySelector('.globe-area');

    const watcher = ScrollMonitor.create(this.globeArea, -100);

    watcher.enterViewport(() => {
      this.globeArea.classList.add('is-visible');
      watcher.destroy();
    });
  }
}