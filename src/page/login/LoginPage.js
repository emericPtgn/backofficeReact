import React from 'react';
import { DOMAINE_URL } from '../../config';
import { useAuth } from '../../context/Context';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../component/form/login/LoginForm';

function LoginPage() {
  const { setToken } = useAuth();
  const navigate = useNavigate();

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

      if (responseData.token) {
        await setToken(responseData.token);
        console.log(responseData.token)
        navigate('/dashboard');
      } else {
        throw new Error('Token not received');
      }
    } catch (error) {
      console.error('Erreur de connexion :', error);
      alert('Erreur de connexion : ' + error.message);
    }
  };

  return (
    <div>
      <h1>Connexion</h1>
      <LoginForm onSubmit={handleSubmit}/>
    </div>
  );
}

export default LoginPage;