import React,{ useRef} from "react";
import Header from "../../component/layout/levelTwo/Header";
import RightSidebar from "../../component/layout/levelTwo/RightSidebar";
import SceneForm from "../../component/primereact/scene/SceneForm.js";
import handleClicktoAdd from "../../utils/handleClickToAdd.js";
import SetScenesMap2 from "./SetScenesMap2.js";
import { useState } from "react";
import { addMarker } from "../../service/api.js";
import { useMarkerDispatch } from "../../context/MarkerContext.js";
import { Toast } from "primereact/toast";


const SceneNew = () => {
    const dispatch = useMarkerDispatch();
    const [scene, setScene] = useState({nom: '', description: '', type: 'scene',latitude: null,longitude: null, icone : '', groupe : '', sousGroupe : ''});
    const toast = useRef(null);

    const onClickUpdate = async () => {
        try {
            await handleClicktoAdd( dispatch, scene, addMarker, toast )
        } catch (error) {
            console.error('Error during update', error);
        }
    }

    return (
        <div className="container-level2">
            <Header />
            <div className="content-wrapper">
                <div id="mainContent">
                    <Toast ref={toast} />
                    <h2>Contenu principal</h2>
                    <p>Ici se trouve le contenu principal de votre page d'édition.</p>
                    <SceneForm scene={scene} setScene={setScene} />
                    <SetScenesMap2 scene={scene} setScene={setScene} />
                </div>
                <RightSidebar handleOnClick={onClickUpdate} />
            </div>
        </div>
    );
}

export default SceneNew;
