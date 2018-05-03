import React from 'react';
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

export default StationListByCity;