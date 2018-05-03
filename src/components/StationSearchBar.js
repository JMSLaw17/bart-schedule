import React from 'react';

const StationSearchBar = (props) => {
  return (
    <input type="text" value={props.searchBarText} onChange={props.handleChange}/>
  );
};

export default StationSearchBar;