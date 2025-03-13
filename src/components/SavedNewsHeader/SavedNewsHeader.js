import React from 'react';

export default function SavedNewsHeader({
  userName = 'Usuario',
  savedArticles = [],
}) {
  const articlesCount = savedArticles.length;
  const keywordsSet = new Set(savedArticles.map(item => item.keyword));
  const keywordsArray = Array.from(keywordsSet);

  let keywordsText = '';
  if (keywordsArray.length > 2) {
    const [first, second, ...rest] = keywordsArray;
    keywordsText = (
      <>
        <strong>{first}</strong>, <strong>{second}</strong> y{' '}
        <strong>{rest.length} más</strong>
      </>
    );
  } else {
    keywordsText = keywordsArray.map((kw, i) => (
      <strong key={i}>
        {kw}
        {i < keywordsArray.length - 1 && ', '}
      </strong>
    ));
  }

  return (
    <div className="saved-news-header">
      <p className="saved-news-header__page-title">Artículos guardados</p>
      <h2 className="saved-news-header__heading">
        {userName}, tienes {articlesCount} artículos guardados
      </h2>
      {keywordsArray.length > 0 && (
        <p className="saved-news-header__keywords">
          Por palabras clave: {keywordsText}
        </p>
      )}
    </div>
  );
}
