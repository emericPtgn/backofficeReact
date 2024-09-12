// hooks/useSceneEdit.js
import { useState, useEffect } from "react";
import { useMarkerState } from "../../../context/MarkerContext";
import { useLoadingState } from "./useLoadingState";

export const useSceneEdit = (id) => {
    const { markers } = useMarkerState();
    const [scene, setScene] = useState(null);
    const [error, setError] = useState(null);
    const { isLoading, setIsLoading, setStateMessage, stateMessage } = useLoadingState();

    useEffect(() => {
        if (markers && markers.length > 0) {
            const marker = markers.find(marker => marker.id === id);
            if (marker) {
                setScene(marker);
                setIsLoading(false);
                setStateMessage('Données chargées avec succès');
            } else {
                setIsLoading(false);
                setError('Erreur lors de la récupération des données');
                setStateMessage('Erreur lors de la récupération des données');
            }
        }
    }, [id, markers, setIsLoading, setStateMessage]);

    return { scene, setScene, error, stateMessage };
};
