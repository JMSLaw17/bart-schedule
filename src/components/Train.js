import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Train.css';

const Train = (props) => {
  return (
    <div className="train-time">
      {props.etd === 'Leaving'
      ?
        `Leaving station now from platform ${props.platform}`
      :
        `Departing in ${props.etd} minute${props.etd === '1' ? '' : 's'} from platform ${props.platform}`}
    </div>
  );
};

Train.propTypes = {
  etd: PropTypes.string.isRequired,
  platform: PropTypes.string.isRequired,
};

export default Train;