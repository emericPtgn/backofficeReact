// services/api.js
import { DOMAINE_URL } from '../config';
import { ENDPOINT_ARTISTE } from '../config';
import { useAuth } from '../context/Context';

// const DOMAINE_URL = '/api';

/* export const getUsers = () => axios.get(`${DOMAINE_URL}/users`);
export const getUser = (id) => axios.get(`${DOMAINE_URL}/users/${id}`);
export const createUser = (userData) => axios.post(`${DOMAINE_URL}/users`, userData);
export const updateUser = (id, userData) => axios.put(`${DOMAINE_URL}/users/${id}`, userData); */

// Similaire pour les artistes, activités, etc.

export const getArtistes = async () => {
  try {
      const data = await AuthenticatedFetch(ENDPOINT_ARTISTE, { method: 'GET' });
      console.log("Fetched artistes:", data);
      return data;
  } catch (error) {
      console.error('Failed to fetch artistes:', error);
      throw error;
  }
};

export const getArtiste = async (id) => {
  try {
      const data = await AuthenticatedFetch(`${ENDPOINT_ARTISTE}/${id}`, { method: 'GET'})
      console.log('Fetched artiste:', data)
      return data;
  } catch (error) {
    console.error('failed to fetch artiste', error);
    throw error;
  }
}

export const updateArtiste = async (id, artiste) => {
  try {
    const data = await AuthenticatedFetch(`${ENDPOINT_ARTISTE}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(artiste)  // Convertir l'objet artiste en JSON
    });
    console.log('new datas : ', data);
    return data;
  } catch (error) {
    console.error('error while put artiste :', error);
    throw error;
  }
};

export const addNewArtiste = async (artiste) => {
  try {
    const response = await AuthenticatedFetch(ENDPOINT_ARTISTE, {
      method: 'POST',
      body: JSON.stringify(artiste)
    });
    console.log('response : ', response);
    return response;
  } catch (error) {
    console.error('error while put artiste :', error);
    throw error;
  }
}

// AUTH ET TOKEN API

export const AuthenticatedFetch = async (endpoint, options = {}) => {

  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('No authentication token found');
  }

  const defaultOptions = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(`${DOMAINE_URL}${endpoint}`, {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    });

    const responseBody = await response.json(); // Read the response body once

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}\n${JSON.stringify(responseBody)}`);
    }

    return responseBody;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};
