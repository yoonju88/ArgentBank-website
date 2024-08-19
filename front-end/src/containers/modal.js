import PropTypes from "prop-types"
import React from "react"
import closeIcon from '../img/close-icon.webp'
import Button from "../components/Button"

const Modal = ({Content, onClick}) => {
    const handleOverlayClick = (e) => {
        if (e.target=== e.currentTarget) {
            onClick()
        }
    };
    return (
        <div className='modal-overlay' onClick ={handleOverlayClick}>
            <div className='modal-content' onClick ={e=> e.stopPropagation()}>
                {Content}
                <Button className="modal-close-button" onClick={onClick}>
                    <img className="close-icon" src={closeIcon} alt="close icon"/>
                </Button>
            </div>
        </div>
    )
}
Modal.propTypes = {
    Content: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default Modal