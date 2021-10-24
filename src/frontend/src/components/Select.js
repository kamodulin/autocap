import React from "react";

function Select(props) {
    const { name, label, value, options, onChange } = props;
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <select name={name}
                value={value}
                onChange={onChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                {options.map((value) => <option key={value}>{value}</option>)}
            </select>
        </div>
    );
}

export default Select;