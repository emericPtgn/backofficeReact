import React, { createContext, useContext, useReducer }  from "react";

// créer un contexte
// abonner provider state et provider dispatch
// crééer un hook personnalisé pour partager le contexte
// initialiser les états
// écrire gabarit function reducer

export const ActiviteStateContext = createContext(null);
export const ActiviteDispatchContext = createContext(null);

const initialActiviteState = {
    activities: [],
    fetchError: null
}

function ActiviteReducer(state, action){
    switch(action.type){
        case 'getActivities':
            return {
                ...state,
                activities: action.payload,
                fetchError: null
            }
        case 'fetchError':
            return {
                ...state,
                fetchedError: action.payload
            }
    }
}

export function ActiviteProvider({children}){
    const [state, dispatch] = useReducer(ActiviteReducer, initialActiviteState);
    return (
        <ActiviteStateContext.Provider value={state}>
            <ActiviteDispatchContext.Provider value={dispatch}>
                {children}
            </ActiviteDispatchContext.Provider>
        </ActiviteStateContext.Provider>
    )
};


export function useActiviteState(){
    return useContext(ActiviteStateContext);
};

export function useActiviteDispatch(){
    return useContext(ActiviteDispatchContext);}
