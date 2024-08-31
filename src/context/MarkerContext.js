import React, { createContext, useContext, useEffect, useReducer } from "react";
import { getMarkers } from "../service/api";

const MarkerStateContext = createContext();
const MarkerDispatchContext = createContext();

// MarkerContext.js
const initialMarkerState = {
    markers: [],
    editedMarkers: {} // Ajout d'un état pour les marqueurs modifiés
};

function markerReducer(state, action) {
    switch (action.type) {
        case 'getMarkers':
            return {
                ...state,
                markers: action.payload,
            };
            case 'updateMarker':
                const updatedMarkers = state.markers.map(marker =>
                    marker.id === action.payload.id
                        ? { ...marker, latitude : action.payload.latitude, longitude : action.payload.longitude }
                        : marker)
                return {
                    ...state,
                    markers: updatedMarkers,
                    editedMarkers: updatedMarkers
                };
    
            case 'updateEmoji':
                const updatedEmojiMarkers = state.markers.map(marker =>
                    marker.id === action.payload.id ? 
                    { ...marker, icone: action.payload.icone }
                    : marker)
                return {
                    ...state,
                    markers: updatedEmojiMarkers,
                    editedMarkers: updatedEmojiMarkers
                };
    
            case 'deleteMarker':
                const markersAfterDelete = state.markers.filter(marker => marker.id !== action.payload)
                return {
                    ...state,
                    markers: markersAfterDelete
                };
    
            case 'resetMarker':
                const originalMarker = state.markers.find(marker => marker.id === action.payload);
                return {
                    ...state,
                    markers: state.markers.map(marker =>
                        marker.id === action.payload
                            ? originalMarker
                            : marker
                    )
                };
    
            default:
                throw new Error(`Unhandled action type: ${action.type}`);
        }
    
}


export function MarkerProvider({ children }) {
    const [state, dispatch] = useReducer(markerReducer, initialMarkerState);

    useEffect(() => {
        getMarkers(dispatch);
    }, []);

    return (
        <MarkerStateContext.Provider value={state}>
            <MarkerDispatchContext.Provider value={dispatch}>
                {children}
            </MarkerDispatchContext.Provider>
        </MarkerStateContext.Provider>
    );
}

export function useMarkerState() {
    const context = useContext(MarkerStateContext);
    if (context === undefined) {
        throw new Error('useMarkerState must be used within a MarkerProvider');
    }
    return context;
}

export function useMarkerDispatch() {
    const context = useContext(MarkerDispatchContext);
    if (context === undefined) {
        throw new Error('useMarkerDispatch must be used within a MarkerProvider');
    }
    return context;
}