import React from 'react';
import PropTypes from 'prop-types';
import Train from './Train';
import '../styles/TrainsToOneDestination.css';

const TrainsToOneDestination = (props) => {
  return (
    <div className="one-destination">
      <div className="destination-name">{`${props.destination}-bound`}</div>
          {props.trains.map((eta, i) => <Train key={i} eta={eta}/>)}
    </div>
  );
};

TrainsToOneDestination.propTypes = {
  destination: PropTypes.string.isRequired,
  trains: PropTypes.array.isRequired,
};

export default TrainsToOneDestination;