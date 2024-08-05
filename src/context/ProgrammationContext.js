import React, { createContext, useContext, useReducer, useEffect } from "react";
import { getProgrammations } from "../service/api";

// créer context state et dispatch
// créer une function provider pour provider state et provider dispatch aux enfants
// créer une fonction pour abonner au contexte state et contexte dispatch
// créer une fonction reducer qui traite les cas 


const ProgrammationStateContext = createContext();
const ProgrammationDispatchContext = createContext();

function programmationReducer(state, action){
    switch(action.type){
        case'getProgrammations':
        return {
            ...state,
            programmations: action.payload,
            fetchError: null
        };
        case'fetchError':
        return { 
            ...state,
            fetchError: action.payload
        }
        case 'updateProgrammation':
            const datas = action.payload;
            const updatedProgrammations = state.programmations.map(programmation =>
                programmation.id === datas.id ? { ...programmation, ...datas } : programmation
            );
            return {
                ...state,
                programmations: updatedProgrammations
            }
        

    }
}

export function ProgrammationProvider({children}){
    const [state, dispatch] = useReducer(programmationReducer, initialProgrammationState)

    useEffect(() => {
        getProgrammations(dispatch);
    }, []);

    return(
        <ProgrammationStateContext.Provider value={state}>
            <ProgrammationDispatchContext.Provider value={dispatch}>
                {children}
            </ProgrammationDispatchContext.Provider>
        </ProgrammationStateContext.Provider>
    )
};


const initialProgrammationState = {
    programmations : [],
    fetchError : null
};


export function useProgrammationState(){
    return useContext(ProgrammationStateContext);
}

export function useProgrammationDispatch(){
    return useContext(ProgrammationDispatchContext);
}