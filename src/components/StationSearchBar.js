import React from 'react';
import PropTypes from 'prop-types';
import '../styles/StationSearchBar.css';

const StationSearchBar = (props) => {
  return (
    <div>
      <p className="search-bar-title">
        Select station for times
      </p>
      <input className="search" type="text" placeholder="🔍 Search" value={props.searchBarText} onChange={props.handleChange}/>
    </div>
  );
};

StationSearchBar.propTypes = {
  searchBarText: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default StationSearchBar;