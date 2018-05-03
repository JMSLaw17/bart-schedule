import apiUrl from './apiUrl';
import publicAPIKey from './publicAPIKey';

const getIncomingTrains = (stationAbbreviation, direction) => {
  const url = new URL(apiUrl + 'etd.aspx');

  url.search = new URLSearchParams({
    cmd: 'etd',
    orig: stationAbbreviation,
    key: publicAPIKey,
    dir: direction,
    json: 'y',
  });

  return fetch(url)
    .then(data => data.json());
};

export default getIncomingTrains;