import React, { useState, useEffect } from "react";
import Header from "../../component/layout/levelTwo/Header";
import SceneForm from "../../component/form/scene/SceneForm";
import RightSidebar from "../../component/layout/levelTwo/RightSidebar";
import { useParams } from "react-router-dom";
import { useSceneDispatch, useSceneState } from "../../context/SceneContext";
import { updateScene } from "../../service/api";

const LOADING_MESSAGE = 'Chargement des données en cours';
const ERROR_MESSAGE = 'Erreur lors de la récupération des données';

const SceneEdit = () => {
    const state = useSceneState();
    const dispatch = useSceneDispatch();
    const [scene, setScene] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [stateMessage, setStateMessage] = useState(LOADING_MESSAGE);
    const { id } = useParams();

    useEffect(() => {
        if (state.scenes && Array.isArray(state.scenes) && state.scenes.length > 0) {
            const item = state.scenes.find(item => item.id === id);
            console.log(item)
            if (item) {
                setScene(item);
                setIsLoading(false);
                console.log(item)
            } else {
                setStateMessage(ERROR_MESSAGE);
                setIsLoading(false);
                console.log(item)
            }
        } else {
            setStateMessage(ERROR_MESSAGE);
            setIsLoading(false);
        }
    }, [state.scenes, id]);

    const handleOnClick = async () => {
        try {
            console.log("Sending update for scene:", scene);
            const updatedScene = await updateScene(id, scene, dispatch);
            if (updatedScene && updatedScene.id) {
                setScene(updatedScene);  // Mettre à jour l'état local avec la scène mise à jour
                setStateMessage('Scène mise à jour avec succès');
                console.log("Updated scene:", updatedScene);
            } else {
                throw new Error("La mise à jour n'a pas renvoyé de données valides");
            }
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
                    {scene && <SceneForm scene={scene} setScene={setScene} />}
                </div>
                <RightSidebar handleOnClick={handleOnClick} />
            </div>
        </div>
    );
};

export default SceneEdit;
