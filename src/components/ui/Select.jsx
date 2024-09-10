import React from 'react';

export default function Select({ value, onChange, children, className }) {
    return (
    <select 
      value={value} 
      onChange={onChange} 
      className={`text-sm border rounded px-2 py-1 ${className}`}
    >
      {children}
    </select>
  );
}