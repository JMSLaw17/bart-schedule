import React from 'react';
import Train from './Train';

const TrainsToOneDestination = (props) => {
  return (
    <div>
      <h4>{props.destination}</h4>
      <ol>
        {props.trains.map((eta, i) => <Train key={i} eta={eta}/>)}
      </ol>
    </div>
  );
};

export default TrainsToOneDestination;