import React, { createContext, useContext, useEffect, useReducer } from "react";
import { getActivities } from "../service/api";

// Création des contextes
export const ActiviteStateContext = createContext(null);
export const ActiviteDispatchContext = createContext(null);

// Initialisation de l'état
const initialActiviteState = {
    activities: [],
    fetchError: null
}

// Fonction reducer
function ActiviteReducer(state, action) {
    switch (action.type) {
        case 'getActivities':
            return {
                ...state,
                activities: action.payload,
                fetchError: null
            }
        case 'fetchError':
            return {
                ...state,
                fetchError: action.payload  // Corrigé 'fetchedError' en 'fetchError'
            }
        case 'addActivite':
            return {
                ...state,
                activities: [...state.activities, action.payload]  // Corrigé pour ajouter une nouvelle activité
            }
            case 'deleteActivite':
                const updatedList = state.activites.filter(activite => activite.id !== action.payload)
                return {
                    ...state,
                    activites: updatedList
                }
            
        default:
            return state;  // Ajout d'un cas par défaut
    }
}

// Provider component
export function ActiviteProvider({ children }) {
    const [state, dispatch] = useReducer(ActiviteReducer, initialActiviteState);
    useEffect(()=>{
        getActivities(dispatch);
    }, [dispatch])
    return (
        <ActiviteStateContext.Provider value={state}>
            <ActiviteDispatchContext.Provider value={dispatch}>
                {children}
            </ActiviteDispatchContext.Provider>
        </ActiviteStateContext.Provider>
    )
}

// Hooks personnalisés
export function useActiviteState() {
    const context = useContext(ActiviteStateContext);
    if (context === undefined) {
        throw new Error('useActiviteState must be used within a ActiviteProvider');
    }
    return context;
}

export function useActiviteDispatch() {
    const context = useContext(ActiviteDispatchContext);
    if (context === undefined) {
        throw new Error('useActiviteDispatch must be used within a ActiviteProvider');
    }
    return context;
}