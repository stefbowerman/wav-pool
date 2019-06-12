import '../styles/index.scss';

import ScrollMonitor from 'scrollmonitor';

import TagComponent from './components/tag';
import ArtistsComponent from './components/artists';
import ClientsComponent from './components/clients';

const componentMap = {
  tag: TagComponent,
  artists: ArtistsComponent,
  clients: ClientsComponent
};

for (const prop in componentMap) {
  const componentEls = document.querySelectorAll(`[data-component="${prop}"]`);

  for (const el of componentEls) {
    new componentMap[prop](el);
  }
}

// document.querySelectorAll('section').forEach((el, i) => {
//   const watcher = ScrollMonitor.create(el, -300);

//   watcher.enterViewport(() => {
//     el.classList.add('is-visible');
//     watcher.destroy();
//   });
// });
