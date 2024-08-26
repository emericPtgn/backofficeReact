import React, { createContext, useState, useContext, useCallback } from 'react';
import { DOMAINE_URL } from '../config';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Initialize state from cookies
  const [token, setTokenState] = useState(Cookies.get('token'));
  const [refreshToken, setRefreshTokenState] = useState(Cookies.get('refreshToken'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  const setToken = useCallback((newToken, newRefreshToken) => {
    setTokenState(newToken);
    setRefreshTokenState(newRefreshToken);
    if (newToken) {
      // utilise cookies pour stocker les tokens 
      Cookies.set('token', newToken);
      Cookies.set('refreshToken', newRefreshToken);
      setIsAuthenticated(true);
    } else {
      // si newToken est vide, null ou undefined, supprimer les cookies
      Cookies.remove('token');
      Cookies.remove('refreshToken');
      setIsAuthenticated(false);
    }
  }, []);

  const refreshAccessToken = useCallback(async () => {
    try {
      const response = await fetch(`${DOMAINE_URL}/api/token/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const responseData = await response.json();

      if (responseData.token) {
        setToken(responseData.token, responseData.refreshToken);
        return responseData.token;
      } else {
        throw new Error('Token not received');
      }
    } catch (error) {
      console.error('Failed to refresh token:', error);
      setToken(null, null); // Clear the token and refreshToken on failure
      return null;
    }
  }, [refreshToken, setToken]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, token, setToken, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
