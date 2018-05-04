import React from 'react';
import PropTypes from 'prop-types';

const StationSearchBar = (props) => {
  return (
    <input type="text" value={props.searchBarText} onChange={props.handleChange}/>
  );
};

StationSearchBar.propTypes = {
  searchBarText: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default StationSearchBar;