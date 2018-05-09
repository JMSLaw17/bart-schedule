import React from 'react';
import PropTypes from 'prop-types';
import TrainsToOneDestination from './TrainsToOneDestination';
import '../styles/AllTrainsForStation.css';

const AllTrainsForStation = (props) => {
  return (
    <div className="all-trains">
      <button className="close-panel" onClick={props.handleCloseTrainScheduleClick}><span role="img" aria-label="X">❌</span></button>
      <div className="station-intro">Trains Departing From</div>
      <div className="selected-station">{props.allTrains.station} Station</div>
      {
        props.allTrains.trainsByDestination.length
        ?
          props.allTrains.trainsByDestination.map((trains, i) => <TrainsToOneDestination key={i} destination={trains.destination} trains={trains.trains}/>)
        :
          <p className="no-trains-message">No Trains Currently Inbound</p>
      }
    </div>
  );
};

AllTrainsForStation.propTypes = {
  handleCloseTrainScheduleClick: PropTypes.func.isRequired,
  allTrains: PropTypes.shape({
    station: PropTypes.string.isRequired,
    trainsByDestination: PropTypes.array.isRequired,
  })
};

export default AllTrainsForStation;