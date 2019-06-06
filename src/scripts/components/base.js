import { throttle } from 'throttle-debounce';

export default class BaseComponent {
  constructor(container, name) {
    this.container = container;
    this.type = this.container.getAttribute('data-component');
    this.name = name;
    this.namespace = `.${this.name}`;

    window.addEventListener('resize', throttle(100, this.onResize.bind(this)));
  }

  onResize() {
    
  }
}