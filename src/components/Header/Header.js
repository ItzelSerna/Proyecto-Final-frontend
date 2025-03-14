import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Navigation from '../Navigation/Navigation';

export default function Header({ 
  getInfo,
  onLogin,
  isLoggedIn,
  onLogout,
  showSearchBar = true,
  isSavedNews = false, 
}) {
  const headerClass = showSearchBar
    ? 'header header_with-bg'
    : 'header header_no-bg';

  return (
    <div className={headerClass}>
      <Navigation
        onLogin={onLogin}
        isLoggedIn={isLoggedIn}
        onLogout={onLogout}
        isSavedNews={isSavedNews} 
      />

      {showSearchBar && (
        <>
          <div className="header__info">
            <h1 className="header__title">¿Qué está pasando en el mundo?</h1>
            <p className="header__slogan">
              Encuentra las últimas noticias sobre cualquier tema y guárdalas en tu cuenta personal.
            </p>
          </div>

          <SearchForm getinfo={getInfo} />
        </>
      )}
    </div>
  );
}