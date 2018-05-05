import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Station.css';

const Station = (props) => {
  return (
    <div className="station" onClick={() => props.handleStationNameClick(props.stationData.abbr)}>
      {props.stationData.name}
    </div>
  );
};

Station.propTypes = {
  handleStationNameClick: PropTypes.func.isRequired,
  stationData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    abbr: PropTypes.string.isRequired,
  }),
};

export default Station;