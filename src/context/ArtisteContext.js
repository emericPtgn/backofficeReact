import { createContext, useContext, useReducer } from "react";

// Créez les contextes pour l'état et le dispatch séparément
const ArtistesStateContext = createContext();
const ArtistesDispatchContext = createContext();

const artistesInitialState = {
  artistes: [],
};

function artistesReducer(state, action) {
    console.log('Reducer action:', action.type, action.payload);
    switch (action.type) {
      case 'getArtistes':
        return { ...state, artistes: action.payload, error: null };
      case 'fetchError':
        return { ...state, error: action.payload };
      default:
        return state;
    }
  }
  
  

// Fournit les deux contextes dans un seul fournisseur
export function ArtistesProvider({ children }) {
  const [state, dispatch] = useReducer(artistesReducer, artistesInitialState);

  return (
    <ArtistesStateContext.Provider value={state}>
      <ArtistesDispatchContext.Provider value={dispatch}>
        {children}
      </ArtistesDispatchContext.Provider>
    </ArtistesStateContext.Provider>
  );
}

// Custom hooks pour accéder aux contextes
export function useArtistesState() {
  return useContext(ArtistesStateContext);
}

export function useArtistesDispatch() {
  return useContext(ArtistesDispatchContext);
}
