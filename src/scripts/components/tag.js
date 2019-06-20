import BaseComponent from './base';
import isFunction from '../helpers/isFunction';

class TagLineComponent {
  constructor(line, gallery, onTypingComplete, onDeleteTextComplete) {
    this.line = line;
    this.currentIndex = 0;

    this.fullText = this.line.textContent;
    this.typedText = '';
    this.typeTimeout = null;
    this.characterTimeoutDuration = this.fullText.length > 7 ? 60 : 90;
    this.onTypingComplete = (isFunction(onTypingComplete) ? onTypingComplete : () => {});
    this.onDeleteTextComplete = (isFunction(onDeleteTextComplete) ? onDeleteTextComplete : () => {});

    this.gallery = gallery;
    this.images = gallery.querySelectorAll('img');
    this.imageCount = this.images.length;
    this.interval = null;

    // Lazy load any images
    this.loadMedia();
  }

  loadMedia() {
    this.images.forEach((img, i) => {
      if(img.hasAttribute('data-src')) {
        img.setAttribute('src', img.getAttribute('data-src'));
        img.removeAttribute('data-src');
      }
    });
  }

  typeOut() {
    const addLetter = () => {
      this.typedText = this.fullText.substring(0, this.typedText.length + 1);
      this.line.textContent = this.typedText;

      if(this.fullText.length == this.typedText.length) {
        clearTimeout(this.typeTimeout);
        this.onTypingComplete(this);
      }
      else {
        this.typeTimeout = setTimeout(addLetter, this.characterTimeoutDuration);
      }
    };

    // Reset these variables before we start typing
    this.line.textContent = '';
    this.typedText        = '';

    addLetter();
  }

  deleteText() {
    const removeLetter = () => {
      this.typedText = this.fullText.substring(0, this.typedText.length - 1);
      this.line.textContent = this.typedText;

      if(this.typedText.length == 0) {
        clearTimeout(this.typeTimeout);
        this.onDeleteTextComplete(this);
      }
      else {
        this.typeTimeout = setTimeout(removeLetter, this.characterTimeoutDuration);
      }
    };

    removeLetter();
  }

  startGalleryRotation() {
    this.interval = setInterval(() => {
      let newIndex = this.currentIndex === (this.imageCount - 1) ? 0 : this.currentIndex + 1;

      this.images.forEach((img) => {
        img.classList.remove('is-active');
      });
            
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
      return new TagLineComponent(el, this.tagLineGalleries[i], this.onTypingComplete.bind(this), this.onDeleteTextComplete.bind(this));
    });

    this.tagLineComponents[this.currentIndex].activate();
  }

  activateNext() {
    let newIndex = this.currentIndex === (this.tagLineComponents.length - 1) ? 0 : this.currentIndex + 1;

    this.tagLineComponents[this.currentIndex].deactivate();
    this.tagLineComponents[newIndex].activate();

    this.currentIndex = newIndex;
  }

  onTypingComplete(tagLine) {
    // Make sure that the timeout clock starts *after* the typing animation is complete
    setTimeout(tagLine.deleteText.bind(tagLine), 1500);
  }

  onDeleteTextComplete(tagLine) {
    this.activateNext();
  }
}