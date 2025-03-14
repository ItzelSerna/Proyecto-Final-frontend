import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ element: Component, loggedIn, ...props }) {
  if (!loggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Component {...props} />;
}