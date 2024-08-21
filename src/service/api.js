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
  ENDPOINT_TYPEPRODUIT,
  ENDPOINT_SOCIAL,
  ENDPOINT_EMPLACEMENT,
  ENDPOINT_MARKER,
  ENDPOINT_REFRESH_TOKEN
} from '../config';

// fichier centralise les appels à l'API // distinct des hooks react
//
// Similaire pour les artistes, activités, etc.

export const getMarkers = async ({dispatch}) => {
  try {
    const data = await AuthenticatedFetch(ENDPOINT_MARKER, {method: 'GET'});
    dispatch({type: 'getMarkers', payload: data})
    return data;
  } catch (error) {
    console.error('error while fetching markers', error.message)
  }
}

export const addMarker = async (marker, dispatch) => {
  try {
    const data = await AuthenticatedFetch(ENDPOINT_MARKER, {
      method: 'POST',
      body: JSON.stringify(marker)
    });
    dispatch({type: 'addMarker', payload: data})
    return data;
  } catch (error) {
    console.error('error, while fetching markers', error.message);
  }
}

export const updateMarker = async (id, marker, dispatch) => {
  try {
    const data = await AuthenticatedFetch(`${ENDPOINT_MARKER}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(marker),
    })
    dispatch({type: 'updateMarker', payload: {id: id, data : data}});
    return data;
  } catch (error) {
    console.error('error occured', error.message);
  }
}

export const deleteMarker = async (id, dispatch) => {
  try {
    let response = await AuthenticatedFetch(`${ENDPOINT_MARKER}/${id}`, {
      method: 'DELETE',
    })
    if(response.statut == 'success'){
      dispatch({type: 'deleteMarker', payload: id});
    }
    return response;
  } catch (error) {
    console.error('error occured, :', error.message);
  }
}

export const getArtistes = async (dispatch) => {
  try {
    const data = await AuthenticatedFetch(ENDPOINT_ARTISTE, { method: 'GET' });
    dispatch({ type: 'getArtistes', payload: data });
    return data;
  } catch (error) {
    dispatch({ type: 'fetchError', payload: error.message });
    throw error;
  }
};

export const getArtiste = async (id) => {
  try {
    const data = await AuthenticatedFetch(`${ENDPOINT_ARTISTE}/${id}`, { method: 'GET' });
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateArtiste = async (id, artist, dispatch) => {
  try {
    const data = await AuthenticatedFetch(`${ENDPOINT_ARTISTE}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(artist)  // Convertir l'objet artiste en JSON
    });
    dispatch({ type: 'updateArtiste', payload: artist });
    return data;
  } catch (error) {
    throw error;
  }
};

