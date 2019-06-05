import BaseComponent from './base';

export default class TagComponent extends BaseComponent {
  constructor(container) {
    super(container, 'tag');

    this.imgs = this.container.querySelectorAll('.tag-images img');
    let currIndex = 0;
    const imgCount = this.imgs.length;

    setInterval(() => {
      this.imgs.forEach((img) => {
        img.classList.remove('is-active');
      });
      
      let newIndex = currIndex == (imgCount-1) ? 0 : currIndex+1;
      
      let newActive = this.imgs[newIndex];
        
      newActive.classList.add('is-active');
      
      currIndex = newIndex;
    }, 150);    
  }
}