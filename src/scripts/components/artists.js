import ScrollMonitor from 'scrollmonitor';
import BaseComponent from './base';
import * as Breakpoints from '../core/breakpoints';

const classes = {
  listItemActive: 'is-active'
};

export default class ArtistsComponent extends BaseComponent {
  constructor(container) {
    super(container, 'artists');

    this.list = container.querySelector('ul');
    this.links = this.list.querySelectorAll('a');
    this.portraits = container.querySelectorAll('.artist-portrait');
    this.watcher = ScrollMonitor.create(this.list);
    this.desktopWidth = Breakpoints.getBreakpointMinWidth('md');
    this.isDesktop = this.isAboveDesktopBreakpoint();

    this.linkScrollMonitors = [];

    this.links.forEach((el, i) => {
      el.addEventListener('mouseenter', this.onLinkMouseenter.bind(this));
      el.addEventListener('click', e => e.preventDefault());

      this.linkScrollMonitors.push(ScrollMonitor.create(el));
    });

    const scrollHandler = this.onScroll.bind(this);

    this.watcher.enterViewport(() => {
      document.addEventListener('scroll', scrollHandler);
    });

    this.watcher.exitViewport(() => {
      document.removeEventListener('scroll', scrollHandler);
    });

    // On mobile we have a scroll effect that ativates the items
    if(this.isDesktop) {
      this.activateItem(this.links[0]); // activate the first one
    }

  }

  onLinkMouseenter(e) {
    this.links.forEach((link) => {
      if(link != e.currentTarget) {
        this.deactivateItem(link);
      }
    });

    this.activateItem(e.currentTarget);
  }

  activateItem(el) {
    el && el.classList.add(classes.listItemActive);
  }

  deactivateItem(el) {
    el && el.classList.remove(classes.listItemActive);
  }

  isAboveDesktopBreakpoint() {
    return window.innerWidth >= this.desktopWidth;
  }

  onResize() {
    const isCurrWidthAboveDeskBP = this.isAboveDesktopBreakpoint();
    
    // Desktop -> Mobile
    if(this.isDesktop && !isCurrWidthAboveDeskBP) {
      this.links.forEach(link => this.deactivateItem(link));
    }
    // Mobile -> Desktop
    else if(!this.isDesktop && isCurrWidthAboveDeskBP) {
      
    }

    this.isDesktop = isCurrWidthAboveDeskBP;
  }

  onScroll() {
    if(this.isDesktop) return;

    const scrollToMiddle = window.pageYOffset + (window.innerHeight/2);

    this.linkScrollMonitors.forEach((monitor, i) => {
      const scrollToMiddleOffSet = scrollToMiddle - (monitor.height/2);

      if(monitor.top < scrollToMiddleOffSet && monitor.bottom > scrollToMiddleOffSet) {
        monitor.watchItem.classList.add('is-active');
      }
      else {
        monitor.watchItem.classList.remove('is-active');
      }
    });
  }
}