import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import closeWhite from '../../images/CloseIcon-white.svg';
import closeBlack from '../../images/CloseIcon-black.svg';

import menuWhite from '../../images/MenuIcon-white.svg';
import menuBlack from '../../images/MenuIcon-black.svg';

import newsWhite from '../../images/NewsExplorer.svg';
import newsBlack from '../../images/NewsExplorer-black.svg';

import logoutIconWhite from '../../images/LogoutIcon.svg';
import logoutIconBlack from '../../images/LogoutIcon-black.svg';

export default function Navigation({
  onLogin,
  isLoggedIn,
  onLogout,
  isSavedNews = false, 
  userName = '', 
}) {
  const [menuActive, setMenuActive] = useState(false);

  function handleMenuToggle() {
    setMenuActive(!menuActive);
  }

  const menuIcon = isSavedNews ? menuBlack : menuWhite;
  const logoSrc = isSavedNews ? newsBlack : newsWhite;
  const logoutIcon = isSavedNews ? logoutIconBlack : logoutIconWhite;
  const closeIcon = isSavedNews ? closeBlack : closeWhite;

  const navMenuClass = `navigation__menu${menuActive ? ' active' : ''}${
    isSavedNews ? ' navigation__menu-saved' : ''
  }`;

  return (
    <div className="navigation">
      <Link to="/" className="navigation__site-name">
        <img
          src={logoSrc}
          alt="Site Name"
          className="navigation__site-name"
        />
      </Link>

      <img
        src={menuActive ? closeIcon : menuIcon}
        alt="menu icon"
        className="navigation__menu-icon"
        onClick={handleMenuToggle}
      />

      <nav className={navMenuClass}>
        <Link to="/" className="navigation__menu-link">
          Inicio
        </Link>

        {isLoggedIn ? (
          <>
            <Link to="/saved-news" className="navigation__menu-link">
              Artículos guardados
            </Link>
            <button 
              className="navigation__menu-button"
              onClick={onLogout}
            >
              {userName}
              <img 
                src={logoutIcon} 
                alt="Ícono Cerrar Sesión" 
                className="navigation__logout-icon"
              />
            </button>
          </>
        ) : (
          <button 
            className="navigation__menu-button"
            onClick={onLogin}
          >
            Iniciar sesión
          </button>
        )}
      </nav>
    </div>
  );
}