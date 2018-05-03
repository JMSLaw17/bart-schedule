import apiUrl from './apiUrl';
import publicAPIKey from './publicAPIKey';

const getIncomingTrainsForStation = (stationAbbreviation) => {
  const url = new URL(apiUrl + 'etd.aspx');

  url.search = new URLSearchParams({
    cmd: 'etd',
    orig: stationAbbreviation,
    key: publicAPIKey,
    json: 'y',
  });

  return fetch(url)
    .then(data => data.json());
};

export default getIncomingTrainsForStation;