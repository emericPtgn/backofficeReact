import React, { createContext, useState, useContext, useCallback } from 'react';
import { DOMAINE_URL, ENDPOINT_REFRESH_TOKEN } from '../config';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(localStorage.getItem('token'));
  const [refreshToken, setRefreshTokenState] = useState(localStorage.getItem('refreshToken'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  const setToken = useCallback((newToken, newRefreshToken) => {
    setTokenState(newToken);
    setRefreshTokenState(newRefreshToken);
    if (newToken) {
      localStorage.setItem('token', newToken);
      localStorage.setItem('refreshToken', newRefreshToken);
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
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
  return useContext(AuthContext);
}
