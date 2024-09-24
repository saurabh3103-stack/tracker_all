import React from 'react';

const SuccessPopup = ({ isVisible, onClose }) => {
  console.log(isVisible);
  // if (!isVisible) return null;
  return (
    <>
    { isVisible?
      <div style={popupStyles.overlay}>
      <div style={popupStyles.popup}>
          <span style={popupStyles.checkmark}>✔</span>
          <h2>Form Submitted Successfully!</h2>
          <button onClick={onClose} style={popupStyles.button}>OK</button>
        </div>
      </div>
      :
      <div></div>}
    </>
    
  );
};

// Popup styles
const popupStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  popup: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    width: '300px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  checkmark: {
    fontSize: '50px',
    color: 'green',
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default SuccessPopup;
