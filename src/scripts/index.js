import '../styles/index.scss';

import ScrollMonitor from 'scrollmonitor';

import TagComponent from './components/tag';
import ArtistsComponent from './components/artists';
import ClientsComponent from './components/clients';
import GlobeComponent from './components/globe';
import FooterComponent from './components/footer';

const componentMap = {
  tag: TagComponent,
  artists: ArtistsComponent,
  clients: ClientsComponent,
  globe: GlobeComponent,
  footer: FooterComponent
};

for (const prop in componentMap) {
  const componentEls = document.querySelectorAll(`[data-component="${prop}"]`);

  for (const el of componentEls) {
    new componentMap[prop](el);
  }
}

document.body.classList.add('is-loaded');