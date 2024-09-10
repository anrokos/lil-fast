import React from 'react';

export default function Button({ icon, loading, onClick, children, className }) {
  const colorClass = icon ? 'bg-gray-200 text-black' : loading ? 'bg-gray-500' : 'bg-black';
  const paddingClass = icon ? 'px-2' : 'px-4';
  const disabledClass = loading ? 'cursor-not-allowed' : ''
  return (
    <button
      disabled={loading}
      onClick={onClick}
      className={`text-sm py-2 text-white rounded hover:bg-opacity-75 ${colorClass} ${paddingClass} ${disabledClass} ${className}`}
    >
      {icon ?? children}
    </button>
  );
}