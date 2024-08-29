import React, { useEffect, useState } from 'react';
import { DOMAINE_URL } from '../../config';
import { useAuth } from '../../context/Context';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../component/form/login/LoginForm';
import Cookies from 'js-cookie';

function LoginPage() {
  const [isLoading, setIsLoading] = useState(true); // State for handling loading
  const [isAuthenticated, setIsAuthenticated] = useState(true); // State for authentication check
  const navigate = useNavigate();
  const { setToken } = useAuth();

  useEffect(() => {
    // Check if the user is already authenticated
    const checkAuthentication = async () => {
      // Simulate a delay for checking the authentication status
      await new Promise(resolve => setTimeout(resolve, 100)); // Adjust delay as needed

      // Check token from cookies
      const token = Cookies.get('token');
      if (token) {
        navigate('/dashboard');
      } else {
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    };

    checkAuthentication();
  }, [navigate]);

  const handleSubmit = async ({ _username, _password }) => {
    try {
      const response = await fetch(`${DOMAINE_URL}/api/login_check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: _username,
          password: _password
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const responseData = await response.json();

      if (responseData.token && responseData.refreshToken) {
        await setToken(responseData.token, responseData.refreshToken);
        // Store token in cookies
        // Cookies.set('token', responseData.token);
        // Cookies.set('refreshToken', responseData.refreshToken);
        navigate('/dashboard');
      } else {
        throw new Error('Token or refreshToken not received');
      }
    } catch (error) {
      console.error('Erreur de connexion :', error);
      alert('Erreur de connexion : ' + error.message);
    }
  };

  return (
    <>
      {isAuthenticated ? 'redirection en cours' : (
        <LoginForm onSubmit={handleSubmit} />
      )}
    </>
  );
}

export default LoginPage;
