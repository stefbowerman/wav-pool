import BaseComponent from './base';

class TagLineComponent {
  constructor(line, gallery) {
    this.line = line;
    this.gallery = gallery;
    this.images = gallery.querySelectorAll('img');
    this.imageCount = this.images.length;
    this.interval = null;
    this.currentIndex = 0;
  }

  start() {
    this.interval = setInterval(() => {
      this.images.forEach((img) => {
        img.classList.remove('is-active');
      });
      
      let newIndex = this.currentIndex === (this.imageCount - 1) ? 0 : this.currentIndex + 1;
      
      this.images[newIndex].classList.add('is-active');
        
      // newActive.classList.add('is-active');
      
      this.currentIndex = newIndex;
    }, 150);
  }

  stop() {
    clearInterval(this.interval);
  }

  activate() {
    this.line.style.display = 'block';
    this.gallery.style.display = 'block';    
    this.start();
  }

  deactivate() {
    this.stop();
    this.line.style.display = 'none';
    this.gallery.style.display = 'none';
  }
}

export default class TagComponent extends BaseComponent {
  constructor(container) {
    super(container, 'tag');

    this.tagLines = this.container.querySelectorAll('.tag-line');
    this.tagLineGalleries = this.container.querySelectorAll('.tag-line-gallery');

    if(this.tagLines.length !== this.tagLineGalleries.length) {
      console.warn('Each tagline needs a tagline gallery');
      return;
    }

    this.currentIndex = 0;
    this.tagLineComponents = [];

    this.tagLines.forEach((el, i) => {
      this.tagLineComponents.push(new TagLineComponent(el, this.tagLineGalleries[i]));
    });

    this.tagLineComponents[this.currentIndex].activate();

    // setInterval(this.activateNext.bind(this), 2000);
  }

  activateNext() {
    let newIndex = this.currentIndex === (this.tagLineComponents.length - 1) ? 0 : this.currentIndex + 1;

    this.tagLineComponents[this.currentIndex].deactivate();
    this.tagLineComponents[newIndex].activate();

    this.currentIndex = newIndex;
  }
}