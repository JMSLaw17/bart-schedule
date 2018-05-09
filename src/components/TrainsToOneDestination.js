import React from 'react';
import PropTypes from 'prop-types';
import Train from './Train';
import '../styles/TrainsToOneDestination.css';

const TrainsToOneDestination = (props) => {
  return (
    <div className="one-destination">
      <div className="destination-name">{`To ${props.destination}`}</div>
          {props.trains.map((train, i) => <Train key={i} etd={train.etd} platform={train.platform}/>)}
    </div>
  );
};

TrainsToOneDestination.propTypes = {
  destination: PropTypes.string.isRequired,
  trains: PropTypes.array.isRequired,
};

export default TrainsToOneDestination;