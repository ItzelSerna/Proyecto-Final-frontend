import React from 'react';
import NotFoundIcon from '../../images/NotFoundIcon.svg';

export default function NotFound({ failed, type }) {
  const isNotFound = type === 'not-found';

  return (
    <div className={`not-found ${failed ? 'visible' : ''}`}>
      <img
        src={NotFoundIcon}
        alt="No se encontró"
        className="not-found__icon"
      />

      {isNotFound ? (
        <>
          <h1 className="not-found__title">No se encontró nada</h1>
          <p className="not-found__text">
            Lo sentimos, pero no hay nada que coincida con tus términos de búsqueda.
          </p>
        </>
      ) : (
        <>
          <h1 className="not-found__title">¡Ups! Algo salió mal</h1>
          <p className="not-found__text">
            Es posible que haya un problema de conexión o que el servidor no funcione.
            Por favor, inténtalo más tarde.
          </p>
        </>
      )}
    </div>
  );
}