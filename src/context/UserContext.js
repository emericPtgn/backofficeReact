import React, { createContext, useContext, useEffect, useReducer } from "react";
import { getUsers, getActivUser } from "../service/api";

// Create contexts for state and dispatch
const UserStateContext = createContext();
const UserDispatchContext = createContext();

// Reducer function to manage state changes
function userReducer(state, action) {
    switch (action.type) {
        case 'getUsers':
            return {
                ...state,
                users: action?.payload,
            };
        case 'updateUser':
            let updatedUsers = state?.users.filter(user => user?.id !== action?.payload?.id);
            updatedUsers.push(action?.payload?.data);
            return {
                ...state,
                users: updatedUsers,
            };
            case 'setActivUser':
                let user = state?.users.find(user => user?.email === action?.payload?.email);
                let isAdmin = user?.roles[0] === 'ROLE_ADMIN';
                return {
                    ...state,
                    activUser: user,
                    isAdmin: isAdmin,
                };
            case 'setIsDataActivUserData':
                return {
                    ...state,
                    isDataActivUserData : action?.payload
                }
    
        default:
            throw new Error(`Unknown action: ${action?.type}`);
    }
}

// Provider component to supply state and dispatch contexts
export function UserProvider({ children }) {
    const [state, dispatch] = useReducer(userReducer, initialUsersState);

    useEffect(() => {
        const fetchData = async () => {
            await getUsers(dispatch);
            await getActivUser(dispatch);
        };
        fetchData();
    }, []);

    return (
        <UserStateContext.Provider value={state}>
            <UserDispatchContext.Provider value={dispatch}>
                {children}
            </UserDispatchContext.Provider>
        </UserStateContext.Provider>
    );
}

// Custom hooks for using state and dispatch contexts
export function useUserState() {
    const context = useContext(UserStateContext);
    if (context === undefined) {
        throw new Error('useUserState must be used within a UserProvider');
    }
    return context;
}

export function useUserDispatch() {
    const context = useContext(UserDispatchContext);
    if (context === undefined) {
        throw new Error('useUserDispatch must be used within a UserProvider');
    }
    return context;
}

// Initial state
const initialUsersState = {
    users: [],
    activUser: null,
    isAdmin : false,
    isDataActivUserData: null
};
