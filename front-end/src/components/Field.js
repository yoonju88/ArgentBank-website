import React from 'react'
import PropTypes from 'prop-types'

const Field = ({ type, id, name,label, autoComplete, value, onChange,required}) => {
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
};

export default Field
