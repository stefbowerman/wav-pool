import BaseComponent from './base';

export default class FooterComponent extends BaseComponent {
  constructor(container) {
    super(container, 'footer');
    this.credits = this.container.querySelector('.p3');

    const creditHTML = this.credits.innerHTML;
    this.credits.innerHTML = `&copy;${(new Date()).getFullYear()} ${creditHTML}`;
  }
}