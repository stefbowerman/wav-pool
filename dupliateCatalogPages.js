// This is a file meant to be run via CLI

const fs = require('fs');
const sourceFilePath = './build/catalog.html';

const playlists = {
  achun: 466488237,
  actionsequence: 296966214,
  'afta-1': 832072493,
  'ahee': 639395775,
  'badsnacks': 832834295,
  'beatinc': 619040751,
  'beiru': 833604884,
  'betty': 944825647,
  'bigbird': 536099100,
  'blakeskowron': 685846797,
  'boombapbeats': 773700783,
  'carsandtrains': 42947415,
  'cinematicaction': 307474542,
  'cinematicstorytelling': 298264418,
  clyde: 685856343,
  db: 1041470995,
  ddayone: 836831732,
  decomposure: 307394644,
  djnobody: 516454137,
  djpain1: 46133358,
  djpnutz: 723156150,
  domeofdoom: 686784837,
  doubleday1: 966636835,
  downtemposynth: 845745854,
  dreamyguitars: 763830195,
  echobeds: 291321122,
  eclecticcinema: 740986548,
  eclecticelectronica: 775231056,
  edison: 22648952,
  egadz: 22971643,
  elos: 515032752,
  elusive: 466481925,
  epicbeginnings: 296962258,
  'equinox-downtempo': 967935088,
  'equinox-midtempo': 970572127,
  'equinox-uptempo': 967105402,
  'eraserfase': 514772379,
  'esgar': 197964861,
  'eurekathebutcher': 466467966,
  'factor': 22648911,
  foreigneclectic: 296972992,
  freetherobots: 22649035,
  gnomebeats: 514761267,
  greatdane: 516462102,
  heavydrums: 296967658,
  heavyguitarbeats: 296967870,
  holly: 516465213,
  huxleyanne: 516469668,
  iliagorovitz: 637907121,
  inspirationalmoments: 296968747,
  jazzbeats: 298266033,
  jel: 22648802,
  johnpain: 23889064,
  kennysegal: 466455495,
  kiaclassic: 1009020040,
  lealani: 722494026,
  lmnop: 514752174,
  moodieblack: 292427138,
  mophono: 23987172,
  mountainmusic: 298280925,
  mumbles: 639799521,
  musicfortravelers: 299031603,
  neverendingecho: 639809085,
  newandnotable: 639174861,
  nickandre: 775067982,
  nightlife: 296979758,
  nostalgia: 847116704,
  nrvslvrs: 267166877,
  oddnosdam: 306345218,
  originalcultures: 64890280,
  productplacements: 524802498,
  psychopop: 164530918,
  psychwave: 916740694,
  rubedo: 591736692,
  shrimpnose: 591253404,
  sinkingswimmer: 831357647,
  skatemusic: 953305495,
  skater: 1010159485,
  skyrider: 105406277,
  slowbeats: 847212119,
  slowgraves: 106705191,
  snakefoot: 432277644,
  sole: 23888894,
  soundcrafter: 358805967,
  soundscapes: 298286685,
  spotifybusiness: 1011635608,
  stolengold: 526802514,
  summerjams: 491053887,
  sureshots: 536099100,
  swamimillion: 619013655,
  thecontentlabel: 264416117,
  thedarkside: 296967542,
  theheavytwelves: 490335579,
  thelowandbecold: 366571354,
  thook: 775090227,
  tomhinton: 1015766269,
  trapbeats: 296970126,
  uptempoeclectic: 866972231,
  voidpedal: 84031320,
  wavegroove: 833926949,
  welcome: 761847651,
  williamryanfritch: 45804041,
  wyliecable: 612432465
};

/*
 Script to be added to the 'catalog-productplacements' page
<!-- Start of  Zendesk Widget script -->
<script id="ze-snippet" src="https://static.zdassets.com/ekr/snippet.js?key=9ce0f6fa-b4ec-490a-b26e-47b2a5161339"> </script>
<!-- End of  Zendesk Widget script -->
*/

function main() {
  for (let [key, value] of Object.entries(playlists)) {
    let destFilePath = sourceFilePath.replace('catalog.html', `catalog-${key}.html`);

    fs.readFile(sourceFilePath, 'utf8', function (err, contents) {
      if (err) {
        return console.log(err);
      }
      
      contents = contents.replace('catalog.wav-pool.com', `catalog.wav-pool.com/pl/${value}`);
      contents = contents.replace('composerly.com/wav-pool-agency', `composerly.com/wav-pool-agency/pl/${value}`);

      fs.writeFile(destFilePath, contents, 'utf8', function (err) {
         if (err) return console.log(err);
      });
    });
    // fs.copyFile(sourceFilePath, destFilePath, (err) => {
    //   if (err) throw err;
    // });
  }

  console.log("Don't forget to add the zendesk script to the productplacements catalog page!");
}

main()