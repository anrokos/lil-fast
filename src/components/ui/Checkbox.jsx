import React from 'react';

const Checkbox = ({ label, checked, onChange }) => {
  return (
    <label className="flex items-center space-x-1 cursor-pointer text-xs">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="form-checkbox h-3 w-3 text-blue-600 rounded"
      />
      <span className="text-gray-700">{label}</span>
    </label>
  );
};

export default Checkbox;