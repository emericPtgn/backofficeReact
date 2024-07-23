import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/Context';

function PrivateRoute() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) {
    // Optionnel : ajouter un état de chargement si nécessaire
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;