import { createContext, useContext, useReducer } from "react";

// Créez les contextes pour l'état et le dispatch séparément
const CommercesStateContext = createContext();
const CommercesDispatchContext = createContext();

const commercesInitialState = {
  commerces: []
};

function commercesReducer(state, action) {
    console.log('Reducer action:', action.type, action.payload);
    switch (action.type) {
      case 'getCommerces':
        return { ...state, commerces: action.payload, error: null };
      case 'fetchError':
        return { ...state, error: action.payload };
      default:
        return state;
    }
  }
  
  

// Fournit les deux contextes dans un seul fournisseur
export function CommercesProvider({ children }) {
  const [state, dispatch] = useReducer(commercesReducer, commercesInitialState);

  return (
    <CommercesStateContext.Provider value={state}>
      <CommercesDispatchContext.Provider value={dispatch}>
        {children}
      </CommercesDispatchContext.Provider>
    </CommercesStateContext.Provider>
  );
}

// Custom hooks pour accéder aux contextes
export function useCommercesState() {
  return useContext(CommercesStateContext);
}

export function useCommercesDispatch() {
  return useContext(CommercesDispatchContext);
}
