import React from 'react'

export const CustomInput = ({ placeholder, value, onChange }) => {
    return (
        <input
            type="text"
            className="mb-1 px-4 py-2 border rounded-2xl text-cyan-50"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    )
}
