import React, { createContext, useContext, useEffect, useReducer } from "react";
import { getMarkers } from "../service/api";


// créer contexte dispatch / state
// créer function provider qui partage cotexte state et dispatch à children
// créer function pour context state dispatch
// useEffect appelle les données au chargement du composant


const MarkerState = createContext();
const MarkerDispatch = createContext();

const initialMarkerState = {
    markers : [],
    activMarker: null,
}

export default function MarkerProvider ({children}) {
    const [state, dispatch] = useReducer(markerReducer, initialMarkerState);
    useEffect(()=>{
        getMarkers(dispatch)
    }, [dispatch])
    return(
        <MarkerState.Provider value={state}>
            <MarkerDispatch.Provider value={dispatch}>
                {children}
            </MarkerDispatch.Provider>
        </MarkerState.Provider>
    ) 
}

function markerReducer(state, action){
    switch(action.type){
        case 'getMarkers':
            return {
                ...state,
                markers : action.payload,
            }
            case 'addMarker': 
            const updatedMarkers = state.markers.map(marker => marker);
            const newMarker = action.payload;
            updatedMarkers.push(newMarker);
            return {
                ...state,
                markers: updatedMarkers
            }
    }
}

export function useMarkerState(){
    return useContext(MarkerState);
}

export function useMarkerDispatch(){
    return useContext(MarkerDispatch);
}