import React from 'react';
import TrainsToOneDestination from './TrainsToOneDestination';

const TrainsFromOneDirection = (props) => {
  return (
    <div>
      <h4>{`${props.direction[0].toUpperCase()}${props.direction.slice(1)}`}</h4>
      <ol>
        {props.trainsFromDirection.map((trains, i) => <TrainsToOneDestination key={i} destination={trains.destination} trains={trains.etas}/>)}
      </ol>
    </div>
  );
};

export default TrainsFromOneDirection;