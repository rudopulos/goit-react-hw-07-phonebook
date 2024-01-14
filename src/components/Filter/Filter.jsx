// src/components/Filter/Filter.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setFilter } from '../AppRedux/slice';


const Filter = ({ value, onChange }) => {
  const dispatch = useDispatch();

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <div className="filter-container"> 
      <label className="filter-label"> 
        Filter by name:
        <input type="text" value={value} onChange={handleFilterChange} className="filter-input" /> {/* Adaugă o clasă pentru câmpul de input */}
      </label>
    </div>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
