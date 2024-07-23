import { DOMAINE_URL } from '../config';

const HandleLogout = async (setIsAuthenticated, setToken) => {
  try {
    const response = await fetch(`${DOMAINE_URL}/logout`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }
    setToken(null);
    setIsAuthenticated(false);
  } catch (error) {
    console.error('Erreur de déconnexion', error);
  }
};

export default HandleLogout;