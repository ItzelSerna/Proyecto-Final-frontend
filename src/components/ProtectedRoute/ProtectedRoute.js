import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ element: Component, loggedIn, ...props }) {
  // Si NO está logueado, redirige a "/"
  if (!loggedIn) {
    return <Navigate to="/" replace />;
  }

  // De lo contrario, renderiza el componente
  // Component puede ser un "componente" o una "arrow function" con <></>
  return <Component {...props} />;
}
