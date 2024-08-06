import React, { createContext, useContext, useEffect, useReducer } from "react";
import { getEmplacements } from "../service/api";


// créer contexte dispatch / state
// créer function provider qui partage cotexte state et dispatch à children
// créer function pour context state dispatch
// useEffect appelle les données au chargement du composant


const EmplacementState = createContext();
const EmplacementDispatch = createContext();

const initialEmplacementState = {
    emplacements : [],
    fetchError : null
}

export default function EmplacementProvider ({children}) {
    const [state, dispatch] = useReducer(emplacementReducer, initialEmplacementState);
    useEffect(()=>{
        getEmplacements(dispatch)
    }, [dispatch])
    return(
        <EmplacementState.Provider value={state}>
            <EmplacementDispatch.Provider value={dispatch}>
                {children}
            </EmplacementDispatch.Provider>
        </EmplacementState.Provider>
    ) 
}

function emplacementReducer(state, action){
    switch(action.type){
        case 'getEmplacements':
            return {
                ...state,
                emplacements : action.payload,
            }
    }
}

export function useEmplacementState(){
    return useContext(EmplacementState);
}

export function useEmplacementDispatch(){
    return useContext(EmplacementDispatch);
}