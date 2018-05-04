import React from 'react';
import PropTypes from 'prop-types';
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

TrainsToOneDestination.propTypes = {
  destination: PropTypes.string.isRequired,
  trains: PropTypes.array.isRequired,
};

export default TrainsToOneDestination;