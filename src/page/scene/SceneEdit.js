import React, { useState, useEffect } from "react";
import Header from "../../component/layout/levelTwo/Header";
import RightSidebar from "../../component/layout/levelTwo/RightSidebar";
import { useParams } from "react-router-dom";
import { useMarkerDispatch, useMarkerState } from "../../context/MarkerContext";
import { SceneForm } from "../../component/primereact/scene/SceneForm";
import { updateMarker } from "../../service/api";


const LOADING_MESSAGE = 'Chargement des données en cours';
// const ERROR_MESSAGE = 'Erreur lors de la récupération des données';
// const SUCCESS_MESSAGE = 'Données récupérées'
// const NO_DATA = 'No data found'

const SceneEdit = () => {
    const { id } = useParams();
    const dispatch = useMarkerDispatch();
    const state = useMarkerState();
    const [isLoading, setIsLoading] = useState(true);
    const [scene, setScene] = useState(undefined);
    const [stateMessage, setStateMessage] = useState(LOADING_MESSAGE);

    useEffect(()=>{
        if(state.markers && state.markers.length > 0){
            const marker = state.markers.find(marker => marker.id === id);
            console.log(marker)
            setScene(marker);
            console.log(scene);
            if(scene !== null){
                setIsLoading(false);
            }
        }
    }, 
    [id, state.markers])

    const handleOnClick = async () => {
        try {
            await updateMarker(id, scene, dispatch);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la scène:', error);
            // setStateMessage('Erreur lors de la mise à jour de la scène: ' + error.message);
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
                    {<p id="stateMessage">{stateMessage}</p>}
                    {scene && <SceneForm scene={scene} setScene={setScene} />}
                </div>
                <RightSidebar handleOnClick={handleOnClick} />
            </div>
        </div>
    );
};

export default SceneEdit;
