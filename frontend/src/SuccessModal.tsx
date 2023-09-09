// SuccessModal.tsx
import React from 'react';
import './SuccessModal.css'; // Create and style this as you see fit

const SuccessModal: React.FC<{ onClose: () => void }> = (props) => {
    return (
        <div className="modalContainer">
            <div className="modalContent">
                Thanks for registering!
                <button onClick={props.onClose}>Close</button>
            </div>
        </div>
    );
};

export default SuccessModal;
