import React from 'react';
import PropTypes from 'prop-types';
import StationsForCity from './StationsForCity';
import '../styles/StationListByCity.css';

const StationListByCity = (props) => {
  return (
    <div>
      {
      props.stationsByCity.length
      ?
        props.stationsByCity.map((dataForCity, i) => 
        <StationsForCity key={i} cityName={dataForCity.cityName} stations={dataForCity.stations}
                        handleStationNameClick={props.handleStationNameClick}/>)
      :
        <p className="no-stations-message">No Stations or Cities Found</p>
      }
    </div>
  );
};

StationListByCity.propTypes = {
  stationsByCity: PropTypes.array.isRequired,
  handleStationNameClick: PropTypes.func.isRequired,
};

export default StationListByCity;