/* global FIXED_COUNTRY_CODES REGISTRATION_COUNTRIES createButtonGroup createElement createModalButton createModal keyUpHandler */
const FLIGHTRADAR_URL_GET_FLIGHT_DETAILS = 'https://api.codetabs.com/v1/proxy?quest=https://data-live.flightradar24.com/';
const FLIGHTRADAR_URL_LIST_FLIGHTS = 'https://api.codetabs.com/v1/proxy?quest=https://data-cloud.flightradar24.com/';

const params = new URLSearchParams(window.location.search);
const defaultTopCoordinate = params.has('top') ? params.get('top') : '48.4';
const defaultBottomCoordinate = params.has('bottom') ? params.get('bottom') : '47.9';
const defaultLeftCoordinate = params.has('left') ? params.get('left') : '11.3';
const defaultRightCoordinate = params.has('right') ? params.get('right') : '11.8';
const defaultGround = params.has('ground') ? params.get('ground') : 0;
const defaultAir = params.has('air') ? params.get('air') : 1;
const defaultVehicles = params.has('vehicles') ? params.get('vehicles') : 0;
const defaultGliders = params.has('gliders') ? params.get('gliders') : 0;
const defaultLatitudeRange = 0.3;
const defaultLongitudeRange = 0.3;
const defaultHighAccuracy = false;
let topCoordinate;
let bottomCoordinate;
let leftCoordinate;
let rightCoordinate;
let ground;
let air;
let vehicles;
let gliders;
let latitudeRange;
let longitudeRange;
let highAccuracy;

const modalElements = [[['Top Coordinate', 'topCoordinate', 'text'], ['Bottom Coordinate', 'bottomCoordinate', 'text'], ['Left Coordinate', 'leftCoordinate', 'text'], ['Right Coordinate', 'rightCoordinate', 'text']], [['Ground', 'ground', 'check'], ['Air', 'air', 'check'], ['Vehicles', 'vehicles', 'check'], ['Gliders', 'gliders', 'check']], [['Latitude Range', 'latitudeRange', 'text'], ['Longitude Range', 'longitudeRange', 'text'], ['High Accuracy', 'highAccuracy', 'check']]];
const buttonElements = [['success', 'list()', 'r', 'sync', '<u>R</u>efresh'], ['primary', 'setLocation()', 'l', 'location-arrow', 'Use my <u>L</u>ocation'], ['info', '', 's', 'cog', '<u>S</u>ettings']];
const buttonGroup = createButtonGroup('btn-group btn-group-lg btn-group-center mt-3', buttonElements);
document.getElementsByClassName('container')[0].insertBefore(createModalButton(buttonGroup, 2), document.getElementsByClassName('d-flex')[0]);
createModal(modalElements);
resetInputs();
document.addEventListener('keyup', keyUpHandler);
const headers = [['Latitude', 1], ['Longitude', 2], ['Heading', 3], ['Altitude', 4], ['Ground Speed', 5], ['On Ground', 14], ['Vertical Speed', 15], ['Aircraft', 8], ['Registration', 9], ['Origin Airport', 11], ['Destination Airport', 12], ['Flight', 13], ['Call Sign', 16], ['Airline', 18], ['Flightradar24 Link', 19]];
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
  latitudeRange = defaultLatitudeRange;
  longitudeRange = defaultLongitudeRange;
  highAccuracy = defaultHighAccuracy;
  document.getElementById('topCoordinate').value = topCoordinate;
  document.getElementById('bottomCoordinate').value = bottomCoordinate;
  document.getElementById('leftCoordinate').value = leftCoordinate;
  document.getElementById('rightCoordinate').value = rightCoordinate;
  document.getElementById('ground').checked = !!ground;
  document.getElementById('air').checked = !!air;
  document.getElementById('vehicles').checked = !!vehicles;
  document.getElementById('gliders').checked = !!gliders;
  document.getElementById('latitudeRange').value = latitudeRange;
  document.getElementById('longitudeRange').value = longitudeRange;
  document.getElementById('highAccuracy').checked = highAccuracy;
}

window.setLocation = function () {
  navigator.geolocation.getCurrentPosition(pos => {
    const round = number => Math.round(number * 10) / 10;
    topCoordinate = round(pos.coords.latitude + latitudeRange);
    bottomCoordinate = round(pos.coords.latitude - latitudeRange);
    leftCoordinate = round(pos.coords.longitude - longitudeRange);
    rightCoordinate = round(pos.coords.longitude + longitudeRange);
    document.getElementById('topCoordinate').value = topCoordinate;
    document.getElementById('bottomCoordinate').value = bottomCoordinate;
    document.getElementById('leftCoordinate').value = leftCoordinate;
    document.getElementById('rightCoordinate').value = rightCoordinate;
    list();
  }, err => {
    window.alert(`Can not get position with error code ${err.code} and error message ${err.message}`);
  }, { enableHighAccuracy: highAccuracy });
};

