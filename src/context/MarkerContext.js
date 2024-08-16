import React, { createContext, useContext, useEffect, useReducer } from "react";
import { getMarkers } from "../service/api";

// Create contexts
const MarkerStateContext = createContext();
const MarkerDispatchContext = createContext();

const initialMarkerState = {
    markers: []
};

function markerReducer(state, action) {
    switch (action.type) {
        case 'getMarkers':
            return {
                ...state,
                markers: action.payload,
            };
        case 'addMarker':
            return {
                ...state,
                markers: [...state.markers, action.payload]
            };
        case 'updateMarker': 
            const updatedMarkers = state.markers.map(marker =>
                marker.id === action.payload.id
                    ? { ...marker, ...action.payload.data }
                    : marker
            );
            return {
                ...state,
                markers: updatedMarkers
            };
        
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

export default function MarkerProvider({ children }) {
    const [state, dispatch] = useReducer(markerReducer, initialMarkerState);

    useEffect(() => {
        getMarkers({dispatch});
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
