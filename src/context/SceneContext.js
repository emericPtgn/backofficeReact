import React, { createContext, useContext, useEffect, useReducer } from "react";
import { getScenes } from "../service/api";

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
        case 'updateScene':
            return {
                ...state,
                scenes: state.scenes.map(scene => 
                    scene.id === action.payload.id ? action.payload : scene
                )
            }
        case 'addNewScene':
            console.log(state.scenes);
            return {
                ...state,
                scenes: [...state.scenes, action.payload]
            };
              
        
        
    }
}

export function SceneProvider ({children}){
    const [state, dispatch] = useReducer(sceneReducer, initialSceneState);
    useEffect(()=>{
        getScenes(dispatch);
    }, [dispatch])
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