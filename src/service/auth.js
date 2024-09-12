// arguments : DOMAIN, ENDPOINT, OPTIONS 
// retreive token and refreshtoken from localstorage
// request API with token, options
// si response Unauthorized status 401 (non autorisé => token expiré..)
// 
// return resopnse from api

import { DOMAINE_URL, ENDPOINT_REFRESH_TOKEN } from "../config";


// prend un ENDPOINT en paramètre
// prend des options en paramètres (méthode choisie, body, header...)
// 1) récupérer le token et refreshToken

export const AuthenticatedFetch = (endpoint, options = {}) => {

  const getTokens = () => {
    const token = localStorage.getItem('token');
    const refrehsToken = localStorage.getItem('refreshToken');
    return {token, refrehsToken};
  }

  const setTokens = (token, refreshToken) => {
    localStorage.setItem('token', token);
    if(refreshToken){
      localStorage.setItem('refreshToken', refreshToken);
    };
  }

  const makeRequest = async (authToken) => {
    const {token, refreshToken} = getTokens();
    if(!token){
      return 'no token found'
    };
    const defaultHeaders = {
      'Authorization' : `Bearer ${authToken}`,
      'Content-Type' : options.headers instanceof FormData ? undefined : 'application/json'
    };
    try {
      const response = await fetch(`${DOMAINE_URL}${endpoint}`, {
          ...options,
          headers : {
            ...options.headers,
            ...defaultHeaders
          }
      })
      if(!response.ok){
        if(response.status === 401 && refreshToken){
          const newTokens = await refreshTokens(refreshToken);
          setTokens(newTokens.token, newTokens.refrehsToken);
          return makeRequest(newTokens.token);
        }
      }
      return response;
    } catch (error) {
      console.error('error occured during request :', error.message);
      throw error;
    }
  }

  const refreshTokens = async (authToken) => {
    const response = await fetch(`${ENDPOINT_REFRESH_TOKEN}`, {
      method : 'POST',
      body : JSON.stringify({ authToken }),
      headers : ({'Content-Type' : 'application/json'})
    })
    if(!response.ok){
      return 'erreur while refreshToken'
    }
    const data = await response.json();
    if(!data.token){
      return 'no token found';
    }
    return data;
  }
}