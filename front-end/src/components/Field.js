import React from 'react'
import PropTypes from 'prop-types'

const Field = ({ type, id, name, label, autoComplete, value, onChange, required, className}) => {
    return (
        <>
            <div className="input-wrapper">
                <label htmlFor={id}>{label}</label>
                <input 
                    type={type}
                    id={id}
                    name={id}
                    value={value}
                    onChange={onChange}
                    required={required}
                    autoComplete={autoComplete}
                    className={className}
                />
            </div>
        </>
    )
}

Field.propTypes = {
    type: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    required:PropTypes.bool,
    label:PropTypes.string,
};

export default Field
