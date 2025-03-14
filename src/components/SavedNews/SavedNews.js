import React, { useState } from 'react';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';

export default function SavedNews({
  userName = 'Usuario',
  savedArticles = [],
  onCardDelete,
}) {
  const [removeMessages, setRemoveMessages] = useState({});

  const [removeClicked, setRemoveClicked] = useState({});

  function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
  }

  function handleRemoveClick(article) {
    const articleKey = article.url || article._id;
    
    setRemoveClicked(prev => ({ 
      ...prev, 
      [articleKey]: true 
    }));

    setRemoveMessages(prev => ({
      ...prev,
      [articleKey]: true,
    }));

    setTimeout(() => {
      onCardDelete?.(article);
      setRemoveMessages(prev => {
        const copy = { ...prev };
        delete copy[articleKey];
        return copy;
      });
      setRemoveClicked(prev => {
        const copy = { ...prev };
        delete copy[articleKey];
        return copy;
      });
    }, 1000);
  }

  return (
    <section className="saved-news">
      <div className="saved-news__header-container">
        <SavedNewsHeader
          userName={userName}
          savedArticles={savedArticles}
        />
      </div>

      <div className="saved-news__cards-container">
        <div className="saved-news__cards">
          {savedArticles.map(article => {
            const articleKey = article.url || article._id;
            return (
              <div key={articleKey} className="saved-news__card">
                <div className="saved-news__image-wrapper">
                  <img
                    className="saved-news__image"
                    src={article.urlToImage}
                    alt={article.title}
                  />
                  <div className="saved-news__remove-container">
                    <button
                      className={
                        removeClicked[articleKey]
                          ? 'saved-news__remove-button saved-news__remove-button_clicked'
                          : 'saved-news__remove-button'
                      }
                      onClick={() => handleRemoveClick(article)}
                    >
                      <span className="visually-hidden">Eliminar</span>
                    </button>

                    {removeMessages[articleKey] && (
                      <span className="saved-news__remove-message">
                        Eliminando artículo
                      </span>
                    )}
                  </div>
                </div>

                <div className="saved-news__info">
                  <p className="saved-news__date">
                    {formatDate(article.publishedAt)}
                  </p>
                  <h3 className="saved-news__title">{article.title}</h3>
                  <p className="saved-news__description">{article.description}</p>
                  <p className="saved-news__source">
                    {(article.source?.name || '').toUpperCase()}
                  </p>
                  {article.keyword && (
                    <div className="saved-news__keyword-badge">
                      {article.keyword}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}