export const addNewArtiste = async (artiste) => {
  try {
    const response = await AuthenticatedFetch(ENDPOINT_ARTISTE, {
      method: 'POST',
      body: JSON.stringify(artiste)
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteArtiste = async (id, dispatch) => {
  try {
    const response = AuthenticatedFetch(`${ENDPOINT_ARTISTE}/${id}`, {
      method: 'DELETE',
    });
    if(response.statut = 'success'){
      dispatch({type: 'deleteArtist', payload: id})
      return response;
    } 
    return response;
  } catch (error) {
    console.error('error occured :', error.message);
  }
}

export const addActivity = async (activity, dispatch) => {
  try {
    const response = await AuthenticatedFetch(ENDPOINT_ACTIVITE, {
      method: 'POST',
      body: JSON.stringify(activity)
    });
    dispatch({ type: 'addActivite', payload: response });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getActivities = async (dispatch) => {
  try {
    const data = await AuthenticatedFetch(ENDPOINT_ACTIVITE, { method: 'GET' });
    dispatch({ type: 'getActivities', payload: data });
  } catch (error) {
    dispatch({ type: 'fetchError', payload: error.message });
    throw error;
  }
};

export const getActivity = async (id) => {
  try {
    const data = await AuthenticatedFetch(`${ENDPOINT_ACTIVITE}/${id}`, { method: 'GET' });
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateActivity = async (id, activity) => {
  try {
    const data = await AuthenticatedFetch(`${ENDPOINT_ACTIVITE}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(activity)  // Convertir l'objet artiste en JSON
    });
    return data;
  } catch (error) {
    throw error;
  }
};
export const deleteActivity = async (id, dispatch) => {
  try {
    const response = await AuthenticatedFetch(`${ENDPOINT_ACTIVITE}/${id}`, {
      method: 'DELETE'
    })
    if(response.statut == 'success'){
      dispatch({type: 'deleteActivite', payload : id}) 
    };
    return response;
  } catch (error) {
    console.error(error)
  }
}


export const getEvents = async () => {
  try {
    const data = await AuthenticatedFetch(ENDPOINT_EVENTS, { method: 'GET' });
    return data;
  } catch (error) {
    throw error;
  }
};

export const getCommerces = async (dispatch) => {
  try {
    const data = await AuthenticatedFetch(ENDPOINT_COMMERCES, { method: 'GET' });
    dispatch({ type: 'getCommerces', payload: data });
  } catch (error) {
    dispatch({ type: 'fetchError', payload: error.message });
    throw error;
  }
};

export const getCommerce = async (id) => {
  try {
    const response = await AuthenticatedFetch(`${ENDPOINT_COMMERCES}/${id}`, { method: 'GET' });
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateCommerce = async (id, dispatch, commerce) => {
  try {
    const formData = new FormData();
    const commerceData = {
      nom: commerce.nom,
      description: commerce.description,
      typeCommerce: commerce.typeCommerce,
      typeProduit: commerce.typeProduit,
      marker : commerce.marker,
      photos: []
    };

    // Ajouter les photos au formData
    if (Array.isArray(commerce.photos)) {
      commerce.photos.forEach(photo => {
        if (photo.file instanceof File) {
          // Si c'est un nouveau fichier, l'ajouter en tant que fichier
          formData.append('photos[]', photo.file);
        } else {
          // Si c'est une URL ou un chemin existant, l'ajouter au tableau des photos
          commerceData.photos.push(photo);
        }
      });
    }

    // Ajouter les données du commerce à formData
    formData.append('data', JSON.stringify(commerceData));

    // Debug: logFormData
    logFormData(formData);

    // Envoyer la requête au serveur
    const updatedCommerce = await AuthenticatedFetch(`${ENDPOINT_COMMERCES}/${id}`, {
      method: 'POST',
      body: formData
    });

    // Mise à jour du contexte ou de l'état avec le commerce mis à jour
    dispatch({ type: 'updateCommerce', payload: updatedCommerce });
  } catch (error) {
    console.error('An error occurred', error.message);
  }
}



const logFormData = (formData) => {
  for (let [key, value] of formData.entries()) {
    if (value instanceof File) {
      console.log(`${key}: ${value.name}`);
    } else {
      console.log(`${key}: ${value}`);
    }
  }
};

export const addCommerce = async (dispatch, commerce) => {
  try {
    const formData = new FormData();

    const commerceData = {
      nom: commerce.nom,
      description: commerce.description,
      typeCommerce: commerce.typeCommerce,
      typeProduit: commerce.typeProduit,
      marker : commerce.marker,
      photos: []
    };

    if (Array.isArray(commerce.photos)) {
      commerce.photos.forEach(photo => {
        if (photo.file instanceof File) {
          // Si c'est un nouveau fichier, l'ajouter en tant que fichier
          formData.append('photos[]', photo.file);
        } else {
          // Si c'est une URL ou un chemin existant, l'ajouter au tableau des photos
          commerceData.photos.push(photo);
        }
      });
    }
    // Ajouter les données du commerce à formData
    formData.append('data', JSON.stringify(commerceData));

    // Debug: logFormData
    logFormData(formData);

    const addedCommerce = await AuthenticatedFetch(`${ENDPOINT_COMMERCES}`, {
      method: 'POST',
      body: formData
    });

    dispatch({ type: 'addCommerce', payload: addedCommerce });
    return addedCommerce;
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
};

export const deleteCommerce = async (id, dispatch) => {
  try {
    const response = await AuthenticatedFetch(`${ENDPOINT_COMMERCES}/${id}`, {
      method: 'DELETE'
    })
    if(response.statut == 'success'){
      dispatch({type: 'deleteCommerce', payload : id})
    }
    return response;
  } catch (error) {
    console.error('error occured :', error.message)
  }
}

export const getTypeCommerces = async () => {
  try {
    const data = await AuthenticatedFetch(ENDPOINT_TYPECOMMERCE, { method: 'GET' });
    return data;
  } catch (error) {
    throw error;
  }
};

export const getTypeCommerce = async (id) => {
  try {
    const response = await AuthenticatedFetch(`${ENDPOINT_TYPECOMMERCE}/${id}`, { method: 'GET' });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getTypesProduits = async () => {
  try {
    const data = await AuthenticatedFetch(ENDPOINT_TYPEPRODUIT, { method: 'GET' });
    return data;
  } catch (error) {
    throw error;
  }
};

export const getTypeProduit = async (id) => {
  try {
    const response = await AuthenticatedFetch(`${ENDPOINT_TYPEPRODUIT}/${id}`, { method: 'GET' });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getScenes = async (dispatch) => {
  try {
    const data = await AuthenticatedFetch(ENDPOINT_SCENES, { method: 'GET' });
    dispatch({ type: 'getScenes', payload: data });
  } catch (error) {
    dispatch({ type: 'fetchError', payload: error.message });
    throw error;
  }
};

export const updateScene = async (id, scene, dispatch) => {
  try {
    const data = await AuthenticatedFetch(`${ENDPOINT_SCENES}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(scene)
    });
    dispatch({ type: 'updateScene', payload: data });
  } catch (error) {
    dispatch({ type: 'fetchError', payload: error.message });
    throw error;
  }
};

export const addScene = async (scene, dispatch) => {
  try {
    const data = await AuthenticatedFetch(ENDPOINT_SCENES, {
      method: 'POST',
      body: JSON.stringify(scene)
    });
    dispatch({ type: 'addNewScene', payload: data });
  } catch (error) {
    throw error;
  }
};

export const getEmplacements = async (dispatch) => {
  try {
    const data = await AuthenticatedFetch(ENDPOINT_EMPLACEMENT, { method: 'GET' });
    dispatch({ type: 'getEmplacements', payload: data });
  } catch (error) {
    dispatch({ type: 'fetchError', payload: error.message });
    throw error;
  }
}

export const getProgrammations = async (dispatch) => {
  try {
    const data = await AuthenticatedFetch(ENDPOINT_PROGRAMMATIONS, { method: 'GET' });
    dispatch({ type: 'getProgrammations', payload: data });
  } catch (error) {
    dispatch({ type: 'fetchError', payload: error.message });
    throw error;
  }
};

export const getProgrammation = async (id) => {
  try {
    const response = await AuthenticatedFetch(`${ENDPOINT_PROGRAMMATIONS}/${id}`, { method: 'GET' });
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateProgrammation = async (id, programmation, dispatch) => {
  try {
    console.log('UPDATING programmation ... (API)')
    const updatedProgrammation = await AuthenticatedFetch(`${ENDPOINT_PROGRAMMATIONS}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(programmation)
    });
    console.log('UPDATED programmation, ', updatedProgrammation.data)
    dispatch({type: 'updateProgrammation', payload: updatedProgrammation.data});
    return updatedProgrammation.data;
  } catch (error) {
    throw error;
  }
};

export const addProgrammation = async (programmation, dispatch) => {
  try {
    console.log('adding programmation ... (API)')
    const programmationJson = await AuthenticatedFetch(ENDPOINT_PROGRAMMATIONS, {
      method: 'POST',
      body: JSON.stringify(programmation)
    });
    console.log('added programmation, ', programmationJson)
    dispatch({ type: 'addProgrammation', payload: programmationJson });
  } catch (error) {
    throw error;
  }
};

export const getUsers = async (dispatch) => {
  try {
    const data = await AuthenticatedFetch(ENDPOINT_USERS, { method: 'GET' });
    dispatch({ type: 'getUsers', payload: data });
    return data;
  } catch (error) {
    console.error('error occured while fetching users : ', error.message)
  }
};

export const getActivUser = async (dispatch) => {
  try {
    const data = await AuthenticatedFetch(`${ENDPOINT_USERS}/activ-user`, {method: 'GET'});
    dispatch({type: 'setActivUser', payload : data});
    return data;
  } catch (error) {
    console.error('error occured fetching activ User', error.message);
    throw error;
  }
}

export const getUser = async (id) => {
  // data retournée est déjà en JSON 
  try {
    const data = await AuthenticatedFetch(`${ENDPOINT_USERS}${id}`, { method : 'GET' });
    return data;
  } catch (error) {
    console.error('error occured : ', error.message);
  }
}

export const updateUser = async (id, dispatch, user) => {
  try {
    const data = await AuthenticatedFetch(`${ENDPOINT_USERS}/${id}`, { 
      method: 'PUT',
      body: JSON.stringify(user)
    });
    dispatch({type: 'updateUser', payload: {id : id, user : data}});
  } catch (error) {
    console.error('error occured during put request : ', error.message);
  }
}

export const addUser = async (dispatch, user) => {
  try {
    const data = await AuthenticatedFetch(ENDPOINT_USERS, {
      method: 'POST',
      body: JSON.stringify(user)
    });
    dispatch({type : 'addUser', payload: data});
    return data;
  } catch (error) {
    console.error('error occured during post request : ', error.message);
  }
}

export const deleteUser = async (id, dispatch) => {
  try {
    const data = await AuthenticatedFetch(`${ENDPOINT_USERS}/${id}`, {
      method: 'DELETE'
    });
    dispatch({type: 'deleteUser', payload: id});
    return data;
  } catch (error) {
    console.error('error occured during post request : ', error.message);
  }
}

export const deleteSocial = async (id, dispatch) => {
  try {
    const response = await AuthenticatedFetch(`${ENDPOINT_SOCIAL}/${id}`, { method: 'DELETE' });
    dispatch({ type: 'deleteSocialFromArtiste', payload: { reseauSocial: id } });
  } catch (error) {
    throw error;
  }
};

// AUTH ET TOKEN API

export const AuthenticatedFetch = async (endpoint, options = {}) => {
  const getTokens = () => ({
    token: localStorage.getItem('token'),
    refreshToken: localStorage.getItem('refreshToken'),
  });

  const setTokens = (token, refreshToken) => {
    localStorage.setItem('token', token);
    if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
  };

  const makeRequest = async (authToken) => {
    const { token, refreshToken } = getTokens();
    if (!token) throw new Error('No authentication token found');
  
    const defaultHeaders = {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': options.body instanceof FormData ? undefined : 'application/json',
    };
  
    try {
      const response = await fetch(`${DOMAINE_URL}${endpoint}`, {
        ...options,
        headers: { ...defaultHeaders, ...options.headers },
      });
  
      if (!response.ok) {
        if (response.status === 401 && refreshToken) {
          const newTokens = await refreshTokens(refreshToken);
          setTokens(newTokens.token, newTokens.refreshToken);
          return makeRequest(newTokens.token);
        }
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }
  
      // Tentative de parse JSON
      try {
        const data = await response.json();
        return data;
      } catch (jsonError) {
        // Si json() échoue, essayer de lire comme texte brut
        const text = await response.text();
        console.warn('Response is not JSON:', text);
        return text;
      }
    } catch (error) {
      console.error('Request failed:', error);
      throw error;
    }
  };
  

  const refreshTokens = async (refreshToken) => {
    const response = await fetch(`${DOMAINE_URL}${ENDPOINT_REFRESH_TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error(`Failed to refresh token: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    if (!data.token) throw new Error('Token not received after refresh');

    return data;
  };

  return makeRequest(getTokens().token);
}

export const emailResetPassword = async (id) => {
  try {
    const response = await AuthenticatedFetch(`${ENDPOINT_USERS}/askNewPassword/${id}`, {
      method: 'GET',
    });
    return response;
  } catch (error) {
    console.error('Error occurred asking new password:', error);
    throw error;
  }
};


export const updatePassWord = async (password, token) => {
  try {
    const response = await AuthenticatedFetch(`${ENDPOINT_USERS}/${token}`, {
      method: 'POST',
      body: JSON.stringify(password)
    })
    return response;
  } catch (error) {
    console.error('error occured during password update :', error.message);
  }
}