/* global createButtonGroup createElement createModalButton createModal keyUpHandler */
const FLIGHTRADAR_URL = 'https://api.codetabs.com/v1/proxy?quest=https://data-live.flightradar24.com/';

const params = new URLSearchParams(window.location.search);
const defaultTopCoordinate = params.has('top') ? params.get('top') : '48.4';
const defaultBottomCoordinate = params.has('bottom') ? params.get('bottom') : '47.9';
const defaultLeftCoordinate = params.has('left') ? params.get('left') : '11.3';
const defaultRightCoordinate = params.has('right') ? params.get('right') : '11.8';
const defaultGround = params.has('ground') ? params.get('ground') : 0;
const defaultAir = params.has('air') ? params.get('air') : 1;
const defaultVehicles = params.has('vehicles') ? params.get('vehicles') : 0;
const defaultGliders = params.has('gliders') ? params.get('gliders') : 0;
let topCoordinate;
let bottomCoordinate;
let leftCoordinate;
let rightCoordinate;
let ground;
let air;
let vehicles;
let gliders;

const modalElements = [[['Top Coordinate', 'topCoordinate', 'text'], ['Bottom Coordinate', 'bottomCoordinate', 'text'], ['Left Coordinate', 'leftCoordinate', 'text'], ['Right Coordinate', 'rightCoordinate', 'text']], [['Ground', 'ground', 'check'], ['Air', 'air', 'check'], ['Vehicles', 'vehicles', 'check'], ['Gliders', 'gliders', 'check']]];
const buttonElements = [['success', 'list()', 'r', 'sync', '<u>R</u>efresh'], ['info', '', 's', 'cog', '<u>S</u>ettings']];
const buttonGroup = createButtonGroup('btn-group btn-group-lg btn-group-center mt-3', buttonElements);
document.getElementsByClassName('container')[0].insertBefore(createModalButton(buttonGroup, 1), document.getElementsByClassName('d-flex')[0]);
createModal(modalElements);
resetInputs();
document.addEventListener('keyup', keyUpHandler);
const headers = [['Latitude', 1], ['Longitude', 2], ['Heading', 3], ['Altitude', 4], ['Ground Speed', 5], ['On Ground', 14], ['Vertical Speed', 15], ['Aircraft', 8], ['Registration', 9], ['Origin Airport', 11], ['Destination Airport', 12], ['Flight', 13], ['Call Sign', 16], ['Airline', 18]];
const tr = document.createElement('tr');
for (const header of headers) {
  tr.appendChild(createElement('th', header[0]));
}
document.getElementsByTagName('thead')[0].appendChild(tr);
list();

function resetInputs () {
  topCoordinate = defaultTopCoordinate;
  bottomCoordinate = defaultBottomCoordinate;
  leftCoordinate = defaultLeftCoordinate;
  rightCoordinate = defaultRightCoordinate;
  ground = defaultGround;
  air = defaultAir;
  vehicles = defaultVehicles;
  gliders = defaultGliders;
  document.getElementById('topCoordinate').value = topCoordinate;
  document.getElementById('bottomCoordinate').value = bottomCoordinate;
  document.getElementById('leftCoordinate').value = leftCoordinate;
  document.getElementById('rightCoordinate').value = rightCoordinate;
  document.getElementById('ground').checked = !!ground;
  document.getElementById('air').checked = !!air;
  document.getElementById('vehicles').checked = !!vehicles;
  document.getElementById('gliders').checked = !!gliders;
}

window.save = function () {
  topCoordinate = document.getElementById('topCoordinate').value;
  bottomCoordinate = document.getElementById('bottomCoordinate').value;
  leftCoordinate = document.getElementById('leftCoordinate').value;
  rightCoordinate = document.getElementById('rightCoordinate').value;
  ground = +document.getElementById('ground').checked;
  air = +document.getElementById('air').checked;
  vehicles = +document.getElementById('vehicles').checked;
  gliders = +document.getElementById('gliders').checked;
  list();
};

async function getDetails (flightId) {
  return window.fetch(`${FLIGHTRADAR_URL}clickhandler/?flight=${flightId}`, { headers: { Origin: 'https://berkerol.github.io' } })
    .then(res => {
      return res.json();
    })
    .then(res => {
      const origin = res.airport.origin;
      const destination = res.airport.destination;
      return [res.aircraft.model === undefined ? '' : res.aircraft.model.text, res.airline === null ? '' : res.airline.name, origin === null ? '' : origin.name, destination === null ? '' : destination.name];
    });
}

async function list () {
  await window.fetch(`${FLIGHTRADAR_URL}zones/fcgi/feed.js?bounds=${topCoordinate},${bottomCoordinate},${leftCoordinate},${rightCoordinate}&faa=1&satellite=1&mlat=1&flarm=1&adsb=1&gnd=${ground}&air=${air}&vehicles=${vehicles}&estimated=1&maxage=14400&gliders=${gliders}&stats=0`, { headers: { Origin: 'https://berkerol.github.io' } })
    .then(res => {
      return res.json();
    })
    .then(async res => {
      const oldTbody = document.getElementsByTagName('tbody')[0];
      const tbody = document.createElement('tbody');
      oldTbody.parentNode.replaceChild(tbody, oldTbody);
      for (const flightId in res) {
        if (flightId !== 'full_count' && flightId !== 'version') {
          const flight = res[flightId];
          const details = await getDetails(flightId);
          const tr = document.createElement('tr');
          for (const header of headers) {
            if (header[1] === 8) {
              const description = details[0] === '' ? '' : ` - ${details[0]}`;
              tr.appendChild(createElement('td', `${flight[8]}${description}`));
            } else if (header[1] === 11) {
              const description = details[2] === '' ? '' : ` - ${details[2].replace(' Airport', '')}`;
              tr.appendChild(createElement('td', `${flight[11]}${description}`));
            } else if (header[1] === 12) {
              const description = details[4] === '' ? '' : ` - ${details[3].replace(' Airport', '')}`;
              tr.appendChild(createElement('td', `${flight[12]}${description}`));
            } else if (header[1] === 18) {
              const description = details[1] === '' ? '' : (flight[18] === '' ? '' : ' - ') + details[1];
              tr.appendChild(createElement('td', `${flight[18]}${description}`));
            } else {
              tr.appendChild(createElement('td', flight[header[1]]));
            }
          }
          tbody.appendChild(tr);
        }
      }
    });
}