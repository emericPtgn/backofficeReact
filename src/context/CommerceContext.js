import { createContext, useContext, useEffect, useReducer } from "react";
import { getCommerces } from "../service/api";

// Créez les contextes pour l'état et le dispatch séparément
const CommercesStateContext = createContext();
const CommercesDispatchContext = createContext();

const commercesInitialState = {
  commerces: []
};

function commercesReducer(state, action) {
    switch (action.type) {
      case 'getCommerces':
        return { ...state, commerces: action.payload };
      case 'fetchError':
        return { ...state, error: action.payload };
        case 'updateCommerce':
          return {
            ...state,
            commerces: state.commerces.map(commerce =>
              commerce.id === action.payload.id ? { ...commerce, ...action.payload } : commerce
            ),
          };    
        case 'addCommerce': 
        return {
            ...state,
            commerces: [...state.commerces, action.payload]
        };
        case 'deleteCommerce':
          const commerceUpdate = state.commerces.filter(commerce => commerce.id !== action.payload);
          return {
            ...state,
            commerces : commerceUpdate
          }
    
      default:
        return state;
    }
  }
  
  

// Fournit les deux contextes dans un seul fournisseur
export function CommercesProvider({ children }) {
  const [state, dispatch] = useReducer(commercesReducer, commercesInitialState);
  useEffect(()=>{
    getCommerces(dispatch)
}, [dispatch])
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
