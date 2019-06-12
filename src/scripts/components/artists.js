import ScrollMonitor from 'scrollmonitor';
import BaseComponent from './base';
import * as Breakpoints from '../core/breakpoints';

const classes = {
  listItemActive: 'is-active',
  portraitActive: 'is-active'
};

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default class ArtistsComponent extends BaseComponent {
  constructor(container) {
    super(container, 'artists');

    this.list = container.querySelector('ul');
    this.links = this.list.querySelectorAll('a');
    this.portraits = container.querySelectorAll('.artist-portrait');
    this.watcher = ScrollMonitor.create(this.list);
    this.activeIndex = 0;
    this.measurements = {};

    // this.setMeasurements();

    this.portraits.forEach((el) => {
      el.style.backgroundColor = getRandomColor();
    });

    this.links.forEach((el, i) => {
      el.addEventListener('mouseenter', this.onLinkMouseenter.bind(this));
      el.addEventListener('mouseleave', this.onLinkMouseleave.bind(this));
    });

    // const scrollHandler = this.onScroll.bind(this);

    // this.watcher.enterViewport(() => {
    //   document.addEventListener('scroll', scrollHandler);
    // });

    // this.watcher.exitViewport(() => {
    //   document.removeEventListener('scroll', scrollHandler);
    // });

    // this.activateItem(this.listItems[0]); // activate the first one

    this.desktopWidth = Breakpoints.getBreakpointMinWidth('md');
  }

  setMeasurements() {
    const heights = [].map.call(this.listItems, (li) => { return li.clientHeight; });
    const smallestHeight = Math.min(...heights);
    const winHeight = window.outerHeight;
    
    this.measurements = {
      smallestHeight: smallestHeight,
      winHeight: winHeight,
      upperBound: (winHeight + smallestHeight) * 0.5,
      lowerBound: (winHeight - smallestHeight) * 0.5
    };
  }

  onLinkMouseenter(e) {
    this.activateItem(e.currentTarget);
  }

  onLinkMouseleave(e) {
    this.deactivateItem(e.currentTarget);
  }

  activateItem(el) {
    // const i = [].indexOf.call(this.listItems, el);

    if(!el) return;

    el.classList.add(classes.listItemActive);
    // this.portraits[i].classList.add(classes.portraitActive);
    // this.activeIndex = i;
  }

  deactivateItem(el) {
    // const i = [].indexOf.call(this.listItems, el);

    if(!el) return;

    el.classList.remove(classes.listItemActive);
    // this.portraits[i].classList.remove(classes.portraitActive);
  }

  onResize() {
    // this.setMeasurements();
  }

  onScroll() {
    // Need to figure out the li that is in the middle of the screen
    
    const listRect =  this.list.getBoundingClientRect();
    const listTop = listRect.top;
    const listBottom = listRect.bottom;

    if(listTop < this.measurements.upperBound && listBottom > this.measurements.lowerBound) {
      const p = this.measurements.upperBound - listTop - this.measurements.smallestHeight;
      const index = Math.floor(p / this.measurements.smallestHeight);
      
      if(index == this.activeIndex) {
        return;
      }

      this.deactivateItem(this.listItems[this.activeIndex]);
      this.activateItem(this.listItems[index]);

      // console.log('activate index - ' + Math.floor(p / smallestHeight));
      // this.listItems.forEach((el, i) => {
      //   if(i == 2) {
      //     console.log(`${i} - offset ${el.getBoundingClientRect().top}`);  
      //   }
      // });
    }
  }
}