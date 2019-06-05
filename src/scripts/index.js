import '../styles/index.scss';

import TagComponent from './components/tag';
import ArtistsComponent from './components/artists';

const componentMap = {
  tag: TagComponent,
  artists: ArtistsComponent
};

for (const prop in componentMap) {
  const componentEls = document.querySelectorAll(`[data-component="${prop}"]`);

  for (const el of componentEls) {
    new componentMap[prop](el);
  }
}