import React from 'react'
import PropTypes from 'prop-types'


const Button = ({ className, type, onClick, loading, children }) => {
    return (
        <button
            className={className}
            type={type || "button"}
            onClick={onClick}
            disable={loading}
        >
            {loading ? <span>Sign In...</span> : children}
        </button>
    )
}

Button.propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    onClick: PropTypes.func,
    loading: PropTypes.bool,
    children: PropTypes.node.isRequired,
};

export default Button