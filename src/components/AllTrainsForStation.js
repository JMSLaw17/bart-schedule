import React from 'react';
import TrainsFromOneDirection from './TrainsFromOneDirection';

const AllTrainsForStation = (props) => {
  return (
    <div>
      <button onClick={props.handleCloseTrainScheduleClick}>X</button>
      <h3>{props.allTrains.station}</h3>
      <TrainsFromOneDirection direction={'Northbound'} trainsFromDirection={props.allTrains.northbound}/>
      <TrainsFromOneDirection direction={'Southbound'} trainsFromDirection={props.allTrains.southbound}/>
    </div>
  );
};

export default AllTrainsForStation;