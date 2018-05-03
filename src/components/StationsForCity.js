import React from 'react';
import Station from './Station';

const StationsForCity = (props) => {
  return (
    <div>
      <h3>{`Stations in ${props.cityName}`}</h3>
      <div>
        {props.stations.map((station, i) => <Station key={i} stationData={station}
                                                     handleStationNameClick={props.handleStationNameClick}/>)}
      </div>
    </div>
  );
};

export default StationsForCity;