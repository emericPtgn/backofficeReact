import React, { createContext, useContext, useReducer } from "react";

// créer context state et dispatch
// créer function Provider pour diffuser Provider state et Provider dispatch
// créer functions pour s'abonner AUX contexteS state et dispatch
// créer function reducer

const UserStateContext = createContext();
const UserDispatchContext = createContext();

function userReducer(state, action){
    switch(action.type){
        case'getUsers':
        return {
            ...state,
            users: action.payload,
            fetchError: null
        }
        case'fetchError':
        return {
            ...state,
            fetchError : action.payload
        }
    }
}

export function UserProvider({children}){
    const [state, dispatch] = useReducer(userReducer, initialUsersState)
    return (
        <UserStateContext.Provider value={state}>
            <UserDispatchContext.Provider value={dispatch}>
                {children}
            </UserDispatchContext.Provider>
        </UserStateContext.Provider>
    )
}

export function useUserState(){
    return useContext(UserStateContext);
}

export function useUserDispatch(){
    return useContext(UserDispatchContext);
}

const initialUsersState = {
    users: [],
    fetchError: null

}