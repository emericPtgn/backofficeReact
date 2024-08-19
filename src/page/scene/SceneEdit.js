import React from 'react';
import { useParams } from 'react-router-dom';
import SceneForm from '../../component/primereact/scene/SceneForm';
import SetScenesMap2 from './SetScenesMap2';
import Header from '../../component/layout/levelTwo/Header';
import RightSidebar from '../../component/layout/levelTwo/RightSidebar';
import { useSceneEdit } from './hooks/useSceneEdit';
import useUpdateMarker from './hooks/useUpdateMarker';

const SceneEdit = () => {
    const { id } = useParams(); // Extrait l'id de l'URL
    const { scene, setScene, error, stateMessage } = useSceneEdit(id);
    const { updateMarker } = useUpdateMarker();

    const handleOnClick = async () => {
        const response = await updateMarker(id, scene);
        console.log(response);
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container-level2">
            <Header />
            <div className="content-wrapper">
                <div id="mainContent">
                    <h2>Contenu principal</h2>
                    <p>{stateMessage}</p>
                    {scene && (
                        <>
                            <SceneForm scene={scene} setScene={setScene} />
                            <SetScenesMap2 scene={scene} setScene={setScene} id={id} />
                        </>
                    )}
                </div>
                <RightSidebar handleOnClick={handleOnClick} />
            </div>
        </div>
    );
};

export default SceneEdit;
