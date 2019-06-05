export default class BaseComponent {
  constructor(container, name) {
    this.container = container;
    this.type = this.container.getAttribute('data-component');
    this.name = name;
    this.namespace = `.${this.name}`;

    this.events = {
      SCROLL: `scroll${this.namespace}`,
      CLICK:  `click${this.namespace}`,
      RESIZE: `resize${this.namespace}`,
      MOUSEENTER: `mouseenter${this.namespace}`,
      MOUSELEAVE: `mouseleave${this.namespace}`
    };
  }
}