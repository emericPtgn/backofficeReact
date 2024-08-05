import { createContext, useContext, useReducer, useEffect } from "react";
import { getArtistes } from "../service/api";

// Créez les contextes pour l'état et le dispatch séparément
const ArtistesStateContext = createContext();
const ArtistesDispatchContext = createContext();

const artistesInitialState = {
  artistes: [],
  error: null,
};

function artistesReducer(state, action) {

  switch (action.type) {
    case 'getArtistes':
      return { ...state, artistes: action.payload, error: null };
    case 'fetchError':
      return { ...state, error: action.payload };
    case 'addNewArtiste':
      return { ...state, artistes: [...state.artistes, action.payload] };
    case 'updateArtiste':
      return {
        ...state,
        artistes: state.artistes.map(artiste =>
          artiste.id === action.payload.id ? action.payload : artiste
        ),
      };
    case 'deleteSocialFromArtiste':
      
      return {
        ...state,

      }
    default:
      return state;
  }
}

// Fournit les deux contextes dans un seul fournisseur
export function ArtistesProvider({ children }) {
  const [state, dispatch] = useReducer(artistesReducer, artistesInitialState);

  useEffect(() => {
    // Appeler getArtistes pour récupérer les données des artistes lors de l'initialisation
    getArtistes(dispatch);
  }, [dispatch]);

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
