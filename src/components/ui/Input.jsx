import React, { Fragment } from 'react';

export default function Input({ type, value, onChange, placeholder, className }) {
  const isTextarea = type === 'textarea';
  const inputClass = `text-sm border rounded px-2 py-1 ${className}`;

  return (
    <Fragment>
      {
        isTextarea ? (
          <textarea
            value={value}
            rows={4}
            onChange={onChange}
            placeholder={placeholder}
            className={inputClass}
          />) :
          (<input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={inputClass}
          />)
      }
    </Fragment>
  )
}