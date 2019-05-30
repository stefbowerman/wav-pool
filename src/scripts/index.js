import '../styles/index.scss';

const imgs = document.querySelectorAll('.tag-images img');
let currIndex = 0;
const imgCount = imgs.length;

console.log(imgs);

setInterval(() => {
  imgs.forEach((img) => {
    img.classList.remove('is-active');
  });
  
  let newIndex = currIndex == (imgCount-1) ? 0 : currIndex+1;
  
  let newActive = imgs[newIndex];
    
  newActive.classList.add('is-active');
  
  currIndex = newIndex;
}, 150);