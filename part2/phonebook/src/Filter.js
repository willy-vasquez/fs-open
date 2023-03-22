import React from 'react';

export const Filter = ({ filter, onChangeFilter }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={onChangeFilter} />
    </div>
  );
};
