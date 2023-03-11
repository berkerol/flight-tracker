const FLIGHTRADAR_URL = 'https://api.codetabs.com/v1/proxy?quest=https://data-live.flightradar24.com/';
const FIXED_COUNTRY_CODES = [['AFG', 'AF'], ['AGO', 'AG'], ['AIA', 'AI'], ['ARE', 'AE'], ['ARM', 'AM'], ['AUS', 'AU'], ['AUT', 'AT'], ['AZE', 'AZ'], ['BEL', 'BE'], ['BFA', 'BF'], ['BGD', 'BD'], ['BHS', 'BS'], ['BRA', 'BR'], ['CAN', 'CA'], ['CHN', 'CN'], ['CMR', 'CM'], ['COG', 'CG'], ['CPV', 'CV'], ['CYP', 'CY'], ['CZE', 'CZ'], ['DEU', 'DE'], ['DJI', 'DJ'], ['DNK', 'DK'], ['DZA', 'DZ'], ['EGY', 'EG'], ['ESP', 'ES'], ['EST', 'EE'], ['FIN', 'FI'], ['FRA', 'FR'], ['GAB', 'GA'], ['GBR', 'GB'], ['GEO', 'GE'], ['GGY', 'GG'], ['GHA', 'GH'], ['GIN', 'GN'], ['GLP', 'GP'], ['GNQ', 'GQ'], ['GRC', 'GR'], ['GRL', 'GL'], ['HRV', 'HR'], ['HUN', 'HU'], ['IDN', 'ID'], ['IND', 'IN'], ['IRL', 'IE'], ['IRN', 'IR'], ['IRQ', 'IR'], ['ISR', 'IL'], ['ITA', 'IT'], ['JPN', 'JP'], ['KAZ', 'KZ'], ['KEN', 'KE'], ['KGZ', 'KG'], ['KOR', 'KR'], ['LAO', 'LA'], ['LBR', 'LR'], ['LBY', 'LB'], ['LCA', 'LC'], ['LTU', 'LT'], ['MAC', 'MO'], ['MAR', 'MA'], ['MDA', 'MD'], ['MKD', 'MK'], ['MLI', 'ML'], ['MMR', 'MM'], ['MNE', 'ME'], ['MNP', 'MP'], ['MOZ', 'MZ'], ['MUS', 'MU'], ['MYS', 'MY'], ['NAM', 'NA'], ['NER', 'NE'], ['NGA', 'NG'], ['NLD', 'NL'], ['NOR', 'NO'], ['PAK', 'PK'], ['PHL', 'PH'], ['POL', 'PL'], ['PRI', 'PR'], ['PRT', 'PT'], ['QAT', 'QA'], ['ROU', 'RO'], ['RUS', 'RU'], ['RWA', 'RW'], ['SAU', 'SA'], ['SDN', 'SD'], ['SLE', 'SL'], ['SVK', 'SK'], ['SWE', 'SE'], ['TGO', 'TG'], ['THA', 'TH'], ['TJK', 'TJ'], ['TKM', 'TM'], ['TLS', 'TL'], ['TUN', 'TN'], ['TUR', 'TR'], ['TWN', 'TW'], ['TZA', 'TZ'], ['UGA', 'UG'], ['USA', 'US'], ['UZB', 'UZ'], ['VEN', 'VE'], ['VNM', 'VN'], ['ZWE', 'ZW']];
const REGISTRATION_COUNTRIES = [['4K-', 'AZ', 'Azerbaijan'], ['4L-', 'GE', 'Georgia'], ['4R-', 'LK', 'Sri Lanka'], ['4X-', 'IL', 'Israel'], ['5B-', 'CY', 'Cyprus'], ['6V-', 'SN', 'Senegal'], ['7T-', 'DZ', 'Algeria'], ['9H-', 'MT', 'Malta'], ['9K-', 'KW', 'Kuwait'], ['9M-', 'MY', 'Malaysia'], ['9V-', 'SG', 'Singapore'], ['A4O-', 'OM', 'Oman'], ['A6-', 'AE', 'United Arab Emirates'], ['A7-', 'QA', 'Qatar'], ['A9C-', 'BH', 'Bahrain'], ['AP-', 'PK', 'Pakistan'], ['B-', 'CN', 'China'], ['C-', 'CA', 'Canada'], ['CN-', 'MA', 'Morocco'], ['CS-', 'PT', 'Portugal'], ['D-', 'DE', 'Germany'], ['EC-', 'ES', 'Spain'], ['EI-', 'IE', 'Ireland'], ['EP-', 'IR', 'Iran'], ['ET-', 'ET', 'Ethiopia'], ['EW-', 'BY', 'Belarus'], ['F-', 'FR', 'France'], ['G-', 'GB', 'United Kingdom'], ['HA-', 'HU', 'Hungary'], ['HB-', 'CH', 'Switzerland'], ['HL', 'KR', 'South Korea'], ['HS-', 'TH', 'Thailand'], ['HZ-', 'SA', 'Saudi Arabia'], ['JA', 'JP', 'Japan'], ['I-', 'IT', 'Italy'], ['LX-', 'LU', 'Luxembourg'], ['LZ-', 'BG', 'Bulgaria'], ['M-', 'IM', 'Isle of Man'], ['OH-', 'FI', 'Finland'], ['OK-', 'CZ', 'Czech Republic'], ['OO-', 'BE', 'Belgium'], ['OY-', 'DK', 'Denmark'], ['N', 'US', 'United States of America'], ['OE-', 'AT', 'Austria'], ['PH-', 'NL', 'Netherlands'], ['PK-', 'ID', 'Indonesia'], ['RA-', 'RU', 'Russia'], ['RP-', 'PH', 'Philippines'], ['S2-', 'BD', 'Bangladesh'], ['SE-', 'SE', 'Sweden'], ['SP-', 'PL', 'Poland'], ['ST-', 'SD', 'Sudan'], ['SU-', 'EG', 'Egypt'], ['SX-', 'GR', 'Greece'], ['TC-', 'TR', 'Turkey'], ['UK', 'UZ', 'Uzbekistan'], ['UR-', 'UA', 'Ukraine'], ['VH-', 'AU', 'Australia'], ['VN-', 'VN', 'Vietnam'], ['VP-B', 'BM', 'Bermuda'], ['VT-', 'IN', 'India'], ['YI-', 'IQ', 'Iraq'], ['YK-', 'SY', 'Syria'], ['YL-', 'LV', 'Latvia'], ['YR-', 'RO', 'Romania']];
const headers = [['Latitude', 1], ['Longitude', 2], ['Heading', 3], ['Altitude', 4], ['Ground Speed', 5], ['On Ground', 14], ['Vertical Speed', 15], ['Aircraft', 8], ['Registration', 9], ['Origin Airport', 11], ['Destination Airport', 12], ['Flight', 13], ['Call Sign', 16], ['Airline', 18], ['Flightradar24 Link', 19]];
const tr = document.createElement('tr');
for (const header of headers) {
  createElement(tr, 'th', header[0]);
}
document.getElementsByTagName('thead')[0].appendChild(tr);

