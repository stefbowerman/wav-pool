import BaseComponent from './base';

export default class ClientsComponent extends BaseComponent {
  constructor(container) {
    super(container, 'clients');

    this.listItems = this.container.querySelectorAll('li');
    this.banner = this.container.querySelector('.client-banner');
    this.activeItem = null;

    this.listItems.forEach((el, i) => {
      el.addEventListener('mouseenter', this.onLIMouseenter.bind(this));
      // el.addEventListener('mouseleave', this.onLIMouseleave.bind(this));
    });

    this.activateItem(this.listItems[0]); // activate the first one
  }

  onLIMouseenter(e) {
    this.activateItem(e.currentTarget);
  }

  // onLIMouseleave(e) {
  //   this.deactivateItem(e.currentTarget);
  // }

  getItemSlug(el) {
    return el.textContent.toLowerCase().split(' ').join('-');
  }

  activateItem(el) {
    if(!el) return;

    this.deactivateItem(this.activeItem);

    el.style.color = 'red';

    // const slug = this.getItemSlug(el);
    // console.log(`adding class banner--${slug}`);
    this.banner.classList.add(`client-banner--${this.getItemSlug(el)}`);

    this.activeItem = el;
  }

  deactivateItem(el) {
    if(!el) return;

    this.banner.classList.remove(`client-banner--${this.getItemSlug(el)}`);

    el.style.color = '';
  }
}