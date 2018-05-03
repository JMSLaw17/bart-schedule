import React from 'react';

const Station = (props) => {
  return (
    <div onClick={() => props.handleStationNameClick(props.stationData.abbr)}>
      {props.stationData.name}
    </div>
  );
};

export default Station;