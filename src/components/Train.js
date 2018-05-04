import React from 'react';
import PropTypes from 'prop-types';

const Train = (props) => {
  return (
    <div>{`Train arrives in ${props.eta} Minutes`}</div>
  );
};

Train.propTypes = {
  eta: PropTypes.string.isRequired,
};

export default Train;