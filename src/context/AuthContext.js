import { DOMAINE_URL } from '../config';
import Cookies from 'js-cookie';

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
    Cookies.remove('token');
    Cookies.remove('refreshToken')
    setToken(null);
    setIsAuthenticated(false);
  } catch (error) {
    console.error('Erreur de déconnexion', error);
  }
};

export default HandleLogout;