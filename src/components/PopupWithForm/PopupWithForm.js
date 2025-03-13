import React, { useState } from 'react';

export default function PopupWithForm({
  isOpen,
  onClose,
  formType,         
  onLoginSubmit,    
  onSignupSubmit,    
  setFormType        
}) {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupName, setSignupName] = useState('');

  function handleLogin(e) {
    e.preventDefault();
    onLoginSubmit({
      email: loginEmail,
      password: loginPassword,
    });
  }

  function handleSignup(e) {
    e.preventDefault();
    onSignupSubmit({
      email: signupEmail,
      password: signupPassword,
      name: signupName,
    });
  }

  const popupClassName = `popup ${isOpen ? 'popup_opened' : ''}`;

  return (
    <div className={popupClassName}>
      <div className="popup__overlay" onClick={onClose} />

      <div className="popup__container">
        <button className="popup__close" onClick={onClose}>
          &times;
        </button>

        {formType === 'login' && (
          <div className="popup__content">
            <h2 className="popup__title">Iniciar sesión</h2>
            <form className="popup__form" onSubmit={handleLogin}>
              <label className="popup__label" htmlFor="login-email">
                Correo electrónico
              </label>
              <input
                id="login-email"
                type="email"
                className="popup__input"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
                placeholder="Introduce tu correo electrónico"
              />

              <label className="popup__label" htmlFor="login-password">
                Contraseña
              </label>
              <input
                id="login-password"
                type="password"
                className="popup__input"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
                placeholder="Introduce tu contraseña"
              />

              <button type="submit" className="popup__submit-button">
                Iniciar sesión
              </button>

              <p className="popup__switch">
                o{' '}
                <button
                  type="button"
                  className="popup__switch-button"
                  onClick={() => setFormType('signup')}
                >
                  Registrarse
                </button>
              </p>
            </form>
          </div>
        )}

        {formType === 'signup' && (
          <div className="popup__content">
            <h2 className="popup__title">Inscribirse</h2>
            <form className="popup__form" onSubmit={handleSignup}>
              <label className="popup__label" htmlFor="signup-email">
                Correo electrónico
              </label>
              <input
                id="signup-email"
                type="email"
                className="popup__input"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                required
                placeholder="Introduce tu correo electrónico"
              />

              <label className="popup__label" htmlFor="signup-password">
                Contraseña
              </label>
              <input
                id="signup-password"
                type="password"
                className="popup__input"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
                placeholder="Introduce tu contraseña"
              />

              <label className="popup__label" htmlFor="signup-name">
                Nombre de usuario
              </label>
              <input
                id="signup-name"
                type="text"
                className="popup__input"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                required
                placeholder="Introduce tu nombre de usuario"
              />

              <button type="submit" className="popup__submit-button">
                Registrarse
              </button>

              <p className="popup__switch">
                o{' '}
                <button
                  type="button"
                  className="popup__switch-button"
                  onClick={() => setFormType('login')}
                >
                  Iniciar sesión
                </button>
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
