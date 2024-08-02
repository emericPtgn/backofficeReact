import React, { createContext, useContext, useReducer } from "react";

// provider state, disptach avec children
// provider prend des props : state et dispatch
// contexte
// function qui génère le provider


const SceneStateContext = createContext(null);
const SceneDispatchContext = createContext(null);

function sceneReducer(state, action){
    switch(action.type){
        case'getScenes':
        return {
            ...state,
            scenes: action.payload,
            fetchError: null
        };
        case'fetchError':
        return {
            ...state,
            fetchError: action.payload
        }
    }
}

export function SceneProvider ({children}){
    const [state, dispatch] = useReducer(sceneReducer, initialSceneState);
    return (
        <SceneStateContext.Provider value={state}>
            <SceneDispatchContext.Provider value={dispatch}>
                {children}
            </SceneDispatchContext.Provider>
        </SceneStateContext.Provider>
    )
}



const initialSceneState = {
    scenes: [],
    fetchError: null
}


export function useSceneState(){
    return useContext(SceneStateContext)
}
export function useSceneDispatch(){
    return useContext(SceneDispatchContext)
}