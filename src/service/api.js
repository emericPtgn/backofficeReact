// services/api.js
import { DOMAINE_URL, 
  ENDPOINT_ACTIVITE, 
  ENDPOINT_EVENTS, 
  ENDPOINT_ARTISTE, 
  ENDPOINT_COMMERCES, 
  ENDPOINT_SCENES,
  ENDPOINT_PROGRAMMATIONS,
  ENDPOINT_USERS} from '../config';
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
    console.error('error while post artiste :', error);
    throw error;
  }
}

export const addActivity = async (activity) => {
  try {
    const response = AuthenticatedFetch(ENDPOINT_ACTIVITE, {
      method: 'POST',
      body: JSON.stringify(activity)
    });
    console.log('response :', response);
    return response; 
  } catch (error) {
    console.error('error while post activity');
    throw error;
  }

}
export const getActivities = async () => {
  try {
    const data = await AuthenticatedFetch(ENDPOINT_ACTIVITE, {
      method: 'GET'
    });
    console.log('fetched activites :', data);
    return data;
  } catch (error) {
    console.error('error while fetching activities: ', error);
    throw error;
  }
}
export const getActivity = async (id) => {
  try {
      const data = await AuthenticatedFetch(`${ENDPOINT_ACTIVITE}/${id}`, { method: 'GET'})
      console.log('Fetched activity:', data)
      return data;
  } catch (error) {
    console.error('failed to fetch artiste', error);
    throw error;
  }
}
export const updateActivity = async (id, activity) => {
  try {
    const data = await AuthenticatedFetch(`${ENDPOINT_ACTIVITE}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(activity)  // Convertir l'objet artiste en JSON
    });
    console.log('new datas : ', data);
    console.log('id :', id);
    console.log('Sending data:', JSON.stringify(activity));
    return data;
  } catch (error) {
    console.error('error while put artiste :', error);
    throw error;
  }
};

export const getEvents = async () => {
  try {
    const data = await AuthenticatedFetch(ENDPOINT_EVENTS, {
      method: 'GET'
    });
    console.log('fetched events:', data);
    return data;
  } catch (error) {
    console.error('error while fetching events:', error);
    throw error;
  }

}

export const getCommerces = async () => {
  try {
    const data = await AuthenticatedFetch(ENDPOINT_COMMERCES, {
      method: 'GET'
    });
    console.log('fetched commerces:', data);
    return data;
  } catch (error) {
    console.error('error while fetching commerces:', error);
    throw error;
  }

}

export const getScenes = async () => {
  try {
    const data = await AuthenticatedFetch(ENDPOINT_SCENES, {
      method: 'GET'
    });
    console.log('fetched scenes:', data);
    return data;
  } catch (error) {
    console.error('error while fetching scenes:', error);
    throw error;
  }

}

export const getProgrammations = async () => {
  try {
    const data = await AuthenticatedFetch(ENDPOINT_PROGRAMMATIONS, {
      method: 'GET'
    });
    console.log('fetched programmation:', data);
    return data;
  } catch (error) {
    console.error('error while fetching programmations:', error);
    throw error;
  }

}
export const getProgrammation = async (id) => {
  try {
    const response = await AuthenticatedFetch(`${ENDPOINT_PROGRAMMATIONS}/${id}`, {
      methods: 'GET'
    });
    console.log('fetched programmation', response);
    return response;
  } catch (error) {
    console.error(`something wront happened while fetching programmation (ID: ${id}`)
  }
}
export const updateProgrammation = async (id, programmation) => {
  try {
    const data = await AuthenticatedFetch(`${ENDPOINT_PROGRAMMATIONS}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(programmation)
    })
    console.log('new datas:', data);
    return data;
  } catch (error) {
    console.error('error while updating programmation', error);
    throw error;
  }
}

export const getUsers = async () => {
  try {
    const listeUsers = await AuthenticatedFetch(ENDPOINT_USERS, {
      methods: 'GET'
    });
    return listeUsers;
  } catch (error) {
    console.error('oups something went wrong while fetching users:', error);
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
