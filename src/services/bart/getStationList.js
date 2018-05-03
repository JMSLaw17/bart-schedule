import apiUrl from './apiUrl';
import publicAPIKey from './publicAPIKey';

const getStationList = (stationAbbreviation, direction) => {
  const url = new URL(apiUrl + 'stn.aspx');

  url.search = new URLSearchParams({
    cmd: 'stns',
    key: publicAPIKey,
    json: 'y',
  });

  return fetch(url)
    .then(data => data.json());
};

export default getStationList;