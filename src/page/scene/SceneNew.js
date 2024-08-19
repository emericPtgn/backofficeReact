import React from "react";
import Header from "../../component/layout/levelTwo/Header";
import RightSidebar from "../../component/layout/levelTwo/RightSidebar";
import SceneForm from "../../component/primereact/scene/SceneForm.js";
import useAddMarker from "./hooks/useAddMarker.js";
import useScene from "./hooks/useScene.js";
import SetScenesMap2 from "./SetScenesMap2.js";
import { useState } from "react";

const SceneNew = () => {

    const [scene, setScene] = useState({nom: '',description: '',type: 'scene',latitude: '',longitude: ''});

    const { addNewMarker } = useAddMarker();

    const handleOnClick = async () => {
        await addNewMarker(scene);
    }

    return (
        <div className="container-level2">
            <Header />
            <div className="content-wrapper">
                <div id="mainContent">
                    <h2>Contenu principal</h2>
                    <p>Ici se trouve le contenu principal de votre page d'édition.</p>
                    <SceneForm scene={scene} setScene={setScene} />
                    <SetScenesMap2 scene={scene} setScene={setScene} />
                </div>
                <RightSidebar handleOnClick={handleOnClick} />
            </div>
        </div>
    );
}

export default SceneNew;