function createElement(tr, type, content) {
  const element = document.createElement(type);
  element.innerHTML = content;
  tr.appendChild(element);
}

function fixCountryCode(countryCode) {
  for (const code of FIXED_COUNTRY_CODES) {
    countryCode = countryCode.replace(code[0], code[1]);
  }
  return countryCode;
}

function getFlagEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

async function getDetails(flightId) {
  return window.fetch(`${FLIGHTRADAR_URL}clickhandler/?flight=${flightId}`, { headers: { 'Origin': 'https://berkerol.github.io' } })
    .then(res => {
      return res.json();
    })
    .then(res => {
      const origin = res.airport.origin;
      const destination = res.airport.destination;
      return [res.aircraft.model === undefined ? '' : res.aircraft.model.text, res.airline === null ? '' : res.airline.name, origin === null ? '' : origin.position.country.code, origin === null ? '' : origin.name, destination === null ? '' : destination.position.country.code, destination === null ? '' : destination.name];
    });
}

async function list() {
  const params = new URLSearchParams(window.location.search);
  const coordinates = params.has('bounds') ? params.get('bounds') : '48.4,47.9,11.3,11.8';
  await window.fetch(`${FLIGHTRADAR_URL}zones/fcgi/feed.js?bounds=${coordinates}&faa=1&satellite=1&malt=1&flarm=1&adsb=1&gnd=0&air=1&vehicles=0&estimated=1&maxage=14400&gliders=0&stats=0`, { headers: { 'Origin': 'https://berkerol.github.io' } })
    .then(res => {
      return res.json();
    })
    .then(async res => {
      const tbody = document.getElementsByTagName('tbody')[0];
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
              createElement(tr, 'td', `${flight[8]}${description}`);
            } else if (header[1] === 9) {
              let description = '';
              for (const country of REGISTRATION_COUNTRIES) {
                if (flight[9].startsWith(country[0])) {
                  description = ` - ${getFlagEmoji(country[1])} ${country[2]}`;
                }
              }
              createElement(tr, 'td', `${flight[9]}${description}`);
            } else if (header[1] === 11) {
              const description = details[2] === '' ? '' : ` - ${getFlagEmoji(fixCountryCode(details[2]))} ${details[3].replace(' Airport', '')}`;
              createElement(tr, 'td', `${flight[11]}${description}`);
            } else if (header[1] === 12) {
              const description = details[4] === '' ? '' : ` - ${getFlagEmoji(fixCountryCode(details[4]))} ${details[5].replace(' Airport', '')}`;
              createElement(tr, 'td', `${flight[12]}${description}`);
            } else if (header[1] === 18) {
              const description = details[1] === '' ? '' : (flight[18] === '' ? '' : ' - ') + details[1];
              createElement(tr, 'td', `${flight[18]}${description}`);
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
              createElement(tr, 'td', flight[header[1]]);
            }
          }
          tbody.appendChild(tr);
        }
      }
    });
}

list();
