import PropTypes from "prop-types"
import React from "react"
import closeIcon from '../img/close-icon.webp'


const Modal = ({Content, onClick}) => {
    return (
        <div className='modal-overlay'>
            <div className='modal-content' onClick ={(e)=> e.stopPropagation()}>
                {Content}
                <button className="modal-close-button" onClick={onClick}>
                    <img className="close-icon" src={closeIcon} alt="close icon"/>
                </button>
            </div>
        </div>
    )
}

Modal.propTypes = {
    Content: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
}


export default Modal