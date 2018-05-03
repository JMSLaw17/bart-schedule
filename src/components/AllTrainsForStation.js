import React from 'react';
import TrainsToOneDestination from './TrainsToOneDestination';

const AllTrainsForStation = (props) => {
  return (
    <div>
      <button onClick={props.handleCloseTrainScheduleClick}>X</button>
      <h3>{props.allTrains.station}</h3>
      {props.allTrains.trainsByDestination.map((trains, i) => <TrainsToOneDestination key={i} destination={trains.destination} trains={trains.etas}/>)}
    </div>
  );
};

export default AllTrainsForStation;