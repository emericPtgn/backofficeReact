// hooks/useLoadingState.js
import { useState } from "react";

export const useLoadingState = (initialMessage = 'Chargement en cours...', initialLoading = true) => {
    const [isLoading, setIsLoading] = useState(initialLoading);
    const [stateMessage, setStateMessage] = useState(initialMessage);
    
    return { isLoading, setIsLoading, stateMessage, setStateMessage };
};