window.save = function () {
  topCoordinate = document.getElementById('topCoordinate').value;
  bottomCoordinate = document.getElementById('bottomCoordinate').value;
  leftCoordinate = document.getElementById('leftCoordinate').value;
  rightCoordinate = document.getElementById('rightCoordinate').value;
  ground = +document.getElementById('ground').checked;
  air = +document.getElementById('air').checked;
  vehicles = +document.getElementById('vehicles').checked;
  gliders = +document.getElementById('gliders').checked;
  latitudeRange = +document.getElementById('latitudeRange').value;
  longitudeRange = +document.getElementById('longitudeRange').value;
  highAccuracy = document.getElementById('highAccuracy').checked;
  list();
};

function fixCountryCode (countryCode) {
  for (const code of FIXED_COUNTRY_CODES) {
    countryCode = countryCode.replace(code[0], code[1]);
  }
  return countryCode;
}

function getFlagEmoji (countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

async function getDetails (flightId) {
  return window.fetch(`${FLIGHTRADAR_URL_GET_FLIGHT_DETAILS}clickhandler/?flight=${flightId}`, { headers: { Origin: 'https://berkerol.github.io' } })
    .then(res => {
      return res.json();
    })
    .then(res => {
      const origin = res.airport.origin;
      const destination = res.airport.destination;
      return [res.aircraft.model === undefined ? '' : res.aircraft.model.text, res.airline === null ? '' : res.airline.name, origin === null ? '' : origin.position.country.code, origin === null ? '' : origin.name, destination === null ? '' : destination.position.country.code, destination === null ? '' : destination.name];
    });
}

async function list () {
  await window.fetch(`${FLIGHTRADAR_URL_LIST_FLIGHTS}zones/fcgi/feed.js?bounds=${topCoordinate},${bottomCoordinate},${leftCoordinate},${rightCoordinate}&faa=1&satellite=1&mlat=1&flarm=1&adsb=1&gnd=${ground}&air=${air}&vehicles=${vehicles}&estimated=1&maxage=14400&gliders=${gliders}&stats=0`, { headers: { Origin: 'https://berkerol.github.io' } })
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
          let details;
          while (true) {
            try {
              details = await getDetails(flightId);
              break;
            } catch (err) {
              await new Promise(resolve => setTimeout(resolve, 1000));
            }
          }
          const tr = document.createElement('tr');
          for (const header of headers) {
            if (header[1] === 8) {
              const description = details[0] === '' ? '' : ` - ${details[0]}`;
              tr.appendChild(createElement('td', `${flight[8]}${description}`));
            } else if (header[1] === 9) {
              let description = '';
              for (const country of REGISTRATION_COUNTRIES) {
                if (flight[9].startsWith(country[0])) {
                  description = ` - ${getFlagEmoji(country[1])} ${country[2]}`;
                }
              }
              tr.appendChild(createElement('td', `${flight[9]}${description}`));
            } else if (header[1] === 11) {
              const description = details[2] === '' ? '' : ` - ${getFlagEmoji(fixCountryCode(details[2]))} ${details[3].replace(' Airport', '')}`;
              tr.appendChild(createElement('td', `${flight[11]}${description}`));
            } else if (header[1] === 12) {
              const description = details[4] === '' ? '' : ` - ${getFlagEmoji(fixCountryCode(details[4]))} ${details[5].replace(' Airport', '')}`;
              tr.appendChild(createElement('td', `${flight[12]}${description}`));
            } else if (header[1] === 18) {
              const description = details[1] === '' ? '' : (flight[18] === '' ? '' : ' - ') + details[1];
              tr.appendChild(createElement('td', `${flight[18]}${description}`));
            } else if (header[1] === 19) {
              const i = document.createElement('i');
              i.setAttribute('class', 'fas fa-external-link-alt');
              const a = document.createElement('a');
              a.setAttribute('target', '_blank');
              a.setAttribute('rel', 'noopener noreferrer');
              a.setAttribute('href', `https://www.flightradar24.com/multiview/${flightId}`);
              a.appendChild(i);
              const td = document.createElement('td');
              td.appendChild(a);
              tr.appendChild(td);
            } else {
              tr.appendChild(createElement('td', flight[header[1]]));
            }
          }
          tbody.appendChild(tr);
        }
      }
    });
}
