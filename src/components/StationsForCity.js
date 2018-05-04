import React from 'react';
import PropTypes from 'prop-types';
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

StationsForCity.propTypes = {
  cityName: PropTypes.string.isRequired,
  stations: PropTypes.array.isRequired,
  handleStationNameClick: PropTypes.func.isRequired,
};

export default StationsForCity;