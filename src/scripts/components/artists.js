import ScrollMonitor from 'scrollmonitor';
import BaseComponent from './base';
import * as Breakpoints from '../core/breakpoints';

const classes = {
  listItemActive: 'is-active'
};

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Changes the RGB/HEX temporarily to a HSL-Value, modifies that value 
// and changes it back to RGB/HEX.

function changeHue(rgb, degree) {
    var hsl = rgbToHSL(rgb);
    hsl.h += degree;
    if (hsl.h > 360) {
        hsl.h -= 360;
    }
    else if (hsl.h < 0) {
        hsl.h += 360;
    }
    return hslToRGB(hsl);
}

// exepcts a string and returns an object
function rgbToHSL(rgb) {
    // strip the leading # if it's there
    rgb = rgb.replace(/^\s*#|\s*$/g, '');

    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    if(rgb.length == 3){
        rgb = rgb.replace(/(.)/g, '$1$1');
    }

    var r = parseInt(rgb.substr(0, 2), 16) / 255,
        g = parseInt(rgb.substr(2, 2), 16) / 255,
        b = parseInt(rgb.substr(4, 2), 16) / 255,
        cMax = Math.max(r, g, b),
        cMin = Math.min(r, g, b),
        delta = cMax - cMin,
        l = (cMax + cMin) / 2,
        h = 0,
        s = 0;

    if (delta == 0) {
        h = 0;
    }
    else if (cMax == r) {
        h = 60 * (((g - b) / delta) % 6);
    }
    else if (cMax == g) {
        h = 60 * (((b - r) / delta) + 2);
    }
    else {
        h = 60 * (((r - g) / delta) + 4);
    }

    if (delta == 0) {
        s = 0;
    }
    else {
        s = (delta/(1-Math.abs(2*l - 1)));
    }

    return {
        h: h,
        s: s,
        l: l
    };
}

// expects an object and returns a string
function hslToRGB(hsl) {
    var h = hsl.h,
        s = hsl.s,
        l = hsl.l,
        c = (1 - Math.abs(2*l - 1)) * s,
        x = c * ( 1 - Math.abs((h / 60 ) % 2 - 1 )),
        m = l - c/ 2,
        r, g, b;

    if (h < 60) {
        r = c;
        g = x;
        b = 0;
    }
    else if (h < 120) {
        r = x;
        g = c;
        b = 0;
    }
    else if (h < 180) {
        r = 0;
        g = c;
        b = x;
    }
    else if (h < 240) {
        r = 0;
        g = x;
        b = c;
    }
    else if (h < 300) {
        r = x;
        g = 0;
        b = c;
    }
    else {
        r = c;
        g = 0;
        b = x;
    }

    r = normalize_rgb_value(r, m);
    g = normalize_rgb_value(g, m);
    b = normalize_rgb_value(b, m);

    return rgbToHex(r,g,b);
}

function normalize_rgb_value(color, m) {
    color = Math.floor((color + m) * 255);
    if (color < 0) {
        color = 0;
    }
    return color;
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export default class ArtistsComponent extends BaseComponent {
  constructor(container) {
    super(container, 'artists');

    this.list = container.querySelector('ul');
    this.links = this.list.querySelectorAll('a');
    this.portraits = container.querySelectorAll('.artist-portrait');
    this.watcher = ScrollMonitor.create(this.list);
    this.measurements = {};

    // this.setMeasurements();

    this.portraits.forEach((el, i) => {
      let baseColor = '#2350ff';
      const color = changeHue(baseColor, 6 * i);
      el.style.backgroundColor = color;
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
    el && el.classList.add(classes.listItemActive);
  }

  deactivateItem(el) {
    el && el.classList.remove(classes.listItemActive);
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