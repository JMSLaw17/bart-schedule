import React from 'react';
import PropTypes from 'prop-types';

const Station = (props) => {
  return (
    <div onClick={() => props.handleStationNameClick(props.stationData.abbr)}>
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