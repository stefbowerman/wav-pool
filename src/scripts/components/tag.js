import BaseComponent from './base';

class TagLineComponent {
  constructor(line, gallery, onTypingComplete) {
    this.line = line;
    this.currentIndex = 0;

    this.fullText = this.line.textContent;
    this.typedText = '';
    this.typeTimeout = null;
    this.onTypingComplete = (onTypingComplete && {}.toString.call(onTypingComplete) === '[object Function]' ? onTypingComplete : () => {}); // Make sure we have a callable function

    this.gallery = gallery;
    this.images = gallery.querySelectorAll('img');
    this.imageCount = this.images.length;
    this.interval = null;
  }

  typeOut() {
    const addLetter = () => {
      this.typedText = this.fullText.substring(0, this.typedText.length + 1);
      this.line.textContent = this.typedText;

      if(this.fullText.length == this.typedText.length) {
        clearTimeout(this.typeTimeout);
        this.onTypingComplete();
      }
      else {
        this.typeTimeout = setTimeout(addLetter, 90);
      }
    };

    // Reset these variables before we start typing
    this.line.textContent = '';
    this.typedText        = '';

    addLetter();
  }

  startGalleryRotation() {
    this.interval = setInterval(() => {
      this.images.forEach((img) => {
        img.classList.remove('is-active');
      });
      
      let newIndex = this.currentIndex === (this.imageCount - 1) ? 0 : this.currentIndex + 1;
      
      this.images[newIndex].classList.add('is-active');
              
      this.currentIndex = newIndex;
    }, 500);
  }

  stopGalleryRotation() {
    clearInterval(this.interval);
  }

  activate() {
    this.line.style.display    = 'block';
    this.gallery.style.display = 'block';
    this.startGalleryRotation();
    this.typeOut();
  }

  deactivate() {
    this.stopGalleryRotation();
    this.line.style.display    = 'none';
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
    this.tagLineComponents = [].map.call(this.tagLines, (el, i) => {
      return new TagLineComponent(el, this.tagLineGalleries[i], this.onTypingComplete.bind(this));
    });

    this.tagLineComponents[this.currentIndex].activate();
  }

  activateNext() {
    let newIndex = this.currentIndex === (this.tagLineComponents.length - 1) ? 0 : this.currentIndex + 1;

    this.tagLineComponents[this.currentIndex].deactivate();
    this.tagLineComponents[newIndex].activate();

    this.currentIndex = newIndex;
  }

  onTypingComplete() {
    // Make sure that the timeout clock starts *after* the typing animation is complete
    setTimeout(this.activateNext.bind(this), 2000);
  }
}