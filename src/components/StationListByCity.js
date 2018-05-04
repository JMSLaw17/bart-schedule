import React from 'react';
import PropTypes from 'prop-types';
import StationsForCity from './StationsForCity';

const StationListByCity = (props) => {
  return (
    <div>
      {props.stationsByCity.map((dataForCity, i) => 
      <StationsForCity key={i} cityName={dataForCity.cityName} stations={dataForCity.stations}
                       handleStationNameClick={props.handleStationNameClick}/>)}
    </div>
  );
};

StationListByCity.propTypes = {
  stationsByCity: PropTypes.array.isRequired,
  handleStationNameClick: PropTypes.func.isRequired,
};

export default StationListByCity;