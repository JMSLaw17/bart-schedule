import React from 'react';
import PropTypes from 'prop-types';
import Station from './Station';
import '../styles/StationsForCity.css';

const StationsForCity = (props) => {
  return (
    <div>
      <p className='city'>{`Stations in ${props.cityName}`}</p>
        {props.stations.map((station, i) => <Station key={i} stationData={station}
                                                     handleStationNameClick={props.handleStationNameClick}/>)}
    </div>
  );
};

StationsForCity.propTypes = {
  cityName: PropTypes.string.isRequired,
  stations: PropTypes.array.isRequired,
  handleStationNameClick: PropTypes.func.isRequired,
};

export default StationsForCity;