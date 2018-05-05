import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Train.css';

const Train = (props) => {
  return (
    <div className="train-time">
      {props.eta === 'Leaving'
      ?
        'Leaving Station'
      :
        `${props.eta} minutes`}
    </div>
  );
};

Train.propTypes = {
  eta: PropTypes.string.isRequired,
};

export default Train;