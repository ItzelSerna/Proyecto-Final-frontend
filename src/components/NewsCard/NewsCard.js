import React, { useState } from 'react';

export default function NewsCard({
  item,
  isLoggedIn,
  isSaved,
  onSaveArticle,
}) {
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('es-ES', options); 
  }

  const buttonClass = isSaved
    ? 'news-card__save-button news-card__save-button_saved'
    : 'news-card__save-button';

  function handleSaveClick() {
    if (!isLoggedIn) {
      setShowLoginMessage(true);
      setTimeout(() => setShowLoginMessage(false), 6000);
    } else {
      onSaveArticle?.(item);
    }
  }

  return (
    <article className="news-card">
      <div className="news-card__image-wrapper">
        <img
          className="news-card__image"
          src={item.urlToImage}
          alt={item.title}
        />
        <div className="news-card__save-container">
          <button
            className={buttonClass}
            onClick={handleSaveClick}
          >
            <span className="visually-hidden">
              {isSaved ? 'Guardado' : 'Guardar'}
            </span>
          </button>
          {showLoginMessage && (
            <span className="news-card__login-message">
              Inicia sesión para guardar artículos
            </span>
          )}
        </div>
      </div>

      <div className="news-card__info">
        <p className="news-card__date">{formatDate(item.publishedAt)}</p>
        <h2 className="news-card__title">{item.title}</h2>
        <div className="news-card__description">{item.description}</div>
        <p className="news-card__source">
          {(item.source?.name || '').toUpperCase()}
        </p>
      </div>
    </article>
  );
}