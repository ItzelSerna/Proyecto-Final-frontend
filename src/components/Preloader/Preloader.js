import React from 'react';

export default function Preloader({ state, label = "Buscando noticias..." }) {
  return (
    <div className={`app__preloader-container ${state ? 'visible' : ''}`}>
      <i className="app__circle-preloader"></i>
      <p className="app__preloader-text">{label}</p>
    </div>
  );
}