import React from 'react';

const Switch = ({ options, checked, onChange }) => {
    return (
        <div className="inline-flex items-center rounded-lg overflow-hidden">
            {options.map((option, index) => (
                <label key={index} className="inline-flex items-center">
                    <input
                        type="radio"
                        name="switch"
                        value={option.value}
                        checked={checked === option.value}
                        onChange={() => onChange(option.value)}
                        className="form-radio opacity-0 absolute"
                    />
                    <div className={`min-w-8 min-h-8 flex items-center justify-center px-2 py-1 cursor-pointer ${checked === option.value ? 'bg-blue-300' : 'bg-gray-200 hover:bg-gray-300'}`}>
                        <div className="flex items-center">{option.icon}</div>
                    </div>
                </label>
            ))}
        </div>
    );
};

export default Switch;