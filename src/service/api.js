// services/api.js
import { DOMAINE_URL, 
  ENDPOINT_ACTIVITE, 
  ENDPOINT_EVENTS, 
  ENDPOINT_ARTISTE, 
  ENDPOINT_COMMERCES,
  ENDPOINT_TYPECOMMERCE,
  ENDPOINT_SCENES,
  ENDPOINT_PROGRAMMATIONS,
  ENDPOINT_USERS,
  ENDPOINT_TYPEPRODUIT} from '../config';
import { useAuth } from '../context/Context';
import useAppContext from '../context/CommerceContext';

// const DOMAINE_URL = '/api';

/* export const getUsers = () => axios.get(`${DOMAINE_URL}/users`);
export const getUser = (id) => axios.get(`${DOMAINE_URL}/users/${id}`);
export const createUser = (userData) => axios.post(`${DOMAINE_URL}/users`, userData);
export const updateUser = (id, userData) => axios.put(`${DOMAINE_URL}/users/${id}`, userData); */

// Similaire pour les artistes, activités, etc.

export const getArtistes = async (dispatch) => {
  try {
      console.log('fetching artiste...')
      const data = await AuthenticatedFetch(ENDPOINT_ARTISTE, { method: 'GET' });
      console.log("Fetched artistes:", data);
      dispatch({type:'getArtistes', payload: data});
      return data;
  } catch (error) {
      console.error('Failed to fetch artistes:', error.message0);
      dispatch({type:'fetchError', payload: error.message})
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
export const getActivities = async (dispatch) => {
  try {
    console.log('fetching activites...')
    const data = await AuthenticatedFetch(ENDPOINT_ACTIVITE, {
      method: 'GET'
    });
    console.log('fetched activites :', data);
    dispatch({type: 'getActivities', payload: data})
  } catch (error) {
    console.error('Error while fetching activites:', error.message);
    dispatch({ type: 'fetchError', payload: error.message });
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

export const getCommerces = async (dispatch) => {
  try {
    console.log('Fetching commerces...');
    const data = await AuthenticatedFetch(ENDPOINT_COMMERCES, { 
      method: 'GET' 
    });
    console.log('Fetched commerces data:', data);
    dispatch({ type: 'getCommerces', payload: data });
  } catch (error) {
    console.error('Error while fetching commerces:', error.message);
    dispatch({ type: 'fetchError', payload: error.message });
  }
};



export const getCommerce = async (id) => {
  try {
    console.log('id commerce', id);
    const response = await AuthenticatedFetch(`${ENDPOINT_COMMERCES}/${id}`, {
      method: 'GET'
    })
    console.log('response datas : ', response);
    return response;
  } catch (error) {
    console.error('something wrong happend : ', error);
    throw error;
  }
}

export const getTypeCommerces = async () => {
  try {
    const data = await AuthenticatedFetch(ENDPOINT_TYPECOMMERCE, {
      method: 'GET'
    });
    console.log('fetched types commerces:', data);
    return data;
  } catch (error) {
    console.error('error while fetching types commerces:', error);
    throw error;
  }

}
export const getTypeCommerce = async (id) => {
  try {
    console.log('id type commerce', id);
    const response = await AuthenticatedFetch(`${ENDPOINT_TYPECOMMERCE}/${id}`, {
      method: 'GET'
    })
    console.log('response datas : ', response);
    return response;
  } catch (error) {
    console.error('something wrong happend : ', error);
    throw error;
  }
}
export const getTypesProduits = async () => {
  try {
    const data = await AuthenticatedFetch(ENDPOINT_TYPEPRODUIT, {
      method: 'GET'
    });
    console.log('fetched types produits:', data);
    return data;
  } catch (error) {
    console.error('error while fetching types produits:', error);
    throw error;
  }

}
export const getTypeProduit = async (id) => {
  try {
    console.log('id type produit', id);
    const response = await AuthenticatedFetch(`${getTypesProduits}/${id}`, {
      method: 'GET'
    })
    console.log('response datas : ', response);
    return response;
  } catch (error) {
    console.error('something wrong happend : ', error);
    throw error;
  }
}

export const getScenes = async (dispatch) => {
  try {
    console.log('fetching scenes....')
    const data = await AuthenticatedFetch(ENDPOINT_SCENES, {
      method: 'GET'
    });
    dispatch({type: 'getScenes', payload : data})
    console.log('fetched scenes:', data);
  } catch (error) {
    console.error('error while fetching scenes:', error.message);
    dispatch({type: 'fetchError', payload : error.message})
    throw error;
  }

}

export const getProgrammations = async (dispatch) => {
  try {
    console.log('fetching programmation....')
    const data = await AuthenticatedFetch(ENDPOINT_PROGRAMMATIONS, {
      method: 'GET'
    });
    dispatch({type: 'getProgrammations', payload: data})
    console.log('fetched programmation :', data)
  } catch (error) {
    console.error('error while fetching programmations:', error);
    dispatch({type: 'fetchError', payload: error.message})
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

export const getUsers = async (dispatch) => {
  try {
    console.log('fetching users...')
    const data = await AuthenticatedFetch(ENDPOINT_USERS, {
      methods: 'GET'
    });
    dispatch({type:'getUsers', payload : data})
    console.log('fetched Users : ', data)
  } catch (error) {
    console.error('oups something went wrong while fetching users:', error);
    dispatch({type:'fetchError', payload: error.message})
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
