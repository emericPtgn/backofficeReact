import React, { useState, useEffect } from "react";
import Header from "../../component/layout/levelTwo/Header";
import RightSidebar from "../../component/layout/levelTwo/RightSidebar";
import { useParams } from "react-router-dom";
import { useMarkerDispatch, useMarkerState } from "../../context/MarkerContext";
import { SceneForm } from "../../component/primereact/scene/SceneForm";
import { updateMarker } from "../../service/api";
import SetScenesMap from "./SetScenesMap";

const LOADING_MESSAGE = 'Chargement des données en cours';
const ERROR_MESSAGE = 'Erreur lors de la récupération des données';

const SceneEdit = () => {
    const { id } = useParams();
    const dispatch = useMarkerDispatch();
    const { markers } = useMarkerState();
    const [isLoading, setIsLoading] = useState(true);
    const [scene, setScene] = useState(null);
    const [stateMessage, setStateMessage] = useState(LOADING_MESSAGE);

    useEffect(() => {
        if (markers && markers.length > 0) {
            const marker = markers.find(marker => marker.id === id);
            if (marker) {
                setScene(marker);
                setIsLoading(false);
                setStateMessage('');
            } else {
                setIsLoading(false);
                setStateMessage(ERROR_MESSAGE);
            }
        }
    }, [id, markers]);

    const handleOnClick = async () => {
        try {
            const response = await updateMarker(id, scene, dispatch);
            // Update state with the updated marker
            dispatch({ type: 'updateMarker', payload: response });
            console.log(response);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la scène:', error);
            setStateMessage('Erreur lors de la mise à jour de la scène: ' + error.message);
        }
    };

    if (isLoading) {
        return <div>{LOADING_MESSAGE}</div>;
    }

    return (
        <div className="container-level2">
            <Header />
            <div className="content-wrapper">
                <div id="mainContent">
                    <h2>Contenu principal</h2>
                    <p>Ici se trouve le contenu principal de votre page d'édition.</p>
                    <p id="stateMessage">{stateMessage}</p>
                    {scene ? (
                        <>
                            <SceneForm scene={scene} setScene={setScene} />
                            <SetScenesMap scene={scene} setScene={setScene} />
                        </>
                    ) : (
                        <p>{ERROR_MESSAGE}</p>
                    )}
                </div>
                <RightSidebar handleOnClick={handleOnClick} />
            </div>
        </div>
    );
};

export default SceneEdit;
