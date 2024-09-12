import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import SceneForm from '../../component/primereact/scene/SceneForm';
import SetScenesMap2 from './SetScenesMap2';
import Header from '../../component/layout/levelTwo/Header';
import RightSidebar from '../../component/layout/levelTwo/RightSidebar';
import { useSceneEdit } from './hooks/useSceneEdit';
import useUpdateMarker from './hooks/useUpdateMarker';
import handleClickToUpdate from '../../utils/handleClickToUpdate';
import { useMarkerDispatch } from '../../context/MarkerContext';
import { Toast } from 'primereact/toast';


const SceneEdit = () => {
    const { id } = useParams(); // Extrait l'id de l'URL
    const { scene, setScene, error, stateMessage } = useSceneEdit(id);
    const { updateMarker } = useUpdateMarker();
    const dispatch = useMarkerDispatch();
    const toast = useRef(null)
    const onClickUpdate = async () => {
        try {
            await handleClickToUpdate(id, dispatch, scene, updateMarker, toast)
        } catch (error) {
            console.error('Error during update', error);
        }
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container-level2">
            <Header />
            <div className="content-wrapper">
                <div id="mainContent">
                    <Toast ref={toast}/>
                    {}<p>{stateMessage}</p>
                    {scene && (
                        <>
                            <SceneForm scene={scene} setScene={setScene} />
                            <SetScenesMap2 scene={scene} setScene={setScene} id={id} />
                        </>
                    )}
                </div>
                <RightSidebar handleOnClick={onClickUpdate} />
            </div>
        </div>
    );
};

export default SceneEdit;
