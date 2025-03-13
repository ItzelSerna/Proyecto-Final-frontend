import React from 'react';

export default function SuccessModal({ 
  isOpen, 
  onClose,
  onGoToLogin  
}) {
  const modalClassName = `success-modal ${isOpen ? 'success-modal_opened' : ''}`;

  return (
    <div className={modalClassName}>
      <div className="success-modal__overlay" onClick={onClose} />
      <div className="success-modal__container">
        <button className="success-modal__close" onClick={onClose}>
          &times;
        </button>
        <h2 className="success-modal__title">
          ¡El registro se ha completado con éxito!
        </h2>
        <button 
          className="success-modal__login-button" 
          onClick={onGoToLogin}
        >
          Iniciar sesión
        </button>
      </div>
    </div>
  );
}
