import BaseComponent from './base';

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
    this.listItems = this.list.querySelectorAll('li');
    this.portraits = container.querySelectorAll('.artist-portrait');

    this.portraits.forEach((el) => {
      el.style.backgroundColor = getRandomColor();
    });

    this.listItems.forEach((el, i) => {
      el.addEventListener('mouseenter', this.onLIMouseenter.bind(this));
      el.addEventListener('mouseleave', this.onLIMouseleave.bind(this));
    });

    this.activateItem(this.listItems[0]); // activate the first one
  }

  onLIMouseenter(e) {
    this.activateItem(e.currentTarget);
  }

  onLIMouseleave(e) {
    this.deactiveItem(e.currentTarget);
  }

  activateItem(el) {
    const i = [].indexOf.call(this.listItems, el);
    el.classList.add(classes.listItemActive);
    this.portraits[i].classList.add(classes.portraitActive);
  }

  deactiveItem(el) {
    const i = [].indexOf.call(this.listItems, el);
    el.classList.remove(classes.listItemActive);
    this.portraits[i].classList.remove(classes.portraitActive);
  }
}